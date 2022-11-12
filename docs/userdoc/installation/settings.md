---
sidebar_position: 3
id: settings
title: 2. Customize settings
---

# Settings

The application uses an `.env` dotfile to store your application settings. With a refresh download/checkout of the 
generatedata source, this file doesn't exist by default. Make a copy of the `.env.default` file and name it 
`.env`. You're going to make your changes to that file. 

This page outlines every available setting. Defaults are provided for some settings but not all - the ones you MUST 
provide a value for have been flagged with "**must set**" in the comments, but this is the full list if you want to 
skip the details:

- `GD_MYSQL_ROOT_PASSWORD`
- `GD_DEFAULT_ADMIN_FIRST_NAME`
- `GD_DEFAULT_ADMIN_LAST_NAME`
- `GD_DEFAULT_ADMIN_EMAIL_SENDER_NAME`
- `GD_DEFAULT_ADMIN_EMAIL`
- `GD_DEFAULT_ADMIN_FIRST_NAME`
- `GD_JWT_SECRET`

Also note that with the default settings the application will run at `http://localhost:9000`. If you want to change
that, check out the Web Server settings below.


### Database settings

The first time you install the script it will use these values to set up the database. So if you start the application 
then change these later on, they won't work. 

| Setting | Default value | Desc                                                                                                                                                  |
| --------- | ---------- |-------------------------------------------------------------------------------------------------------------------------------------------------------|
| `GD_MYSQL_ROOT_USER` | `root` | The main root user for the MySQL database. Defaults to `root` but you can enter any value you like.                                                   |
| `GD_MYSQL_ROOT_PASSWORD` | &#8212; | **Must set.** The password for the MySQL database user. I'd suggest sticking to alphanumeric characters just in case MySQL doesn't like certain chars. |
| `GD_DB_NAME` | `generatedata` | The name of the database. You can change this to whatever you want.                                                                                   |
| `GD_DB_PORT` | `3306` | The port of the database so it can be accessed within the Docker setup. Again, this is customizable.                                                  |


### API server

| Setting | Default value | Desc |
| --------- | ---------- | -------------- |
| `GD_API_SERVER_PORT` | `3001` | This is the server port for the server API for graphQL. You shouldn't need to change this - it should only be used internally within the Docker configuration.  |


### Web server settings

These settings control how you access the application in your web browser.

| Setting | Default value | Desc |
| --------- | ---------- | -------------- |
| `GD_WEB_DOMAIN` | `localhost` | localhost is the typical way to access local servers, but you can enter whatever you want. If you DO change this you'll need to update your `hosts` file to link your custom domain to your local IP. For that you'll need to google it, sorry! |
| `GD_WEB_SERVER_PORT` | `9000` | The port that it runs on. |
| `GD_WEB_USE_HTTPS` | `false` | Whether or not to use https. This can be activated (`true`) but you'll need handle setting up the security certs yourself. |

### Admin account

The application has a single administrator account used for all management options in the UI. This account is initially 
defined here in your `.env` file settings here so that when the database is first created, it has a single admin user setup.
After the application is running in your browser and you're able to log in, I'd suggest re-editing the .env file to remove 
these values. Special note: use a temporary password here! You definitely don't want to be storing a real password in a
file on your computer.

| Setting | Default value | Desc                             |
| --------- | ---------- |----------------------------------|
| `GD_DEFAULT_ADMIN_FIRST_NAME` | `Your` |                                  |
| `GD_DEFAULT_ADMIN_LAST_NAME` | `Name` |                                  |
| `GD_DEFAULT_ADMIN_EMAIL_SENDER_NAME` | `admin123` |                                  |
| `GD_DEFAULT_ADMIN_EMAIL` | `admin@generatedata.com` |                                  |
| `GD_DEFAULT_ADMIN_PASSWORD` | `admin123` | Just use a temporary value here! |


### Authentication

Setting all this auth-related stuff up is a pain. I do miss the old days of "WAMP/LAMP/WAMP" where it would provide a
preconfigured system with everything you needed, sigh... ah, "progress".

#### JWT 

`JWT` stands for Javascript Web Tokens. It's used by the application to create a secure way to interact with the server
and keep track of authentication and who's logged in.

| Setting | Default value | Desc                                                                                                      |
| --------- |----|-----------------------------------------------------------------------------------------------------------|
| `GD_JWT_SECRET` | (random string) | **must set.** Just enter a random string value here - maybe 30 or 40 chars or so.                         |
| `GD_JWT_LIFESPAN_MINS` | 15 | How long the auth is valid on the front end before it requests a refresh token to keep the session alive. |
| `GD_JWT_REFRESH_TOKEN_SECRET` | (random string) |                                                                                                           |
| `GD_JWT_REFRESH_TOKEN_LIFESPAN_MINS` | 1440 |                                                                                                           |

#### Sign in with Google

If these values are set, the interface will show a "Sign in with Google" option in the login panel, allowing users to 
authenticate with Google and sign in with their Google email address, assuming there's an account already created 
in the system with that email address. 

In order to get these values, you'll need to set up an account with Google for your locally installed application. See
their [documentation](https://developers.google.com/identity/protocols/oauth2) for more information on that. 

| Setting | Default value | Desc                                                                              |
| --------- |----|-----------------------------------------------------------------------------------|
| `GD_GOOGLE_AUTH_CLIENT_ID` | - | **must set.** Just enter a random string value here - maybe 30 or 40 chars or so. |
| `GD_GOOGLE_AUTH_CLIENT_SECRET` | -  | Provided by Google.                                                               |


#### Emails 

If you want the option to send emails, you'll need to define these settings below. This is quite flexible and will work
with any OAUTH email service. For the main website, we use Google, but you can use whatever you have available.

| Setting | Default value | Desc |
| --------- |---|--|
| `GD_EMAIL_OAUTH_SERVICE_CLIENT_ID` | - | Provided by your email Auth service. |
| `GD_EMAIL_OAUTH_PRIVATE_KEY` | - | Provided by your email Auth service. |

### Application settings

This section contains the main settings for your application. Give each one a read through - the first `GD_APP_TYPE` 
setting is particularly important.

| Setting | Default value                                               | Desc                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| --------- |-------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `GD_APP_TYPE` | `login`                                                     | This setting controls the overall type of the installation. The options are:<br />`login` - allows anonymous access but without logging in they can't save their data sets or generate more than `GD_MAX_DEMO_MODE_ROWS` at a time. Only the admin account can create new accounts.<br />`single` - there's only ever a single account and that user is logged in by default<br />`open` - anyone that has access to the URL can use the application anonymously or create an account<br />`closed` - no-one can access it without logging in first. |
| `GD_GENERATOR_PATH` | `/`                                                         | This allows easy extension for the prod site. On the prod site, the homepage is a splash info page to the tool. For other distributions, that isn't necessary and we want the generator itself to be the homepage.                                                                                                                                                                                                                                                                                                                                   |
| `GD_DEFAULT_LOCALE` | `en`                                                        | The default locale.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 
| `GD_DEFAULT_EXPORT_TYPE` | `JSON`                                                      | The default Export Type to show in the preview panel.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 
| `GD_LOCALES` | `ar`,`de`,`en`,`es`,`fr`,<br/>`hi`,`ja`,`nl`,`pt`,`ta`,`zh` | All the available locales that show up in the UI. You have to enter 1 value at least. If you only enter 1, the icon to switch locales won't appear.                                                                                                                                                                                                                                                                                                                                                                                                  |
| `GD_DEFAULT_NUM_ROWS` | `100`                                                       | The default value for the number of rows to generate.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `GD_MAX_DEMO_MODE_ROWS` | `1000`                                                      | For `login` appType, this controls how many rows can be generated by anonymous (non-logged in) users.                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `GD_MAX_DATASET_HISTORY_SIZE` | `200`                                                       | Any time a user saves a dataset, that change is stored in the database to allow the user to backtrack and see earlier versions of the dataset. This governs the max number of history items.                                                                                                                                                                                                                                                                                                                                                         |
| `GD_DATA_TYPE_BLACKLIST` | `_PhoneRegional, OrganizationNumber, PersonalNumber, SIRET` | This omits specific Data Types from the application. Comma-delimited (no spaces!). It omits them from appearing in the UI, but it also prevents them from being built as well. So incomplete Data Types won't throw an error and cause the build to fail. I wouldn't touch this value.                                                                                                                                                                                                                                                               |
| `GD_EXPORT_TYPE_BLACKLIST` | &#8212;                                                     | Omits specific Export Types from the application; comma-delimited (no spaces!).                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `GD_COUNTRY_BLACKLIST` | &#8212;                                                     | Omits specific Country plugins from appearing in the application; comma-delimited (no spaces!)                                                                                                                                                                                                                                                                                                                                                                                                                                                       
| `GD_IMPORT_FILES` | &#8212;                                                     | Used for extension purposes. See the developer doc.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `GD_REST_API_ENABLED` | `false`                                                     | Unavailable just now. This enables/disables the REST API to allow users to generate data via a REST interface.                                                                                                                                                                                                                                                                                                                                                                                                                                       |
