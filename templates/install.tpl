<!DOCTYPE html>
<html>
<head>
  <title>{$L.title}</title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="description" content="GenerateData.com: free, GNU-licensed, random custom data generator for testing software" />
  <meta name="keywords" content="Random Data, Test Data, Sample Data, data generator, generate data, Ben Keen, Benjamin Keen" />
  <link rel="stylesheet" type="text/css" href="css/styles.css">
  <link rel="stylesheet" type="text/css" href="css/smoothness/jquery-ui-1.8.19.custom.css" />
  {literal}<noscript><style type="text/css">.hideNoJS { display: none; }</style></noscript>{/literal}
</head>
<body class="installPage">
  <header>
    <nav>
      <a href="http://www.generatedata.com">{$L.website}</a> |
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
      <div id="loadingIcon"></div>
      <div id="tab1Content" class="tabContent">

        <h1>{$L.installation}</h1>
        <p>
          {$L.installation_intro}
        </p>

	    	<div id="installError">
	    	  <div class="icon"></div>
  				<h3>Uh-oh.</h3>
	  			<span class="response"></span>
	      </div>

        <h2>1. {$L.database_info}</h2>
        <form>
	        <div class="fields installForm">
	          <div class="field">
	            <label for="dbHostname">{$L.host_name}</label>
	            <input type="text" id="dbHostname" value="localhost" />
	          </div>
	          <div class="error" id="dbHostname_error"></div>
	          <div class="field">
	            <label for="dbName">{$L.database_name}</label>
	            <input type="text" id="dbName" value="" />
	          </div>
	          <div class="error" id="dbName_error"></div>
	          <div class="field">
	            <label for="dbUsername">{$L.mysql_username}</label>
	            <input type="text" id="dbUsername" value="" />
	          </div>
	          <div class="error" id="dbUsername_error"></div>
	          <div class="field">
	            <label for="dbPassword">{$L.mysql_password}</label>
	            <input type="text" id="dbPassword" value="" class="pwdField" />
	          </div>
	          <div class="error" id="dbPassword_error"></div>
	          <div class="field">
	            <label for="tablePrefix">{$L.table_prefix}</label>
	            <input type="text" id="tablePrefix" value="{$g_table_prefix}" maxlength="10" />
	          </div>
	          <div class="error" id="tablePrefix_error"></div>
	          <div class="field">
	            <label for="defaultLanguage">{$L.default_language}</label>
	            {language_dropdown name_id="defaultLanguage" default="en"}
	          </div>
	          <div class="error" id="defaultLanguage_error"></div>
	        </div>

	        <div class="clear vpad"></div>

	        <h2>2. {$L.user_accounts}</h2>
	        <div class="fields installForm">
	          <div class="field">
	            <label>{$L.employ_user_accounts}</label>
	            <div class="radioGroup">
	              <input type="radio" name="employUserAccounts" id="eua1" value="yes" />
	                <label for="eua1">{$L.yes}</label>
	              <input type="radio" name="employUserAccounts" id="eua2" value="no" checked="checked" />
	                <label for="eua2">{$L.no}</label>
	            </div>
	          </div>
	          <div class="field emailRow disabledRow">
	            <label for="email">{$L.email}</label>
	            <input type="text" id="email" value="" disabled="disabled" />
	          </div>
	          <div class="error" id="email_error"></div>
	          <div class="field passwordRow disabledRow">
	            <label for="password">{$L.password}</label>
	            <input type="text" id="password" value="{$random_password}" class="pwdField" disabled="disabled" />
	          </div>
	          <div class="error" id="password_error"></div>
	        </div>

	        <div class="clear"></div>
	        <button class="greenButton">{$L.install}</button>
        </form>
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
        <div class="doc">
          <div>
            <label>{$L.host_name}</label>
            <div>{$L.host_name_desc}</div>
          </div>
          <div>
            <label>{$L.database_name}</label>
            <div>{$L.database_name_desc}</div>
          </div>
          <div>
            <label>{$L.mysql_username}</label>
            <div>{$L.mysql_username_desc}</div>
          </div>
          <div>
            <label>{$L.mysql_password}</label>
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
          <div>
            <label>{$L.employ_user_accounts}</label>
            <div>{$L.employ_user_accounts_desc}</div>
          </div>
          <div>
            <label>{$L.email}</label>
            <div>{$L.email_desc}</div>
          </div>
          <div>
            <label>{$L.password}</label>
            <div>{$L.password_desc}</div>
          </div>
        </div>

        <div class="clear"></div>

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
        <button class="greenButton" id="create_database">{$L.refresh_page}</button>
      </form>
    </noscript>
  </section>

  <footer>
    {$L.version} {$g_version} - <a href="https://github.com/benkeen/generatedata" target="_blank">github</a>
  </footer>

  <script src="scripts/jquery-1.7.2.min.js"></script>
  <script src="scripts/jquery-ui-1.8.19.custom.min.js"></script>
  <script src="scripts/jquery.json-2.2.min.js"></script>
  <script src="scripts/lang.php"></script>
  <script src="scripts/general.js"></script>
  <script src="scripts/install.js"></script>
</body>
</html>