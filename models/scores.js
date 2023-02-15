module.exports = function (sequelize, DataTypes) {
    return sequelize.define("scores", {
        domain_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        comment: {
            type: DataTypes.TEXT(255),
            allowNull: true
        },
        ip: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
    }, {
        indexes: [
            {
                unique: false,
                fields: ['domain_id']
            }
        ]
    });
}