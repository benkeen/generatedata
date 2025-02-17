# @generatedata/cli

> In active development (Feb 2025).

Since 4.2.0, the generatedata.com site is now available as a CLI. You can generate all the same data as you
can via the website, only via the command line from your own machine. There are two ways to do this:

- A _binary_ that you can run on the node command line, or
- JS code you can include and run in your own JS/TS applications.

Both are available via the `@generatedata/cli` npm package.

### Installation

`npm install @generatedata/cli`

The npm package contains both a command line tool and methods that can be used within your own JS/TS code.

#### Binary

```
npx generatedata --config=configFile.json
```

#### Typescript

```typescript
import { generate, GDTemplate } from '@generatedata/cli';

(async () => {
    const template: GDTemplate = { ... };
    await generate(template);
})();
```

## Configuration file

The configuration file defines three main things:

1. the _generation settings_: number or rows, the location and name of the filename and other settings
2. the _data format settings_: what sort of data you're generation: JSON, CSV, XML etc, plus related settings
   3: the _data template_: what exact data you want to generate and their order. Names, phone numbers, email addresses etc.

Here's a simple example that generates 1000 rows of first and last names in JSON format.

```json
{
  "generationSettings": {
    "numResults": 1000,
    "stripWhitespace": true,
    "locale": "en",
    "filename": "generated-data.json"
  },
  "dataFormatSettings": {
    "plugin": "JSON",
    "settings": {
      "dataStructureFormat": "simple"
    }
  },
  "dataTemplate": [
    {
      "plugin": "Names",
      "title": "First Name",
      "settings": {
        "options": ["Name"]
      }
    },
    {
      "plugin": "Names",
      "title": "Last Name",
      "settings": {
        "options": ["Surname"]
      }
    }
  ]
}
```

This file can get very large and hard to manually configure! The simplest way to create the file is to use the
[website](https://generatedata.com). There, just use the interface to construct the data set and format you want,
then click on the "Schema" icon at the bottom right. That will generate the configuration file which you can download
and use locally. **(This will be added in 4.2.0).**

Now let's look at the options a bit closer.

#### 1. generationSettings

This section contains all high-level settings about the data you're generating.

| Setting         | Type       | Required | Default value | Description                                                                                                                                                                                                                                                 |
| --------------- | ---------- | -------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| numResults      | `number`   | x        | -             | The number of rows of data you want to generate.                                                                                                                                                                                                            |
| stripWhitespace | `boolean`  |          | `false`       | Whether to remove all whitespace from the generated data. This can significantly reduce file/output size.                                                                                                                                                   |
| locale          | `GDLocale` |          | `en`          | Some of the plugins that generate the data ("Data Types") and formats ("Export Types") use language strings here and there. This settings controls what language is provided to them.                                                                       |
| target          | `string`   |          | `file`        | The default behaviour of the npm + binary package is to _generate a file_. However, if you want to just pipe it to STDOUT for the command line utility, or return the value from the `generate` npm package method, set this value to the string `output`'. |
| filename        | `string`   |          | `file`        | Required if you enter "file" for the `target` option. This is the name of the file you want to generate. You can also include a relative file path. Note that it'll be relative to where-ever you're executing the code (binary/npm package).               |

#### 2. dataFormatSettings

This contains the settings for the _format_ of the data you want, like XML, SQL etc.

...

#### 3. dataTemplate

This property contains an array of whatever type of data you want to generate, like Names, phone numbers etc. The types of
data are separate plugins, called Data Types. Each of them may have their own settings to control whatever sort of information
they provide. We'll provide links to all the available Data Types below with an example of how to configure them. But top-level,
all of these rows contain the same properties:

| Setting  | Type       | Required | Default value | Description                                                                                                                                                                                                                                                                                                                                                                                                       |
| -------- | ---------- | -------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| plugin   | `DataType` | x        | -             | The Data Type plugin name. This will correspond to the folder name (list below).                                                                                                                                                                                                                                                                                                                                  |
| title    | `string`   | x        | -             | This is used as an identifier for the row and will differ, depending on the Export Type you're choosing (e.g. HTML, XML, SQL, JSON etc.). For example, for XML it is used as the XML node name; for SQL the database column name; for JSON, the property name. As such, you'll need to enter a value that's valid for that export type or it will fail the validation step when you attempt to generate the data. |
| id       | `number`   |          | -             | Some Data Types allow you to _reference_ other rows. e.g. the Region Data Type lets you reference a Country row, so it generates a region within the random Country being generated. This ID column is used to provide that mapping. But you don't need to enter it otherwise.                                                                                                                                    |
| settings | `object`   |          | -             | This section contains whatever settings are needed/offered for this particular Data Type plugin you've chosen.                                                                                                                                                                                                                                                                                                    |

### Local dev

`yarn build`

-
- This generates the build artifacts.

Note: requires the main client/ application to have been built first. To do that just run `yarn build` in the root of the repo.

- `yarn dev` - runs index.ts for testing purposes
- `yarn test`

### Other scenarios

- Generating multiple different types in a single field
- Increasing probability of particular format being used over others
- Having one field be based on another field
  - e.g. regions (country, region, city, zip)
  - email addresses that look like the names of the users
  - doing math on the numeric result of another field
