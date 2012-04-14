<?php


/**
 * Used in the main generator page to display a list of country-specific data. This is used
 * for the Country, State/Province, Postal Code - and potentially other Data Types.
 */
function smarty_function_country_list()
{

/*
  echo <div class="col">
              <?php
              $num_per_col = 3;
              $countries   = gd_get_configurable_countries();
              $row   = 0;
              $slugs = array();
              foreach ($countries as $country_info)
              {
                $country          = $country_info["country"];
                $slug             = $country_info["country_slug"];
                $country_lang_key = $country_info["country_lang_key"];
                $slugs[] = "\"$slug\"";

                if ($row > 0 && ($row % $num_per_col == 0))
                  echo "</div><div class=\"col\">";

                $checked = ($slug == "canada" || $slug == "us") ? "checked" : "";
                $country_in_curr_lang = $L[$country_lang_key];

                echo <<<EOF
                  <div>
                    <input type="checkbox" name="countryChoice[]" value="$slug" id="$slug" $checked />
                    <label for="$slug">$country_in_curr_lang</label>
                  </div>
EOF;
                $row++;
              }
              ?>
              </div>
              <script>gd.allCountries = [<?php echo join(",", $slugs)?>];</script>
	*/
}