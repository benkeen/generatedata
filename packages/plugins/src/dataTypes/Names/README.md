# [Docs](../../../../../docs/README.md) &raquo; [Plugins](../../README.md) &raquo; [Data Types](../README.md) &raquo; Names

This Data Type lets you generate realistic **names** in a wide variety of formats. The options available are: male or
female first names, surnames and initials, plus any combination of those in whatever order you want. You can also generate
regional names for specific countries that support the feature.

## Typings

The `settings` property for the `Names` plugin `dataTemplate` entry allows the following options (see examples below 
for an illustration of all of these):

```
{
    options: string[]; // an array of strings containing placeholders that get replaced with names
    source?: NamesSource; // 'any' or 'countries'
    selectedCountries?: CountryNameFiles[]; // see typing for list of support countries, but array of country names
}
```

## Placeholders

The `options` property is an array of strings that outlines a list of name formats. The script will randomly choose 
one of the formats for each row (see the [Single name field with different formats](#single-name-field-with-different-formats) 
for an illustration of this). These are the available placeholders within that field:

- `Name` - a random first name (male or female)
- `FemaleName` - a random female name
- `MaleName` - a random male name
- `Initial` - a random letter, generally you'll want to follow this with a period
- `Surname` - a random surname.


## Examples

- [First and last names in separate fields](#first-and-last-names-in-separate-fields)
- [Single name field with first name, last name with middle initial](#single-name-field-with-first-name-last-name-with-middle-initial)
- [Single field containing male name, female name, any gender name in a comma delimited list](#single-field-containing-male-name-female-name-any-gender-name-in-a-comma-delimited-list)
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

### Single name field with first name, last name with middle initial

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

## Single field containing male name, female name, any gender name in a comma delimited list

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

