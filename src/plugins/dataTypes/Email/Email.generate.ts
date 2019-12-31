import { ExportTypeMetadata } from '../../../../types/exportTypes';

const MAX_EMAIL_LENGTH = 254;
// private $words;
// private $numWords;


/*
public function __construct($runtimeContext) {
    parent::__construct($runtimeContext);
    if ($runtimeContext == "generation") {
        $this->words = Utils::getLipsum();
        $this->numWords = count($this->words);
    }
}

public function generate($generator, $generationContextData) {
    // prefix
    $numPrefixWords = mt_rand(1, 3);
    $offset = mt_rand(0, $this->numWords - ($numPrefixWords + 1));
    $words = array_slice($this->words, $offset, $numPrefixWords);
    $words = str_replace(array(",", ".", ":", ";"), "", $words);
    $prefix = join(".", $words);

    // domain
    $numDomainWords = mt_rand(1, 3);
    $offset = mt_rand(0, $this->numWords - ($numDomainWords + 1));
    $words = array_slice($this->words, $offset, $numDomainWords);
    $words = str_replace(array(",", ".", ":", ";"), "", $words);
    $domain = join("", $words);

    // suffix
    $validSuffixes = array("edu", "com", "org", "ca", "net", "co.uk");
    $suffix = $validSuffixes[mt_rand(0, count($validSuffixes)-1)];

    // if the email exceeded 254 chars (the max valid number of chars), truncate it. This could be way
    // more elegant, but it's SUCH a fringe case I don't much mind
    $email = "$prefix@$domain.$suffix";
    $length = strlen($email);
    if ($length > $this->MAX_EMAIL_LENGTH) {
        $prefixParts = str_split($prefix, ceil(strlen($prefix) / 2));
        $domainParts = str_split($domain, ceil(strlen($domain) / 2));
        $email = "{$prefixParts[0]}@${$domainParts[0]}.$suffix";
    }

    return array(
        "display" => $email
    );
}
*/

export const getMetadata = (): ExportTypeMetadata => ({
    sql: {
        field: 'varchar(255) default NULL',
        field_Oracle: 'varchar2(255) default NULL',
        field_MSSQL: 'VARCHAR(255) NULL'
    }
});
