module.exports = function (sequelize, DataTypes) {
    return sequelize.define("websites_tags", {
        domain_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tag: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        indexes: [
            {
                unique: false,
                fields: ['domain_id']
            },
            {
                unique: false,
                fields: ['tag']
            }
        ]
    });
}