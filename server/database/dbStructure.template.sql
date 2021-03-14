# noinspection SqlNoDataSourceInspectionForFile

CREATE DATABASE IF NOT EXISTS generatedata;

CREATE USER 'gduser'@'%' IDENTIFIED BY 'gdpassword';
GRANT CREATE, ALTER, INDEX, LOCK TABLES, REFERENCES, UPDATE, DELETE, DROP, SELECT, INSERT ON `generatedata`.* TO 'gduser'@'%';

FLUSH PRIVILEGES;

DROP TABLE IF EXISTS `datasets`;
CREATE TABLE `datasets` (
  `dataset_id` mediumint(9) NOT NULL,
  `dataset_name` varchar(255) NOT NULL DEFAULT '',
  `status` enum('public','private') NOT NULL,
  `date_created` datetime NOT NULL,
  `account_id` mediumint(9) NOT NULL,
  `num_rows_generated` mediumint(9) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `datasets` ADD PRIMARY KEY (`dataset_id`);
ALTER TABLE `datasets` MODIFY `dataset_id` mediumint(9) NOT NULL AUTO_INCREMENT;


DROP TABLE IF EXISTS `dataset_history`;
CREATE TABLE `dataset_history` (
  `history_id` mediumint(9) NOT NULL,
  `dataset_id` mediumint(9) NOT NULL,
  `date_created` datetime NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `dataset_history` ADD PRIMARY KEY (`history_id`);
ALTER TABLE `dataset_history` MODIFY `history_id` mediumint(9) NOT NULL AUTO_INCREMENT;


DROP TABLE IF EXISTS `settings`;
CREATE TABLE `settings` (
  `setting_name` varchar(100) NOT NULL,
  `setting_value` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `settings` ADD UNIQUE KEY `setting_name` (`setting_name`);


DROP TABLE IF EXISTS `accounts`;
CREATE TABLE `accounts` (
  `account_id` mediumint(8) UNSIGNED NOT NULL,
  `created_by` mediumint(8) UNSIGNED NULL,
  `date_created` datetime NOT NULL,
  `last_updated` datetime NOT NULL,
  `last_logged_in` datetime DEFAULT NULL,
  `date_expires` datetime DEFAULT NULL,
  `refresh_token` varchar(200) DEFAULT NULL,
  `account_type` enum('superuser', 'admin', 'user') NOT NULL,
  `account_status` enum('live','disabled', 'expired') NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(100) NOT NULL,
  `country` varchar(255) NOT NULL,
  `region` varchar(255) NOT NULL,
  `num_rows_generated` mediumint(9) DEFAULT '0',
  `max_records` mediumint(9) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `accounts` ADD PRIMARY KEY (`account_id`);
ALTER TABLE `accounts` MODIFY `account_id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT;

/* the admin account info is populated from the values in your .env file the first time it boots up */
INSERT INTO `accounts` (account_id, date_created, last_updated, account_type, account_status, first_name, last_name, email, password)
VALUES (1, '%DATE_CREATED%', '%DATE_CREATED%', 'superuser', 'live', '%FIRST_NAME%', '%LAST_NAME%', '%EMAIL%', '%PASSWORD%')
