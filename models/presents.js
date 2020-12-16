module.exports = (sequelize, DataTypes) => {
    const Present = sequelize.define("Present", {
        present_name: {
            type: DataTypes.String,
            allowNull: false,
            validate: {
                len: [1, 400],
            },
        },
    });

    Present.associate = models => {
        Present.belongsTo(models.user, {
            foreignKey: {
                allowNull: false,
            },
        });
    };

    return Present;
};
