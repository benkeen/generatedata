"use strict";
exports.__esModule = true;
var randomUtils_1 = require("../../../utils/randomUtils");
exports.rowStateReducer = function (state) { return state.value; };
exports.generate = function (data) {
    var formats = data.rowState.split('|');
    var chosenFormat = formats[0];
    if (formats.length > 1) {
        chosenFormat = formats[randomUtils_1.getRandomNum(0, formats.length - 1)];
    }
    var val = randomUtils_1.generateRandomAlphanumericStr(chosenFormat);
    return { display: val };
};
exports.getMetadata = function () { return ({
    sql: {
        field: 'varchar(255)',
        field_Oracle: 'varchar2(255)',
        field_MSSQL: 'VARCHAR(255) NULL'
    }
}); };
