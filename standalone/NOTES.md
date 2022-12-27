# Standalone app - npm package + binary

The long-time purpose of this script was to offer an npm package which would have no interface but provide a programmatic 
way to generate test data. The idea is that the existing UI will offer an "export JSON" option for 
whatever data set is constructed via the UI, which could be used in conjunction with the command line tool. All the 
plugins + core already have their data pretty well-defined, so it's just a question of exposing the appropriate
structure for the various options (and exposed via typescript types!) so developers can construct what they want as JSON.

## General idea

We'll expose two options: a programmatic node version and a standalone binary. 

### 1. Node

In this example I'll stick to commonJS, since I'll assume devs will want to run via the command line and es6 with node
can still be a pain.

`node generate-data-please.js`

```javascript
// generate-data-please.js
const generate = require('@generatedata/runtime'); // package name TBD

const dataConfig = { // best exported from generatedata.com, but could be manually built
    // ...
}; 

// Async/sync? Both? Async for sure. We'll want to use some sort of npm package for showing a visual display of how 
// it's progressing like: https://www.npmjs.com/package/cli-progress - or should that just be in the binary version?
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
    await generate(settings, dataConfig);
})();
```

```typescript
type GenerationSettings = {
    // required
    rows: number; // The number of rows to be generated
    
    // optional
    stripWhitespace?: boolean; // default: false
    generationType?: 'returnValue' | 'file'; // default: returnValue. 
    filename?: string; // the filename to generated.
    folder?: string; // the folder where the data is generated
}
type DataConfig = {
	// exposed from core + plugins. Contains the actual data configuration 
}
```

### 2. Binary

Realistically we won't be able to pass all settings via the command line, so targeting a source file with the 
data set to generate makes the most sense, like so:

```typescript
generatedata --config=data.json 
```



### Questions/considerations:

- package name? How about just `generatedata`.
- any reason we wouldn't want the cli-progress output?
- offering a supplementary binary would be nice.
- split up what we have and create it as a separate package? Sure be nice for it not to contain all the unnecessary junk of the main app.
Maybe moving this to a monorepo might be simplest.
- schema validation will be easy with TS. How about JS/binary usages? We have the old leftover JSON schema being half-defined
in the plugin's `config.ts` files. That should be removed.


## Schema Definition

Above you can see the second param is a mysterious `DataConfig` type. This has to be a well-defined type for all plugins 
in the application. We have something _close_ to this right now, but not quite. 

In order to get a proper generator schema we need to make the following changes: 
1. Formalize Data Type schemas
2. Formalize Export Type schemas
3. Create a root `GenerationDataSchema` type that gathers all types together.

#### Details 

**1. Data Types**

Most of them already have a `{PluginName}State` type to define the data they store internally, then that gets converted
via an optional `rowStateReducer` method (bad name!) into something more appropriate for the actual generation code since
a lot of that data is really UI-based. The gist of that was to allow a one-time conversion of the internal data so the 
generator code doesn't have to convert it on every iteration. So it was partly for performance, but also partly so the 
generator code receives a clean version of what it needs. 

We need to formalize that so each Data Type _requires_ defining a `{PluginName}GenerationType` which is exported
along with their main `bundle.ts`. The core app then uses that in the schema generation.

**2. Export Types**

These don't have the equivalent of a `rowStateReducer`. And the typings sure suck... Looks like there wasn't really much
difference between the internal state and what's needed for the generation code, so currently it uses the same type. 

This isn't explicit enough. Do something similar as with Data Types: require a new required type for the actual generation
settings. Not sure if we want to bother with creating an equivalent of a `rowStateReducer` though... maybe play it by ear.

**3. `GenerationDataSchema`**

At this point we should be able to create this without too much fuss. We'll probably need to construct is in _plugins or 
one of the build steps... maybe there'd be a runtime option, but maybe not. I kinda like the generated files - they're
easy to read & haven't caused any fuss.

At this point remove/update the JSON schemas defined in the Data Type's config.ts files. That was a leftover from 
v3 of generate data and isn't used. But keep in mind we'll want a runtime validation of the schema for non-TS usages of
the npm package.
