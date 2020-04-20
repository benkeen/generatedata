import { CountryType } from '../../../../types/countries';

export default (i18n: any): CountryType => ({
	countryName: i18n.countryName,
	countrySlug: 'mexico',
	regionNames: i18n.regionNames,
	continent: 'north_america',
	extendedData: {
		zipFormat: {
			format: 'xxxxx-xxxxx',
			replacements: {
				x: '0123456789'
			}
		},
 		phoneFormat: {
		    displayFormats: [
			    '045 Xx Xxxx xxx',
			    '045 Xx Xxxx xxxx',
			    '045 Xxx Xxxx xxx',
			    '045 Xxx Xxxx xxxx',
			    'Xxx-Xxxx xxx',
			    '55–Xxxx xxxx',
			    '55–Xxxx xxx'
		    ]
	    }
	},
	regions: [
		{
			regionName: 'Mexico City',
			regionShort: 'CDMX',
			regionSlug: 'mexico_city',
			weight: 89,
			cities: [
				'Mexico City'
			]
		},
		{
			regionName: 'Veracruz',
			regionShort: 'Ver.',
			regionSlug: 'veracruz',
			weight: 76,
			cities: [
				'Veracruz', 'Xalapa', 'Coatzacoalcos', 'Poza Rica', 'Córdoba', 'Boca del Río', 'Orizaba', 'Minatitlán'
			]
		},
		{
			regionName: 'Jalisco',
			regionShort: 'Jal.',
			regionSlug: 'jalisco',
			weight: 74,
			cities: [
				'Guadalajara', 'Zapopan', 'Tlaquepaque', 'Tonalá', 'Puerto Vallarta'
			]
		},
		{
			regionName: 'Puebla',
			regionShort: 'Pue.',
			regionSlug: 'puebla',
			weight: 58,
			cities: [
				'Tehuacán'
			]
		},
		{
			regionName: 'Guanajuato',
			regionShort: 'Gto.',
			regionSlug: 'guanajuato',
			weight: 55,
			cities: [
				'León', 'Irapuato', 'Celaya', 'Salamanca'
			]
		},
		{
			regionName: 'Chiapas',
			regionShort: 'Chis.',
			regionSlug: 'chiapas',
			weight: 48,
			cities: [
				'Tuxtla Gutiérrez', 'Tapachula', 'San Cristóbal de las Casas'
			]
		},
		{
			regionName: 'Nuevo León',
			regionShort: 'N.L.',
			regionSlug: 'nuevoleon',
			weight: 47,
			cities: [
				'Monterrey', 'Guadalupe', 'San Nicolás de los Garza', 'Ciudad Apodaca', 'General Escobedo',
				'Ciudad Santa Catarina', 'San Pedro Garza García'
			]
		},
		{
			regionName: 'Michoacán',
			regionShort: 'Mich.',
			regionSlug: 'michoacan',
			weight: 44,
			cities: [
				'Morelia', 'Uruapan', 'Zamora de Hidalgo'
			]
		},
		{
			regionName: 'Oaxaca',
			regionShort: 'Oax.',
			regionSlug: 'oaxaca',
			weight: 38,
			cities: [
				'Oaxaca'
			]
		},
		{
			regionName: 'Chihuahua',
			regionShort: 'Chih.',
			regionSlug: 'chihuahua',
			weight: 34,
			cities: [
				'Juárez', 'Chihuahua', 'Delicias', 'Hidalgo del Parral'
			]
		},
		{
			regionName: 'Guerrero',
			regionShort: 'Gro.',
			regionSlug: 'guerrero',
			weight: 34,
			cities: [
				'Acapulco', 'Chilpancingo', 'Iguala'
			]
		},
		{
			regionName: 'Tamaulipas',
			regionShort: 'Tamps.',
			regionSlug: 'Tamaulipas',
			weight: 33,
			cities: [
				'Reynosa', 'Matamoros', 'Nuevo Laredo', 'Tampico', 'Ciudad Victoria', 'Ciudad Madero'
			]
		},
		{
			regionName: 'Baja California',
			regionShort: 'B.C.',
			regionSlug: 'baja_california',
			weight: 32,
			cities: [
				'Tijuana', 'Mexicali', 'Ensenada', 'La Paz'
			]
		},
		{
			regionName: 'Sinaloa',
			regionShort: 'Sin.',
			regionSlug: 'sinaloa',
			weight: 28,
			cities: [
				'Culiacán', 'Mazatlán', 'Los Mochis'
			]
		},
		{
			regionName: 'Coahuila',
			regionShort: 'Coah.',
			regionSlug: 'coahuila',
			weight: 27,
			cities: [
				'Saltillo', 'Torreón', 'Monclova', 'Piedras Negras', 'Acuña'
			]
		},
		{
			regionName: 'Hidalgo',
			regionShort: 'Hgo.',
			regionSlug: 'Hidalgo',
			weight: 27,
			cities: [
				'Pachuca'
			]
		},
		{
			regionName: 'Sonora',
			regionShort: 'Son.',
			regionSlug: 'Sonora',
			weight: 27,
			cities: [
				'Hermosillo', 'Ciudad Obregón', 'Nogales', 'San Luis Río Colorado', 'Navojoa', 'Guaymas'
			]
		},
		{
			regionName: 'San Luis Potosí',
			regionShort: 'S.L.P.',
			regionSlug: 'San Luis Potosí',
			weight: 26,
			cities: [
				'San Luis Potosí', 'Soledad de Graciano Sánchez', 'Ciudad Valles'
			]
		},
		{
			regionName: 'Tabasco',
			regionShort: 'Tab.',
			regionSlug: 'Tabasco',
			weight: 22,
			cities: [
				'Villahermosa'
			]
		},
		{
			regionName: 'Yucatán',
			regionShort: 'Yuc.',
			regionSlug: 'Yucatán',
			weight: 20,
			cities: [
				'Mérida'
			]
		},
		{
			regionName: 'Querétaro',
			regionShort: 'Qro.',
			regionSlug: 'Querétaro',
			weight: 18,
			cities: [
				'Querétaro', 'San Juan del Río'
			]
		},
		{
			regionName: 'Morelos',
			regionShort: 'Mor.',
			regionSlug: 'Morelos',
			weight: 18,
			cities: [
				'Cuernavaca', 'Jiutepec', 'Cuautla'
			]
		}
	]
});
