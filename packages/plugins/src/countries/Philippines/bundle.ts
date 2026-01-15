import { GetCountryData } from '~types/countries';

const Philippines: GetCountryData = (i18n) => ({
  countryName: i18n.countryName,
  countrySlug: 'philippines',
  regionNames: i18n.regionNames,
  continent: 'asia',
  extendedData: {
    zipFormat: {
      format: 'xxxx'
    },
    phoneFormat: {
      displayFormats: ['63 (xxx) xxx xxxx', '0 (xxx) xxx xxxx', '(xxx) xxx xxxx']
    }
  },
  regions: [
    {
      regionName: 'National Capital Region',
      regionShort: 'NCR',
      regionSlug: 'national_capital_region',
      weight: 139,
      cities: [
        'Quezon City',
        'Manila',
        'Caloocan',
        'Taguig',
        'Pasig',
        'Valenzuela',
        'Parañaque',
        'Makati',
        'Las Piñas',
        'Muntinlupa',
        'Marikina'
      ]
    },
    {
      regionName: 'Cordillera Administrative Region',
      regionShort: 'CAR',
      regionSlug: 'cordillera_administrative_region',
      weight: 18,
      cities: ['Baguio', 'Tabuk']
    },
    {
      regionName: 'Ilocos Region',
      regionShort: 'regionI',
      regionSlug: 'ilocos_region',
      weight: 52,
      cities: ['Dagupan City', 'Alaminos', 'Batac', 'Candon', 'Laoag', 'San Carlos', 'San Fernando', 'Urdaneta', 'Vigan']
    },
    {
      regionName: 'Cagayan Valley',
      regionShort: 'regionII',
      regionSlug: 'cagayan_valley',
      weight: 37,
      cities: ['Cauayan', 'Ilagan', 'Santiago', 'Tuguegarao']
    },
    {
      regionName: 'Central Luzon',
      regionShort: 'regionIII',
      regionSlug: 'central_luzon',
      weight: 123,
      cities: [
        'Angeles City',
        'Balanga',
        'Cabanatuan',
        'Gapan',
        'Mabalacat',
        'Malolos',
        'Meycauayan',
        'Muñoz',
        'Olongapo',
        'Palayan',
        'San Fernando',
        'San Jose',
        'San Jose del Monte',
        'Tarlac City'
      ]
    },
    {
      regionName: 'Calabarzon',
      regionShort: 'regionIV-A',
      regionSlug: 'calabarzon',
      weight: 161,
      cities: [
        'Antipolo',
        'Dasmariñas',
        'Bacoor',
        'Calamba',
        'Imus',
        'General Trias',
        'Santa Rosa',
        'Biñan',
        'Lipa',
        'Cabuyao',
        'Batangas City',
        'San Pedro'
      ]
    },
    {
      regionName: 'Southwestern Tagalog Region',
      regionShort: 'mimaropa',
      regionSlug: 'southwestern_tagalog_region',
      weight: 32,
      cities: ['Calapan', 'Puerto Princesa']
    },
    {
      regionName: 'Bicol Region',
      regionShort: 'regionV',
      regionSlug: 'bicol_region',
      weight: 61,
      cities: ['Iriga', 'Legazpi', 'Ligao', 'Masbate City', 'Naga', 'Sorsogon City', 'Tabaco']
    },
    {
      regionName: 'Western Visayas',
      regionShort: 'regionVI',
      regionSlug: 'western_visayas',
      weight: 80,
      cities: [
        'Bacolod',
        'Bago',
        'Cadiz',
        'Escalante',
        'Himamaylan',
        'Iloilo City',
        'Kabankalan',
        'La Carlota',
        'Passi',
        'Roxas',
        'Sagay',
        'San Carlos',
        'Silay',
        'Sipalay',
        'Talisay',
        'Victorias'
      ]
    },
    {
      regionName: 'Central Visayas',
      regionShort: 'regionVII',
      regionSlug: 'central_visayas',
      weight: 74,
      cities: [
        'Bais',
        'Bayawan',
        'Bogo',
        'Canlaon',
        'Carcar',
        'Cebu City',
        'Danao',
        'Dumaguete',
        'Guihulngan',
        'Lapu-Lapu City',
        'Mandaue',
        'Naga',
        'Tagbilaran',
        'Talisay',
        'Tanjay',
        'Toledo'
      ]
    },
    {
      regionName: 'Eastern Visayas',
      regionShort: 'regionVIII',
      regionSlug: 'eastern_visayas',
      weight: 48,
      cities: ['Baybay', 'Borongan', 'Calbayog', 'Catbalogan', 'Maasin', 'Ormoc', 'Tacloban']
    },
    {
      regionName: 'Zamboanga Peninsula',
      regionShort: 'regionIX',
      regionSlug: 'zamboanga_peninsula',
      weight: 38,
      cities: ['Dapitan', 'Dipolog', 'Isabela City', 'Pagadian', 'Zamboanga City']
    },
    {
      regionName: 'Northern Mindanao',
      regionShort: 'regionX',
      regionSlug: 'northern_mindanao',
      weight: 50,
      cities: ['Cagayan de Oro', 'El Salvador', 'Gingoog', 'Iligan', 'Malaybalay', 'Oroquieta', 'Ozamiz', 'Tangub', 'Valencia']
    },
    {
      regionName: 'Davao Region',
      regionShort: 'regionXI',
      regionSlug: 'davao_region',
      weight: 53,
      cities: ['Davao City', 'Digos', 'Mati', 'Panabo', 'Samal', 'Tagum']
    },
    {
      regionName: 'Soccsksargen',
      regionShort: 'regionXII',
      regionSlug: 'national_capital_region',
      weight: 139,
      cities: ['General Santos', 'Kidapawan', 'Koronadal', 'Tacurong']
    },
    {
      regionName: 'Caraga',
      regionShort: 'regionXIII',
      regionSlug: 'national_capital_region',
      weight: 27,
      cities: ['Bayugan', 'Bislig', 'Butuan', 'Cabadbaran', 'Surigao City', 'Tandag']
    },
    {
      regionName: 'Bangsamoro',
      regionShort: 'BARMM',
      regionSlug: 'bangsamoro',
      weight: 42,
      cities: ['Cotabato City', 'Lamitan', 'Marawi']
    }
  ]
});

export default Philippines;
