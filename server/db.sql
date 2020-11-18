CREATE DATABASE IF NOT EXISTS generatedata;

-- create the users for each database
CREATE USER 'gduser'@'%' IDENTIFIED BY 'gdpassword';
GRANT CREATE, ALTER, INDEX, LOCK TABLES, REFERENCES, UPDATE, DELETE, DROP, SELECT, INSERT ON `projectone`.* TO 'gduser'@'%';

FLUSH PRIVILEGES;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
