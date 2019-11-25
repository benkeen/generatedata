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
