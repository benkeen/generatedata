# [CLI](../../../../../cli/README.md) &raquo; [Plugins](../../../../../cli/PLUGINS.md) &raquo; Names

This Data Type generates a human name. It provides the following options to generate first names, male or female first
names, a surname and an initial. You can also generate regional names for a few countries that support the feature.

## Example npm package usages

These examples are in Typescript, but for JS just remove the typings. `DataType.Names` is just a string like 'Names', same with `ExportType`.

- [First and last names in separate fields](#first-and-last-names-in-separate-fields)
- [Single name field with first name, last name with middle initial](#single-name-field-with-first-name-last-name-with-middle-initial)
- [Single field containing Male first name, female first name, any name in a comma delimited list]()
- [Single name field with different formats](#single-name-field-with-different-formats)
- [Regional Names](#regional-names)


### First and last names in separate fields

```javascript
{
    generationSettings: {
        numResults: 10
    },
    dataTemplate: [
        {
            plugin: 'Names',
            title: 'First Name',
            settings: {
                options: ['Name']
            }
        },
        {
            plugin: 'Names',
            title: 'Last Name',
            settings: {
                options: ['Surname']
            }
        }
    ],
    exportSettings: {
        plugin: 'JSON',
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

### Single name field with First name, Last name with middle initial

```javascript
{
    generationSettings: {
        numResults: 10
    },
    dataTemplate: [
        {
            plugin: 'Names',
            title: 'Name',
            settings: {
                options: ['Name Initial. Surname']
            }
        }
    ],
    exportSettings: {
        plugin: 'XML',
        settings: {
            rootNodeName: 'listOfNames',
            recordNodeName: 'row'
        }
    }
}
```

Sample output:

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<listOfNames>
    <row>
        <Name>Eliana G. Riggs</Name>
    </row>
    <row>
        <Name>Charde T. Marquez</Name>
    </row>
    <row>
        <Name>Kieran I. Hendricks</Name>
    </row>
    <row>
        <Name>Hyatt F. Hendricks</Name>
    </row>
    <row>
        <Name>Martena U. O'donnell</Name>
    </row>
    ...
</listOfNames>
```

## Single field containing Male first name, female first name, any name in a comma delimited list

```javascript
{
    generationSettings: {
        numResults: 10
    },
    dataTemplate: [
        {
            plugin: 'Names',
            title: 'Name',
            settings: {
                options: ['MaleName, FemaleName, Name']
            }
        }
    ],
    exportSettings: {
        plugin: 'JSON',
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
        "Name List": "Demetrius, Xyla, Irma"
    },
    {
        "Name List": "Brian, Pamela, Quamar"
    },
    {
        "Name List": "Owen, Jacqueline, Magee"
    },
    {
        "Name List": "Quinn, MacKensie, Hyacinth"
    },
    ...
]
```

## Single name field with different formats

```javascript
{
    generationSettings: {
        numResults: 8
    },
    dataTemplate: [
        {
            plugin: 'Names',
            title: 'Any Formatted Name',
            settings: {
                options: ['Name Initial. Surname', 'Name Surname', 'Surname, Name']
            }
        }
    ],
    exportSettings: {
        plugin: 'JSON',
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
        "Any Formatted Name": "Rios, Wesley"
    },
    {
        "Any Formatted Name": "Beck, Kaitlin"
    },
    {
        "Any Formatted Name": "Aristotle I. Maxwell"
    },
    {
        "Any Formatted Name": "Ethan B. Levy"
    },
    {
        "Any Formatted Name": "Elvis Peters"
    },
    {
        "Any Formatted Name": "Nomlanga N. Dickson"
    },
    {
        "Any Formatted Name": "Mercado, Tashya"
    },
    {
        "Any Formatted Name": "Tanek W. Stevens"
    }
]
```


## Regional names

```javascript
{
    generationSettings: {
        numResults: 8
    },
    dataTemplate: [
        {
            plugin: 'Names',
            title: 'Vietnamese Name',
            settings: {
                options: ['Name Surname'],
                source: 'countries',
                selectedCountries: ['Vietnam']
            }
        },
        {
            plugin: 'Names',
            title: 'Nigerian Name',
            settings: {
                options: ['Name Surname'],
                source: 'countries',
                selectedCountries: ['Nigeria']
            }
        }
    ],
    exportSettings: {
        plugin: 'JSON',
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
        "Vietnamese Name": "Rae Nguyễn",
        "Nigerian Name": "Rose Bakare"
    },
    {
        "Vietnamese Name": "Timothy Nguyễn",
        "Nigerian Name": "Tad Makinde"
    },
    {
        "Vietnamese Name": "Slade Điền",
        "Nigerian Name": "Camille Ibekwe"
    },
    {
        "Vietnamese Name": "Ciaran Nguyễn",
        "Nigerian Name": "Ursa Ibekwe"
    },
    {
        "Vietnamese Name": "TaShya Nguyễn",
        "Nigerian Name": "Bernard Sofoluwe"
    },
    ...
]
```
