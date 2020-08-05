module.exports = function (sequelize, DataTypes) {
  const SteamUser = sequelize.define("SteamUser", {
    vanityUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    steamId: DataTypes.STRING,
    personaName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    profileUrl: DataTypes.STRING,
    avatarUrl: DataTypes.STRING,    
  });

  SteamUser.associate = function (models) {
    SteamUser.belongsToMany(models.Game, {
      through: "SteamUserGames",
      foreignKey: "steamUserId",
    });
  };
  return SteamUser;
};