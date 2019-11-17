<?php

/**
 * A Class That contain methods to generate sql based on selected database & table
 * @author Harish Nandoliya <nandoliyaharish@gmail.com>
 * @package Core
 */
class ImportSql
{
    //These are mysql's system databases so no need to return & generatedata's db;
    private static $ignoreDB = array("mysql", "performance_schema", "information_schema", "phpmyadmin");

    /**
     * Get all databases
     * @return [] response
     */
    public static function getAllDatabases()
    {
        if (!self::isEverythingOk()) {
            return array(
                'success' => false,
                'content' => array()
            );
        }

        $db = Core::$db;
        $response = $db->query("SHOW DATABASES");
        if ($response['success']) {
            $response['content'] = mysqli_fetch_all($response['results'], MYSQLI_ASSOC);
            $response['content'] = array_column($response['content'], 'Database');
            foreach ($response['content'] as $key => $item) {
                if(self::checkDBinIgnore($item)){
                    unset($response['content'][$key]);
                }
            }
            $response['content'] = array_values($response['content']);
        } else {
            $response['content'] = array();
        }
        return $response;

    }

    /**
     * Check if database in in ignore-list.
     * @param $dbName string Database Name
     * @return bool true if database is in ignore list, false otherwise
     */
    private static function checkDBinIgnore($dbName)
    {
        self::$ignoreDB[] = Core::getDbName();
        return in_array($dbName, self::$ignoreDB);
    }

    /**
     * Check if all settings are satisfied.
     * @return bool
     */
    private static function isEverythingOk()
    {
        return Core::isImportSqlFeatureEnabled()
            && Core::isImportSqlListDatabases()
            && !Core::checkDemoMode()
            && Core::checkIsLoggedIn()
            && Core::checkIsInstalled()
            && !Core::isInstalling();
    }

    /**
     * Get table of database
     * @param $dbName string a database name
     * @return array
     */
    public static function getTables($dbName)
    {
        if (!self::isEverythingOk() || empty($dbName) || self::checkDBinIgnore($dbName)) {
            return array(
                'success' => false,
                'content' => array()
            );
        }
        $db = Core::$db;
        $response = $db->query("SELECT table_schema, table_name FROM INFORMATION_SCHEMA.tables WHERE table_schema='$dbName' ORDER BY table_schema, table_name");
        if ($response['success']) {
            $response['content'] = mysqli_fetch_all($response['results'], MYSQLI_ASSOC);
        } else {
            $response['content'] = array();
        }
        return $response;
    }

    /**
     * Get Create sql statement of given database.table
     * @param $dbName
     * @param $tableName
     * @return array
     */
    public static function getCreateSql($dbName, $tableName)
    {
        if (!self::isEverythingOk() || empty($dbName) || empty($tableName) || self::checkDBinIgnore($dbName)) {
            return array(
                'success' => false,
                'content' => ""
            );
        }
        $db = Core::$db;
        $response = $db->query("DESC `$dbName`.`$tableName`"); // escape db & table names in case they contain wacky chars

        $response['content'] = "";
        if ($response['success']) {
            $create_statement = mysqli_fetch_all($response['results'], MYSQLI_NUM);
            if ($create_statement) {
                $sql_stmt = "CREATE TABLE $tableName( \n";
                foreach ($create_statement as $field) {
                    $sql_stmt .= "\t $field[0] $field[1] ";
                    $sql_stmt .= $field[2] == 'NO' ? 'NOT NULL' : 'DEFAULT NULL';
                    $sql_stmt .= ",\n";
                }
                $sql_stmt .= ");";
                $response['content'] = $sql_stmt;
            }
        }

        return $response;
    }
}
