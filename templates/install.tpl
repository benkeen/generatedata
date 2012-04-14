<!DOCTYPE html>
<html>
<head>
  <title>{$L.title}</title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="description" content="GenerateData.com: free, GNU-licensed, random custom data generator for testing software" />
  <meta name="keywords" content="Random Data, Test Data, Sample Data, data generator, generate data, Ben Keen, Benjamin Keen" />
  <link rel="stylesheet" type="text/css" href="css/styles.css">
  <link rel="stylesheet" type="text/css" href="css/smoothness/jquery-ui-1.8.1.custom.css" />
  {literal}<noscript><style type="text/css">#content { display: none; }</style></noscript>{/literal}
</head>
<body class="install_page">
  <header>
    <nav>
	    <a href="http://www.generatedata.com">{$L.website}</a> |
	    <a href="http://www.generatedata.com/#donate">{$L.donate}</a> |
	    <a href="http://www.generatedata.com/forums/">{$L.forums}</a> |
      {language_dropdown}
    </nav>
  </header>
  <nav id="tabs">
    <ul>
      <li id="tab1" class="selected">{$L.install}</li>
      <li id="tab2">{$L.help}</li>
    </ul>
  </nav>
  <section>
    <div id="content">
      <div id="loadingIcon"><img src="images/loading2.gif" width="16" height="16" /></div>
      <div id="tab1Content" class="tabContent">

        <h1>{$L.installation}</h1>

        <p>
          Alrighty, let's get this sucker installed. Enter your database information to create your database tables. If you're
          unsure about any of this, click on the Help tab for a little more info.
        </p>

        <div class="fields">
          <div class="row">
            <label for="g_db_hostname">{$L.host_name}</label>
            <input type="text" id="g_db_hostname" value="localhost" />
          </div>
          <div class="row">
            <label for="g_db_name">{$L.database_name}</label>
            <input type="text" id="g_db_name" value="" />
          </div>
          <div class="row">
            <label for="g_db_username">{$L.mysql_username}</label>
            <input type="text" id="g_db_username" value="" />
          </div>
          <div class="row">
            <label for="g_db_username">{$L.mysql_password}</label>
            <input type="text" id="g_db_password" value="" />
          </div>
          <div class="row">
            <label>{$L.table_prefix}</label>
            <input type="text" name="g_table_prefix" value="{$g_table_prefix}" />
          </div>
        </div>

        <div class="clear"></div>

        <button class="green_button" id="create_database">Create Database</button>

      </div>
      <div id="tab2Content" style="display:none">
        <h1>{$L.help}</h1>

        <p>
          The Data Generator uses a MySQL database to store various information that it needs: things
          like settings, user accounts and raw data like people's names, country and city names. The installation
          step creates the.
        </p>

        <h2>Pre-requisites</h2>

        <p>
          Just like with virtually every other web script out there, this installation script requires you to have already
          created a database. If you're not sure how to do that, you'll need to either contact your hosting provider, or
          (if you're installing this script locally), do some .
        </p>

        <h2>What each field means</h2>

        <br />
      </div>
    </div>

    <!-- TODO -->
    <noscript>
      <div class="no_js">
        <h1><?php echo $L["no_js"]?></h1>
        <?php echo $L["no_js_blurb"]?>
      </div>
    </noscript>

  </section>

  <footer>
    Version {$g_version}
  </footer>

  <script src="scripts/jquery-1.4.2.min.js"></script>
  <script src="scripts/jquery-ui-1.8.1.custom.min.js"></script>
  <script src="scripts/jquery.json-2.2.min.js"></script>
  <script src="scripts/lang.php"></script>
  <script src="scripts/general.js"></script>
  <script src="scripts/generator.js"></script>
</body>
</html>