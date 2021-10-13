module.exports = function (sequelize, DataTypes) {
  const Game = sequelize.define("Game", {
    appId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    // playtime: DataTypes.STRING,
    gameBanner: DataTypes.STRING,
    metacriticScore: DataTypes.INTEGER,
    metacriticURL: DataTypes.STRING,
    controllerSupport: DataTypes.STRING,
    releaseDate: DataTypes.DATE,
    genres: DataTypes.JSON,
    categories: DataTypes.JSON,
  }
  );

  Game.associate = function (models) {
    Game.belongsToMany(models.SteamUser, {
      through: "SteamUserGames",
      foreignKey: "gameId",
    });
  };

  return Game;
};
// Game Banner URL format (we think)
// http://media.steampowered.com/steamcommunity/public/images/apps/{appid}/{hash}.jpg

// New Steam API URL for additional info on games - note: API key not required
// https: //store.steampowered.com/api/appdetails?appids=218620

// New data we want to store for our 3rd major refactor:
// metacritic - object: score & url,
// categories - array of objects (id & description), 
// genres - array of objects (id & decription),
// release date - object: want only date,
// controller support - string

// More information to grab when we're ready for a later refactor
// price (upsert needed), developers, publishers, platforms, recommendations, 
// playtime (comes from other API; many to many needed + upsert)
// pull the player's wishlists to suggest games to buy - coming soon from release date object would then be needed

// path start res.data[appid].data...
// .categories