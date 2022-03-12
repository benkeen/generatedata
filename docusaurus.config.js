// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: 'generatedata.com',
	tagline: 'Documentation',
	url: 'https://benkeen.github.io',
	baseUrl: '/generatedata/',
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',
	favicon: 'img/favicon.ico',
	organizationName: 'benkeen',
	projectName: 'generatedata',
	deploymentBranch: 'gh-pages',

	presets: [
		[
			'@docusaurus/preset-classic',
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					sidebarPath: require.resolve('./sidebars.js'),
					editUrl: 'https://github.com/benkeen/generatedata/tree/docs/',
					routeBasePath: '/'
				},
				blog: {
					showReadingTime: false,
					editUrl: 'https://github.com/benkeen/generatedata',
				},
				theme: {
					customCss: require.resolve('./src/css/custom.css'),
				},
			}),
		],
	],

	themeConfig:
	/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			colorMode: {
				// disableSwitch: true
			},
			navbar: {
				title: 'generatedata.com',
				logo: {
					alt: 'generatedata.com',
					src: 'img/dice180x180.png',
				},
				items: [
					{
						type: 'doc',
						docId: 'userdoc/intro',
						position: 'left',
						label: 'User Doc',
					},
					{
						type: 'doc',
						docId: 'developerdoc/intro',
						position: 'left',
						label: 'Developer Doc',
					}
				],
			},
			footer: {
				style: 'dark',
				links: [
					{
						title: ' ',
						items: [
							{
								label: 'website',
								to: 'https://generatedata.com',
							},
							{
								label: 'github',
								to: 'https://github.com/benkeen/generatedata',
							},
							{
								label: 'Report a bug / feature suggestion',
								to: 'https://github.com/benkeen/generatedata/issues',
							},
						],
					},
					{
						title: ' ',
						items: [
							{
								label: '3.x documentation',
								to: 'userdoc/v3',
							}
						]
					}
				]
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme,
			},
		}),
};

module.exports = config;
