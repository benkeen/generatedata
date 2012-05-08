<?php

class Email extends DataType {

	protected $dataTypeName = "Email";
  protected $dataTypeFieldGroup = "human_data";
  protected $dataTypeFieldGroupOrder = 30;

  private $words;

  // constructor?


  public function generateItem($row, $placeholderStr, $existingRowData) {
	  // prefix
	  $numPrefixWords = rand(1, 3);
	  $offset = rand(0, count($this->words) - ($numPrefixWords + 1));
	  $words = array_slice($words, $offset, $numPrefixWords);
	  $words = preg_replace("/[,.:]/", "", $words);
	  $prefix = join(".", $words);

	  // domain
	  $num_domain_words = rand(1, 3);
	  $offset = rand(0, count($this->words) - ($numDomainWords + 1));
	  $words = array_slice($this->words, $offset, $numDomainWords);
	  $words = preg_replace("/[,.:]/", "", $words);
	  $domain = join("", $words);

	  // suffix
	  $validSuffixes = array("edu", "com", "org", "ca", "net", "co.uk");
	  $suffix = $validSuffixes[rand(0, count($validSuffixes)-1)];

	  $email = "$prefix@$domain.$suffix";
	  return $email;
  }

  public function getExportTypeInfo($exportType, $options) {
	  $info = "";
	  switch ($exportType) {
	  	case "sql":
	      if ($options == "Oracle") {
	        $info = "varchar2(255) default NULL";
	      } else if ($options == "MySQL" || $options == "SQLite") {
	        $info = "varchar(255) default NULL";
	      }
	      break;
	  }

	  return $info;
  }
}