var db = require("../models");

module.exports = function (app) {
  const axios = require("axios");
  const apiKey = process.env.API_KEY;

  // function that creates the row connecting the user to the games they own in the join table(SteamUserGames)
  async function createJoinRow(steamUserId, gameId) {
    await db.SteamUserGames.create({
      steamUserId,
      gameId,
    })
      // We don't need to do anything in the .then, and apparently
      // it's not necessary for this to work, so I've commented it out
      // .then(() => console.log("Success in createJoinRow()"))

      // We catch the err here, but don't do anything with it because
      // it is expected that we'll have an "error" whenever we try to 
      // create a many to many relationship that already exists
      .catch((err) => {
        // console.log("Error in createJoinRow()");
        // console.log(err);
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

  app.post("/api/games", async (req, res) => {
    for(let k = 0; k < req.body.usersArray.length; k++) {
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
              for (let i = 0; i < response.data.response.games.length; i++) {
                const gameFromDatabase = await db.Game.findOne({
                  where: {
                    appId: response.data.response.games[i].appid,
                  },
                });
                if (gameFromDatabase === null) {
                  singleGame = await db.Game.create({
                    name: response.data.response.games[i].name,
                    appId: response.data.response.games[i].appid,
                  });
                } else {
                  singleGame = gameFromDatabase;
                }
                //function that creates the row connecting the user to the games they own in the join table(SteamUserGames)
                await createJoinRow(currentUserSteamId, singleGame.id);
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
      success: true,
      time: new Date().getTime()
    });
  });
};
