module.exports = (sequelize, DataTypes) => {
	return sequelize.define('settings', {
		setting_name: {
			type: DataTypes.STRING
		},
		setting_value: {
			type: DataTypes.STRING
		}
	}, {
		tableName: 'settings',
		timestamps: false
	});
};

