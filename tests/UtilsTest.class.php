<?php

require_once(realpath(dirname(__FILE__) . "/../resources/classes/Utils.class.php"));


class UtilsTest extends PHPUnit_Framework_TestCase
{
	public function testHelloWorld()
	{
//		$str = Utils::generateRandomTextStr("");

		$this->assertEquals('1', '1');
	}
}

