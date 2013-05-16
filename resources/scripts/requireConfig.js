/*global require:false*/
require.config({
	baseUrl: "resources/scripts/",
	paths: {
		"manager":        "manager",
		"pluginManager":  "pluginManager",
		"accountManager": "accountManager",
		"constants":      "constants.php?",
		"generator":      "generator",
		"io":             "io",
		"utils":          "utils",
		"jquery-json":    "libs/jquery.json-2.2.min",
		"jquery-ui":      "libs/jquery-ui.min",
		"moment":         "libs/moment.min",
		"lang":           "lang.php?",
		"tablesorter":    "libs/jquery.tablesorter.widgets.min"
	},
	shim: {
		"tablesorter": {
			deps: ['libs/jquery.tablesorter.min']
		}
	}
});