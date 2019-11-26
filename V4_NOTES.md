### v4 notes

Lots is going to change. 

- we will be using react & redux. 
- I haven't settled on Material UI yet - or even a theme. For now I'm just using it for what it provides.


### Site/installation configuration 

- **config.defaults.js** - contains all the default settings. 
- **config.js** - contains whatever overridden settings for the particular installation. This'll serve the 
same role as `settings.php` in previous versions of the script. 


### Bundling

The following sections will be generated into single bundles.

- locale files. 
- core 

For Data Types, Export Types, make two bundles:
- ALL UI code
- All code generation code. 

We need the UI to appear immediately but the generation code can be loaded async.  


### Data Type design

Just hammering this out.

First, the visual aspect: the options column, examples column, help modal content. For this, just create
React components in:  
    `ComponentName.components.js`

- dump the saveRow, loadRow. Now the component data will be housed in redux. Options + Examples column should be 
controlled components: they get fed a `data` prop containing any arbitrary data needed for the component plus a single
`onUpdate` callback which you feed the entire content to save. 

Second, the generation code:
    `ComponentName.generate.js`
    


