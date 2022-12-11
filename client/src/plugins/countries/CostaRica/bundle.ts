/**
 * @package Countries
 *
 * @author Andre Fortin <andre.v.fortin@gmail.com>
 */
import { GetCountryData } from '~types/countries';

const CostaRica: GetCountryData = (i18n) => ({
	countryName: i18n.countryName,
	countrySlug: 'CR',
	regionNames: i18n.regionNames,
	continent: 'central_america',
	extendedData: {
		zipFormat: {
			format: 'ZYxYx',
			replacements: {
				'Z': '1234567',
				'Y': '01',
				'x': '0123456789'
			}
		},
		phoneFormat: {
			displayFormats: [
				'xxxxxxxx',
				'xxxx-xxxx'
			]
		}
	},
	regions: [
		{
			regionName: 'Alajuela',
			regionShort: 'A',
			regionSlug: 'alajuela',
			weight: 20,
			cities: [
				'Alajuela', 'Quesada', 'San José de Alajuela', 'San Rafael'
			],
			extendedData: {
				zipFormat: {
					format: '2zxYx',
					replacements: {
						'z': '01',
						'Y': '01',
						'x': '0123456789'
					}
				},
				phoneFormat: {
					displayFormats: ['24xxxxxx']
				}
			}
		},
		{
			regionName: 'Cartago',
			regionShort: 'C',
			regionSlug: 'cartago',
			weight: 11,
			cities: [
				'Aguacaliente (San Francisco]', 'Carmen', 'Cartago', 'Paraíso', 'San Diego', 'San Nicolás',
				'San Rafael', 'Tejar', 'Turrialba'
			],
			extendedData: {
				zipFormat: {
					format: '30xYx',
					replacements: {
						'Y': '01',
						'x': '0123456789'
					}
				},
				phoneFormat: {
					displayFormats: ['25xxxxxx']
				}
			}
		},
		{
			regionName: 'Guanacaste',
			regionShort: 'G',
			regionSlug: 'guanacaste',
			weight: 8,
			cities: [
				'Cañas', 'Liberia', 'Nicoya'
			],
			extendedData: {
				zipFormat: {
					format: '5zxYx',
					replacements: {
						'z': '01',
						'Y': '01',
						'x': '0123456789'
					}
				},
				phoneFormat: {
					displayFormats: ['26xxxxxx']
				}
			}
		},
		{
			regionName: 'Heredia',
			regionShort: 'H',
			regionSlug: 'heredia',
			weight: 10,
			cities: [
				'Heredia', 'Mercedes', 'San Francisco', 'San Pablo', 'Ulloa (Barrial]'
			],
			extendedData: {
				zipFormat: {
					format: '4zxYx',
					replacements: {
						'z': '01',
						'Y': '01',
						'x': '0123456789'
					}
				},
				phoneFormat: {
					displayFormats: ['25xxxxxx']
				}
			}
		},
		{
			regionName: 'Limón',
			regionShort: 'L',
			regionSlug: 'limón',
			weight: 2,
			cities: [
				'Guápiles', 'Limón (Puerto Limón]', 'Siquirres'
			],
			extendedData: {
				zipFormat: {
					format: '50yYx',
					replacements: {
						'y': '12',
						'Y': '01',
						'x': '0123456789'
					}
				},
				phoneFormat: {
					displayFormats: ['27xxxxxx']
				}
			}
		},
		{
			regionName: 'Puntarenas',
			regionShort: 'P',
			regionSlug: 'puntarenas',
			weight: 2,
			cities: [
				'Barranca', 'Puntarenas'
			],
			extendedData: {
				zipFormat: {
					format: 'ZYxYx',
					replacements: {
						'Z': '1234567',
						'Y': '01',
						'x': '0123456789'
					}
				},
				phoneFormat: {
					displayFormats: ['27xxxxxx']
				}
			}
		},
		{
			regionName: 'San José',
			regionShort: 'SJ',
			regionSlug: 'san_josé',
			weight: 33,
			cities: [
				'Alajuelita', 'Aserrí', 'Calle Blancos', 'Cinco Esquinas', 'Concepción', 'Curridabat', 'Desamparados', 'Gravilias', 'Guadalupe', 'Ipís',
				'Mata de Plátano', 'Patalillo', 'Patarrá', 'Purral', 'San Antonio', 'San Felipe', 'San Isidro', 'San Isidro de El General', 'San José',
				'San Juan (San Juan de Tibás]', 'San Juan de Dios', 'San Miguel', 'San Pedro', 'San Rafael', 'San Rafael Abajo', 'San Vicente', 'Tirrases'
			],
			extendedData: {
				zipFormat: {
					format: '1zxYx',
					replacements: {
						'z': '012',
						'Y': '01',
						'x': '0123456789'
					}
				},
				phoneFormat: {
					displayFormats: ['25xxxxxx']
				}
			}
		}
	]
});

export default CostaRica;
