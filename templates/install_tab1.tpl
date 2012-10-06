	<h1>{$L.installation}</h1>

	<nav id="gdInstallNav">
		<ol>
			<li id="nav1" class="{if $currentPage == 1}selected{else}complete{/if}">Check Database Info</li>
			<li id="nav2" class="{if $currentPage == 2}selected{elseif $currentPage > 2}complete{/if}">Create Settings File</li>
			<li id="nav3" class="{if $currentPage == 3}selected{elseif $currentPage > 3}complete{/if}">{$L.user_accounts}</li>
			<li id="nav4" class="{if $currentPage == 4}selected{elseif $currentPage > 4}complete{/if}">Plugins</li>
			<li id="nav5" class="{if $currentPage == 5}selected{/if}">Complete!</li>
		</ol>
	</nav>

	<div class="gdInstallSection{if $currentPage != 1} hidden{/if}" id="page1">

		<div class="gdInstallTabMessage">
			<div class="gdIcon"></div>
			<h3>Uh-oh.</h3>
			<div class="gdResponse"></div>
		</div>

		<p>
			{$L.installation_intro}
		</p>
		<form>
			<div class="gdFields">
				<div class="gdField">
					<label for="dbHostname">{$L.host_name}</label>
					<input type="text" id="dbHostname" value="localhost" />
				</div>
				<div class="gdError" id="dbHostname_error"></div>
				<div class="gdField">
					<label for="dbName">{$L.database_name}</label>
					<input type="text" id="dbName" value="" />
				</div>
				<div class="gdError" id="dbName_error"></div>
				<div class="gdField">
					<label for="dbUsername">{$L.mysql_username}</label>
					<input type="text" id="dbUsername" value="" />
				</div>
				<div class="gdError" id="dbUsername_error"></div>
				<div class="gdField">
					<label for="dbPassword">{$L.mysql_password}</label>
					<input type="text" id="dbPassword" value="" class="pwdField" size="12" />
				</div>
				<div class="gdError" id="dbPassword_error"></div>
				<div class="gdField">
					<label for="dbTablePrefix">{$L.table_prefix}</label>
					<input type="text" id="dbTablePrefix" value="{$tablePrefix}" maxlength="10" />
				</div>
				<div class="gdError" id="tablePrefix_error"></div>
				<div class="gdField">
					<label for="defaultLanguage">{$L.default_language}</label>
					{language_dropdown name_id="defaultLanguage" default="en"}
				</div>
				<div class="gdError" id="defaultLanguage_error"></div>
			</div>

			<div class="gdClear"></div>

			<button class="gdPrimaryButton">Continue &raquo;</button>
		</form>
	</div>

	<div class="gdInstallSection{if $currentPage != 2} hidden{/if}" id="page2">
		<p>
			So far so good! Now click the button below to create your <b>settings.php</b> file. This file is stored in
			the root folder of this application and is the only place (other than the database) that stores custom information
			about your installation.
		</p>
		<form>
			<button class="gdPrimaryButton">Create File &raquo;</button>
		</form>
	</div>

	<div class="gdInstallSection{if $currentPage != 3} hidden{/if}" id="page3">
		<p>
			By default, there's no password protection: everyone visiting your Data Generator installation can
			load, save and delete form configurations.

			If you want multiple users to use this script, enter the administrator account details below. This account
			will be allowed to create and manage user accounts.
		</p>

		<form>
			<div class="gdFields">
				<div class="gdField">
					<label>Include User Accounts</label>
					<div class="gdRadioGroup">
						<input type="radio" name="employUserAccounts" id="eua1" value="yes" />
							<label for="eua1">{$L.yes}</label>
						<input type="radio" name="employUserAccounts" id="eua2" value="no" checked="checked" />
							<label for="eua2">{$L.no}</label>
					</div>
				</div>
				<div class="gdField gdAdminAccountHeading gdDisabledRow"><label for="firstName">Admin Account</label></div>

				<div class="gdField gdFirstNameRow gdDisabledRow">
					<label for="firstName">&#8212; {$L.first_name}</label>
					<input type="text" id="firstName" value="" disabled="disabled" />
				</div>
				<div class="gdError" id="firstName_error"></div>

				<div class="gdField gdLastNameRow gdDisabledRow">
					<label for="lastName">&#8212; {$L.last_name}</label>
					<input type="text" id="lastName" value="" disabled="disabled" />
				</div>
				<div class="gdError" id="lastName_error"></div>

				<div class="gdField gdEmailRow gdDisabledRow">
					<label for="email">&#8212; {$L.email}</label>
					<input type="text" id="email" value="" disabled="disabled" />
				</div>
				<div class="gdError" id="email_error"></div>

				<div class="gdField gdPasswordRow gdDisabledRow">
					<label for="password">&#8212; {$L.password}</label>
					<input type="text" id="password" value="{$randomPassword}" class="pwdField" disabled="disabled" />
				</div>
				<div class="gdError" id="password_error"></div>
			</div>

			<div class="gdClear"></div>

			<button class="gdPrimaryButton">Continue &raquo;</button>
		</form>
	</div>

	<div class="gdInstallSection{if $currentPage != 4} hidden{/if}" id="page4">
		<p>
			Almost done! Now we're going to install the plugins: these are what make the Data Generator actually <i>useful</i> -
			i.e. the type of data you can generate (Data Types), the format of the generated data (Export Types) and all
			the Country-specific data like regions and cities.
		</p>

		<div id="gdPluginInstallationResults" class="hidden">
			<div>
				<h4>1. Data Types</h4>
				<div id="gdDataTypeResponse" class="gdResponse"></div>
			</div>
			<div>
				<h4>2. Export Types</h4>
				<div id="gdExportTypeResponse" class="gdResponse"></div>
			</div>
			<div>
				<h4>3. Countries</h4>
				<div id="gdCountriesResponse" class="gdResponse"></div>
			</div>
		</div>
		<div class="gdClear"></div>

		<form>
			<button class="gdPrimaryButton" id="gdInstallPluginsBtn">Install Plugins &raquo;</button>
		</form>
	</div>

	<div class="gdInstallSection{if $currentPage != 5} hidden{/if}" id="page5">

		<p>
			The Data Generator has been succesfully installed! Click the button below to go to the script.
		</p>

		<form action="./">
			<button class="gdPrimaryButton">Go to script &raquo;</button>
		</form>
	</div>

	<div class="gdClear"></div>
