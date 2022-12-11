import { GetCountryData } from '~types/countries';

const China: GetCountryData = (i18n) => ({
	countryName: i18n.countryName,
	countrySlug: 'china',
	regionNames: i18n.regionNames,
	continent: 'asia',
	extendedData: {
		zipFormat: {
			format: 'Xxxxxx'
		},
		phoneFormat: {
			displayFormats: [
				'0xxx xxxx xxxx'
			]
		}
	},
	regions: [
		{
			regionName: i18n.regionNorthChina,
			regionShort: i18n.regionNorthChina,
			regionSlug: 'north_china',
			weight: 164,
			cities: [
				'Beijing',
				'Tianjin',
				'Hebei',
				'Shanxi',
				'Inner Mongolia'
			]
		},
		{
			regionName: i18n.regionNortheastChina,
			regionShort: i18n.regionNortheastChina,
			regionSlug: 'northeast_china',
			weight: 109,
			cities: [
				'Liaoning',
				'Jilin',
				'Heilongjiang'
			]
		},
		{
			regionName: i18n.regionEastChina,
			regionShort: i18n.regionEastChina,
			regionSlug: 'east_china',
			weight: 384,
			cities: [
				'Shanghai',
				'Jiangsu',
				'Zhejiang',
				'Anhui',
				'Fujian',
				'Jiangxi',
				'Shandong'
			]
		},
		{
			regionName: i18n.regionSouthCentralChina,
			regionShort: i18n.regionSouthCentralChina,
			regionSlug: 'south_central_china',
			weight: 384,
			cities: [
				'Henan',
				'Hubei',
				'Hunan',
				'Guangdong',
				'Guangxi',
				'Hainan',
				'Hong Kong',
				'Macau'
			]
		},
		{
			regionName: i18n.regionSouthwestChina,
			regionShort: i18n.regionSouthwestChina,
			regionSlug: 'southwest_china',
			weight: 192,
			cities: [
				'Chongqing',
				'Sichuan',
				'Guizhou',
				'Yunnan',
				'Tibet'
			]
		},
		{
			regionName: i18n.regionNorthwestChina,
			regionShort: i18n.regionNorthwestChina,
			regionSlug: 'northwest_china',
			weight: 96,
			cities: [
				'Shaanxi',
				'Gansu',
				'Qinghai',
				'Ningxia',
				'Xinjiang'
			]
		}
	]
});

export default China;
