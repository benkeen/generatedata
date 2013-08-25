<div id="settingsTabMessage" class="gdMessage {if $success}gdNotify{elseif !$success}gdError{/if} gdMarginTop" {if $message}style="display:block"{/if}>
	<a href="#" class="gdMessageClose">X</a>
	<p>{$message}</p>
</div>

<form action="./#t3" method="post" id="gdSettingsForm">
	<input type="hidden" name="updateSettings" value="1" />

	{if $settings.userAccountSetup != "anonymousAdmin"}
		<h3>{$L.account_settings}</h3>

		<div>
			<div>
				<input type="radio" name="userAccountSetup" id="acs2" value="single" {if $settings.userAccountSetup == "single"}checked="checked"{/if} />
					<label for="acs2">{$L.single_user_account_requires_login}</label>
			</div>
			<div style="margin-bottom: 20px">
				<input type="radio" name="userAccountSetup" id="acs3" value="multiple" {if $settings.userAccountSetup == "multiple"}checked="checked"{/if} />
					<label for="acs3">{$L.multiple_accounts}</label>
			</div>
		</div>
	{/if}

	<hr size="1" />

	<button id="gdResetPluginsBtn" class="gdSecondaryButton">Detect Available Plugins</button>

	<!--
	{$L.plugins_intro}
	-->

	<h3>{$L.plugins}</h3>


	{if $settings.userAccountSetup == "multiple"}
	<p>
		<input type="checkbox" name="allowUserSelectModuleSubset" id="allowUserSelectModuleSubset"/>
			<label for="allowUserSelectModuleSubset">Allow logged in user to select what modules they see in the Generator</label>
	</p>

	<!--
	Over time, more and more Data Types, Export Types, Country-specific data and translations are being added. Most
	users only need to use a subset of the available functionality. This option determines whether the users will
	always see a specific list of module (defined below), or be able to customize their own list.

	the below should save to
	-->

	<p>
		<b>Default Modules</b>
	</p>
	<p>

	</p>

	<ul class="gdDefaultModules">
		<li>
			<h4>Countries</h4>
			<div>
				{*
				{foreach from=$allCountryPlugins item=i}
					<input type="checkbox" />
						<label>{$i}</label>
				{/foreach}
				*}
			</div>
		</li>
		<li>
			<h4>Data Types</h4>
			<div>
			</div>
		</li>
		<li>
			<h4>Export Types</h4>
			<div>
			</div>
		</li>
		<li>
			<h4>Translations</h4>
			<div>
			</div>
		</li>
	</ul>
	{/if}


	<div id="gdPluginInstallation">
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
	</div>

	<!--
	<h3>{$L.misc}</h3>

	<div>
		{$L.theme}
		<input type="radio" name="theme" value="default" id="gdTheme1" {if $settings.theme == "default"}checked="checked"{/if} {if !$allowThemes}disabled="disabled"{/if} />
			<label for="gdTheme1">Default</label>
		<input type="radio" name="theme" value="classic" id="gdTheme2" {if $settings.theme == "classic"}checked="checked"{/if} />
			<label for="gdTheme2">Classic</label>
	</div>
	-->

	<hr size="1" />

	<h3>{$L.developer}</h3>

	<p>
		{$L.developer_intro}
	</p>

	<div class="cols2">
		<div class="col">
			<div>
				<input type="checkbox" name="consoleWarnings" id="gdSettingsConsoleWarnings"
					value="enabled" {if $settings.consoleWarnings == "enabled"}checked="checked"{/if} />
					<label for="gdSettingsConsoleWarnings">{$L.list_console_warn_events}</label>
			</div>
				<div>
				<input type="checkbox" name="consoleEventsPublish" id="gdSettingsConsoleEventsPublish"
					value="enabled" {if $settings.consoleEventsPublish == "enabled"}checked="checked"{/if} />
					<label for="gdSettingsConsoleEventsPublish">{$L.list_module_publish_events}</label>
			</div>
			<div>
				<input type="checkbox" name="consoleEventsSubscribe" id="gdSettingsConsoleEventsSubscribe"
					value="enabled" {if $settings.consoleEventsSubscribe == "enabled"}checked="checked"{/if} />
					<label for="gdSettingsConsoleEventsSubscribe">{$L.list_module_subscribe_events}</label>
			</div>
			<div>
				<input type="checkbox" name="consoleCoreEvents" id="gdSettingsConsoleCoreEvents"
					value="enabled" {if $settings.consoleCoreEvents == "enabled"}checked="checked"{/if} />
					<label for="gdSettingsConsoleCoreEvents">{$L.list_core_events}</label>
			</div>
		</div>
		<div class="col">
			

			<label for="consoleEventsModuleList">{$L.limit_pub_sub_console_messages}</label>
			{assign var=label1 value="data-placeholder=\"`$L.all_data_type_plugins`\""}
			{data_types_dropdown name="consoleEventsDataTypePlugins" id="consoleEventsDataTypePlugins"
				style="width:500px" multiple=true extras=$label1
				includeDefaultOption=false selected=$settings.consoleEventsDataTypePlugins}

			{assign var=label2 value="data-placeholder=\"`$L.all_export_type_plugins`\""}
			{export_types_dropdown name="consoleEventsExportTypePlugins" id="consoleEventsExportTypePlugins"
				style="width:500px" multiple=true extras=$label2
				includeDefaultOption=false selected=$settings.consoleEventsExportTypePlugins}
		</div>
	</div>

	<div class="gdClear"></div>
	<p>
		<button class="gdPrimaryButton" id="updateSettingsBtn">{$L.update_settings}</button>
	</p>
</form>
