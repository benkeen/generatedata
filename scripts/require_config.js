require.config({
	paths: {
		"mediator":    "scripts/mediator",
		"controller":  "scripts/controller",
		"constants":   "scripts/constants",
		"generator":   "scripts/generator",
		"utils":       "scripts/utils",
		"jquery":      "scripts/libs/jquery",
		"jquery-json": "scripts/libs/jquery.json-2.2.min",
		"jquery-ui":   "scripts/libs/jquery-ui-1.8.19.custom.min",
		"lang":        "scripts/lang?"
	},
    shim: {
        'jqueryjson': ['scripts/libs/jquery'],
        'jquery-ui':  ['scripts/libs/jquery'],
    }
});