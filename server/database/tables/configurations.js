module.exports = (sequelize, DataTypes) => {
	return sequelize.define('configurations', {
		configuration_id: {
			type: DataTypes.INTEGER(9),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		status: {
			type: DataTypes.ENUM('public', 'private'),
			allowNull: false
		},
		date_created: {
			type: DataTypes.DATE,
			allowNull: false
		},
		account_id: {
			type: DataTypes.DATE,
			allowNull: false
		},
		num_rows_generated: {
			type: DataTypes.INTEGER(9)
		}
	}, {
		tableName: 'configurations',
		timestamps: false
	});
};
