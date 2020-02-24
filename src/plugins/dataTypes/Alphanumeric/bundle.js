"use strict";
exports.__esModule = true;
var Alphanumeric_ui_1 = require("./Alphanumeric.ui");
var Alphanumeric_generate_1 = require("./Alphanumeric.generate");
var config = {
    name: 'Boolean',
    fieldGroup: 'numeric',
    fieldGroupOrder: 10,
    // could we just use TS here? Rethink this.
    schema: {
        $schema: 'http://json-schema.org/draft-04/schema#',
        type: 'object',
        properties: {
            placeholder: {
                type: 'string'
            }
        },
        required: [
            'placeholder'
        ]
    }
};
exports["default"] = {
    config: config,
    Example: Alphanumeric_ui_1.Example,
    Options: Alphanumeric_ui_1.Options,
    Help: Alphanumeric_ui_1.Help,
    rowStateReducer: Alphanumeric_generate_1.rowStateReducer,
    generate: Alphanumeric_generate_1.generate,
    getMetadata: Alphanumeric_generate_1.getMetadata
};
