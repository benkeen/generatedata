module.exports = (sequelize, DataTypes) => {
	return sequelize.define('configurations', {
		configurationId: {
			type: DataTypes.INTEGER(9),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'configuration_id'
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
			type: DataTypes.DATE,
			allowNull: false,
			field: 'account_id'
		},
		numRowsGenerated: {
			type: DataTypes.INTEGER(9),
			field: 'num_rows_generated'
		}
	}, {
		tableName: 'configurations',
		timestamps: false
	});
};
