	<h1>{$L.installation}</h1>

	<nav id="gdInstallNav">
		<ol>
			<li id="nav1" class="{if $currentPage == 1}gdSelected{else}gdComplete{/if}">{$L.check_database_info}</li>
			<li id="nav2" class="{if $currentPage == 2}gdSelected{elseif $currentPage > 2}gdComplete{/if}">{$L.create_settings_file}</li>
			<li id="nav3" class="{if $currentPage == 3}gdSelected{elseif $currentPage > 3}gdComplete{/if}">{$L.user_accounts}</li>
			<li id="nav4" class="{if $currentPage == 4}gdSelected{elseif $currentPage > 4}gdComplete{/if}">{$L.plugins}</li>
			<li id="nav5" class="{if $currentPage == 5}gdSelected{/if}">{$L.complete_excl}</li>
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
					<input type="text" id="dbPassword" value="" class="pwdField" size="12" autocomplete="off" />
				</div>
				<div class="gdError" id="dbPassword_error"></div>
				<div class="gdField">
					<label for="dbTablePrefix">{$L.table_prefix}</label>
					<input type="text" id="dbTablePrefix" value="{$tablePrefix}" maxlength="10" />
				</div>
				<div class="gdError" id="dbTablePrefix_error"></div>
				<div class="gdField">
					<label for="defaultLanguage">{$L.default_language}</label>
					{language_dropdown nameId="gdDefaultLanguage" default="en"}
				</div>
				<div class="gdError" id="defaultLanguage_error"></div>
			</div>

			<div class="gdClear"></div>

			<button class="gdPrimaryButton">{$L.continue_rightarrow}</button>
		</form>
	</div>

	<div class="gdInstallSection{if $currentPage != 2} hidden{/if}" id="page2">

		<div class="gdInstallTabMessage">
			<div class="gdIcon"></div>
			<h3>Uh-oh.</h3>
			<div class="gdResponse"></div>
		</div>

		<div id="gdInstallCreateSettingsFile">
			<p>
				{$L.installation_step2_intro}
			</p>

			<form>
				<button class="gdPrimaryButton">{$L.create_file_rightarrow}</button>
			</form>
		</div>

		<div id="gdInstallCreateSettingsFileErrorScenario" class="hidden">
			<p>
				{$L.installation_failed_create_settings_file_msg}
			</p>

			<textarea id="gdSettingsFileContents"></textarea>

			<form>
				<button class="gdPrimaryButton">{$L.confirm_file_exists}</button>
			</form>
		</div>

	</div>

	<div class="gdInstallSection{if $currentPage != 3} hidden{/if}" id="page3">

		<div class="gdInstallTabMessage">
			<div class="gdIcon"></div>
			<h3>Uh-oh.</h3>
			<div class="gdResponse"></div>
		</div>

		<p>
			{$L.installation_step3_intro}
		</p>

		<form>
			<div>
				<input type="radio" name="userAccountSetup" id="acs1" value="anonymousAdmin" checked="checked" />
					<label for="acs1">{$L.single_anonymous_user_account}</label>
			</div>
			<div>
				<input type="radio" name="userAccountSetup" id="acs2" value="single" />
					<label for="acs2">{$L.single_user_account_requires_login}</label>
			</div>
			<div style="margin-bottom: 20px">
				<input type="radio" name="userAccountSetup" id="acs3" value="multiple" />
					<label for="acs3">{$L.multiple_accounts}</label>
			</div>

			<div class="gdFields">
				<div class="gdCol" id="gdInstallAccountDetails" style="display:none">
					<h3 id="gdInstallAccountDetailsMessage"></h3>

					<div class="gdError" id="firstName_error"></div>
					<div class="gdError" id="lastName_error"></div>
					<div class="gdError" id="email_error"></div>
					<div class="gdError" id="password_error"></div>

					<div class="gdField gdFirstNameRow">
						<label for="firstName">{$L.first_name}</label>
						<input type="text" id="firstName" value="" />
					</div>

					<div class="gdField gdLastNameRow">
						<label for="lastName">{$L.last_name}</label>
						<input type="text" id="lastName" value="" />
					</div>

					<div class="gdField gdEmailRow">
						<label for="email">{$L.email}</label>
						<input type="text" id="email" value="" />
					</div>

					<div class="gdField gdPasswordRow">
						<label for="password">{$L.password}</label>
						<input type="text" id="password" value="{$randomPassword}" class="pwdField" autocomplete="off" />
						<span id="gdRefreshPassword"></span>
					</div>
				</div>

				<div class="gdCol" id="gdInstallAnonymousUserSettings" style="display:none">
					<span class="rightBox">
						<input type="checkbox" id="allowAnonymousAccess" /><label for="allowAnonymousAccess">{$L.feature_enabled}</label>
					</span>
					<h3>{$L.anonymous_access}</h3>
					<div>{$L.anonymous_user_desc}</div>
					<div><i>{$L.anonymous_user_message}</i></div>
					<textarea id="anonymousUserPermissionDeniedMsg" name="anonymousUserPermissionDeniedMsg" class="gdDisabled"
						disabled="disabled">{$L.anonymous_user_default_message}</textarea>
				</div>
			</div>

			<div class="gdClear"></div>

			<button class="gdPrimaryButton">{$L.continue_rightarrow}</button>
		</form>
	</div>

	<div class="gdInstallSection{if $currentPage != 4} hidden{/if}" id="page4">
		<p>
			{$L.installation_plugin_intro}
		</p>

		<div id="gdPluginInstallationResults" class="hidden">
			<div>
				<h4>1. {$L.data_types}</h4>
				<div id="gdDataTypeResponse" class="gdResponse"></div>
			</div>
			<div>
				<h4>2. {$L.export_types}</h4>
				<div id="gdExportTypeResponse" class="gdResponse"></div>
			</div>
			<div>
				<h4>3. {$L.countries}</h4>
				<div id="gdCountriesResponse" class="gdResponse"></div>
			</div>
		</div>
		<div class="gdClear"></div>

		<form>
			<button class="gdPrimaryButton" id="gdInstallPluginsBtn">{$L.install_plugins_rightarrow}</button>
		</form>
	</div>

	<div class="gdInstallSection{if $currentPage != 5} hidden{/if}" id="page5">
		<p>
			{$L.installation_complete_text}
		</p>

		<form action="./">
			<button class="gdPrimaryButton">{$L.goto_script_rightarrow}</button>
		</form>
	</div>

	<div class="gdClear"></div>
