/*global require:false*/
require.config({
	baseUrl: "resources/scripts/",
	paths: {
		"manager":        "manager",
		appStartGenerated: "../../cache/appStartGenerated",
		"pluginManager":  "pluginManager",
		"accountManager": "accountManager",
		"constants":      "constants.php?",
		"generator":      "generator",
		"io":             "io",
		"utils":          "utils",
		"moment":         "libs/moment.min",
		"lang":           "lang.php?",
		"tablesorter":    "libs/jquery.tablesorter.widgets.min"
	},
	shim: {
		"tablesorter": {
			deps: ['libs/jquery.tablesorter.min']
		}
	},
	waitSeconds: 60
});