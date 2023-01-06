module.exports = function (sequelize, DataTypes) {
    return sequelize.define("websites", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        domain: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            unique: true
        }
    });
}