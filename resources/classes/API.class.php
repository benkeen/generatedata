<?php

class MyAPI extends API
{
//    protected $User;

    public function __construct($request, $origin) {

//        parent::__construct($request);
/*
        // Abstracted out for example
        $APIKey = new Models\APIKey();
        $User = new Models\User();

        if (!array_key_exists('apiKey', $this->request)) {
            throw new Exception('No API Key provided');
        } else if (!$APIKey->verifyKey($this->request['apiKey'], $origin)) {
            throw new Exception('Invalid API Key');
        } else if (array_key_exists('token', $this->request) &&
            !$User->get('token', $this->request['token'])) {

            throw new Exception('Invalid User Token');
        }

        $this->User = $User;
*/
    }

    protected function example() {
		echo "in example.";

//        if ($this->method == 'GET') {
//            return "Your name is " . $this->User->name;
//        } else {
//            return "Only accepts GET requests";
//        }
    }
}
