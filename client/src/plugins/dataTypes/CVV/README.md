# [Docs](../../../../../docs/README.md) &raquo; [Plugins](../../README.md) &raquo; [Data Types](../README.md) &raquo; CVV

CVV stands for Card Verification Value. It's that 3-digit number you see on the back of your credit card. This Data Type
generates a random CVV.

### Example API Usage

```javascript
{
    "numRows": 20,
    "rows": [
        {
            "type": "CVV",
            "title": "CVV"
        }
    ],
    "export": {
        "type": "JSON",
        "settings": {
            "stripWhitespace": false,
            "dataStructureFormat": "complex"
        }
    }
}
```
