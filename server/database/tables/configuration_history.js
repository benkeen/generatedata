module.exports = (sequelize, DataTypes) => {
	return sequelize.define('configuration_history', {
		history_id: {
			type: DataTypes.INTEGER(9),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		configuration_id: {
			type: DataTypes.INTEGER(9),
			allowNull: false
		},
		last_updated: {
			type: DataTypes.DATE,
			allowNull: false
		},
		configuration_name: {
			type: DataTypes.DATE,
			allowNull: false
		},
		content: {
			type: DataTypes.TEXT
		}
	}, {
		tableName: 'configuration_history',
		timestamps: false
	});
};
