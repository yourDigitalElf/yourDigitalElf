module.exports = (sequelize, DataTypes) => {
    let users_followers = sequelize.define("users_followers",{});

    return users_followers;
}