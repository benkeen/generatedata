	<h1>{$L.installation}</h1>

	<nav id="gdInstallNav">
		<ol>
			<li id="nav1" class="selected">Check Database Info</li>
			<li id="nav2">Create Settings File</li>
			<li id="nav3">{$L.user_accounts}</li>
			<li id="nav4">Data Types</li>
			<li id="nav5">Export Types</li>
			<li id="nav6">Country Data</li>
			<li id="nav7">Complete!</li>
		</ol>
	</nav>

	<div class="gdInstallSection" id="page1">

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

			<button class="gdGreenButton">Continue &raquo;</button>
		</form>
	</div>

	<div class="gdInstallSection hidden" id="page2">
		<p>
			So far so good! Now click the button below to create your <b>settings.php</b> file. This file is stored in
			the root folder of this application and is the only place (other than the database) that stores custom information
			about your installation.
		</p>
		<form>
			<button class="gdGreenButton">Create File &raquo;</button>
		</form>
	</div>

	<div class="gdInstallSection hidden" id="page3">
		<p>
			The Data Generator lets you save your data configurations for later use. By default, saved data
			is associated with a <i>single, unprotected user account</i>: anyone visiting the script will be able
			to load, save and delete these configurations. If you wish people to have to logging in to use the script and
			save data, specify the administrator account below: you will be able to create user accounts later.
		</p>
		<form>
			<div class="gdFields">
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

				<div class="gdClear"></div>
			</div>

			<button class="gdGreenButton">Check Database Info &raquo;</button>
		</form>
	</div>

	<div class="gdInstallSection hidden" id="page4">
		<p>
			So far so good! Your database information appears to be valid. Click the button below to create
			your <b>settings.php</b> file.
		</p>

		<form>
			<button class="gdGreenButton">Continue &raquo;</button>
		</form>
	</div>

	<div class="gdInstallSection hidden" id="page5">
		<form>
			<button class="gdGreenButton">Continue &raquo;</button>
		</form>
	</div>

	<div class="gdInstallSection hidden" id="page6">
		<form>
			<button class="gdGreenButton">Continue &raquo;</button>
		</form>
	</div>

	<div class="gdInstallSection hidden" id="page7">
		<form>
			<button class="gdGreenButton">Continue &raquo;</button>
		</form>
	</div>

	<div class="gdClear"></div>
