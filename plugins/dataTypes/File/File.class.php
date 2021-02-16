<?php

/**
 * @package DataTypes
 */
class DataType_File extends DataTypePlugin
{
	const MAX_FILE_LENGTH = 254;

	protected $dataTypeName = 'File';

	protected $dataTypeFieldGroup = 'human_data';

	protected $dataTypeFieldGroupOrder = 31;

	public function generate($generator, $generationContextData) {
		$options = $generationContextData['generationOptions'];
		$path = $options['path'] ? rtrim($options['path'], '\/') . DIRECTORY_SEPARATOR : '';
		$extension = '.' . $options['extensions'][array_rand($options['extensions'])];
		if (self::MAX_FILE_LENGTH < (strlen($path) + strlen($extension) + $options['lengthMax'])) {
			$options['lengthMax'] = self::MAX_FILE_LENGTH;
		}
		$basename = '';
		$length = mt_rand($options['lengthMin'], $options['lengthMax']);
		while ($length > 0) {
			$basename .= mt_rand(0, 1) === 1 ? 'x' : 'l';
			$length--;
		}
	    return array(
		    'display' => $path . Utils::generateRandomAlphanumericStr($basename) . $extension,
	    );
	}

	public function getDataTypeMetadata() {
		return array(
			'SQLField' => 'varchar(255) default NULL',
			'SQLField_Oracle' => 'varchar2(255) default NULL',
			'SQLField_MSSQL' => 'VARCHAR(255) NULL',
		);
	}

	public function getRowGenerationOptionsUI($generator, $postdata, $column, $numCols) {
		if (
			empty($postdata['dtExtensions_' . $column])
			|| empty($postdata['dtLengthMin_' . $column])
			|| $postdata['dtLengthMin_' . $column] < 2
			|| empty($postdata['dtLengthMax_' . $column])
			|| $postdata['dtLengthMax_' . $column] > self::MAX_FILE_LENGTH
		) {
			return false;
		}
		$extensions = array_filter(array_map('trim', explode(',', $postdata['dtExtensions_' . $column])));
		if (empty($extensions)) {
			return false;
		}
		return array(
			'path' => trim($postdata['dtPath_' . $column]),
			'extensions' => $extensions,
			'lengthMin' => (int) $postdata['dtLengthMin_' . $column],
			'lengthMax' => (int) $postdata['dtLengthMax_' . $column],
		);
	}

	public function getRowGenerationOptionsAPI($generator, $json, $numCols) {
		return array(
			'path' => $json->settings->path,
			'extensions' => implode(',', (array)$json->settings->extensions),
			'lengthMin' => $json->settings->lengthMin,
			'lengthMax' => $json->settings->lengthMax,
		);
	}

	public function getOptionsColumnHTML() {
		ob_start();
		require(__DIR__ . DIRECTORY_SEPARATOR . 'view.php');
		return (string)ob_get_clean();
	}

	public function getHelpHTML() {
		return $this->L['help'];
	}
}
