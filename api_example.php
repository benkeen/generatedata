<?php

require_once("library.php");

$json =<<< END
{
    "numRows": 1000,
    "rows": [
        {
            "type": "Names",
            "title": "First Name",
            "settings": {
                "placeholder": "Name"
            }
        },
        {
            "type": "Names",
            "title": "Last Name",
            "settings": {
                "placeholder": "Surname"
            }
        },
        {
            "type": "Email",
            "title": "Email"
        },
        {
            "type": "AlphaNumeric",
            "title": "Random Password",
            "settings": {
                "placeholder": "LLLxxLLLxLL"
            }
        },
        {
            "type": "AlphaNumeric",
            "title": "US Zipcode",
            "settings": {
                "placeholder": "xxxxx"
            }
        }
    ],
    "export": {
    "type": "JSON",
        "settings": {
        "stripWhitespace": false,
            "dataStructureFormat": "simple"
        }
    }
}
END;

$url = "http://localhost:8888/generatedata/api/v1/data";
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
curl_close($ch);
