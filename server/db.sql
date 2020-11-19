CREATE DATABASE IF NOT EXISTS generatedata;

CREATE USER 'gduser'@'%' IDENTIFIED BY 'gdpassword';
GRANT CREATE, ALTER, INDEX, LOCK TABLES, REFERENCES, UPDATE, DELETE, DROP, SELECT, INSERT ON `projectone`.* TO 'gduser'@'%';

FLUSH PRIVILEGES;

DROP TABLE IF EXISTS `configurations`;
CREATE TABLE `configurations` (
  `configuration_id` mediumint(9) NOT NULL,
  `status` enum('public','private') NOT NULL,
  `date_created` datetime NOT NULL,
  `account_id` mediumint(9) NOT NULL,
  `num_rows_generated` mediumint(9) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `configurations` ADD PRIMARY KEY (`configuration_id`);
ALTER TABLE `configurations` MODIFY `configuration_id` mediumint(9) NOT NULL AUTO_INCREMENT;


DROP TABLE IF EXISTS `configuration_history`;
CREATE TABLE `configuration_history` (
  `history_id` mediumint(9) NOT NULL,
  `configuration_id` mediumint(9) NOT NULL,
  `last_updated` datetime NOT NULL,
  `configuration_name` varchar(100) NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `configuration_history` ADD PRIMARY KEY (`history_id`);
ALTER TABLE `configuration_history` MODIFY `history_id` mediumint(9) NOT NULL AUTO_INCREMENT;


DROP TABLE IF EXISTS `settings`;
CREATE TABLE `settings` (
  `setting_name` varchar(100) NOT NULL,
  `setting_value` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `settings` ADD UNIQUE KEY `setting_name` (`setting_name`);


DROP TABLE IF EXISTS `user_accounts`;
CREATE TABLE `user_accounts` (
  `account_id` mediumint(8) UNSIGNED NOT NULL,
  `date_created` datetime NOT NULL,
  `last_updated` datetime NOT NULL,
  `last_logged_in` datetime DEFAULT NULL,
  `date_expires` datetime DEFAULT NULL,
  `account_type` enum('user','admin') NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(50) NOT NULL,
  `password_recovery_question` varchar(100) DEFAULT NULL,
  `password_recovery_answer` varchar(100) DEFAULT NULL,
  `num_rows_generated` mediumint(9) DEFAULT '0',
  `max_records` mediumint(9) DEFAULT NULL,
  `selected_data_types` text,
  `selected_export_types` text,
  `selected_countries` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `user_accounts` ADD PRIMARY KEY (`account_id`);
ALTER TABLE `user_accounts` MODIFY `account_id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT;

