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


### TODO

- add base component generation script task.
- verification task to find missing schemas
- revise schemas to make the entire config file schema based, not just the generation schema
- Minimum node version? 8?
- The script shouldn't have any trace of website content. Drop the website_i18n files.
- split config into config.web.js, config.server.js. config.server.js is never included in any bundle. Best way to 
validate this? Kinnnnnda important.


Validation function: 

- DEFINITELY need a command-line validation function to verify data types/export types etc. is valid. 

---------------------------

### Text rules:

- titles, headings: capitalize every letter
- tooltips: sentence case, no ending period
