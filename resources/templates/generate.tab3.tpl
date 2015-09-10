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

	<h3>{$L.plugins}</h3>

    <p>
		{$L.plugins_intro}
	</p>

    <div id="gdPlugins">
        <div class="gdPluginSection">
            <div class="gdPluginSectionHeader">
                <label for="gdDataTypePluginList">{$L.data_types}</label>
                <div id="gdDataTypePluginListIndicator" class="gdPluginIndicator">
                    <span class="gdPluginCount">{$allDataTypes|count}</span>
                </div>
            </div>
            <div id="gdDataTypeList">
                {foreach from=$groupedDataTypes key=k item=i name=group}
                    <ul>
                        <li class="gdGroupName">
                            <input type="checkbox" class="toggleDataTypeSection" id="dtGroup-{$smarty.foreach.group.index}" />
                            <label for="dtGroup-{$smarty.foreach.group.index}">{$L[$k]}</label></li>
                        </li>
                        {foreach from=$i key=k2 item=currDataType name=data}
                            {assign var="checked" value=""}
                            {if (in_array($currDataType->getFolder(), $selectedDataTypes))}
                                {assign var="checked" value='checked="checked"'}
                            {/if}

                            <li>
                                <input type="checkbox" id="plugin-dt-{$currDataType->getFolder()}" name="selectedDataTypes" class="selectedDataType"
                                    value="{$currDataType->getFolder()}" {$checked} />
                                <label for="plugin-dt-{$currDataType->getFolder()}">{$currDataType->getName()}</label>

                                {if $currDataType->getDesc() == ''}
                                    <span class="gdTooltip"></span>
                                {else}
                                    <span class="gdTooltip gdHasTooltip tooltip-right" data-tooltip="{$currDataType->getDesc()}"></span>
                                {/if}
                           </li>
                        {/foreach}
                    </ul>
                {/foreach}
            </div>
        </div>
        <div class="gdPluginSection">
            <div class="gdPluginSectionHeader">
                <input type="checkbox" id="gdExportTypePluginList" />
                <label for="gdExportTypePluginList">{$L.export_types}</label>
                <div id="gdExportTypePluginListIndicator" class="gdPluginIndicator">
                    <span class="gdPluginCount">{$allExportTypes|count}</span>
                </div>
            </div>
            <div id="gdExportTypeList">
                <ul>
                    {foreach from=$allExportTypes key=k item=i}
                        {assign var="checked" value=""}
                        {if (in_array($i->getFolder(), $selectedExportTypes))}
                            {assign var="checked" value='checked="checked"'}
                        {/if}
                        <li>
                            <input type="checkbox" id="plugin-et-{$i->getFolder()}" name="selectedExportTypes[]" class="selectedExportType" value="{$i->getFolder()}" {$checked} />
                            <label for="plugin-et-{$i->getFolder()}">{$i->getName()}</label>
                        </li>
                    {/foreach}
                </ul>
            </div>
        </div>
        <div class="gdPluginSection">
            <div class="gdPluginSectionHeader">
                <input type="checkbox" id="gdCountryPluginList" />
                <label for="gdCountryPluginList">{$L.countries}</label>
                <div id="gdCountryPluginListIndicator" class="gdPluginIndicator">
                    <span class="gdPluginCount">{$allCountryPlugins|count}</span>
                </div>
            </div>
            <div id="gdCountryList">
                <ul>
                    {foreach from=$allCountryPlugins key=k item=i}
                        {assign var="checked" value=""}
                        {if (in_array($i->getFolder(), $selectedCountries))}
                            {assign var="checked" value='checked="checked"'}
                        {/if}
                        <li>
                            <input type="checkbox" id="plugin-c-{$i->getFolder()}" name="selectedCountries[]" class="selectedCountry" value="{$i->getFolder()}" {$checked} />
                            <label for="plugin-c-{$i->getFolder()}">{$i->getName()}</label>
                        </li>
                    {/foreach}
                </ul>
            </div>
        </div>
    </div>


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

    <!--
    move to a dialog
    <p>
        {$L.reset_plugins_with_bundling}
    </p>
    -->

    <p class="buttons-row">
		<button class="gdPrimaryButton" id="updateSettingsBtn">{$L.update_settings}</button>
        <button class="gdPrimaryButton blue" id="gdResetPluginsBtn" data-use-minified="{if $useMinifiedResources}true{else}false{/if}">{$L.reset_plugins}</button>
	</p>
</form>
