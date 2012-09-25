	<h1>{$L.installation}</h1>

	<div id="gdInstallMessage">
		<div class="gdIcon"></div>
		<h3>Uh-oh.</h3>
		<div class="gdResponse"></div>
	</div>

	<nav id="gdInstallNav">
		<ol>
			<li class="selected">{$L.database_info}</li>
			<li>{$L.user_accounts}</li>
			<li>Data Types</li>
			<li>Export Types</li>
			<li>Countries</li>
			<li>Complete!</li>
		</ol>
	</nav>

	<div class="gdInstallSection">
		<p>
			{$L.installation_intro}
		</p>
		<form>
			<div class="gdFields gdInstallForm">
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
					<input type="text" id="dbPassword" value="" class="pwdField" />
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
				<div style="clear:left"></div>
			</div>

			<button class="gdGreenButton">Continue &raquo;</button>
		</form>
	</div>

	<div class="gdInstallPage hidden">
		<form>
			<div class="gdFields gdInstallForm">
				<div class="gdField">
					<label>{$L.employ_user_accounts}</label>
					<div class="gdRadioGroup">
						<input type="radio" name="employUserAccounts" id="eua1" value="yes" />
							<label for="eua1">{$L.yes}</label>
						<input type="radio" name="employUserAccounts" id="eua2" value="no" checked="checked" />
							<label for="eua2">{$L.no}</label>
					</div>
				</div>
				<div class="gdField gdFirstNameRow gdDisabledRow">
					<label for="email">{$L.first_name}</label>
					<input type="text" id="firstName" value="" disabled="disabled" />
				</div>
				<div class="gdError" id="firstName_error"></div>

				<div class="gdField gdLastNameRow gdDisabledRow">
					<label for="email">{$L.last_name}</label>
					<input type="text" id="lastName" value="" disabled="disabled" />
				</div>
				<div class="gdError" id="lastName_error"></div>

				<div class="gdField gdEmailRow gdDisabledRow">
					<label for="email">{$L.email}</label>
					<input type="text" id="email" value="" disabled="disabled" />
				</div>
				<div class="gdError" id="email_error"></div>

				<div class="gdField gdPasswordRow gdDisabledRow">
					<label for="password">{$L.password}</label>
					<input type="text" id="password" value="{$randomPassword}" class="pwdField" disabled="disabled" />
				</div>
				<div class="gdError" id="password_error"></div>
			</div>

<!--
			<button class="gdGreenButton">{$L.install}</button>
-->
			<p>
				<input type="button" name="" value="Continue &raquo;" />
			</p>
		</form>
	</div>

	<div class="gdClear"></div>
