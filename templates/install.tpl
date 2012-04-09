<!DOCTYPE html>
<html>
<head>
  <title>{$LANG.title}</title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="description" content="GenerateData.com: free, GNU-licensed, random custom data generator for testing software" />
  <meta name="keywords" content="Random Data, Test Data, Sample Data, data generator, generate data, Ben Keen, Benjamin Keen" />
  <link rel="stylesheet" type="text/css" href="css/styles.css">
  <link rel="stylesheet" type="text/css" href="css/smoothness/jquery-ui-1.8.1.custom.css" />
  <noscript><style type="text/css">#content { display: none; }</style></noscript>
</head>
<body>
  <header>
    <nav>
      <a href="http://www.generatedata.com">{$LANG.website}</a> |
      <a href="http://www.generatedata.com/#donate">{$LANG.donate}</a> |
      <a href="http://www.generatedata.com/forums/">{$LANG.forums}</a> |
      {language_dropdown}
    </nav>
  </header>
  <nav id="tabs">
    <ul>
      <li id="tab1" class="selected">{$LANG.install}</li>
      <li id="tab2">{$LANG.help}</li>
    </ul>
  </nav>
  <section>
    <div id="content">
      <!--  TODO! -->
      <div id="loadingIcon"><img src="images/loading2.gif" width="16" height="16" /></div>
      <div id="tab1Content" class="tabContent">

        <h1>Installation</h1>

        <p>
          Alrighty, let's get this sucker installed. Please supply your database information below to create your database
          and install the script. If you're confused about any of this, visit the Help tab for a little more info.
        </p>

        <table>
        <tr>
          <td width="160">Host Name</td>
          <td><input type="text" name="g_db_hostname" value="localhost" /></td>
        </tr>
        <tr>
          <td>Database Name</td>
          <td><input type="text" name="g_db_name" value="" /></td>
        </tr>
        <tr>
          <td>MySQL Username</td>
          <td><input type="text" name="g_db_username" value="" /></td>
        </tr>
        <tr>
          <td>MySQL Password</td>
          <td><input type="text" name="g_db_password" value="" /></td>
        </tr>
        <tr>
          <td>Table Prefix</td>
          <td>
            <input type="text" name="g_db_prefix" value="" size="4" />
          </td>
        </tr>
        </table>

        <div>
          <input type="button" id="create_database" value="Create Database" />
        </div>
      </div>
    </div>

    <!-- TODO -->
    <noscript>
      <div class="no_js">
        <h1><?php echo $LANG["no_js"]?></h1>
        <?php echo $LANG["no_js_blurb"]?>
      </div>
    </noscript>

  </section>

  <footer>Version <?php echo $g_version?></footer>

  <script src="scripts/jquery-1.4.2.min.js"></script>
  <script src="scripts/jquery-ui-1.8.1.custom.min.js"></script>
  <script src="scripts/jquery.json-2.2.min.js"></script>
  <script src="scripts/lang.php"></script>
  <script src="scripts/general.js"></script>
  <script src="scripts/generator.js"></script>
</body>
</html>