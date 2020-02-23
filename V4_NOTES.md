# v4 notes

Lots is going to change. 

- react & redux baby!
- express. 
- I haven't settled on Material UI yet - or even a general style (no more unnecessary themes)


### Quick start 

This will change. But to get running:

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


### Bundling

The following sections will be generated into single bundles.

- locale files. 
- core 

For Data Types, Export Types, maybe make two bundles:
- ALL UI code
- All code generation code. 

We need the UI to appear immediately but the generation code can be loaded async. That said, perhaps experiment: see
how large the UI code is in particular. Be nicer to load them async, but 30-odd requests when you first boot up kinda
sucks. Alternatively we could flag the most common ones and load them when the user first selects the data type...? Meh.    

Each module will have a `[module name].config.js` file containing high-level info about the module: name, order. We'll 
have a grunt task that parses all the dependencies and generates a single JS file from them all which will be included
in the main script. 


### Data Type design

Just hammering this out.

First, the visual aspect: the options column, examples column, help modal content. For this, just create
React components in:  
    `ComponentName.ui.js`

- dump the saveRow, loadRow. Now the component data will be housed in redux. Options + Examples column should be 
controlled components: they get fed a `data` prop containing any arbitrary data needed for the component plus a single
`onUpdate` callback which you feed the entire content to save. 

Second, the generation code:
    `ComponentName.generate.js`


### TODO

- add base component generation script task.
- verification task to find missing schemas
- revise schemas to make the entire config file schema based, not just the generation schema
- Minimum node version? 8?
- The script shouldn't have any trace of website content. Drop the website_i18n files.
- split config into config.web.js, config.server.js. config.server.js is never included in any bundle. Best way to 
validate this? Kinnnnnda important.


How about a SINGLE generated build/plugins.js file that exports all plugin info.


----------------------------------------

Core:
    - includes 




Bundling

https://github.com/webpack/webpack/issues/7526

