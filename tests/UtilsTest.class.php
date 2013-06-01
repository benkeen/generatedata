<?php

require_once(realpath(dirname(__FILE__) . "/../resources/classes/Utils.class.php"));


class UtilsTest extends PHPUnit_Framework_TestCase
{
	public function test_returnRandomSubset()
	{
		$arr1 = Utils::returnRandomSubset(array(1,2,3), 2);
		$this->assertEquals(count($arr1), 2);

		$arr2 = Utils::returnRandomSubset(array(1,2,3), 1);
		$this->assertEquals(count($arr2), 1);

		$arr3 = Utils::returnRandomSubset(array(1,2,3), 0);
		$this->assertEquals(count($arr3), 0);

		// check for crazy fringe cases
		$arr4 = Utils::returnRandomSubset(array(), 4);
		$this->assertEquals(count($arr4), 0);
	}
}

