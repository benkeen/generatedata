import { GetCountryData } from '~types/countries';

const Brazil: GetCountryData = (i18n) => ({
	countryName: i18n.countryName,
	countrySlug: 'brazil',
	regionNames: i18n.regionNames,
	continent: 'south_america',
	extendedData: {
		zipFormat: {
			format: 'xxxxx-xxx',
			replacements: {
				// 'X': '123456789',
				// 'x': '0123456789',
				'Y': '012345678',
				'W': '01234567',
				'V': '0123456',
				'U': '012345',
				'T': '01234',
				'S': '0123',
				'R': '678',
				'Q': '89',
				'P': '3456'
			}
		}
	},
	regions: [
		{
			regionName: 'São Paulo',
			regionShort: 'SP',
			regionSlug: 'sau_paulo',
			weight: 41,
			cities: [
				'Guarulhos',
				'Campinas',
				'Osasco',
				'Ribeirão Preto',
				'Mauá',
				'Mogi das Cruzes',
				'Diadema',
				'Jundiaí',
				'Carapicuíba',
				'Piracicaba'
			],
			extendedData: {
				zipFormat: {
					format: '1Xxxx-xxx'
				}
			}
		},
		{
			regionName: 'Minas Gerais',
			regionShort: 'MG',
			regionSlug: 'minas_gerais',
			weight: 20,
			cities: [
				'Belo Horizonte',
				'Uberlândia',
				'Contagem',
				'Juiz de Fora',
				'Betim',
				'Montes Claros',
				'Ribeirão das Neves',
				'Uberaba',
				'Governador Valadares',
				'Ipatinga',
				'Sete Lagoas',
				'Divinópolis',
				'Santa Luzia'
			],
			extendedData: {
				zipFormat: {
					format: '3xxxxxxx'
				}
			}
		},
		{
			regionName: 'Rio de Janeiro',
			regionShort: 'RJ',
			regionSlug: 'rio',
			weight: 16,
			cities: [
				'Rio de Janeiro',
				'São Gonçalo',
				'Duque de Caxias',
				'Nova Iguaçu',
				'Niterói',
				'Belford Roxo',
				'Campos dos Goytacazes',
				'São João de Meriti',
				'Petrópolis'
			],
			extendedData: {
				zipFormat: {
					format: '2Yxxx-xxx'
				}
			}
		},
		{
			regionName: 'Bahia',
			regionShort: 'BA',
			regionSlug: 'bahia',
			weight: 14,
			cities: [
				'Salvador',
				'Feira de Santana',
				'Vitória da Conquista',
				'Camaçari',
				'Itabuna',
				'Juazeiro',
				'Ilhéus',
				'Lauro de Freitas'
			],
			extendedData: {
				zipFormat: {
					format: '4Yxxx-xxx'
				}
			}
		},
		{
			regionName: 'Rio Grande do Sul',
			regionShort: 'RS',
			regionSlug: 'rio_grande',
			weight: 11,
			cities: [
				'Porto Alegre',
				'Caxias do Sul',
				'Pelotas',
				'Canoas',
				'Santa Maria',
				'Gravataí',
				'Novo Hamburgo',
				'Rio Grande'
			],
			extendedData: {
				zipFormat: {
					format: '9xxxx-xxx'
				}
			}
		},
		{
			regionName: 'Paraná',
			regionShort: 'PR',
			regionSlug: 'parana',
			weight: 11,
			cities: [
				'Curitiba',
				'Londrina',
				'Maringá',
				'Ponta Grossa',
				'Cascavel',
				'São José dos Pinhais',
				'Foz do Iguaçu',
				'Colombo',
				'Guarapuava',
				'Paranaguá'
			],
			extendedData: {
				zipFormat: {
					format: '8Wxxx-xxx'
				}
			}
		},
		{
			regionName: 'Pernambuco',
			regionShort: 'PE',
			regionSlug: 'pernambuco',
			weight: 9,
			cities: [
				'Recife',
				'Jaboatão dos Guararapes',
				'Olinda',
				'Caruaru',
				'Paulista',
				'Petrolina',
				'Cabo de Santo Agostinho',
				'Camaragibe'
			],
			extendedData: {
				zipFormat: {
					format: '5Vxxx-xxx'
				}
			}
		},
		{
			regionName: 'Ceará',
			regionShort: 'CE',
			regionSlug: 'ceara',
			weight: 9,
			cities: [
				'Fortaleza',
				'Caucaia',
				'Juazeiro do Norte',
				'Maracanaú',
				'Sobral',
				'Crato',
				'Itapipoca',
				'Maranguape'
			],
			extendedData: {
				zipFormat: {
					format: '6Sxxx-xxx'
				}
			}
		},
		{
			regionName: 'Pará',
			regionShort: 'PA',
			regionSlug: 'para',
			weight: 8,
			cities: [
				'Belém',
				'Ananindeua',
				'Santarém',
				'Marabá',
				'Castanhal',
				'Parauapebas',
				'Abaetetuba',
				'Cametá',
				'Bragança'
			],
			extendedData: {
				zipFormat: {
					format: '6RYxx-xxx'
				}
			}
		},
		{
			regionName: 'Maranhão',
			regionShort: 'MA',
			regionSlug: 'maranhao',
			weight: 7,
			cities: [
				'São Luís',
				'Imperatriz',
				'Timon',
				'Caxias',
				'Codó',
				'Paço do Lumiar',
				'Açailândia',
				'Bacabal',
				'Santa Inês',
				'Balsas',
				'Chapadinha',
				'Barra do Corda'
			],
			extendedData: {
				zipFormat: {
					format: '65xxx-xxx'
				}
			}
		},
		{
			regionName: 'Santa Catarina',
			regionShort: 'SC',
			regionSlug: 'santa_catarina',
			weight: 6,
			cities: [
				'Joinville',
				'Florianópolis',
				'Blumenau',
				'São José',
				'Criciúma',
				'Chapecó',
				'Itajaí'
			],
			extendedData: {
				zipFormat: {
					format: '8Qxxx-xxx'
				}
			}
		},
		{
			regionName: 'Goiás',
			regionShort: 'GO',
			regionSlug: 'goias',
			weight: 6,
			cities: [
				'Goiânia',
				'Aparecida de Goiânia',
				'Anápolis',
				'Rio Verde',
				'Luziânia',
				'Águas Lindas de Goiás',
				'Valparaíso de Goiás'
			],
			extendedData: {
				zipFormat: {
					format: '7P7xx-xxx'
				}
			}
		},
		{
			regionName: 'Paraíba',
			regionShort: 'PB',
			regionSlug: 'paraiba',
			weight: 4,
			cities: [
				'João Pessoa',
				'Campina Grande',
				'Santa Rita',
				'Patos',
				'Bayeux',
				'Sousa',
				'Cajazeiras'
			],
			extendedData: {
				zipFormat: {
					format: '58xxx-xxx'
				}
			}
		}
	]
});

export default Brazil;
