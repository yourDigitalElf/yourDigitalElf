module.exports = (sequelize, DataTypes) => {
	const Present = sequelize.define("Present", {
		present_name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 400],
			},
		},
		rating: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	});

	Present.associate = models => {
		Present.belongsTo(models.User, {
			foreignKey: {

				allowNull: false,
			},

		});
	};

	return Present;
};
