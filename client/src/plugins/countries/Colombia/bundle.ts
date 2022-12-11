/**
 * @package Countries
 *
 * Source data:
 * 		https://en.wikipedia.org/wiki/List_of_Colombian_Departments_by_population
 */
import { GetCountryData } from '~types/countries';

const Colombia: GetCountryData = (i18n) => ({
	countryName: i18n.countryName,
	countrySlug: 'colombia',
	regionNames: i18n.regionNames,
	continent: 'south_america',
	extendedData: {
		zipFormat: {
			format: 'XXXXXX'
		},
		phoneFormat: {
			displayFormats: [
				'0xx-xxx-xxxx'
			]
		}
	},
	regions: [
		{
			regionName: 'Amazonas',
			regionShort: 'AMA',
			regionSlug: 'amazonas',
			weight: 5,
			cities: [
				'Leticia', 'Puerto Nariño'
			]
		},
		{
			regionName: 'Antioquia',
			regionShort: 'ANT',
			regionSlug: 'antioquia',
			weight: 560,
			cities: [
				'Medellín', 'Bello', 'Itagüí', 'Envigado', 'Apartadó', 'Turbo', 'Rionegro'
			]
		},
		{
			regionName: 'Arauca',
			regionShort: 'ARA',
			regionSlug: 'arauca',
			weight: 15,
			cities: [
				'Arauca', 'Tame', 'Saravena'
			]
		},
		{
			regionName: 'Atlántico',
			regionShort: 'ATL',
			regionSlug: 'atlantico',
			weight: 211,
			cities: [
				'Barranquilla', 'Soledad', 'Malambo', 'Sabanalarga'
			]
		},
		{
			regionName: 'Bolívar',
			regionShort: 'BOL',
			regionSlug: 'bolivar',
			weight: 210,
			cities: [
				'Cartagena', 'Magangué', 'Carmen de Bolivar'
			]
		},
		{
			regionName: 'Boyacá',
			regionShort: 'BOY',
			regionSlug: 'boyaca',
			weight: 3,
			cities: [
				'Tunja', 'Duitama', 'Sogamoso', 'Chiquinquirá'
			]
		},
		{
			regionName: 'Caldas',
			regionShort: 'CAL',
			regionSlug: 'caldas',
			weight: 3,
			cities: [
				'Manizales', 'La Dorada', 'Riosucio'
			]
		},
		{
			regionName: 'Caquetá',
			regionShort: 'CAQ',
			regionSlug: 'caqueta',
			weight: 3,
			cities: [
				'Florencia', 'San Vicente del Caguán', 'Cartagena del Chairá'
			]
		},
		{
			regionName: 'Casanare',
			regionShort: 'CAS',
			regionSlug: 'casanare',
			weight: 3,
			cities: [
				'Yopal', 'Aguazul', 'Paz de Ariporo'
			]
		},
		{
			regionName: 'Cauca',
			regionShort: 'CAU',
			regionSlug: 'cauca',
			weight: 3,
			cities: [
				'Popayán', 'Santander de Quilichao', 'El Tambo'
			]
		},
		{
			regionName: 'Cesar',
			regionShort: 'CES',
			regionSlug: 'cesar',
			weight: 3,
			cities: [
				'Valledupar', 'Aguachica', 'Agustín Codazzi'
			]
		},
		{
			regionName: 'Chocó',
			regionShort: 'CHO',
			regionSlug: 'choco',
			weight: 3,
			cities: [
				'Quibdó', 'Alto Baudó', 'Medio Atrato', 'Istmina'
			]
		},
		{
			regionName: 'Córdoba',
			regionShort: 'COR',
			regionSlug: 'cordoba',
			weight: 3,
			cities: [
				'Montería', 'Santa Cruz de Lorica', 'Tierralta', 'Cereté', 'Sahagún', 'Montelíbano'
			]
		},
		{
			regionName: 'Cundinamarca',
			regionShort: 'CUN',
			regionSlug: 'cundinamarca',
			weight: 3,
			cities: [
				'Soacha', 'Fusagasugá', 'Facatativá', 'Chía', 'Zipaquirá', 'Girardot', 'Mosquera'
			]
		},
		{
			regionName: 'Distrito Capital',
			regionShort: 'DC',
			regionSlug: 'distrito_capital',
			weight: 3,
			cities: [
				'Bogotá'
			]
		},
		{
			regionName: 'Guainía',
			regionShort: 'GUA',
			regionSlug: 'guainia',
			weight: 3,
			cities: [
				'Inírida', 'Puerto Colombia', 'Barranco Minas', 'Mapiripana'
			]
		},
		{
			regionName: 'Guaviare',
			regionShort: 'GUV',
			regionSlug: 'guaviare',
			weight: 3,
			cities: [
				'San José del Guaviare', 'El Retorno', 'Miraflores', 'Calamar'
			]
		},
		{
			regionName: 'Huila',
			regionShort: 'HUI',
			regionSlug: 'huila',
			weight: 3,
			cities: [
				'Neiva', 'Pitalito', 'Garzón', 'La Plata'
			]
		},
		{
			regionName: 'La Guajira',
			regionShort: 'LAG',
			regionSlug: 'la_guajira',
			weight: 3,
			cities: [
				'Riohacha', 'Uribia', 'Maicao', 'Manaure', 'San Juan del Cesar'
			]
		},
		{
			regionName: 'Magdalena',
			regionShort: 'MAG',
			regionSlug: 'magdalena',
			weight: 3,
			cities: [
				'Santa Marta', 'Ciénaga', 'Zona Bananera', 'Plato', 'Fundación'
			]
		},
		{
			regionName: 'Meta',
			regionShort: 'MET',
			regionSlug: 'meta',
			weight: 3,
			cities: [
				'Villavicencio', 'Acacías', 'Granada', 'Puerto López'
			]
		},
		{
			regionName: 'Nariño',
			regionShort: 'NAR',
			regionSlug: 'narino',
			weight: 3,
			cities: [
				'San Juan de Pasto', 'Tumaco', 'Ipiales', 'Samaniego'
			]
		},
		{
			regionName: 'Norte de Santander',
			regionShort: 'NSA',
			regionSlug: 'norte_de_santander',
			weight: 3,
			cities: [
				'Cúcuta', 'Ocaña', 'Villa del Rosario', 'Los Patios', 'Pamplona'
			]
		},
		{
			regionName: 'Putumayo',
			regionShort: 'PUT',
			regionSlug: 'putumayo',
			weight: 3,
			cities: [
				'Puerto Asís', 'Orito', 'Valle del Guamuez', 'Mocoa', 'Puerto Guzmán'
			]
		},
		{
			regionName: 'Quindío',
			regionShort: 'QUI',
			regionSlug: 'quindio',
			weight: 3,
			cities: [
				'Armenia', 'Calarcá', 'La Tebaida', 'Montenegro', 'Quimbaya'
			]
		},
		{
			regionName: 'Risaralda',
			regionShort: 'RIS',
			regionSlug: 'risaralda',
			weight: 3,
			cities: [
				'Pereira', 'Dosquebradas', 'Santa Rosa de Cabal'
			]
		},
		{
			regionName: 'San Andrés y Providencia',
			regionShort: 'SAP',
			regionSlug: 'san_andres',
			weight: 3,
			cities: [
				'San Andrés'
			]
		},
		{
			regionName: 'Santander',
			regionShort: 'SAN',
			regionSlug: 'santander',
			weight: 3,
			cities: [
				'Bucaramanga', 'Floridablanca', 'San Juan de Girón', 'Barrancabermeja', 'Piedecuesta'
			]
		},
		{
			regionName: 'Sucre',
			regionShort: 'SUC',
			regionSlug: 'sucre',
			weight: 3,
			cities: [
				'Sincelejo', 'Corozal', 'San Marcos'
			]
		},
		{
			regionName: 'Tolima',
			regionShort: 'TOL',
			regionSlug: 'tolima',
			weight: 3,
			cities: [
				'Ibagué',
			]
		},
		{
			regionName: 'Valle del Cauca',
			regionShort: 'VAC',
			regionSlug: 'valle_del_cauca',
			weight: 3,
			cities: [
				'Cali', 'Buenaventura', 'Palmira', 'Tuluá'
			]
		},
		{
			regionName: 'Vaupés',
			regionShort: 'VAU',
			regionSlug: 'vaupes',
			weight: 3,
			cities: [
				'Mitú', 'Pacoa'
			]
		},
		{
			regionName: 'Vichada',
			regionShort: 'VID',
			regionSlug: 'vichada',
			weight: 3,
			cities: [
				'Cumaribo', 'Puerto Carreño'
			]
		}
	]
});

export default Colombia;
