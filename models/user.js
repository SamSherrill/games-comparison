module.exports = function (sequelize, DataTypes) {
  const SteamUser = sequelize.define("SteamUser", {
    personaName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    steamId: DataTypes.STRING,
    profileUrl: DataTypes.STRING,
    avatarUrl: DataTypes.STRING,
    vanityUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });

  SteamUser.associate = function (models) {
    SteamUser.belongsToMany(models.Game, {
      through: "SteamUserGames",
      foreignKey: "steamUserId",
    });
  };
  return SteamUser;
};