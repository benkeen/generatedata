## npm package design

Long-time purpose of this script was to offer a version as an npm package version which would have no interface but 
provide a programmatic way to generate data. The idea is that the existing UI will offer an "export JSON" option for 
whatever data set is constructed via the UI. But all the plugins + core already have their data pretty well-defined, 
so it's just a question of exposing the appropriate structure for the various options (and exposed via typescript 
types!) so developers can construct what they want as JSON. 


### General idea

In this examples I'll stick to commonJS, since I'll assume devs will want to run via the command line and es6 with node
can be a pain, depending on your version.

cmd: `node generate-data-please.js`

```javascript
// generate-data-please.js
const generate = require('@generatedata/runtime'); // package name TBD

const config = {}; // best exported from generatedata.com, but could be manually built

// Async? Seems best. We'll want to use some sort of npm package for showing a visual display of how it's progressing
// like: https://www.npmjs.com/package/cli-progress
(async () => {
    const settings = {
        rows: 100000
    };
    const results = await generate(settings, dataConfig);
    
    // do whatever you want with results
})();

// or.... instead of returning the data, this could offer the the same UI (cmd-line progress indicator) but actually be 
// generating the data onto the file system 
(async () => {
    const settings = {
        rows: X,
        folder: '',
        filename: '',
    };
    await generate(settings, config);
})();
```

```typescript

// params
type GenerationSettings = {
    rows: number; // default: 100. The number of rows to be generated
    stripWhitespace?: boolean; // default: false
    generationType: 'returnValue' | 'file'; // default: returnValue. 
    filename?: string; // the filename to generated.
    folder?: string; // the folder where the data is generated
}
type Data = {
	// exposed from core + plugins. Contains the actual data configuration 
}
```

### Questions/considerations:

- package name?
- The second option below may be useful for the first. Generating 100TB of data is obviously going to take time and require 
too much memory, so it would have to store the generated data temporarily in files, then combine them at the end. Seems like
they could both do the same thing: generate temporary files to keep memory light
- any reason we wouldn't want the cli-progress output?
- should we offer a binary?
