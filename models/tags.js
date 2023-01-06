module.exports = function (sequelize, DataTypes) {
    return sequelize.define("tags", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        tag: {
            type: DataTypes.STRING,
            allowNull: false
        },
        positive: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    });
}