module.exports = (sequelize, DataTypes) => {

	return sequelize.define('accounts', {
		account_id: {
			type: DataTypes.INTEGER(8).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		date_created: {
			type: DataTypes.DATE,
			allowNull: false
		},
		last_updated: {
			type: DataTypes.DATE,
			allowNull: false
		},
		last_logged_in: {
			type: DataTypes.DATE
		},
		date_expires: {
			type: DataTypes.DATE
		},
		account_type: {
			type: DataTypes.ENUM('admin', 'user'),
			allowNull: false
		},
		first_name: {
			type: DataTypes.STRING(255)
		},
		last_name: {
			type: DataTypes.STRING(255)
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		num_rows_generated: {
			type: DataTypes.INTEGER(9).UNSIGNED,
			allowNull: false
		},
		max_records: {
		    type: DataTypes.INTEGER(9).UNSIGNED
	    },
		selected_data_types: {
			type: DataTypes.TEXT
		},
		selected_export_types: {
			type: DataTypes.TEXT
		},
		selected_countries: {
			type: DataTypes.TEXT
		}
	}, {
		tableName: 'accounts',
		timestamps: false
	});
};
