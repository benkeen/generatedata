// https://en.wikipedia.org/wiki/Category:Cities_and_towns_in_Russia_by_federal_subject
import { GetCountryData } from '~types/countries';

const Russia: GetCountryData = (i18n) => ({
	countryName: i18n.countryName,
	countrySlug: 'RU',
	regionNames: i18n.regionNames,
	continent: 'europe',

	// Federal Cities (3} = Moscow, Saint Petersburg, Sevastopol
	// Oblast (46}= Province or Region
	// Krai = Territory (Same as Oblast, but designation is historic}
	// Republic = Home to specific Ethinic Minorities

	extendedData: {
		// the general zip format for the country. This may be optionally overridden for each region if a more
		// specific format is desired. To prevent duplicate code, the replacements listed here cover ALL zip formats
		// for each province
		zipFormat: {
			format: '%*****',
			replacements: {
				'%': '123456789',
				'*': '0123456789',

				// used in individual federal subjects
				'-': '01', // (Kurgan, Ryazan, Tula} Oblast
				'&': '012', // Moscow City, (Pskov, Tver, Vologda, Orenburg, Penza, Vladimir, Yaroslavl} Oblast
				'+': '0123',	// (Kirov, Novosibirsk, Saratov} Oblast
				'U': '01234',	// (Kemerovo, Moscow, Sverdlovsk, Volgograd} Oblast
				'X': '012345', // Moscow City
				'P': '123',	// Bryansk Oblast
				'Z': '23',	// (Oryol, Tambov, Ulyanovsk} Oblast
				'}': '34',	// (Sakhalin, Murmansk} Oblast
				'T': '345',	// (Ivanovo, Novgorod} Oblast
				'^': '3456',	// (Arkhangelsk, Samara} Oblast
				'Y': '34567', // Nizhny Novgorod Oblast
				'S': '456',	// (Astrakhan, Smolensk, Omsk, Tomsk} Oblast
				'R': '4567',	// (Chelyabinsk, Rostov, Voronezh} Oblast
				'#': '4569',	// Irkutsk Oblast
				'(': '56',	// (Amur, Magadan} Oblast
				'Q': '567',	// (Kursk, Tyumen} Oblast
				'V': '67',	// Kostroma Oblast
				'?': '678',	// Kalingrad Oblast
				'W': '78',	// Leningrad Oblast
				'@': '89',	// (Belgorod, Kaluga, Lipetsk} Oblast
			}
		},

		// the general phone format and area codes for the country
		// https://en.wikipedia.org/wiki/Telephone_numbers_in_Russia
		// https://www.itu.int/oth/T02020000AD/en
		phoneFormat: {
			areaCodes: [
				301, 		// Republic of Buryatia (Ulan – Ude}
				302, 		// Zabaykalsky Krai, Chita region together with the Agin-Buryat autonomous region (Chita}
				336,		// Baikonur
				341, 		// Republic of Udmurtia (Izhevsk}
				342, 		// Perm Krai (Perm}
				343, 		// Sverdlovsk Oblast (Ekaterinburg}
				345, 		// Tyumen Oblast (Tyumen}
				346, 		// Khanty–Mansi Autonomous Okrug – Yugra (Surgut}
				347, 		// Republic of Bashkortostan (Ufa}
				349, 		// Yamalo-Nenets Autonomous Okrug (Salekhard}
				351, 		// Chelyabinsk Oblast (Chelyabinsk}
				352, 		// Kurgan Oblast (Kurgan}
				353, 		// Orenburg Oblast (Orenburg}
				365,		// Republic of Crimea* (Simferopol}
				381, 		// Omsk Oblast (Omsk}
				382, 		// Tomsk Oblast (Tomsk}
				383, 		// Novosibirsk Oblast (Novosibirsk}
				384, 		// Kemerovo Oblast (Kemerovo}
				385,		// Altai Krai (Barnaul}
				387, 		// Altai Krai
				388, 		// Altai Krai (Gorno-Altaisk}
				390, 		// Republic of Khakassia (Abakan}
				391, 		// Krasnoyarsk Krai in conjunction with the Evenk Oblast and Taimyr (Dolgan-Nenets} Oblast (Krasnoyarsk}
				394, 		// Republic of Tyva (Kyzyl}
				395, 		// Irkutsk Oblast (Irkutsk}
				401, 		// Kaliningrad Oblast (Kaliningrad}
				411, 		// Sakha Republic (Yakutia} (Yakutsk}
				413, 		// Magadan Oblast (Magadan}
				415, 		// Kamchatka Krai and Koryak autonomous region (Petropavlovsk-Kamchatsky}
				416, 		// Amur Oblast (Blagoveshchensk}
				421, 		// Khabarovsk Krai (Khabarovsk}
				423, 		// Primorsky Krai (Vladivostok}
				424, 		// Sakhalin Oblast (Yuzhno-Sakhalinsk}
				426, 		// Jewish Autonomous Oblast (Birobidzhan}
				427, 		// Chukotka Autonomous Okrug (Anadyr}
				471, 		// Kursk Oblast (Kursk}
				472, 		// Belgorod Oblast (Belgorod}
				473, 		// Voronezh Oblast (Voronezh}
				474, 		// Lipetsk Oblast (Lipetsk}
				475, 		// Tambov Oblast (Tambov}
				481, 		// Smolensk Oblast (Smolensk}
				482, 		// Tver Oblast (Tver}
				483, 		// Bryansk Oblast (Bryansk}
				484, 		// Kaluga Oblast
				485, 		// Yaroslavl Oblast (Yaroslavl}
				486, 		// Oryol Oblast (Orel}
				487, 		// Tula Oblast (Tula}
				491, 		// Ryazan Oblast (Ryazan}
				492, 		// Vladimir Oblast (Vladimir}
				493, 		// Ivanovo Oblast (Ivanovo}
				494, 		// Kostroma Oblast (Kostroma}
				495, 499, 	// Moscow City
				496, 498, 	// Moscow Oblast
				811, 		// Pskov Oblast (Pskov}
				812, 		// Saint Petersburg
				813, 820,	// Volgograd Oblast
				813, 		// Leningrad Oblast
				814, 		// Republic of Karelia (Petrozavodsk}
				815, 		// Murmansk Oblast (Murmansk}
				816, 		// Novgorod Oblast (Velikiy Novgorod}
				817,		// Vologda Oblast (Vologda}
				818, 		// Arkhangelsk Oblast (Arkhangelsk}
				821, 		// Komi Republic (Syktyvkar}
				831, 		// Nizhny Novgorod Oblast (Nizhny Novgorod}
				833, 		// Kirov Oblast (Kirov}
				834, 		// Republic of Mordovia (Saransk}
				835, 		// Republic of Chuvashia (Cheboksary}
				836, 		// Republic of Mari El (Yoshkar-Ola}
				841, 		// Penza Oblast (Penza}
				842, 		// Ulyanovsk Oblast (Ulyanovsk}
				843,		// Republic of Tatarstan (Kazan}
				844, 		// Volgograd Oblast (Volgograd}
				845, 		// Saratov Oblast (Saratov}
				846,	 	// Samara Oblast (Samara}
				847, 		// Republic of Kalmykia (Elista}
				848,		// Samara Oblast (Tolyatti}
				851, 		// Astrakhan Oblast (Astrakhan}
				855,		// Republic of Tatarstan (Naberezhnye Chelny}
				861,		// Krasnodar Krai (Krasnodar}
				862,		// Krasnodar Krai (Sochi}
				863, 		// Rostov Oblast (Rostov-on Don}
				865,		// Stavropol Krai (Stavropol}
				866, 		// Republic of Kabardino-Balkaria (Nalchik}
				867, 		// Republic of North Ossetia–Alania (Vladikavkaz}
				869,		// Sevastopol City
				871, 		// Republic of Chechnya (Grozny}
				872, 		// Republic of Dagestan (Makhachkala}
				873, 		// Republic of Ingushetia (Nazran}
				877,		// Republic of Adygea (Maikop}
				878, 		// Republic of Karachayevo-Cherkessia (Cherkessk}
				879,		// Stavropol Krai (Mineralnye Vody}
				900, 901, 902, 903, 904, 905, 906, 907, 908, 909,	// Mobile networks
				910, 911, 912, 913, 914, 915, 916, 917, 918, 919,	// Mobile networks
				920, 921, 922, 923, 924, 925, 926, 927, 928, 929,	// Mobile networks
				930, 931, 932, 933, 934, 935, 936, 937, 938, 939,	// Mobile networks
				940, 941, 942, 943, 944, 945, 946, 947, 948, 949,	// Mobile networks
				950, 951, 952, 953, 955, 956, 957, 958, 959,	// Mobile networks
				960, 961, 962, 963, 964, 965, 966, 967, 968, 969,	// Mobile networks
				972, 973, 974, 975, 976, 977, 978, 979,	// Mobile networks
				980, 981, 982, 983, 984, 985, 986, 987, 988, 989,	// Mobile networks
				990, 991, 992, 993, 994, 995, 996, 997, 998, 999,	// Mobile networks
			],
			displayFormats: [
				'(AAA} Xxx-xx-xx',
				'+7 AAAXxxxxxx',
				'+7 (AAA} Xxx-xx-xx', // Outside Russia use 7 as Country Calling Code
				'+7-AAA-Xxx-xx-xx'
			]
		}
	},
	regions: [
		// Federal Cities
		{
			regionName: 'Moscow City',
			regionShort: 'Moscow',
			regionSlug: 'moscow-city',
			weight: 11,
			cities: [
				'Moscow'
			],
			extendedData: {
				zipFormat: {
					format: '1+X***'
				},
				phoneFormat: {
					areaCodes: [495, 499]
				}
			}
		},
		{
			regionName: 'Saint Petersburg City',
			regionShort: 'Saint Petersburg', // ISO 3166 code
			regionSlug: 'saint_petersburg-city',
			weight: 11,
			cities: [
				'Saint Petersburg'
			],
			extendedData: {
				zipFormat: {
					format: '19****'
				},
				phoneFormat: {
					areaCodes: [812]
				}
			}
		},

		// TODO: Need zipFormat for Sevastopol City
		{
			regionName: 'Sevastopol City',
			regionShort: 'Sevastopol', // ISO 3166 code
			regionSlug: 'sevastopol-city',
			weight: 11,
			cities: [
				'Sevastopol'
			],
			extendedData: {
				zipFormat: {
					format: '%*****'
				},
				phoneFormat: {
					areaCodes: [869]
				}
			}
		},

		// Oblasts
		{
			regionName: 'Amur Oblast',
			regionShort: 'AMU', // 'RU-AMU', // ISO 3166 code
			regionSlug: 'amur-oblast',
			weight: 50,
			cities: [
				'Belogorsk', 'Blagoveshchensk', 'Raychikhinsk', 'Shimanovsk', 'Skovorodino', 'Svobodny', 'Tynda', 'Zavitinsk',
				'Zeya'
			],
			extendedData: {
				zipFormat: {
					format: '67(***'
				},
				phoneFormat: {
					areaCodes: [416]
				}
			}
		},
		{
			regionName: 'Arkhangelsk Oblast',
			regionShort: 'ARK', // 'RU-ARK', // ISO 3166 code
			regionSlug: 'arkhangelsk-oblast',
			weight: 50,
			cities: [
				'Arkhangelsk', 'Brin-Navolok', 'Kargopol', 'Koryazhma', 'Kotlas', 'Mezen', 'Mirny', 'Novodvinsk',
				'Nyandoma', 'Onega', 'Severodvinsk', 'Shenkursk', 'Solvychegodsk', 'Velsk'
			],
			extendedData: {
				zipFormat: {
					format: '16^***'
				},
				phoneFormat: {
					areaCodes: [818]
				}
			}
		},
		{
			regionName: 'Astrakhan Oblast',
			regionShort: 'AST', // 'RU-AST', // ISO 3166 code
			regionSlug: 'astrakhan-oblast',
			weight: 50,
			cities: [
				'Astrakhan', 'Akhtubinsk', 'Kamyzyak', 'Kharabali', 'Narimanov', 'Znamensk'
			],
			extendedData: {
				zipFormat: {
					format: '41S***'
				},
				phoneFormat: {
					areaCodes: [851]
				}
			}
		},
		{
			regionName: 'Belgorod Oblast',
			regionShort: 'BEL', // 'RU-BEL', // ISO 3166 code
			regionSlug: 'belgorod-oblast',
			weight: 50,
			cities: [
				'Alexeyevka', 'Belgorod', 'Biryuch', 'Borisovka', 'Grayvoron', 'Gubkin', 'Korocha', 'Krasnaya Yaruga',
				'Novy Oskol', 'Rakitnoye', 'Shebekino', 'Stary Oskol', 'Stroitel', 'Valuyki', 'Volokonovka'
			],
			extendedData: {
				zipFormat: {
					format: '30@***'
				},
				phoneFormat: {
					areaCodes: [472]
				}
			}
		},
		{
			regionName: 'Bryansk Oblast',
			regionShort: 'BRY', // 'RU-BRY', // ISO 3166 code
			regionSlug: 'bryansk-oblast',
			weight: 50,
			cities: [
				'Bryansk', 'Dyatkovo', 'Fokino', 'Karachev', 'Klintsy', 'Mglin', 'Novozybkov', 'Pochep',
				'Seltso', 'Sevsk', 'Starodub', 'Surazh', 'Trubchevsk', 'Unecha', 'Vialky', 'Zhukovka',
				'Zlynka'
			],
			extendedData: {
				zipFormat: {
					format: '24P***'
				},
				phoneFormat: {
					areaCodes: [483]
				}
			}
		},
		{
			regionName: 'Chelyabinsk Oblast',
			regionShort: 'CHE', // 'RU-CHE', // ISO 3166 code
			regionSlug: 'chelyabinsk-oblast',
			weight: 50,
			cities: [
				'Asha', 'Bakal', 'Chelyabinsk', 'Karabash', 'Kartaly', 'Kasli', 'Katav-Ivanovsk', 'Kopeysk',
				'Korkino', 'Kusa', 'Kyshtym', 'Magnitogorsk', 'Miass', 'Minyar', 'Nyazepetrovsk', 'Ozyorsk',
				'Plast', 'Satka', 'Sim', 'Snezhinsk', 'Troitsk', 'Tryokhgorny', 'Ust-Katav', 'Verkhneuralsk',
				'Verkhny Ufaley', 'Yemanzhelinsk', 'Yuryuzan', 'Yurzhnouralsk', 'Zlatoust'
			],
			extendedData: {
				zipFormat: {
					format: '45R***'
				},
				phoneFormat: {
					areaCodes: [351]
				}
			}
		},
		{
			regionName: 'Irkutsk Oblast',
			regionShort: 'IRK', // 'RU-IRK', // ISO 3166 code
			regionSlug: 'irkutsk-oblast',
			weight: 50,
			cities: ['Irkutsk'],
			extendedData: {
				zipFormat: {
					format: '66#***'
				},
				phoneFormat: {
					areaCodes: [395]
				}
			}
		},
		{
			regionName: 'Ivanovo Oblast',
			regionShort: 'IVA', // 'RU-IVA', // ISO 3166 code
			regionSlug: 'ivanovo-oblast',
			weight: 50,
			cities: ['Ivanovo'],
			extendedData: {
				zipFormat: {
					format: '15T***'
				},
				phoneFormat: {
					areaCodes: [493]
				}
			}
		},
		{
			regionName: 'Kaliningrad Oblast',
			regionShort: 'KGD', // 'RU-KGD', // ISO 3166 code
			regionSlug: 'kaliningrad-oblast',
			weight: 50,
			cities: ['Kaliningrad'],
			extendedData: {
				zipFormat: {
					format: '23?***'
				},
				phoneFormat: {
					areaCodes: [401]
				}
			}
		},
		{
			regionName: 'Kaluga Oblast',
			regionShort: 'KLU', // 'RU-KLU', // ISO 3166 code
			regionSlug: 'kaluga-oblast',
			weight: 50,
			cities: ['Kaluga'],
			extendedData: {
				zipFormat: {
					format: '24@***'
				},
				phoneFormat: {
					areaCodes: [484]
				}
			}
		},
		{
			regionName: 'Kemerovo Oblast',
			regionShort: 'KEM', // 'RU-KEM', // ISO 3166 code
			regionSlug: 'kemerovo-oblast',
			weight: 50,
			cities: ['Kemerovo'],
			extendedData: {
				zipFormat: {
					format: '65U***'
				},
				phoneFormat: {
					areaCodes: [384]
				}
			}
		},
		{
			regionName: 'Kirov Oblast',
			regionShort: 'KIR', // 'RU-KIR', // ISO 3166 code
			regionSlug: 'kirov-oblast',
			weight: 50,
			cities: ['Kirov'],
			extendedData: {
				zipFormat: {
					format: '61+***'
				},
				phoneFormat: {
					areaCodes: [833]
				}
			}
		},
		{
			regionName: 'Kostroma Oblast',
			regionShort: 'KOS', // 'RU-KOS', // ISO 3166 code
			regionSlug: 'kostroma-oblast',
			weight: 50,
			cities: ['Kostroma'],
			extendedData: {
				zipFormat: {
					format: '15V***'
				},
				phoneFormat: {
					areaCodes: [494]
				}
			}
		},
		{
			regionName: 'Kurgan Oblast',
			regionShort: 'KGN', // 'RU-KGN', // ISO 3166 code
			regionSlug: 'kurgan-oblast',
			weight: 50,
			cities: ['Kurgan'],
			extendedData: {
				zipFormat: {
					format: '64-***'
				},
				phoneFormat: {
					areaCodes: [352]
				}
			}
		},
		{
			regionName: 'Kursk Oblast',
			regionShort: 'KRS', // 'RU-KRS', // ISO 3166 code
			regionSlug: 'kursk-oblast',
			weight: 50,
			cities: ['Kursk'],
			extendedData: {
				zipFormat: {
					format: '30Q***'
				},
				phoneFormat: {
					areaCodes: [471]
				}
			}
		},
		{
			regionName: 'Leningrad Oblast',
			regionShort: 'LEN', // 'RU-LEN', // ISO 3166 code
			regionSlug: 'leningrad-oblast',
			weight: 50,
			cities: ['Gatchina', 'Ivangorod'],
			extendedData: {
				zipFormat: {
					format: '18W***'
				},
				phoneFormat: {
					areaCodes: [813]
				}
			}
		},
		{
			regionName: 'Lipetsk Oblast',
			regionShort: 'LIP', // 'RU-LIP', // ISO 3166 code
			regionSlug: 'lipetsk-oblast',
			weight: 50,
			cities: ['Lipetsk'],
			extendedData: {
				zipFormat: {
					format: '39@***'
				},
				phoneFormat: {
					areaCodes: [474]
				}
			}
		},
		{
			regionName: 'Magadan Oblast',
			regionShort: 'MAG', // 'RU-MAG', // ISO 3166 code
			regionSlug: 'magadan-oblast',
			weight: 50,
			cities: ['Magadan'],
			extendedData: {
				zipFormat: {
					format: '68(***'
				},
				phoneFormat: {
					areaCodes: [413]
				}
			}
		},
		{
			regionName: 'Moscow Oblast',
			regionShort: 'MOS', // 'RU-MOS', // ISO 3166 code
			regionSlug: 'moscow-oblast',
			weight: 11,

			// https://en.wikipedia.org/wiki/Category:Cities_and_towns_in_Moscow_Oblast
			cities: [
				'Aprelevka', 'Balashikha', 'Bolshevo', 'Bronnitsy', 'Chekhov', 'Chernogolovka', 'Dedovsk', 'Dmitrov',
				'Dolgoprudny', 'Domodedovo', 'Drezna', 'Dubna', 'Dzerzhinsky', 'Elektrogorsk', 'Elektrostal', 'Elektrougli',
				'Fryazino', 'Golitsyno', 'Istra', 'Ivanteyevka', 'Kalininets', 'Kashira', 'Khimki', 'Khotkovo',
				'Klimovsk', 'Klin', 'Kolomna', 'Korolyov', 'Kotelniki', 'Krasnoarmeysk', 'Krasnogorsk', 'Krasnozavodsk',
				'Krasnoznamensk', 'Kubinka', 'Kurovskoye', 'Likino-Dulyovo', 'Lobnya', 'Losino-Petrovsky', 'Lukhovitsy', 'Lytkarino',
				'Lyubertsy', 'Mozhaysk', 'Mytishchi', 'Naro-Fominsk', 'Noginsk', 'Odintsovo', 'Orekhovo-Zuyevo', 'Ozherelye',
				'Ozyory', 'Pavlovsky Posad', 'Peresvet', 'Podolsk', 'Protvino', 'Pushchino', 'Pushkino', 'Ramenskoye',
				'Reutov', 'Roshal', 'Ruza', 'Sergiyev Posad', 'Serpukhov', 'Shatura', 'Shchyolkovo', 'Solnechnogorsk',
				'Staraya Kupavna', 'Stupino', 'Svitino', 'Taldom', 'Vereya', 'Vidnoye', 'Volokolamsk', 'Voskresensk',
				'Vysokovsk', 'Yakhroma', 'Yegoryevsk', 'Zaraysk', 'Zhukovsky', 'Zvenigorod'
			],
			extendedData: {
				zipFormat: {
					format: '14U***'
				},
				phoneFormat: {
					areaCodes: [496, 498]
				}
			}
		},
		{
			regionName: 'Murmansk Oblast',
			regionShort: 'MUR', // 'RU-MUR', // ISO 3166 code
			regionSlug: 'murmansk-oblast',
			weight: 50,
			cities: ['Murmansk'],
			extendedData: {
				zipFormat: {
					format: '18}***'
				},
				phoneFormat: {
					areaCodes: [815]
				}
			}
		},
		{
			regionName: 'Nizhny Novgorod Oblast',
			regionShort: 'NIZ', // 'RU-NIZ', // ISO 3166 code
			regionSlug: 'nizhny_novgorod-oblast',
			weight: 50,
			cities: ['Nizhny'],
			extendedData: {
				zipFormat: {
					format: '60Y***'
				},
				phoneFormat: {
					areaCodes: [831]
				}
			}
		},
		{
			regionName: 'Novgorod Oblast',
			regionShort: 'NGR', // 'RU-NGR', // ISO 3166 code
			regionSlug: 'novgorod-oblast',
			weight: 50,
			cities: ['Novgorod'],
			extendedData: {
				zipFormat: {
					format: '17T***'
				},
				phoneFormat: {
					areaCodes: [816]
				}
			}
		},
		{
			regionName: 'Novosibirsk Oblast',
			regionShort: 'NVS', // 'RU-NVS', // ISO 3166 code
			regionSlug: 'novosibirsk-oblast',
			weight: 50,
			cities: ['Novosibirsk'],
			extendedData: {
				zipFormat: {
					format: '63+***'
				},
				phoneFormat: {
					areaCodes: [383]
				}
			}
		},
		{
			regionName: 'Omsk Oblast',
			regionShort: 'OMS', // 'RU-OMS', // ISO 3166 code
			regionSlug: 'omsk-oblast',
			weight: 50,
			cities: ['Omsk'],
			extendedData: {
				zipFormat: {
					format: '64S***'
				},
				phoneFormat: {
					areaCodes: [381]
				}
			}
		},
		{
			regionName: 'Orenburg Oblast',
			regionShort: 'ORE', // 'RU-ORE', // ISO 3166 code
			regionSlug: 'orenburg-oblast',
			weight: 50,
			cities: ['Orenburg'],
			extendedData: {
				zipFormat: {
					format: '46&***'
				},
				phoneFormat: {
					areaCodes: [353]
				}
			}
		},
		{
			regionName: 'Oryol Oblast',
			regionShort: 'ORL', // 'RU-ORL', // ISO 3166 code
			regionSlug: 'oryol-oblast',
			weight: 50,
			cities: ['Oryol'],
			extendedData: {
				zipFormat: {
					format: '30Z***'
				},
				phoneFormat: {
					areaCodes: [486]
				}
			}
		},
		{
			regionName: 'Penza Oblast',
			regionShort: 'PNZ', // 'RU-PNZ', // ISO 3166 code
			regionSlug: 'penza-oblast',
			weight: 50,
			cities: ['Penza'],
			extendedData: {
				zipFormat: {
					format: '44&***'
				},
				phoneFormat: {
					areaCodes: [841]
				}
			}
		},
		{
			regionName: 'Pskov Oblast',
			regionShort: 'PSK', // 'RU-PSK', // ISO 3166 code
			regionSlug: 'pskov-oblast',
			weight: 50,
			cities: ['Pskov'],
			extendedData: {
				zipFormat: {
					format: '18&***'
				},
				phoneFormat: {
					areaCodes: [811]
				}
			}
		},
		{
			regionName: 'Rostov Oblast',
			regionShort: 'ROS', // 'RU-ROS', // ISO 3166 code
			regionSlug: 'rostov-oblast',
			weight: 50,
			cities: ['Rostov'],
			extendedData: {
				zipFormat: {
					format: '34R***'
				},
				phoneFormat: {
					areaCodes: [863]
				}
			}
		},
		{
			regionName: 'Ryazan Oblast',
			regionShort: 'RYA', // 'RU-RYA', // ISO 3166 code
			regionSlug: 'ryazan-oblast',
			weight: 50,
			cities: ['Ryazan'],
			extendedData: {
				zipFormat: {
					format: '39-***'
				},
				phoneFormat: {
					areaCodes: [491]
				}
			}
		},
		{
			regionName: 'Sakhalin Oblast',
			regionShort: 'SAK', // 'RU-SAK', // ISO 3166 code
			regionSlug: 'sakhalin-oblast',
			weight: 50,
			cities: ['Sakhalin'],
			extendedData: {
				zipFormat: {
					format: '69}***'
				},
				phoneFormat: {
					areaCodes: [424]
				}
			}
		},
		{
			regionName: 'Samara Oblast',
			regionShort: 'SAM', // 'RU-SAM', // ISO 3166 code
			regionSlug: 'samara-oblast',
			weight: 50,
			cities: ['Samara', 'Tolyatti'],
			extendedData: {
				zipFormat: {
					format: '44^***'
				},
				phoneFormat: {
					areaCodes: [846, 848]
				}
			}
		},
		{
			regionName: 'Saratov Oblast',
			regionShort: 'SAR', // 'RU-SAR', // ISO 3166 code
			regionSlug: 'saratov-oblast',
			weight: 50,
			cities: ['Saratov'],
			extendedData: {
				zipFormat: {
					format: '41+***'
				},
				phoneFormat: {
					areaCodes: [845]
				}
			}
		},
		{
			regionName: 'Smolensk Oblast',
			regionShort: 'SMO', // 'RU-SMO', // ISO 3166 code
			regionSlug: 'smolensk-oblast',
			weight: 50,
			cities: ['Smolensk'],
			extendedData: {
				zipFormat: {
					format: '21S***'
				},
				phoneFormat: {
					areaCodes: [481]
				}
			}
		},
		{
			regionName: 'Sverdlovsk Oblast',
			regionShort: 'SVE', // 'RU-SVE', // ISO 3166 code
			regionSlug: 'sverdlovsk-oblast',
			weight: 50,
			cities: ['Yekaterinburg'],
			extendedData: {
				zipFormat: {
					format: '62U***'
				},
				phoneFormat: {
					areaCodes: [343]
				}
			}
		},
		{
			regionName: 'Tambov Oblast',
			regionShort: 'TAM', // 'RU-TAM', // ISO 3166 code
			regionSlug: 'tambov-oblast',
			weight: 50,
			cities: ['Tambov'],
			extendedData: {
				zipFormat: {
					format: '39Z***'
				},
				phoneFormat: {
					areaCodes: [475]
				}
			}
		},
		{
			regionName: 'Tomsk Oblast',
			regionShort: 'TOM', // 'RU-TOM', // ISO 3166 code
			regionSlug: 'tomsk-oblast',
			weight: 50,
			cities: ['Tomsk'],
			extendedData: {
				zipFormat: {
					format: '63S***'
				},
				phoneFormat: {
					areaCodes: [382]
				}
			}
		},
		{
			regionName: 'Tver Oblast',
			regionShort: 'TVE', // 'RU-TVE', // ISO 3166 code
			regionSlug: 'tver-oblast',
			weight: 50,
			cities: ['Tver'],
			extendedData: {
				zipFormat: {
					format: '17&***'
				},
				phoneFormat: {
					areaCodes: [482]
				}
			}
		},
		{
			regionName: 'Tula Oblast',
			regionShort: 'TUL', // 'RU-TUL', // ISO 3166 code
			regionSlug: 'tula-oblast',
			weight: 50,
			cities: ['Tula'],
			extendedData: {
				zipFormat: {
					format: '30-***'
				},
				phoneFormat: {
					areaCodes: [487]
				}
			}
		},
		{
			regionName: 'Tyumen Oblast',
			regionShort: 'TYU', // 'RU-TYU', // ISO 3166 code
			regionSlug: 'tyumen-oblast',
			weight: 50,
			cities: ['Tyumen'],
			extendedData: {
				zipFormat: {
					format: '62Q***'
				},
				phoneFormat: {
					areaCodes: [345]
				}
			}
		},
		{
			regionName: 'Ulyanovsk Oblast',
			regionShort: 'ULY', // 'RU-ULY', // ISO 3166 code
			regionSlug: 'ulyanovsk-oblast',
			weight: 50,
			cities: ['Ulyanovsk'],
			extendedData: {
				zipFormat: {
					format: '43Z***'
				},
				phoneFormat: {
					areaCodes: [842]
				}
			}
		},
		{
			regionName: 'Vladimir Oblast',
			regionShort: 'VLA', // 'RU-VLA', // ISO 3166 code
			regionSlug: 'vladimir-oblast',
			weight: 50,
			cities: ['Vladimir'],
			extendedData: {
				zipFormat: {
					format: '60&***'
				},
				phoneFormat: {
					areaCodes: [492]
				}
			}
		},
		{
			regionName: 'Volgograd Oblast',
			regionShort: 'VGG', // 'RU-VGG', // ISO 3166 code
			regionSlug: 'volgograd-oblast',
			weight: 50,
			cities: ['Volgograd'],
			extendedData: {
				zipFormat: {
					format: '40U***'
				},
				phoneFormat: {
					areaCodes: [844]
				}
			}
		},
		{
			regionName: 'Vologda Oblast',
			regionShort: 'VLG', // 'RU-VLG', // ISO 3166 code
			regionSlug: 'vologda-oblast',
			weight: 50,
			cities: ['Cherepovets', 'Vologda'],
			extendedData: {
				zipFormat: {
					format: '16&***'
				},
				phoneFormat: {
					areaCodes: [817, 820]
				}
			}
		},
		{
			regionName: 'Voronezh Oblast',
			regionShort: 'VOR', // 'RU-VOR', // ISO 3166 code
			regionSlug: 'voronezh-oblast',
			weight: 50,
			cities: ['Voronezh'],
			extendedData: {
				zipFormat: {
					format: '39R****'
				},
				phoneFormat: {
					areaCodes: [473]
				}
			}
		},
		{
			regionName: 'Yaroslavl Oblast',
			regionShort: 'YAR', // 'RU-YAR', // ISO 3166 code
			regionSlug: 'yaroslavl-oblast',
			weight: 50,
			cities: ['Yaroslavl'],
			extendedData: {
				zipFormat: {
					format: '15&***'
				},
				phoneFormat: {
					areaCodes: [485]
				}
			}
		}
	]
});

export default Russia;
