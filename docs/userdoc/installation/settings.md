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

This stuff is a bit dense and annoying, but bear with me.

#### JWT 

JWT stands for "Javascript Web Token".

GD_JWT_SECRET=sahdflkajhflakdi7yhdfkjgpgnjaaff0
GD_JWT_LIFESPAN_MINS=15
GD_JWT_REFRESH_TOKEN_SECRET=sdflkjdkfiuro23udlfkjskf
GD_JWT_REFRESH_TOKEN_LIFESPAN_MINS=1440

# (optional) Sign-in with Google - oath2
GD_GOOGLE_AUTH_CLIENT_ID=707804813649-6ota5oqbbt4gf6k2osicuclji6tjkt44.apps.googleusercontent.com
GD_GOOGLE_AUTH_CLIENT_SECRET=BNrEpTH3RHI8favkICSvqZou


### Email OAUTH info

GD_EMAIL_OAUTH_SERVICE_CLIENT_ID=110440607716603463780
GD_EMAIL_OAUTH_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC9lrAOK2jXtgme\nRFLiitoU0Fxq6NMR9XXzagi5LfCxUkkzjNmHQ4/U2kJKxujVXDCyUgvMD0NmT7nR\nHKIbDBCsQk9IpJpzbWBscSPhLUb8PbTckamEb4YzrAElpyZVfFUaSJNkb1D3mUEG\n7bXI3ltX95CGPHNEoJ4/tdAMT2QNz0Xc7E4AeSYNizVW7tbWJCj3P7OUo2dqpEgL\njq6Au5Y/J0oO1jpcFVAYTq/mGX3BKJ++RGQovL+/jqC2To0xu495k5zX6LARe9Fp\nBDeuT2gZlzc70fJrg9eD7DrioCraM7urT/vvGUkfw5DghwAOyjK07M0TTi+AXX5p\ndwChXNG/AgMBAAECggEAAN2OeYRv9ClzkVR3C4bRaUBQDvveLHF0c7jN8LgpOIzf\nrTmSlToY3Q3XonDStL6uX83INR9CAlxWffkZ2/0H/+N5G/IGcHi5PPFZjyOer2yf\nNKmwOM9FQz0ogcI+IxpLOdesFvnCJdVShIYFPNBGbbsntH/906HotPShJYI6TjXl\nRjFUf2HNJAXs1fQf9J5221b5ppC5ukfflyByfh94t4NsJ62iHbudYfFoMqBVQv+I\nWll2UjYqb/dPMcBVRKbAVmPwUsMcKg43pBVWHSyiYr1mqmnbfMvvBVYBuTMNGVxm\na/i01gc1bkSJ6aa9hQ78/YkotPxX61wjS471ApQ7WQKBgQD8TQ69mMvclvWXPoOJ\nICjE9meiHBZRLnnYItJrV6f5hE21pvaotIuVQ1k+miItrjjY+Uh7+BgZv/x3tw4W\nOS4sF5trRzuIVFTEO/USbi2ZaSjRbhcuCfpXebxWTzjj5fusvg/HChhMJQLHrR7z\nhnELIazIuOLW+0IOQdNsn/f29wKBgQDAXkGnabYchKCCkfO8A2QEnp4cQ2mYsESk\nKC+hE4iWZUBbKfS27SzvAqG8RIpY5WxeKHBEV06JzvuM/IkRFJzUnxY2QCWQkPqd\nDb1l+jxJpmu8OMm51HB709oM+Ddo3pxcbVR0fmcIY/mOQGxOkDgIS+SRDBb8Dmhw\na3TNqzbheQKBgDCwEiMmZFjaTOR17N4+dX+k6VTQRMI/zMWX2rFaRhERpgljAgCG\nbtVMHOHGzsev8kp0uLcrpkL52JelnLNPL4jUuWpXYbaqR31i8KUw293Z/EWGEDUT\nOds9o8moGhtom0u3lcXcPdob3lB4KRvnmtMCGZzWiPfhntqve0RgDnL7AoGBAKXo\nJOOIDmImGHDEA9vhaL97NY3Wrhnb3Ddf2UQonqJnDMwTMVUa1KgGMws2acMliwLi\nCYFHcxrzgowjuOscRe4yjmuXg05dW2dcVD7BRIGYoE4jBAfbKnABVIve/5rYcy5b\ntH0MDzxzTOXctgxD4a92FNjr/l7A5l4erww6YAixAoGBAKZFOVljWKZwJ2lv69Gy\nsIlFQisCykzUx6bXR5OkLp5RVS03594NXtS02Zdqwn9Or8sDFJRABvW7w2wDloc1\nQpYwIs9KczU48ICNJy6UZqEZf7y9cM7WNJe1p2pqVzoPE75gUkkLkzRs4TmVLpvL\nB0UXRWnt1IDk2u1lV5wRVSmd\n-----END PRIVATE KEY-----\n

### Application settings


| Setting | Default value | Desc |
| --------- | ---------- | -------------- |
| `GD_APP_TYPE` | `login` | This setting controls the overall type of the installation. The options are:<br />`login` - allows anonymous access but without logging in they can't save their data sets or generate more than `GD_MAX_DEMO_MODE_ROWS` at a time. Only the admin account can create new accounts.<br />`single` - there's only ever a single account and that user is logged in by default`open` - anyone that has access to the URL can use the application anonymously or create an account<br />`closed` - no-one can access it without logging in first. |
| `GD_GENERATOR_PATH` | `/` | This allows easy extension for the prod site. On the prod site, the homepage is a splash info page to the tool. For other distributions, that isn't necessary and we want the generator itself to be the homepage. |
| `GD_DEFAULT_LOCALE` | `en` | The default locale. | 
| `GD_DEFAULT_EXPORT_TYPE` | `JSON` | The default Export Type to show in the preview panel. | 
| `GD_LOCALES` | `ar,de,en,es,fr,`<br/>`hi,ja,nl,pt,ta,zh` | All the available locales that show up in the UI. If you only enter 1, the icon to switch locales won't appear. |
| `GD_DEFAULT_NUM_ROWS` | `100` | The default value for the number of rows to generate. |
| `GD_MAX_DEMO_MODE_ROWS` | `1000` | For `login` appType, this controls how many rows can be generated by anonymous (non-logged in) users. |
| `GD_MAX_DATASET_HISTORY_SIZE` | `200` | Any time a user saves a dataset, that change is stored in the database to allow the user to backtrack and see earlier versions of the dataset. This governs the max number of history items. |
| `GD_DATA_TYPE_BLACKLIST` | `_PhoneRegional, OrganizationNumber, PersonalNumber, SIRET` | This omits specific Data Types from the application. Comma-delimited (no spaces!). It omits them from appearing in the UI, but it also prevents them from being built as well. So incomplete Data Types won't throw an error and cause the build to fail. |
| `GD_EXPORT_TYPE_BLACKLIST` | &#8212; | Omits specific Export Types from the application; comma-delimited (no spaces!). |
| `GD_COUNTRY_BLACKLIST` | &#8212; | Omits specific Country plugins from appearing in the application; comma-delimited (no spaces!)
| `GD_IMPORT_FILES` | &#8212; | Used for extension purposes. See the developer doc. |
| `GD_REST_API_ENABLED` | `false` | Unavailable just now. This enables/disables the REST API to allow users to generate data via a REST interface. |
