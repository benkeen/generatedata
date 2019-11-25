const presets = [
	{
		"presets": [
			[
				"@babel/preset-env",
				{
					"useBuiltIns": "entry",
					"targets": {
						"esmodules": true
					}
				}
			],
			[
				"@babel/preset-react", {}
			]
		]
	}
];

module.exports = { presets };
