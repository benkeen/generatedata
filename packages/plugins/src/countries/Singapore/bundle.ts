import { GetCountryData } from '@generatedata/types';

const Singapore: GetCountryData = (i18n) => ({
  countryName: i18n.countryName,
  countrySlug: 'singapore',
  regionNames: i18n.regionNames,
  continent: 'asia',
  extendedData: {
    zipFormat: {
      format: 'XXXXXX'
    },
    phoneFormat: {
      displayFormats: ['XXXX XXXX']
    }
  },
  regions: [
    {
      regionName: 'Central Region',
      regionShort: 'SG-01',
      regionSlug: 'centralregion',
      weight: 92,
      cities: [
        'Bishan',
        'Bukit Merah',
        'Bukit Timah',
        'Downtown Core',
        'Geylang',
        'Kallang',
        'Marina East',
        'Marina South',
        'Marine Parade',
        'Museum',
        'Newton',
        'Novena',
        'Orchard',
        'Outram',
        'Queenstown',
        'River Valley',
        'Rochor',
        'Singapore River',
        'Southern Islands',
        'Straits View',
        'Tanglin',
        'Toa Payoh'
      ]
    },
    {
      regionName: 'East Region',
      regionShort: 'ER',
      regionSlug: 'eastregion',
      weight: 69,
      cities: ['Bedok', 'Changi', 'Changi Bay', 'Pasir Ris', 'Paya Lebar', 'Tampines']
    },
    {
      regionName: 'North Region',
      regionShort: 'CR',
      regionSlug: 'northregion',
      weight: 58,
      cities: ['Central Water Catchment', 'Lim Chu Kang', 'Mandai', 'Sembawang', 'Simpang', 'Sungei Kadut', 'Woodlands', 'Yishun']
    },
    {
      regionName: 'North-East Region',
      regionShort: 'SG-02',
      regionSlug: 'northeastregion',
      weight: 93,
      cities: ['Ang Mo Kio', 'Hougang', 'North-Eastern Islands', 'Punggol', 'Seletar', 'Sengkang', 'Serangoon']
    },
    {
      regionName: 'West Region',
      regionShort: 'CR',
      regionSlug: 'westregion',
      weight: 92,
      cities: [
        'Boon Lay',
        'Bukit Batok',
        'Bukit Panjang',
        'Choa Chu Kang',
        'Clementi',
        'Jurong East',
        'Jurong West',
        'Pioneer',
        'Tengah',
        'Tuas',
        'Western Islands',
        'Western Water Catchment'
      ]
    }
  ]
});

export default Singapore;
