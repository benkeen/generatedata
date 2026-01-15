# [Docs](../../../../../docs/README.md) &raquo; [Plugins](../../README.md) &raquo; [Data Types](../README.md) &raquo; TextFixed

This Data Type generates a fixed number of words. You supply two parameters: an array of words to pull from, and the number
of words you want to generate.

## Typings

```typescript
export type GenerationOptionsType = {
  words: string[];
  numWordsToGenerate: number;
};
```

### Examples

```javascript
{
    generationSettings: {
        numResults: 10
    },
    dataTemplate: [
        {
            plugin: 'TextFixed',
            title: 'text1',
            settings: {
                numWordsToGenerate: 2,
                words: ['One', 'Two', 'Three', 'Four']
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

```javascript

```
