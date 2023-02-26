# [CLI](../../../../../cli/README.md) &raquo; [Plugins](../../../../../cli/PLUGINS.md) &raquo; Names

This Data Type generates a human name. It provides the following options to generate first names, male or female first
names, a surname and an initial. You can also generate regional names for a few countries that support the feature.

## Example npm package usages

These examples are in Typescript, but for JS just remove the typings. `DataType.Names` is just a string like 'Names', same with `ExportType`.

- [First and last names in separate fields](#first-and-last-names-in-separate-fields)
- Single name field with first name, last name with middle initial
- Single field containing Male first name, female first name, any name in a comma delimited list
- Single name field with different formats


### First and last names in separate fields

```typescript
{
    generationSettings: {
        numResults: 10
    },
    dataTemplate: [
        {
            plugin: DataType.Names,
            title: 'First Name',
            settings: {
                options: ['Name']
            }
        },
        {
            plugin: DataType.Names,
            title: 'Last Name',
            settings: {
                options: ['Surname']
            }
        }
    ],
    exportSettings: {
        plugin: ExportType.JSON,
        settings: {
            dataStructureFormat: 'simple'
        }
    }
}
```

Sample output:

```
[
    {
        "First Name": "Hayley",
        "Last Name": "Hopper"
    },
    {
        "First Name": "Wyatt",
        "Last Name": "Williams"
    },
    {
         "First Name": "Uriah",
         "Last Name": "Moses"
    },
    ...
]
```

### 2. Single name field with First name, Last name with middle initial

```typescript
{
    generationSettings: {
        numResults: 10
    },
    dataTemplate: [
        {
            plugin: DataType.Names,
            title: 'Name',
            settings: {
                options: ['Name Initial. Surname']
            }
        }
    ],
    exportSettings: {
        plugin: ExportType.JSON,
        settings: {
            dataStructureFormat: 'simple'
        }
    }
}
```

Sample output:

```

```
