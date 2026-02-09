import { GetCountryData } from '~types/countries';

const SouthAfrica: GetCountryData = (i18n) => ({
  countryName: i18n.countryName,
  countrySlug: 'southafrica',
  regionNames: i18n.regionNames,
  continent: 'africa',
  extendedData: {
    zipFormat: {
      format: 'xxxx-xxxx'
    },
    phoneFormat: {
      displayFormats: ['XXX XXX XXXX', '0XX XXX XXXX']
    }
  },
  regions: [
    {
      regionName: 'Eastern Cape',
      regionShort: 'EC',
      regionSlug: 'easterncape',
      weight: 6,
      cities: [
        'Alice',
        'Butterworth',
        'East London',
        'Graaff-Reinet',
        'Grahamstown',
        'King William\'s Town',
        'Mthatha',
        'Port Elizabeth',
        'Queenstown',
        'Uitenhage',
        'Zwelitsha'
      ]
    },
    {
      regionName: 'Free State',
      regionShort: 'FS',
      regionSlug: 'freestate',
      weight: 3,
      cities: [
        'Bethlehem',
        'Bloemfontein',
        'Jagersfontein',
        'Kroonstad',
        'Odendaalsrus',
        'Parys',
        'Phuthaditjhaba',
        'Sasolburg',
        'Virginia',
        'Welkom'
      ]
    },
    {
      regionName: 'Gauteng',
      regionShort: 'GP',
      regionSlug: 'gauteng',
      weight: 12,
      cities: [
        'Benoni',
        'Boksburg',
        'Brakpan',
        'Carletonville',
        'Germiston',
        'Johannesburg',
        'Krugersdorp',
        'Pretoria',
        'Randburg',
        'Randfontein',
        'Roodepoort',
        'Soweto',
        'Springs',
        'Vanderbijlpark',
        'Vereeniging'
      ]
    },
    {
      regionName: 'KwaZulu-Natal',
      regionShort: 'KZN',
      regionSlug: 'kwazulunatal',
      weight: 10,
      cities: ['Durban', 'Empangeni', 'Ladysmith', 'Newcastle', 'Pietermaritzburg', 'Pinetown', 'Ulundi', 'Umlazi']
    },
    {
      regionName: 'Limpopo',
      regionShort: 'LP',
      regionSlug: 'limpopo',
      weight: 5,
      cities: ['Giyani', 'Lebowakgomo', 'Musina', 'Phalaborwa', 'Polokwane', 'Seshego', 'Sibasa', 'Thabazimbi']
    },
    {
      regionName: 'Mpumalanga',
      regionShort: 'MP',
      regionSlug: 'mpumalanga',
      weight: 4,
      cities: ['Emalahleni', 'Nelspruit', 'Secunda']
    },
    {
      regionName: 'Northern Cape',
      regionShort: 'NC',
      regionSlug: 'northerncape',
      weight: 1,
      cities: ['Kimberley', 'Kuruman', 'Port Nolloth']
    },
    {
      regionName: 'North West',
      regionShort: 'NW',
      regionSlug: 'northwest',
      weight: 3,
      cities: ['Klerksdorp', 'Mahikeng', 'Mmabatho', 'Potchefstroom', 'Rustenburg']
    },
    {
      regionName: 'Western Cape',
      regionShort: 'WC',
      regionSlug: 'westerncape',
      weight: 6,
      cities: [
        'Bellville',
        'Cape Town',
        'Constantia',
        'George',
        'Hopefield',
        'Oudtshoorn',
        'Paarl',
        'Simon\'s Town',
        'Stellenbosch',
        'Swellendam',
        'Worcester'
      ]
    }
  ]
});

export default SouthAfrica;
