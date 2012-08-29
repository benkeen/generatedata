<?php

/**
 * This is used on the generate page to output raw markup into the page for use by the generator.
 *
 *
 * @param array $params
 * @param object $smarty
 */
function smarty_function_data_type_resources($params, &$smarty) {

	$resources = DataTypePluginHelper::getDataTypeResources();
	exit;

/*
						while (list($group_name, $curr_data_types) = each($data_types))
						{
							foreach ($curr_data_types as $data_type_info)
							{
								$dt_ns = $data_type_info["data_folder_name"];

								// examples HTML
								if (!empty($data_type_info["data_type_example_html"]))
									echo "<div id=\"dt_example_$dt_ns\">{$data_type_info["data_type_example_html"]}</div>";

								// options HTML
								if (!empty($data_type_info["data_type_options_html"]))
									echo "<div id=\"dt_options_$dt_ns\">{$data_type_info["data_type_options_html"]}</div>";

								// help popup
								if (!empty($data_type_info["help_html_content"]))
								{
									echo "<div id=\"dt_help_$dt_ns\">{$data_type_info["help_html_content"]}</div>";

									// settings for the help popup
									echo <<<EOF
										<script>
										Generator.dataTypes["$dt_ns"] = {
											width: {$data_type_info["help_popup_width"]}
										}
										</script>
EOF;
								}
							}
						}
*/

}
