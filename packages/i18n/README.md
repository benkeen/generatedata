## @generatedata/i18n

This package generates the full, minified i18n files for use by the main client app, found in `apps/client`. Note that these files are IIFEs that upon load, call a `window.gd.localeLoaded` method to register the loaded strings.

The single export from this package is the map of locales to the hashed i18n files in the dist folder (`GDLocaleMap` type). It's the responsibility of the consuming app to move those files to wherever it needs.

### Using in tests

For convenience, JSON forms of all the strings are also found in the dist. These can be imported like so:

`import en from '@generatedata/i18n/en`;`
