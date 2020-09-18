var db = require("../models");

module.exports = function (app) {
  const axios = require("axios");
  const apiKey = process.env.API_KEY;

  // function that creates the row connecting the user to the games they own in the join table(SteamUserGames)
  async function createJoinRow(steamUserId, gameId) {
    await db.SteamUserGames.findOrCreate({
        where: {
          steamUserId,
          gameId
        }
      })
      // We don't need to do anything in the .then, and apparently
      // it's not necessary for this to work, so I've commented it out
      // .then(() => console.log("Success in createJoinRow()"))
      .catch((err) => {
        console.log("Error in createJoinRow()");
        console.log(err);
      });
  }

  // Gets the Steam user id from our database to be used later
  async function getSteamUserIdBySteamId(steamId) {
    let id;
    await db.SteamUser.findOne({
      where: {
        steamId: steamId,
      },
    }).then((res) => {
      id = res.id;
    });
    return id;
  }

  // This backend API .post first pings Steam's API to get the list of owned games
  // for each user we're searching for. Then it finds or creates a row of data in our 
  // database for each game. Then it creates the many to many relationships between
  // each user & their owned games.
  app.post("/api/games", async (req, res) => {
    const privateUsers = [];
    for (let k = 0; k < req.body.usersArray.length; k++) {
      await db.SteamUser.findOne({
          where: {
            vanityUrl: req.body.usersArray[k],
          },
        })
        .then(async (resForSteamId) => {
          const steamID = resForSteamId.steamId;
          const ownedGamesUrl = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamID}&format=json&include_appinfo=true`;
          await axios
            .get(ownedGamesUrl)
            .then(async (response) => {
              let singleGame = {};
              //stores the database id for the user who's games are being found. Is used later to create join table rows(what games they own)
              let currentUserSteamId = await getSteamUserIdBySteamId(steamID);
              if (response.data.response.games) {
                for (let i = 0; i < response.data.response.games.length; i++) {
                  // refactored code for determining if a game is already in our DB
                  // the game will be created in the DB if it isn't already
                  // then once the game is confirmed in the DB, the many to many relationship
                  // is created between steamusers & games by createJoinRow
                  db.Game.findOrCreate({
                    where: {
                      name: response.data.response.games[i].name,
                      appId: response.data.response.games[i].appid,
                      playtime: response.data.response.games[i].playtime_forever,
                      gameBanner: response.data.response.games[i].img_logo_url,
                    }
                  }).then(game => {
                    singleGame = game[0].dataValues;
                    createJoinRow(currentUserSteamId, singleGame.id);
                  }).catch((err) => {
                    console.log(err);
                  });

                  // const gameFromDatabase = await db.Game.findOne({
                  //   where: {
                  //     appId: response.data.response.games[i].appid,
                  //   },
                  // });
                  // if (gameFromDatabase === null) {
                  //   //TODO refractor to use findOrCreate()
                  //   singleGame = await db.Game.create({
                  //     name: response.data.response.games[i].name,
                  //     appId: response.data.response.games[i].appid,
                  //     playtime: response.data.response.games[i].playtime_forever,
                  //     gameBanner: response.data.response.games[i].img_logo_url,
                  //   });
                  // } else {
                  //   singleGame = gameFromDatabase;
                  // }
                  //function that creates the row connecting the user to the games they own in the join table(SteamUserGames)
                  //this is the many to many relationship between games & Steam users
                  // await createJoinRow(currentUserSteamId, singleGame.id);
                }
              } else {
                privateUsers.push(req.body.usersArray[k]);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((er) => {
          console.log(er);
        });
    }
    await res.json({
      privateUsers: privateUsers
    });
  });
};