import { GetCountryData } from '~types/countries';

const Norway: GetCountryData = (i18n) => ({
  countryName: i18n.countryName,
  countrySlug: 'norway',
  regionNames: i18n.regionNames,
  continent: 'europe',
  extendedData: {
    zipFormat: {
      format: 'xxxx'
    }
  },
  regions: [
    {
      regionName: 'Oslo',
      regionShort: '03',
      regionSlug: 'oslo',
      weight: 5,
      cities: ['Oslo']
    },
    {
      regionName: 'Rogaland',
      regionShort: '11',
      regionSlug: 'rogaland',
      weight: 5,
      cities: ['Stavanger', 'Sandnes', 'Haugesund', 'Bryne', 'Egersund', 'Koppervik', 'Åkrehamn', 'Jørpeland', 'Sauda', 'Skudeneshavn']
    },
    {
      regionName: 'Møre og Romsdal',
      regionShort: '15',
      regionSlug: 'more_og_romsdal',
      weight: 5,
      cities: ['Molde', 'Ålesund', 'Kristiansund', 'Ørsta', 'Volda']
    },
    {
      regionName: 'Nordland',
      regionShort: '18',
      regionSlug: 'nordland',
      weight: 5,
      cities: ['Bodø', 'Mo i Rana', 'Narvik', 'Mosjøen', 'Fauske', 'Sandnessjøen', 'Sortland', 'Brønnøysund']
    },
    {
      regionName: 'Viken',
      regionShort: '30',
      regionSlug: 'viken',
      weight: 5,
      cities: ['Drammen', 'Frederikstad', 'Sarpsborg', 'Moss']
    },
    {
      regionName: 'Innlandet',
      regionShort: '34',
      regionSlug: 'innlandet',
      weight: 5,
      cities: ['Hamar', 'Lillehammer', 'Gjøvik', 'Elverum', 'Kongsvinger', 'Brummunddal', 'Raufoss', 'Moelv']
    },
    {
      regionName: 'Vestfold og Telemark',
      regionShort: '38',
      regionSlug: 'vestfold_og_telemark',
      weight: 5,
      cities: ['Skien', 'Porsgrunn', 'Brevik', 'Langesund', 'Tønsberg', 'Sandefjord', 'Larvik', 'Horten', 'Notodden', 'Holmestrand']
    },
    {
      regionName: 'Agder',
      regionShort: '42',
      regionSlug: 'agder',
      weight: 5,
      cities: ['Kristiansand', 'Arendal', 'Grimstad', 'Farsund', 'Flekkefjord', 'Lillesand', 'Mandal', 'Risør', 'Tvedestrand']
    },
    {
      regionName: 'Vestland',
      regionShort: '46',
      regionSlug: 'vestland',
      weight: 5,
      cities: ['Bergen', 'Leirvik', 'Førde', 'Florø', 'Odda']
    },
    {
      regionName: 'Trøndelag',
      regionShort: '50',
      regionSlug: 'trondelag',
      weight: 5,
      cities: ['Trondheim', 'Stjørdalshalsen', 'Steinkjer', 'Levanger', 'Namsos', 'Verdalsøra', 'Orkanger']
    },
    {
      regionName: 'Troms og Finnmark',
      regionShort: '54',
      regionSlug: 'troms_og_finnmark',
      weight: 5,
      cities: ['Tromsø', 'Harstad', 'Alta', 'Hammerfest', 'Vadsø']
    }
  ]
});

export default Norway;
