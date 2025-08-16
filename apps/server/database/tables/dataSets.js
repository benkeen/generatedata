module.exports = (sequelize, DataTypes) => {
	return sequelize.define('dataSets', {
		dataSetId: {
			type: DataTypes.INTEGER(9),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'dataset_id'
		},
		dataSetName: {
			type: DataTypes.STRING(255),
			field: 'dataset_name',
			allowNull: false
		},
		status: {
			type: DataTypes.ENUM('public', 'private'),
			allowNull: false
		},
		dateCreated: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'date_created'
		},
		accountId: {
			type: DataTypes.INTEGER(9),
			allowNull: false,
			field: 'account_id'
		},
		numRowsGenerated: {
			type: DataTypes.INTEGER(9),
			field: 'num_rows_generated',
			allowNull: false
		}
	}, {
		tableName: 'datasets',
		timestamps: false
	});
};
