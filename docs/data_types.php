<html>
<head></head>
<body>

<h1>Creating New Data Types</h1>

<ul>
  <li><a href="#overview">Overview</a></li>
  <li><a href="#anatomy">Anatomy of a Data Type</a>
    <ul>
      <li><a href="#ui_php">ui.php</a></li>
      <li><a href="#include_php">include.php</a></li>
      <li><a href="#generate_php">generate.php</a></li>
    </ul>
  </li>
  <li><a href="#actions">Actions</a>
    <ul>
      <li><a href="#validation">Validation of user input</a></li>
      <li><a href="#saving_data_type">Saving the data type</a></li>
      <li><a href="#loading_data_type">Loading the data type</a></li>
    </ul>
  </li>
  <li><a href="#dependencies">Dependencies</a></li>
  <li>Database / raw data</li>
  <li><a href="i18n">Internationalization / language support</a></li>
</ul>

<hr size="1" />

<a name="overview"></a>
<h2>Overview</h2>

<p>
  This document explains how to add your own data types so you can generate pretty much whatever you want.
</p>
<p>
  The Data Generator was designed to be entirely <i>modular</i> in terms of the data it is generating. All the
  default data types (names, phone number, email addresses etc.) are now actually distinct modules, separate from the
  core script. This adds a level of flexibility that the previous version lacked.
</p>
<p>
  When creating your new data type, you can add anything you need - from client-side validation to
  custom dynamic JS/DOM manipulation, to the actual data generated, whether it has any dependencies on the
  other fields in the submission and whether is should show something different, depending on the export type. There's a
  great deal of flexibility provided, so hopefully you won't run into any brick walls.
</p>
<p>
  If you feel that your data type could be of use to other people, send it our way! We'd love to take a look at it,
  and maybe even include it in the core script for others to download.
</p>
<p>
  Let's start with looking at the actual files and folders that make up a data type.
</p>


<a name="anatomy"></a>
<h2>Anatomy of a Data Type</h2>

<p>
  All data types are found in the /data_types folder, each with its own unique subfolder name. The folder name acts
  as its namespace for both the language file key prefixes, PHP function and javascript function namespaces. We'll cover
  that in more detail in the sections below. We strongly recommend you look at the files in an existing data type to
  get a sense of what's in each file. We'll discuss each file below, but it can often be more helpful to just go straight
  to the source and use this document as a reference for clearing up the less obvious details.
</p>
<p>
  Inside the data type's folder, there are three files that have special significance to the script:
</p>

<ul>
  <li><b>ui.php</b> (required)</li>
  <li><b>include.php</b> (optional)</li>
  <li><b>generate.php</b> (required)</li>
</ul>

<p>
  These files MUST have those names in order to be recognized by the core script. You may add any additional files and
  folders if you wish.
</p>

<a name="ui_php"></a>
<h3>ui.php</h3>

<p>
  The ui.php file contains the information needed for the user interface. If you try selecting different data types in
  the generator, you'll notice that different content appears for the Examples, Options and
</p>

<h4>General variables</h4>

<ul>
  <li>$data_folder_name - the name of the data type folder</li>
  <li>$data_type_field_group_index - the option group in which this field will appear. If you look in the existing interface,
    you'll notice that for each row, the data type column dropdown values are grouped. Those group names are defined
    in /library.php. You need to pick one of those values in the $g_field_groups variable and assign it to this variable.</li>
  <li>$data_type_field_group_order - this determines the order in that group in which you want your data type to appear.</li>
</ul>

<h4>Examples column</h4>

<p>
  The examples column is used in the UI to the give the user suggestions on how to use your data type. For example,
  if you look at the Names data type you'll see a dropdown of name examples. When you select one (e.g. "Alex J. Smith"),
  the value in the Options column becomes "Name Initial. Surname". This column provides the user with a simple way to learn
  about your data type and how it works.
</p>

<p>
  Back in the ui.php file, to provide your data type with an example, you need to define the <b>$data_type_example_html</b>
  variable (a string). When the user selects your data type, the core script will automatically insert the contents of that
  variable into the appropriate location in the page. If it's not defined, the default string "No examples defined." will be
  inserted instead.
</p>

<p>
  Here's an example from the Alpha-numeric data type:
</p>

<blockquote><pre>$data_type_example_html =<<<EOF
  <select name="dt_\$ROW\$" id="dt_\$ROW\$" onchange="$('#option_\$ROW\$').val(this.value)">
    <option value="">{$LANG["please_select"]}</option>
    <option value="LxL xLx">V6M 4C1 {$LANG["AlphaNumeric_example_CanPostalCode"]}</option>
    <option value="xxxxx">90210 {$LANG["AlphaNumeric_example_USZipCode"]}</option>
    <option value="LLLxxLLLxLL">eZg29gdF5K1 {$DT["AlphaNumeric_example_Password"]}</option>
  </select>
EOF;
</pre></blockquote>

<p>
  First, note that there are numerous <b>\$ROW\$</b> strings littered throughout the code (the dollar signs are escaped since the variable
  is having the value applied via heredoc syntax. $ROW$ is a special placeholder that will be replaced with the row number in
  the interface when the core script inserts it into the page. This provides a handy way to uniquely locate the relevant HTML
  elements.
</p>

<p>
  Secondly, note that the onchange handler uses a $ function. The generator includes jQuery (1.4.2 at the time of writing)
  which you can use in your own client-side code. Also notice that the onchange handler references an element with the id
  "option_$ROW$" (where $ROW$ would have been converted to n integer value by the time it's inserted into the page). Every
  row in the generator provides a unique ID to the various columns: <b>example_N</b>, <b>option_N</b>, <b>help_N</b>. You
  can use those values to target your content. In this example, the alpha-numeric data type automatically inserts the
  selected value in the example dropdown into the options field.
</p>

<h4>Options column</h4>

<p>
  The options column is where you should place any configurable values for your data type. Depending on what you
  are trying to generate, this may be empty. As with the previous examples column, you can define the markup to appear
  in the options column by storing HTML within a variable - this time called <b>$data_type_options_html</b>. You can
  store whatever HTML you want in that field, but if you want information to be passed to the server, make sure the
  input fields have unique name attributes (i.e. include "$ROW$" in the name string, as illustrated in the previous
  section). You can then pull out the POST values to figure out what configuration settings the user has selected - thus
  catering the generated data to their individual request.
</p>

<h4>Help column</h4>

<p>
  As with the previous two columns, the help column is also optional. Some basic data types like email, street address and
  city are self-explanatory, so no help text is needed. However, if your data type does need a little explanation, just
  define a <b>$help_html_content</b> variable containing whatever help text you want. The core script will then automatically
  display a "help" icon and open that information in a popup when the user clicks it.
</p>


<a name="include_php"></a>
<h3>include.php</h3>

<p>
  The second file in a data type is the optional include.php file. This file is included as-is into the main generator
  page in a hidden element. It provides you with a convenient way to insert javascript or raw HTML content into the page for use
  by your data type.
</p>

<p>
  This file can be used to add validation to your data type (to ensure the user filled it in properly when the user
  clicks "generate"). But also, if you want people to be able to save and load your data type settings
  (and you should!) you'll need to include a couple of specially named javascript functions for that purpose. Each of these
  three cases is discussed below in the <a href="#actions">Actions</a> section.
</p>

<a name="generate_php"></a>
<h3>generate.php</h3>

<p>
  The third and final data type file contains certain pre-defined functions that are called to actually process
  and generate the random data for your data type. The idea is actually quite simple: this file contains a few functions
  and variables with specific names. The core script then accesses that information and calls those functions for those
  row(s) that the user selected as your data type. Your code then generates the random data and the core script inserts
  the data into the right spot in the XML, CSV, Excel, HTML or SQL.
</p>

<h4>Namespace</h4>

<p>
  As with the javascript, the PHP functions and variables in this file MUST be namespaced to be recognized. We use the term
  "namespace" rather loosely - it's just a prefix to the PHP functions, variables and javascript object that contains your
  client-side code. The namespace (prefix) is the same as your folder name. It is case sensitive. For the next few sections
  we're going to assume your data type has a folder name of <b>MyGreatDataType</b>.
</p>

<h4>Variables</h4>

<p>
  The following variable is required. For the moment, just leave it to 1. See the <a href="#dependencies">Dependencies</a>
  section below for more information on what this variable does and how it can help your scripts.
</p>

<blockquote><pre>$MyGreatDataType_process_order = 1;</pre></blockquote>

<p>
  It's not as complicated as it sounds, honest.
</p>

<h4>Functions</h4>

<p>
  The generate.php should contain the following functions:
</p>

<ul>
  <li>[FOLDER NAME]_get_template_options</li>
  <li>[FOLDER NAME]_generate_item</li>
  <li>[FOLDER NAME]_get_export_type_info</li>
</ul>

<p>
  (where [FOLDER NAME] is the name of your folder).
</p>


<a name="actions"></a>
<h2>Actions</h2>

<p>
  So far so good. Now let's leave the server-side code along and spend some time in the client. Certain key
  user actions: submitting the generator form, loading and saving - are all handled 100% with javascript.
  Note: we didn't bother adding server-side validation because the generator is fundamentally a client-side
  script. With JS disabled, nothing would work, so we can assume the user hasn't disabled it. All three
  of these actions are defined in the include.php file.
</p>

<p>
  For this section, we're going to use the include.php file for the Names data type as an example. Here's the
  full contents of the file, comments and all.
</p>

<blockquote><pre><script>
var Names_ns = {

  /**
   * Called when the user submits the form to generate some data. If the selected data set contains
   * one or more rows of this data type, this function is called with the list of row numbers. Note that
   * the row numbers passed are the original row numbers of the rows on creation. It's possible that the
   * user has re-sorted or deleted some rows. So to get the visible row number for a row, called
   * gd._getVisibleRowOrderByRowNum(row).
   */
  validate: function(rows)
  {
    var visibleProblemRows = [];
    var problemFields      = [];
    for (var i=0; i<rows.length; i++)
    {
      if ($("#option_" + rows[i]).val() == "")
      {
        var visibleRowNum = gd._getVisibleRowOrderByRowNum(rows[i]);
        visibleProblemRows.push(visibleRowNum);
        problemFields.push($("#option_" + rows[i]));
      }
    }

    if (visibleProblemRows.length)
      gd.errors.push({ els: problemFields, error: L.Names_incomplete_fields + " <b>" + visibleProblemRows.join(", ") + "</b>"});
  },

  /**
   * Called when a form is loaded that contains this data type. This is passed the row number and
   * the custom data type data to populate the fields. loadRow functions all must return an array
   * with two indexes - both functions:
   *  [0] code to execute (generally inserting data into fields)
   *  [1] a boolean test to determine WHEN to execute the code.
   */
  loadRow: function(rowNum, data)
  {
    return [
      function() {
        $("#dt_" + rowNum).val(data.example);
        $("#option_" + rowNum).val(data.option);
      },
      function() { return $("#option_" + rowNum).length > 0; }
    ];
  },

  /**
   * Called when the user saves a form. This function is passed the row number of the row to
   * save. It should return a well-formatted JSON object (of whatever structure is relevant.
   */
  saveRow: function(rowNum)
  {
    return {
      "example":  $("#dt_" + rowNum).val(),
      "option":   $("#option_" + rowNum).val()
    };
  }
}
</script></pre></blockquote>

<a name="validation"></a>
<h3>Validation of user input</h3>

<p>
  If you choose to add validation, you need to add a validate function to your ui.php file. As shown in the
  example above, the object namespace for your data type (here: Names_ns) need to contain a <b>validate</b>
  property function. That function is passed an array containing the row numbers of all rows that have
  selected your data type. If the dataset that the user has constructed doesn't contain your data type,
  this function won't be called.
</p>

<p class="notify">
  <b>Important</b>: the row numbers that are passed to your validation function are not necessarily the row
  numbers that you see in the UI. Here's why. When a row is created, a whole bunch of row numbers
  are embedded into the markup in things like IDs and name attributes. This lets the javascript uniquely locate
  fields and lets the server-side code access the settings when it comes time to generate the random data.
  If you need to use the visual row number, call the gd._getVisibleRowOrderByRowNum() function on the row
  number, as with the example above.
</p>

<p>
  The function
</p>


<a name="saving_data_type"></a>
<h3>Saving the data type</h3>



<a name="loading_data_type"></a>
<h3>Loading the data type</h3>


<a name="dependencies"></a>
<h2>Dependencies</h2>

<p>
  What if you want to generate some data that is dependent on another field in the result set? No problem! A number of
  existing data types do exactly this. For example, if a person has selected both Country and State/Province/County fields,
  the latter will limit the generated states/provinces/counties to whatever country was in the country field. If there
  IS no mapping for the country, the data type just randomly picks one - it's all it can do!
</p>

<p>
  As another example, the Composite data field lets you reference any other field in the generated data so you can manipulate
  it in whatever way you see fit. For example, you can use that field to do math on other fields, or do string concatenation
  of other string-like fields.
</p>

<p>
  All of this is possible via the <b>process order</b> variable in your generate.php file:
</p>

<blockquote><pre>$NAMESPACE_process_order = 1;</pre></blockquote>

<p>
  This is how this works. When it comes time to generating the actual data, for each and every row, the generator loops through
  the data types that are in the submission (selected by the user in the UI). Now, for each row, the order in which the generator
  calls the individual data type's generate function depends on this variable. And, every time the generator function is called,
  <i>it's passed the return values for all data types up to that point</i>.
</p>

<p>
  The upshot of all this is that you can use this mechanism to add dependencies between data types. If you have
  a data type that relies on one of the existing ones, just give it a higher process order. Tada!
</p>

</body>
</html>