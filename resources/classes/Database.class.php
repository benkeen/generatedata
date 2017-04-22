<?php

/*
 * @author Ben Keen <ben.keen@gmail.com>
 * @package Core
 */

use PDO, PDOException;


class Database
{
    private $dbh;
    private $error;
    private $statement;
    private $table_prefix;

    public function __construct() {
        $hostname = Core::getHostname();
        $username = Core::getDbUsername();
        $password = Core::getDbPassword();
        $db_name  = Core::getDbName();
        $port     = Core::getPort();
        $table_prefix = Core::getDbTablePrefix();

        $options = array(
            PDO::ATTR_PERSISTENT => true,
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_EMULATE_PREPARES => false
        );

        // if required, set all queries as UTF-8 (enabled by default). N.B. we're supporting 5.3.0 so passing charset
        // in the DSN isn't sufficient, as described here: https://phpdelusions.net/pdo
        $attrInitCommands = array();
        if (version_compare(PHP_VERSION, '5.3.6', '<')) {
            $attrInitCommands[] = "Names utf8";
        }
        if (!empty($attrInitCommands)) {
            $options[PDO::MYSQL_ATTR_INIT_COMMAND] = "SET " . implode(",", $attrInitCommands);
        }

        try {
            $dsn = sprintf("mysql:host=%s;port=%s;dbname=%s;charset=utf8", $hostname, $port, $db_name);
            $this->dbh = new PDO($dsn, $username, $password, $options);
        } catch (PDOException $e) {
            $this->error = $e->getMessage();
        }

        $this->table_prefix = $table_prefix;
    }

    /**
     * This is a convenience wrapper for PDO's prepare method. It replaces {PREFIX} with the database
     * table prefix so you don't have to include it everywhere.
     * @param $query
     */
    public function query($query) {
        $query = str_replace('{PREFIX}', $this->table_prefix, $query);
        $this->statement = $this->dbh->prepare($query);
    }

    public function bind($param, $value, $type = null) {
        if (is_null($type)) {
            switch (true) {
                case is_int($value):
                    $type = PDO::PARAM_INT;
                    break;
                case is_bool($value):
                    $type = PDO::PARAM_BOOL;
                    break;
                case is_null($value):
                    $type = PDO::PARAM_NULL;
                    break;
                default:
                    $type = PDO::PARAM_STR;
            }
        }
        $this->statement->bindValue($param, $value, $type);
    }

    public function bindAll(array $data) {
        foreach ($data as $k => $v) {
            $this->bind($k, $v);
        }
    }

    public function beginTransaction() {
        return $this->dbh->beginTransaction();
    }

    public function processTransaction() {
        return $this->dbh->commit();
    }

    public function rollbackTransaction() {
        return $this->dbh->rollBack();
    }

    /**
     * Executes our query/queries.
     * @param mixed $queries
     * @param mixed $rollbackQueries
     * @return hash "success"      => boolean
     *              "errorMessage" => error string
     *              "results"      => the result of the MySQL query, or an array of results if an array was passed
     */
    public function execute() {
        try {
            $this->statement->execute();
        } catch (\PDOException $e) {

        }
    }

    public function fetch($fetch_style = PDO::FETCH_ASSOC) {
        return $this->statement->fetch($fetch_style);
    }

    public function fetchColumn($fetch_style = PDO::FETCH_ASSOC) {
        return $this->statement->fetchColumn($fetch_style);
    }

    public function fetchAll($fetch_style = PDO::FETCH_ASSOC) {
        return $this->statement->fetchAll($fetch_style);
    }

    public function getResultsArray() {
        $info = array();
        foreach ($this->fetchAll() as $row) {
            $info[] = $row;
        }
        return $info;
    }

    public function getInsertId() {
        return $this->dbh->lastInsertId();
    }

    /**
     * Checks to see if the database information provided is valid or not.
     */
    public static function testDbSettings($dbHostname, $dbName, $dbPort, $dbUsername, $dbPassword) {
        $lang = Core::$language->getCurrentLanguageStrings();

        try {
            $dsn = sprintf("mysql:host=%s;port=%s;dbname=%s;charset=utf8", $dbHostname, $dbPort, $dbName);
            new PDO($dsn, $dbUsername, $dbPassword, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
        } catch (PDOException $e) {
            $placeholders = array("db_connection_error" => $e->getMessage());
            $error = Templates::evalSmartyString($lang["install_invalid_db_info"], $placeholders);
            return array(false, $error);
        }

        return array(true, "");
    }

    public function processQuery($queries, $rollbackQueries = "") {
        $singleQuery = false;
        if (!is_array($queries)) {
            $queries = array($queries);
            $singleQuery = true;
        }
        if (!is_array($rollbackQueries)) {
            $rollbackQueries = array($rollbackQueries);
        }

        $results = array();
        $errorMessage = "";
        foreach ($queries as $query) {
            $result = mysqli_query($this->link, $query);
            if (!$result) {
                $errorMessage = mysqli_error($this->link);
                break;
            } else {
                $results[] = $result;
            }
        }

        if (!empty($errorMessage)) {
            foreach ($rollbackQueries as $query) {
                @mysqli_query($this->link, $query);
            }
        }

        // if this was a single query, make $results
        if ($singleQuery && isset($results[0])) {
            $results = $results[0];
        }

        return array(
            "success"      => empty($errorMessage),
            "errorMessage" => $errorMessage,
            "results"      => $results
        );
    }
}

