


	// register our module
	manager.registerCoreModule(MODULE_ID, {
		run: _run
	});


	// the public API
	return {
		getCurrConfigurationID: function() {
			return _currConfigurationID;
		},

		getAccount: _getAccount,

		saveConfiguration: _saveConfiguration,

		getConfiguration: _getConfiguration
	};

});