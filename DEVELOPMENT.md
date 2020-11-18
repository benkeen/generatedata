# Development

> This file is incomplete. It's for v4 of the code only and out of date. When things have solidified some more 
I'll update it. 


### Locale file helpers

There are a several grunt helper functions for validation and managing the locale files. It's important to keep the files
up to date so every i18n file contains the same keys and won't cause bugs when the user selects the 

#### Core localization files

These are found in `src/i18n`. They contain all the core i18n files.

- `grunt validateI18n` - general validation function to examine all the localization files and check everything in sync.
- `grunt validateI18n --key=fr` - same as above, except it only looks at a particular locale file.
- `grunt removeI18nKey --key=xxx` - where xxx is the property name.
- `grunt sortI18nFiles` - sorts the keys of all i18n files alphabetically.


### Text rules:

- titles, headings: capitalize every letter
- tooltips: sentence case, no ending period

