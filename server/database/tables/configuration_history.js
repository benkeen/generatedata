module.exports = (sequelize, DataTypes) => {
	return sequelize.define('configuration_history', {
		historyId: {
			type: DataTypes.INTEGER(9),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'history_id'
		},
		configurationId: {
			type: DataTypes.INTEGER(9),
			allowNull: false,
			field: 'configuration_id'
		},
		lastUpdated: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'last_updated'
		},
		configurationName: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'configuration_name'
		},
		content: {
			type: DataTypes.TEXT
		}
	}, {
		tableName: 'configuration_history',
		timestamps: false
	});
};
