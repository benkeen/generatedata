<!DOCTYPE html>
<html>
<head>
  <title>{$L.title}</title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="description" content="GenerateData.com: free, GNU-licensed, random custom data generator for testing software" />
  <meta name="keywords" content="Random Data, Test Data, Sample Data, data generator, generate data, Ben Keen, Benjamin Keen" />
  <link rel="stylesheet" type="text/css" href="css/styles.css">
  <link rel="stylesheet" type="text/css" href="css/smoothness/jquery-ui-1.8.1.custom.css" />
  {literal}<noscript><style type="text/css">.hideNoJS { display: none; }</style></noscript>{/literal}
</head>
<body class="install_page">
  <header>
    <nav>
      <a href="http://www.generatedata.com">{$L.website}</a> |
      <a href="http://www.generatedata.com/#donate">{$L.donate}</a> |
      <a href="http://forums.generatedata.com">{$L.forums}</a> <span class="hideNoJS">|</span>
      <span class="hideNoJS">{language_dropdown name_id="selectLanguage"}</span>
    </nav>
  </header>
  <nav id="tabs">
    <ul>
      <li id="tab1" class="selected">{$L.install}</li>
      <li id="tab2" class="hideNoJS">{$L.help}</li>
    </ul>
  </nav>
  <section>
    <div id="content" class="hideNoJS">
      <div id="loadingIcon"><img src="images/loading2.gif" width="16" height="16" /></div>
      <div id="tab1Content" class="tabContent">

        <h1>{$L.installation}</h1>

        <p>
          {$L.installation_intro}
        </p>

        <h2>1. Database Info</h2>

        <div class="fields install_form">
          <div>
            <label for="g_db_hostname">{$L.host_name}</label>
            <input type="text" id="g_db_hostname" value="localhost" />
          </div>
          <div>
            <label for="g_db_name">{$L.database_name}</label>
            <input type="text" id="g_db_name" value="" />
          </div>
          <div>
            <label for="g_db_username">{$L.mysql_username}</label>
            <input type="text" id="g_db_username" value="" />
          </div>
          <div>
            <label for="g_db_password">{$L.mysql_password}</label>
            <input type="text" id="g_db_password" value="" class="pwd_field" />
          </div>
          <div>
            <label>{$L.table_prefix}</label>
            <input type="text" id="g_table_prefix" value="{$g_table_prefix}" maxlength="10" />
          </div>
          <div>
            <label for="defaultLanguage">{$L.default_language}</label>
            {language_dropdown name_id="defaultLanguage" default="en"}
          </div>
        </div>

        <div class="clear vpad"></div>

        <h2>2. User Account</h2>

        <div class="fields install_form">
          <div>
            <label for="g_db_hostname">Username</label>
            <input type="text" id="" value="admin" />
          </div>
          <div>
            <label for="g_db_hostname">Password</label>
            <input type="text" id="" value="{$random_password}" class="pwd_field" />
          </div>
        </div>

        <div class="clear"></div>
        <button class="green_button" id="create_database">{$L.install}</button>

      </div>
      <div id="tab2Content" style="display:none">
        <h1>{$L.help}</h1>

        <p>
          {$L.help_intro}
        </p>

        <h2>{$L.help_prerequisites}</h2>

        <p>
          {$L.help_prereq_info}
        </p>

        <h2>{$L.what_each_field_means}</h2>

        <div class="fields">
          <div>
            <label>{$L.host_name}</label>
            <div>{$L.host_name_desc}</div>
          </div>
          <div>
            <label>{$L.database_name}</label>
            <div>{$L.database_name_desc}</div>
          </div>
          <div>
            <label for="g_db_username">{$L.mysql_username}</label>
            <div>{$L.mysql_username_desc}</div>
          </div>
          <div>
            <label for="g_db_username">{$L.mysql_password}</label>
            <div>{$L.mysql_password_desc}</div>
          </div>
          <div>
            <label>{$L.table_prefix}</label>
            <div>{$L.mysql_table_prefix_desc}</div>
          </div>
          <div>
            <label>{$L.default_language}</label>
            <div>{$L.default_lang_desc}</div>
          </div>
        </div>

        <h2>{$L.still_stuck}</h2>

        <p>
          {$L.still_stuck_info}
        </p>
      </div>
    </div>

    <noscript>
      <h1>{$L.no_js}</h1>
      {$L.no_js_blurb}
      <form action="{$same_page}">
        <button class="green_button" id="create_database">{$L.refresh_page}</button>
      </form>
    </noscript>

  </section>

  <footer>
    {$L.version} {$g_version} - <a href="https://github.com/benkeen/generatedata" target="_blank">github</a>
  </footer>

  <script src="scripts/jquery-1.7.2.min.js"></script>
  <script src="scripts/jquery-ui-1.8.1.custom.min.js"></script>
  <script src="scripts/jquery.json-2.2.min.js"></script>
  <script src="scripts/lang.php"></script>
  <script src="scripts/general.js"></script>
  <script src="scripts/install.js"></script>
</body>
</html>