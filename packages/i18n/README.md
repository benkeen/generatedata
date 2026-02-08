## @generatedata/i18n

This package generates the full, minified i18n files for use by the main client app (`apps/client`) and the CLI package.

The single export is the map of locales to the hashed i18n files in the dist folder (`GDLocaleMap` type). It's the responsibility of the consuming app to move those files to wherever it needs.
