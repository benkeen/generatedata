/*global require:false*/
require.config({
	baseUrl: "",
	paths: {
		manager:           "resources/scripts/manager",
		appStartGenerated: "cache/appStartGenerated",
		pluginManager:     "resources/scripts/pluginManager",
		accountManager:    "resources/scripts/accountManager",
		constants:         "resources/scripts/constants.php?",
		generator:         "resources/scripts/generator",
		io:                "resources/scripts/io",
		utils:             "resources/scripts/utils",
		moment:            "resources/scripts/libs/moment.min",
		lang:              "resources/scripts/lang.php?",
		queue:             "resources/scripts/queue",
		pageInit:          "resources/scripts/pageInit",
		tablesorter:       "resources/scripts/libs/jquery.tablesorter.widgets.min"
	},
	shim: {
		"tablesorter": {
			deps: ['resources/scripts/libs/jquery.tablesorter.min']
		}
	},
	waitSeconds: 60
});
