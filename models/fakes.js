module.exports = function (sequelize, DataTypes) {
    return sequelize.define("fakes", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        fact: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
    });
}