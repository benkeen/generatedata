<?php

namespace Json;

class ValidationException extends \Exception {};
class SchemaException extends \Exception {};

/**
 * JSON Schema Validator
 *
 * Implements schema draft version 03, as defined at http://json-schema.org
 *
 * @author Harold Asbridge <hasbridge@gmail.com>
 * @version 0.1
 */
class Validator
{
	protected $schemaDefinition;

	/**
	 * @var stdClass
	 */
	protected $schema;

	/**
	 * Initialize validation object.
	 *
	 * @param string $schema
	 * @param string $content "file", if the first param passed is a file location; "json" if it's raw JSON content
	 * @throws SchemaException
	 */
	public function __construct($schema, $content = "file")
	{
		if ($content === "file") {
			if (!file_exists($schema)) {
				throw new SchemaException(sprintf('Schema file not found: [%s]', $schema));
			}
			$data = file_get_contents($schema);
		} else if ($content === "json") {
			$data = $schema;
		}

		$this->schema = json_decode($data);
		if ($this->schema === null) {
			throw new SchemaException('Unable to parse JSON data - syntax error?');
		}

		// @TODO - validate schema itself
	}

	/**
	 * Validate schema object
	 *
	 * @param mixed $entity
	 * @param string $entityName
	 *
	 * @return Validator
	 */
	public function validate($entity, $entityName = null)
	{
		$entityName = $entityName ?: 'root';

		// Validate root type
		$this->validateType($entity, $this->schema, $entityName);

		return $this;
	}

	/**
	 * Check format restriction
	 *
	 * @param mixed $entity
	 * @param object $schema
	 * @param string $entityName
	 *
	 * @return Validator
	 */
	public function checkFormat($entity, $schema, $entityName)
	{
		if (!isset($schema->format)) {
			return $this;
		}

		$valid = true;
		switch ($schema->format) {
			case 'date-time':
				if (!preg_match('#^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$#', $entity)) {
					$valid = false;
				}
				break;
			case 'date':
				if (!preg_match('#^\d{4}-\d{2}-\d{2}$#', $entity)) {
					$valid = false;
				}
				break;
			case 'time':
				if (!preg_match('#^\d{2}:\d{2}:\d{2}$#', $entity)) {
					$valid = false;
				}
				break;
			case 'utc-millisec':
				if ($entity < 0) {
					$valid = false;
				}
				break;
			case 'color':
				if (!in_array($entity, array('maroon', 'red', 'orange',
					'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime',
					'teal', 'aqua', 'blue', 'navy', 'black', 'gray', 'silver', 'white'))) {
					if (!preg_match('#^\#[0-9A-F]{6}$#', $entity) && !preg_match('#^\#[0-9A-F]{3}$#', $entity)) {
						$valid = false;
					}
				}
				break;
			case 'style':
				if (!preg_match('#(\.*?)[ ]?:[ ]?(.*?)#', $entity)) {
					$valid = false;
				}
				break;
			case 'phone':
				if (!preg_match('#^[0-9\-+ \(\)]*$#', $entity)) {
					$valid = false;
				}
				break;
			case 'uri':
				if (!preg_match('#^[A-Za-z0-9:/;,\-_\?&\.%\+\|\#=]*$#', $entity)) {
					$valid = false;
				}
				break;
		}

		if (!$valid) {
			throw new ValidationException(sprintf('Value for [%s] must match format [%s]', $entityName, $schema->format));
		}

		return $this;
	}

	/**
	 * Validate object properties
	 *
	 * @param object $entity
	 * @param object $schema
	 * @param string $entityName
	 *
	 * @return Validator
	 */
	protected function validateProperties($entity, $schema, $entityName)
	{
		$properties = get_object_vars($entity);

		if (!isset($schema->properties)) {
			return $this;
			//throw new SchemaException(sprintf('No properties defined for [%s]', $entityName));
		}

		// Check defined properties
		foreach($schema->properties as $propertyName => $property) {
			if (array_key_exists($propertyName, $properties)) {
				// Check type
				$path = $entityName . '.' . $propertyName;
				$this->validateType($entity->{$propertyName}, $property, $path);
			} else {
				// Check required
				if (isset($property->required) && $property->required) {
					throw new ValidationException(sprintf('Missing required property [%s] for [%s]', $propertyName, $entityName));
				}
			}
		}

		// Check additional properties
		if (isset($schema->additionalProperties) && !$schema->additionalProperties) {
			$extra = array_diff(array_keys((array)$entity), array_keys((array)$schema->properties));
			if (count($extra)) {
				throw new ValidationException(sprintf('Additional properties [%s] not allowed for property [%s]', implode(',', $extra), $entityName));
			}
		}

		return $this;
	}

	/**
	 * Validate entity type
	 *
	 * @param mixed $entity
	 * @param object $schema
	 * @param string $entityName
	 *
	 * @return Validator
	 */
	protected function validateType($entity, $schema, $entityName)
	{
		if (isset($schema->type)) {
			$types = $schema->type;
		} else {
			$types = 'any';
			//throw new ValidationException(sprintf('No type given for [%s]', $entityName));
		}

		if (!is_array($types)) {
			$types = array($types);
		}

		$valid = false;

		foreach ($types as $type) {
			switch ($type) {
				case 'object':
					if (is_object($entity)) {
						$this->checkTypeObject($entity, $schema, $entityName);
						$valid = true;
					}
					break;
				case 'string':
					if (is_string($entity)) {
						$this->checkTypeString($entity, $schema, $entityName);
						$valid = true;
					}
					break;
				case 'array':
					if (is_array($entity)) {
						$this->checkTypeArray($entity, $schema, $entityName);
						$valid = true;
					}
					break;
				case 'integer':
					if (!is_string($entity) && is_int($entity)) {
						$this->checkTypeInteger($entity, $schema, $entityName);
						$valid = true;
					}
					break;
				case 'number':
					if (!is_string($entity) && is_numeric($entity)) {
						$this->checkTypeNumber($entity, $schema, $entityName);
						$valid = true;
					}
					break;
				case 'boolean':
					if (!is_string($entity) && is_bool($entity)) {
						$this->checkTypeBoolean($entity, $schema, $entityName);
						$valid = true;
					}
					break;
				case 'null':
					if (is_null($entity)) {
						$this->checkTypeNull($entity, $schema, $entityName);
						$valid = true;
					}
					break;
				case 'any':
					$this->checkTypeAny($entity, $schema, $entityName);
					$valid = true;
					break;
				default:
					// Do nothing
					$valid = true;
					break;
			}
		}

		if (!$valid) {
			throw new ValidationException(sprintf('Property [%s] must be one of the following types: [%s]', $entityName, implode(', ', $types)));
		}

		return $this;
	}


	/**
	 * Check object type
	 *
	 * @param mixed $entity
	 * @param object $schema
	 * @param string $entityName
	 *
	 * @return Validator
	 */
	protected function checkTypeObject($entity, $schema, $entityName)
	{
		$this->validateProperties($entity, $schema, $entityName);

		return $this;
	}

	/**
	 * Check number type
	 *
	 * @param mixed $entity
	 * @param object $schema
	 * @param string $entityName
	 *
	 * @return Validator
	 */
	protected function checkTypeNumber($entity, $schema, $entityName)
	{
		$this->checkMinimum($entity, $schema, $entityName);
		$this->checkMaximum($entity, $schema, $entityName);
		$this->checkExclusiveMinimum($entity, $schema, $entityName);
		$this->checkExclusiveMaximum($entity, $schema, $entityName);
		$this->checkFormat($entity, $schema, $entityName);
		$this->checkEnum($entity, $schema, $entityName);
		$this->checkDisallow($entity, $schema, $entityName);
		$this->checkDivisibleBy($entity, $schema, $entityName);

		return $this;
	}

	/**
	 * Check integer type
	 *
	 * @param mixed $entity
	 * @param object $schema
	 * @param string $entityName
	 *
	 * @return Validator
	 */
	protected function checkTypeInteger($entity, $schema, $entityName)
	{
		$this->checkMinimum($entity, $schema, $entityName);
		$this->checkMaximum($entity, $schema, $entityName);
		$this->checkExclusiveMinimum($entity, $schema, $entityName);
		$this->checkExclusiveMaximum($entity, $schema, $entityName);
		$this->checkFormat($entity, $schema, $entityName);
		$this->checkEnum($entity, $schema, $entityName);
		$this->checkDisallow($entity, $schema, $entityName);
		$this->checkDivisibleBy($entity, $schema, $entityName);

		return $this;
	}

	/**
	 * Check boolean type
	 *
	 * @param mixed $entity
	 * @param object $schema
	 * @param string $entityName
	 *
	 * @return Validator
	 */
	protected function checkTypeBoolean($entity, $schema, $entityName)
	{
		return $this;
	}

	/**
	 * Check string type
	 *
	 * @param mixed $entity
	 * @param object $schema
	 * @param string $entityName
	 *
	 * @return Validator
	 */
	protected function checkTypeString($entity, $schema, $entityName)
	{
		$this->checkPattern($entity, $schema, $entityName);
		$this->checkMinLength($entity, $schema, $entityName);
		$this->checkMaxLength($entity, $schema, $entityName);
		$this->checkFormat($entity, $schema, $entityName);
		$this->checkEnum($entity, $schema, $entityName);
		$this->checkDisallow($entity, $schema, $entityName);

		return $this;
	}

	/**
	 * Check array type
	 *
	 * @param mixed $entity
	 * @param object $schema
	 * @param string $entityName
	 *
	 * @return Validator
	 */
	protected function checkTypeArray($entity, $schema, $entityName)
	{
		$this->checkMinItems($entity, $schema, $entityName);
		$this->checkMaxItems($entity, $schema, $entityName);
		$this->checkUniqueItems($entity, $schema, $entityName);
		$this->checkEnum($entity, $schema, $entityName);
		$this->checkItems($entity, $schema, $entityName);
		$this->checkDisallow($entity, $schema, $entityName);

		return $this;
	}

	/**
	 * Check null type
	 *
	 * @param mixed $entity
	 * @param object $schema
	 * @param string $entityName
	 *
	 * @return Validator
	 */
	protected function checkTypeNull($entity, $schema, $entityName)
	{
		return $this;
	}

	/**
	 * Check any type
	 *
	 * @param mixed $entity
	 * @param object $schema
	 * @param string $entityName
	 *
	 * @return Validator
	 */
	protected function checkTypeAny($entity, $schema, $entityName)
	{
		$this->checkDisallow($entity, $schema, $entityName);

		return $this;
	}

	/**
	 * Check minimum value
	 *
	 * @param int|float $entity
	 * @param object $schema
	 * @param string $entityName
	 *
	 * @return Validator
	 */
	protected function checkMinimum($entity, $schema, $entityName)
	{
		if (isset($schema->minimum)) {
			if ($entity < $schema->minimum) {
				throw new ValidationException(sprintf('Invalid value for [%s], minimum is [%s]', $entityName, $schema->minimum));
			}
		}

		return $this;
	}

	/**
	 * Check maximum value
	 *
	 * @param int|float $entity
	 * @param object $schema
	 * @param string $entityName
	 *
	 * @return Validator
	 */
	protected function checkMaximum($entity, $schema, $entityName)
	{
		if (isset($schema->maximum)) {
			if ($entity > $schema->maximum) {
				throw new ValidationException(sprintf('Invalid value for [%s], maximum is [%s]', $entityName, $schema->maximum));
			}
		}

		return $this;
	}

	/**
	 * Check exlusive minimum requirement
	 *
	 * @param int|float $entity
	 * @param object $schema
	 * @param string $entityName
	 *
	 * @return Validator
	 */
	protected function checkExclusiveMinimum($entity, $schema, $entityName)
	{
		if (isset($schema->minimum) && isset($schema->exclusiveMinimum) && $schema->exclusiveMinimum) {
			if ($entity == $schema->minimum) {
				throw new ValidationException(sprintf('Invalid value for [%s], must be greater than [%s]', $entityName, $schema->minimum));
			}
		}

		return $this;
	}

	/**
	 * Check exclusive maximum requirement
	 *
	 * @param int|float $entity
	 * @param object $schema
	 * @param string $entityName
	 *
	 * @return Validator
	 */
	protected function checkExclusiveMaximum($entity, $schema, $entityName)
	{
		if (isset($schema->maximum) && isset($schema->exclusiveMaximum) && $schema->exclusiveMaximum) {
			if ($entity == $schema->maximum) {
				throw new ValidationException(sprintf('Invalid value for [%s], must be less than [%s]', $entityName, $schema->maximum));
			}
		}

		return $this;
	}

	/**
	 * Check value against regex pattern
	 *
	 * @param string $entity
	 * @param object $schema
	 * @param string $entityName
	 *
	 * @return Validator
	 */
	protected function checkPattern($entity, $schema, $entityName)
	{
		if (isset($schema->pattern) && $schema->pattern) {
			if (!preg_match($schema->pattern, $entity)) {
				throw new ValidationException(sprintf('String does not match pattern for [%s]', $entityName));
			}
		}

		return $this;
	}

	/**
	 * Check string minimum length
	 *
	 * @param string $entity
	 * @param object $schema
	 * @param string $entityName
	 *
	 * @return Validator
	 */
	protected function checkMinLength($entity, $schema, $entityName)
	{
		if (isset($schema->minLength) && $schema->minLength) {
			if (strlen($entity) < $schema->minLength) {
				throw new ValidationException(sprintf('String too short for [%s], minimum length is [%s]', $entityName, $schema->minLength));
			}
		}

		return $this;
	}

	/**
	 * Check string maximum length
	 *
	 * @param string $entity
	 * @param object $schema
	 * @param string $entityName
	 *
	 * @return Validator
	 */
	protected function checkMaxLength($entity, $schema, $entityName)
	{
		if (isset($schema->maxLength) && $schema->maxLength) {
			if (strlen($entity) > $schema->maxLength) {
				throw new ValidationException(sprintf('String too long for [%s], maximum length is [%s]', $entityName, $schema->maxLength));
			}
		}

		return $this;
	}

	/**
	 * Check array minimum items
	 *
	 * @param array $entity
	 * @param object $schema
	 * @param string $entityName
	 *
	 * @return Validator
	 */
	protected function checkMinItems($entity, $schema, $entityName)
	{
		if (isset($schema->minItems) && $schema->minItems) {
			if (count($entity) < $schema->minItems) {
				throw new ValidationException(sprintf('Not enough array items for [%s], minimum is [%s]', $entityName, $schema->minItems));
			}
		}

		return $this;
	}

	/**
	 * Check array maximum items
	 *
	 * @param array $entity
	 * @param object $schema
	 * @param string $entityName
	 *
	 * @return Validator
	 */
	protected function checkMaxItems($entity, $schema, $entityName)
	{
		if (isset($schema->maxItems) && $schema->maxItems) {
			if (count($entity) > $schema->maxItems) {
				throw new ValidationException(sprintf('Too many array items for [%s], maximum is [%s]', $entityName, $schema->maxItems));
			}
		}

		return $this;
	}

	/**
	 * Check array unique items
	 *
	 * @param array $entity
	 * @param object $schema
	 * @param string $entityName
	 *
	 * @return Validator
	 */
	protected function checkUniqueItems($entity, $schema, $entityName)
	{
		if (isset($schema->uniqueItems) && $schema->uniqueItems) {
			if (count(array_unique($entity)) != count($entity)) {
				throw new ValidationException(sprintf('All items in array [%s] must be unique', $entityName));
			}
		}

		return $this;
	}

	/**
	 * Check enum restriction
	 *
	 * @param array $entity
	 * @param object $schema
	 * @param string $entityName
	 *
	 * @return Validator
	 */
	protected function checkEnum($entity, $schema, $entityName)
	{
		$valid = true;
		if (isset($schema->enum) && $schema->enum) {
			if (!is_array($schema->enum)) {
				throw new SchemaException(sprintf('Enum property must be an array for [%s]', $entityName));
			}
			if (is_array($entity)) {
				foreach ($entity as $val) {
					if (!in_array($val, $schema->enum)) {
						$valid = false;
					}
				}
			} else {
				if (!in_array($entity, $schema->enum)) {
					$valid = false;
				}
			}
		}

		if (!$valid) {
			throw new ValidationException(sprintf('Invalid value(s) for [%s], allowable values are [%s]', $entityName, implode(',', $schema->enum)));
		}

		return $this;
	}

	/**
	 * Check items restriction
	 *
	 * @param array $entity
	 * @param object $schema
	 * @param string $entityName
	 *
	 * @return Validator
	 */
	protected function checkItems($entity, $schema, $entityName)
	{
		if (isset($schema->items) && $schema->items) {
			// Item restriction is an array of schemas
			if (is_array($schema->items)) {
				foreach($entity as $index => $node) {
					$nodeEntityName = $entityName . '[' . $index . ']';

					// Check if the item passes any of the item validations
					foreach($schema->items as $item) {
						$nodeValid = true;
						try {
							$this->validateType($node, $item, $nodeEntityName);
							// Pass
							break;
						} catch (ValidationException $e) {
							$nodeValid = false;
						}
					}

					// If item did not pass any item validations
					if (!$nodeValid) {
						$allowedTypes = array_map(function($item){
							return $item->type == 'object' ? 'object (schema)' : $item->type;
						}, $schema->items);
						throw new ValidationException(sprintf('Invalid value for [%s], must be one of the following types: [%s]',
							$nodeEntityName, implode(', ' , $allowedTypes)));
					}
				}
				// Item restriction is a single schema
			} else if (is_object($schema->items)) {
				foreach($entity as $index => $node) {
					$nodeEntityName = $entityName . '[' . $index . ']';
					$this->validateType($node, $schema->items, $nodeEntityName);
				}

			} else {
				throw new SchemaException(sprintf('Invalid items value for [%s]', $entityName));
			}
		}

		return $this;
	}

	/**
	 * Check disallowed entity type
	 *
	 * @param mixed $entity
	 * @param object $schema
	 * @param string $entityName
	 *
	 * @return Validator
	 */
	protected function checkDisallow($entity, $schema, $entityName)
	{
		if (isset($schema->disallow) && $schema->disallow) {
			$thisSchema = clone $schema;
			$thisSchema->type = $schema->disallow;
			unset($thisSchema->disallow);

			// We are expecting an exception - if one is not thrown,
			// then we have a matching disallowed type
			try {
				$valid = false;
				$this->validateType($entity, $thisSchema, $entityName);
			} catch (ValidationException $e) {
				$valid = true;
			}
			if (!$valid) {
				$disallowedTypes = array_map(function($item){
					return is_object($item) ? 'object (schema)' : $item;
				}, is_array($schema->disallow) ? $schema->disallow : array($schema->disallow));
				throw new ValidationException(sprintf('Invalid value for [%s], disallowed types are [%s]',
					$entityName, implode(', ', $disallowedTypes)));
			}
		}

		return $this;
	}

	/**
	 * Check divisibleby restriction
	 *
	 * @param int|float $entity
	 * @param object $schema
	 * @param string $entityName
	 *
	 * @return Validator
	 */
	protected function checkDivisibleBy($entity, $schema, $entityName)
	{
		if (isset($schema->divisibleBy) && $schema->divisibleBy) {
			if (!is_numeric($schema->divisibleBy)) {
				throw new SchemaException(sprintf('Invalid divisibleBy value for [%s], must be numeric', $entityName));
			}

			if ($entity % $schema->divisibleBy != 0) {
				throw new ValidationException(sprintf('Invalid value for [%s], must be divisible by [%d]', $entityName, $schema->divisibleBy));
			}
		}

		return $this;
	}
}
