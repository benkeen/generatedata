module.exports = (sequelize, DataTypes) => {

	return sequelize.define('accounts', {
		accountId: {
			type: DataTypes.INTEGER(8).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'account_id'
		},
		dateCreated: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'date_created'
		},
		lastUpdated: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'last_updated'
		},
		lastLoggedIn: {
			type: DataTypes.DATE,
			field: 'last_logged_in'
		},
		dateExpires: {
			type: DataTypes.DATE,
			field: 'date_expires'
		},
		refreshToken: {
			type: DataTypes.STRING(200),
			field: 'refresh_token'
		},
		accountType: {
			type: DataTypes.ENUM('admin', 'user'),
			allowNull: false,
			field: 'account_type'
		},
		firstName: {
			type: DataTypes.STRING(255),
			field: 'first_name'
		},
		lastName: {
			type: DataTypes.STRING(255),
			field: 'firstName'
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		numRowsGenerated: {
			type: DataTypes.INTEGER(9).UNSIGNED,
			allowNull: false,
			field: 'num_rows_generated'
		},
		maxRecords: {
		    type: DataTypes.INTEGER(9).UNSIGNED,
			field: 'max_records'
	    },
		selectedDataTypes: {
			type: DataTypes.TEXT,
			field: 'selected_data_types'
		},
		selectedExportTypes: {
			type: DataTypes.TEXT,
			field: 'selected_export_types'
		},
		selectedCountries: {
			type: DataTypes.TEXT,
			field: 'selected_countries'
		}
	}, {
		tableName: 'accounts',
		timestamps: false
	});
};
