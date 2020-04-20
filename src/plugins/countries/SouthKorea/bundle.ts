import { CountryType } from '../../../../types/countries';

export default (i18n: any): CountryType => ({
	countryName: i18n.countryName,
	countrySlug: 'southkorea',
	regionNames: i18n.regionNames,
	continent: 'asia',
	extendedData: {
		zipFormat: {
			format: 'Xxxxx',
			replacements: {
				'X': '012',
				'x': '0123456789'
			}
		},
		phoneFormat: {
			areaCodes: [
				'031', '032', '033', '041', '042', '043', '044', '049', '051', '052', '053', '054', '055', '061',
				'062', '063', '064'
			],
			displayFormats: [
				'AAA-xxx-xxxx'
			]
		}
	},
	regions: [
		{
			regionName: 'North Chungcheong',
			regionShort: 'Chungbuk',
			regionSlug: 'chungbuk',
			weight: 16,
			cities: [
				'Chungju', 'Jecheon'
			]
		},
		{
			regionName: 'South Chungcheong',
			regionShort: 'Chungnam',
			regionSlug: 'chungnam',
			weight: 20,
			cities: [
				'Daejeon', 'Asan', 'Dangjin', 'Nonsan', 'Gongju', 'Boryeong'
			]
		},
		{
			regionName: 'Gangwon',
			regionShort: 'Gangwon',
			regionSlug: 'gangwon',
			weight: 15,
			cities: [
				'Wonju', 'Chuncheon', 'Gangneung'
			]
		},
		{
			regionName: 'Gyeonggi',
			regionShort: 'Gyeonggi',
			regionSlug: 'gyeonggi',
			weight: 122,
			cities: [
				'Seoul', 'Incheon', 'Gwangju', 'Suwon', 'Goyang', 'Yongin', 'Seongnam', 'Bucheon', 'Ansan', 'Namyangju',
				'Hwaseong', 'Anyang', 'Pyeongtaek', 'Siheung', 'Uijeongbu', 'Paju', 'Gimpo', 'Gwangmyeong', 'Gwangju',
				'Gunpo', 'Osan', 'Icheon', 'Yangju', 'Anseong', 'Guri', 'Pocheon', 'Uiwang', 'Hanam', 'Yeoju', 'Dongducheon'
			]
		},
		{
			regionName: 'North Gyeongsang',
			regionShort: 'Gyeongbuk',
			regionSlug: 'gyeongbuk',
			weight: 27,
			cities: [
				'Cheongju', 'Pohang', 'Gumi', 'Gyeongsan', 'Gyeongju', 'Andong', 'Gimcheon', 'Yeongju', 'Sangju',
				'Yeongcheon'
			]
		},
		{
			regionName: 'South Gyeongsang',
			regionShort: 'Gyeongnam',
			regionSlug: 'gyeongnam',
			weight: 34,
			cities: [
				'Busan', 'Daegu', 'Ulsan', 'Changwon', 'Cheonan', 'Gimhae', 'Jinju', 'Yangsan', 'Geoje', 'Seosan',
				'Tongyeong', 'Sacheon', 'Miryang'
			]
		},
		{
			regionName: 'North Jeolla',
			regionShort: 'Jeonbuk',
			regionSlug: 'jeonbuk',
			weight: 34,
			cities: [
				'Jeonju', 'Iksan', 'Gunsan', 'Jeongeup'
			]
		},
		{
			regionName: 'South Jeolla',
			regionShort: 'Jeonnam',
			regionSlug: 'jeonnam',
			weight: 19,
			cities: [
				'Yeosu', 'Suncheon', 'Mokpo', 'Gwangyang'
			]
		},
		{
			regionName: 'Jeju',
			regionShort: 'Jeju',
			regionSlug: 'jeju',
			weight: 5,
			cities: [
				'Jeju', 'Seogwipo'
			]
		}
	]
});
