<?php

require_once(realpath(dirname(__FILE__) . "/../library.php"));


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

		$arr4 = Utils::returnRandomSubset(array(), 4);
		$this->assertEquals(count($arr4), 0);
	}

	public function test_returnRandomSubsetInvalidParams1() {
		try {
			$arr = Utils::returnRandomSubset("string", 1);
		} catch(Exception $e) {
			return;
		}

		$this->fail("Invalid parameters passed to Utils::returnRandomSubset()");
	}

	public function test_returnRandomSubsetInvalidParams2() {
		try {
			$arr = Utils::returnRandomSubset(array(1,2,3), "str");
		} catch(Exception $e) {
			return;
		}

		$this->fail("Invalid parameters passed to Utils::returnRandomSubset()");
	}

}

