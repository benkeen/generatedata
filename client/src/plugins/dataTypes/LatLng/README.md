# [Docs](../../../../../docs/README.md) &raquo; [Plugins](../../README.md) &raquo; [Data Types](../README.md) &raquo; LatLng

This Data Type generates a random latitude / longitude.

## Examples

This example generates three rows: a latitude, a longitude, and both, separated with a comma.
    
```javascript
{
    generationSettings: {
        numResults: 10
    },
    dataTemplate: [
        {
            plugin: 'LatLng',
            title: 'lat',
            settings: {
                lat: true,
                lng: false
            }
        },
        {
            plugin: 'LatLng',
            title: 'lng',
            settings: {
                lat: false,
                lng: true
            }
        },
        {
            plugin: 'LatLng',
            title: 'both-lat-and-lng',
            settings: {
                lat: true,
                lng: true
            }
        },
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

```typescript
[
    {
        "lat": -55.1789842432,
        "lng": 151.5933492224,
        "both-lat-and-lng": "8.7877393408, 43.5034121216"
    },
    {
        "lat": 0.4672530432,
        "lng": -61.3726205952,
        "both-lat-and-lng": "68.9980720128, -67.1795554304"
    },
    {
        "lat": -21.713129472,
        "lng": -148.3536177152,
        "both-lat-and-lng": "-76.6886816768, 59.1793447936"
    },
    {
        "lat": 27.9004695552,
        "lng": -167.0897762304,
        "both-lat-and-lng": "-22.875338752, 161.7839232"
    },
    {
        "lat": 61.4346559488,
        "lng": 80.5961156608,
        "both-lat-and-lng": "83.5639343104, -31.7441731584"
    },
    ...
]
```
