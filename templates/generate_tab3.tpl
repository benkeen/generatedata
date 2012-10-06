<div id="settingsTabMessage" class="gdMessage gdNotify gdMarginTop">
	<a href="#" title="Hide" class="gdMessageClose">X</a>
	<p></p>
</div>

<form action="index.php#t2" method="post" id="settingsForm">

	<h3>Plugins</h3>

	<p>
		Any time you add or remove a plugin, you need to reset the plugins. This will update the database and ensure
		you can access the plugins you require.
		<button id="gdResetPluginsBtn" class="gdSecondaryButton">Reset plugins</button>
	</p>

	<div id="gdPluginInstallation">
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
	</div>

	<h3>Developer</h3>

	<p>
		The following sections lets you fine-tune what you see in your javascript console for development purposes.
	</p>

	<div class="cols2">
		<div class="col">
			<div>
				<input type="checkbox" name="consoleWarnings" id="gdSettingsConsoleWarnings"
					value="enabled" {if $settings.consoleWarnings == "enabled"}checked="checked"{/if} />
					<label for="gdSettingsConsoleWarnings">List console.warn() events</label>
			</div>
				<div>
				<input type="checkbox" name="consoleEventsPublish" id="gdSettingsConsoleEventsPublish"
					value="enabled" {if $settings.consoleEventsPublish == "enabled"}checked="checked"{/if} />
					<label for="gdSettingsConsoleEventsPublish">List module <b>publish</b> events</label>
			</div>
			<div>
				<input type="checkbox" name="consoleEventsSubscribe" id="gdSettingsConsoleEventsSubscribe"
					value="enabled" {if $settings.consoleEventsSubscribe == "enabled"}checked="checked"{/if} />
					<label for="gdSettingsConsoleEventsSubscribe">List module <b>subscribe</b> events</label>
			</div>
			<div>
				<input type="checkbox" name="consoleCoreEvents" id="gdSettingsConsoleCoreEvents"
					value="enabled" {if $settings.consoleCoreEvents == "enabled"}checked="checked"{/if} />
					<label for="gdSettingsConsoleCoreEvents">List <b>core</b> events</label>
			</div>
		</div>
		<div class="col">
			<label for="consoleEventsModuleList">Limit pub/sub console messages to specific modules:</label>
			{data_types_dropdown name="consoleEventsDataTypePlugins" id="consoleEventsDataTypePlugins"
				style="width:500px" multiple=true extras="data-placeholder=\"All Data Type plugins\""
				includeDefaultOption=false selected=$settings.consoleEventsDataTypePlugins}
			{export_types_dropdown name="consoleEventsExportTypePlugins" id="consoleEventsExportTypePlugins"
				style="width:500px" multiple=true extras="data-placeholder=\"All Export Type plugins\""
				includeDefaultOption=false selected=$settings.consoleEventsExportTypePlugins}
		</div>
	</div>

	<div class="gdClear"></div>
	<p>
		<button class="gdPrimaryButton" id="updateSettingsBtn">{$L.update_settings}</button>
	</p>
</form>