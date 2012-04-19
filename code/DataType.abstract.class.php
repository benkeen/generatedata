<?php

/**
 * Our base class for all Data Type plugins. All Data Type plugins must define a class that
 * extends this class, to ensure all required functions and properties are in place.
 */
abstract class DataType
{
  static $processOrder;

  abstract function getProcessOrder();
}