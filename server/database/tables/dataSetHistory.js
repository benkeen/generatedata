module.exports = (sequelize, DataTypes) => {
	return sequelize.define('dataSetHistory', {
		historyId: {
			type: DataTypes.INTEGER(9),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'history_id'
		},
		dataSetId: {
			type: DataTypes.INTEGER(9),
			allowNull: false,
			field: 'dataset_id'
		},
		lastUpdated: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'last_updated'
		},
		dataSetName: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'dataset_name'
		},
		content: {
			type: DataTypes.TEXT
		}
	}, {
		tableName: 'dataset_history',
		timestamps: false
	});
};
