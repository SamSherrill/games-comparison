const db = require("../models");

module.exports = function (app) {
  const axios = require("axios");
  const apiKey = process.env.API_KEY;

  function getUserInfo(apiKey, user, cb) {
    const queryVanityUrl = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${apiKey}&vanityurl=${user}`;

    axios
      .get(queryVanityUrl)
      .then(function (res) {
        if (res.data.response.steamid === undefined) {
          return cb(undefined);
        }
        let userId = res.data.response.steamid;
        const querySteamUserUrl = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${userId}`;
        axios
          .get(querySteamUserUrl)
          .then(function (res) {
            const vanityUrl = res.data.response.players[0].profileurl.split(
              "/"
            )[4];
            if (res.data.response.players.length > 0) {
              let steamUser = {
                vanityUrl: vanityUrl,
                steamId: res.data.response.players[0].steamid,
                personaName: res.data.response.players[0].personaname,
                profileUrl: res.data.response.players[0].profileurl,
                avatarUrl: res.data.response.players[0].avatarmedium,
              };
              return cb(steamUser);
            } else {
              console.log("Couldn't find user!");
            }
          })
          .catch((err) => {
            console.log("Could not load user information");
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  app.post("/api/steamUsers", async function (req, res) {
    const notFoundUsers = [];
    let userNotFound = false;
    const foundUsers = [];
    await req.body.usersArray.forEach(async (user) => {
      getUserInfo(apiKey, user, async (steamUser) => {
        if (steamUser === undefined) {
          notFoundUsers.push(user);
          userNotFound = true;
        } else {
          // console.log("blah blah blah: ", steamUser);
          await db.SteamUser.findOrCreate({
            where: steamUser
          }).then((dbUser) => {
            // console.log("this is what we are looking for: ", dbUser);
            foundUsers.push(dbUser[0].dataValues);
          }).catch((err) => {
            console.log("Could not findOrCreate steamUser in the database");
            console.log(err);
          });
        }
      });
    });
    setTimeout(() => {
      res.json({
        userNotFound: userNotFound,
        notFoundUsers: notFoundUsers,
        foundUsers: foundUsers
      });
    }, 1000);
  });

  // Commented out the next 50 lines of code on 6/21/2021. It appears nothing broke.
  // app.get("/api/steamUsers", function (req, res) {
  //   db.SteamUser.findAll({}).then((user) => {
  //     res.json(user);
  //   });
  // });

  // app.get("/api/steamUsers/:personaName", function (req, res) {
  //   db.SteamUser.findOne({
  //     where: {
  //       personaName: req.params.personaName,
  //     },
  //   }).then((user) => {
  //     console.log(
  //       "User in the app.get(/api.steamUsers/:personaName function .then",
  //       user
  //     );
  //     console.log("User object from database: ", user);
  //     res.json(user);
  //   });
  // });

  // app.get("/SteamUser/:username", function (req, res) {
  //   const user = req.params.username;
  //   // use sequelize to find the user in our DB
  //   db.SteamUser.findOne({
  //       where: {
  //         vanityUrl: user,
  //       },
  //       include: [db.Game],
  //     })
  //     .then((user) => {
  //       {
  //         user: user.dataValues
  //       };
  //       // check our DB for the user. IF they exist there with their games list,
  //       // then we display those in the browser with res.render("SteamUser");

  //       // This block of code is specifically for handlebars (a server side rendering engine) so I'm commenting it out
  //       // res.render("index", {
  //       //   user: user,
  //       // });

  //       res.json({
  //         user: user,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // });

  async function getUsers(res, usersArray, cb) {
    let retrievedUserArray = [];
    for (let i = 0; i < usersArray.length; i++) {
      await db.SteamUser.findOne({
          where: {
            vanityUrl: usersArray[i],
          },
          include: [db.Game],
        })
        .then(async (res) => {
          if (res) {
            const userObject = {
              user: res.dataValues,
            };
            retrievedUserArray.push(userObject);
          }
        })
        .catch((er) => {
          console.log(er);
        });
    }
    await cb(retrievedUserArray);
  }

  // REFACTOR? Below we use shared Array to build the array, but we then simply send back sharedGames in the res.json. Maybe simplify the naming conventions here.
  app.post("/sharedGames", function (req, res) {
    getUsers(res, req.body.usersArray, (usersArray) => {
      let sharedGamesArray = [];

      // console.log("UsersArray in other-controller.js in app.post /sharedGames at the start of getUsers being called: ",usersArray);
      // console.log("req.body.usersArray at the same location:", req.body.usersArray);

      for (let i = 0; i < usersArray[0].user.Games.length; i++) {
        if (sharedGamesArray.some(game => {
            return game.name === usersArray[0].user.Games[i].dataValues.name
          })) {
          // console.log(usersArray[0].user.Games[i].dataValues.name + " is a duplicate");
          continue;
        } else {
          sharedGamesArray.push({
            // we change the name of the appId & gameBanner. Should we keep this consistent throughout all levels of the app?
            name: usersArray[0].user.Games[i].dataValues.name,
            id: usersArray[0].user.Games[i].appId,
            image: usersArray[0].user.Games[i].gameBanner
          })
        }
      }

      for (var i = 1; i < usersArray.length; i++) {
        let gamesArray = usersArray[i].user.Games.map(
          (game) => {
            return {
              name: game.dataValues.name,
              id: game.appId,
              image: game.gameBanner
            }
          }
        );
        sharedGamesArray = sharedGamesArray.filter((game) => {
          let containsGame = false;
          gamesArray.forEach(comparedGame => {
            if (comparedGame.name === game.name) {
              containsGame = true;
            }
          })
          return containsGame;
        });
      }
      res.json({
        user: usersArray,
        sharedGames: sharedGamesArray,
      });
    }).catch(er => console.log("Error in sharedgames: ", er));
  });
};