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
			navbar: {
				title: 'generatedata.com',
				logo: {
					alt: 'generatedata.com',
					src: 'img/dice180x180.png',
				},
				items: [
					{
						type: 'doc',
						docId: 'intro',
						position: 'left',
						label: 'Installation',
					},
					{
						type: 'doc',
						docId: 'v3',
						position: 'left',
						label: '3.x doc',
					}
				],
			},
			footer: {
				style: 'dark',
				links: [
					{
						title: 'Links',
						items: [
							{
								label: 'public site',
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
					}
				],
				copyright: `Copyright © ${new Date().getFullYear()} generatedata.com, built with Docusaurus.`,
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme,
			},
		}),
};

module.exports = config;
