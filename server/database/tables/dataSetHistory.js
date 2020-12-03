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
		dateCreated: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'date_created'
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false
		}
	}, {
		tableName: 'dataset_history',
		timestamps: false
	});
};
