# Development

> This file is incomplete. It's for v4 of the code only and out of date. When we're into alpha and things have solidified
I'll update it. 

To run locally:

- `yarn install`
- `yarn build`
- `node app.js`
- in another tab: `yarn dev`

Then open up http://localhost:8080/ in your web browser.


### Site/installation configuration

- **config.client.defaults.js** - contains all the default settings. 
- **config.js** - contains whatever overridden settings for the particular installation. This'll serve the 
same role as `settings.php` in previous versions of the script. 

At this point neither file does anything but that'll change very soon. 


### Locale file helpers

There are a several grunt helper functions for validation and managing the locale files. It's important to keep the files
up to date so every i18n file contains the same keys and won't cause bugs when the user selects the 

#### Core localization files

These are found in `src/i18n`. They contain all the core i18n files.

- `grunt validateI18n` - general validation function to examine all the localization files and check everything in sync.
- `grunt validateI18n --key=fr` - same as above, except it only looks at a particular locale file.
- `grunt removeI18nKey --key=xxx` - where xxx is the property name.
- `grunt sortI18nFiles` - sorts the keys of all i18n files alphabetically.


### TODO

- add base component generation script task.
- verification task to find missing schemas
- revise schemas to make the entire config file schema based, not just the generation schema
- Minimum node version? 12?
- split config into config.web.js, config.server.js. config.server.js is never included in any bundle. Best way to 
validate this? Kinnnnnda important.


Validation function: 

- DEFINITELY need a command-line validation function to verify data types/export types etc. is valid. 

---------------------------

### Text rules:

- titles, headings: capitalize every letter
- tooltips: sentence case, no ending period
