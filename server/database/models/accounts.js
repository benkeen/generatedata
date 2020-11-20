module.exports = (sequelize, DataTypes) => {
	return sequelize.define('accounts', {
		account_id: {
			type: DataTypes.INTEGER(8).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		first_name: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		last_name: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		password: {
			type: DataTypes.STRING(100),
			allowNull: false
		}
	}, {
		tableName: 'accounts',
		timestamps: false
	});
};


// `date_created` datetime NOT NULL,
// `last_updated` datetime NOT NULL,
// `last_logged_in` datetime DEFAULT NULL,
// `date_expires` datetime DEFAULT NULL,
// `account_type` enum('user','admin') NOT NULL,
// `password_recovery_question` varchar(100) DEFAULT NULL,
// `password_recovery_answer` varchar(100) DEFAULT NULL,
// `num_rows_generated` mediumint(9) DEFAULT '0',
// `max_records` mediumint(9) DEFAULT NULL,
// `selected_data_types` text,
// `selected_export_types` text,
// `selected_countries` text


