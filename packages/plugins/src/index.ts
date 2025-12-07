import type { AnyObject } from '@generatedata/types';
import { CountryDataType, CountryNames, DatabaseTypes } from '@generatedata/types';
import { getStrings } from '@generatedata/utils/lang';
import Alphanumeric from './dataTypes/Alphanumeric/config';
import AutoIncrement from './dataTypes/AutoIncrement/config';
import BitcoinAddress from './dataTypes/BitcoinAddress/config';
import Boolean from './dataTypes/Boolean/config';
import CVV from './dataTypes/CVV/config';
import City from './dataTypes/City/config';
import Colour from './dataTypes/Colour/config';
import Company from './dataTypes/Company/config';
import Computed from './dataTypes/Computed/config';
import Constant from './dataTypes/Constant/config';
import Country from './dataTypes/Country/config';
import Currency from './dataTypes/Currency/config';
import Date from './dataTypes/Date/config';
import Email from './dataTypes/Email/config';
import GUID from './dataTypes/GUID/config';
import IBAN from './dataTypes/IBAN/config';
import LatLng from './dataTypes/LatLng/config';
import List from './dataTypes/List/config';
import Names from './dataTypes/Names/config';
import NormalDistribution from './dataTypes/NormalDistribution/config';
import NumberRange from './dataTypes/NumberRange/config';
import OrganizationNumber from './dataTypes/OrganizationNumber/config';
import PAN from './dataTypes/PAN/config';
import PIN from './dataTypes/PIN/config';
import PersonalNumber from './dataTypes/PersonalNumber/config';
import Phone from './dataTypes/Phone/config';
import PostalZip from './dataTypes/PostalZip/config';
import Region from './dataTypes/Region/config';
import Rut from './dataTypes/Rut/config';
import SIRET from './dataTypes/SIRET/config';
import StreetAddress from './dataTypes/StreetAddress/config';
import TextFixed from './dataTypes/TextFixed/config';
import TextRandom from './dataTypes/TextRandom/config';
import Time from './dataTypes/Time/config';
import Track1 from './dataTypes/Track1/config';
import Track2 from './dataTypes/Track2/config';
import URLs from './dataTypes/URLs/config';
import WeightedList from './dataTypes/WeightedList/config';

export type Dimensions = {
  width: number;
  height: number;
};

// Data Type <Example /> props
export type DTExampleProps = {
  data: any;
  id: string;
  gridPanelDimensions: Dimensions;
  onUpdate: (data: AnyObject) => void;
  coreI18n: any;
  countryI18n: any;
  i18n: any;
};

// Data Type <Help /> props
export type DTHelpProps = {
  coreI18n: any;
  countryI18n: any;
  i18n: any;
};

export type ETMessageData = {
  action: 'generate' | 'pause' | 'continue' | 'abort';
  columns: ColumnData[];
  rows: any[];
  isFirstBatch: boolean;
  isLastBatch: boolean;
  currentBatch: number;
  batchSize: number;
  settings: any; // TODO generic possible? This is the export type settings
  stripWhitespace: boolean;
  rowState: any;
  workerUtilsUrl: string;
  exportTypes: ExportTypeMap;
  dataTypes: DataTypeMap;
  countries: CountryMap;
};

export type ColumnData = {
  title: string;
  dataType: DataTypeFolder;
  metadata: DTMetadata;
};

export type DTDefinition = {
  fieldGroup: DTFieldGroup;
  fieldGroupOrder: number;
  dependencies?: DataTypeFolder[];
};

export type DTFieldGroup = 'numeric' | 'geo' | 'humanData' | 'other' | 'financial' | 'text' | 'countrySpecific';

export type DTMetadataType = 'number' | 'string' | 'boolean' | 'date' | 'infer';

export type GeneralMetadataTypes = {
  dataType: DTMetadataType;
};

export type DTMetadata = {
  general?: GeneralMetadataTypes;
  sql?: DatabaseTypes;
};

export type ExportTypeMap = {
  [exportType in ExportTypeFolder]?: string;
};

export type DataTypeMap = {
  [dataType in DataTypeFolder]?: string;
};

export type CountryMap = {
  [country in CountryType]?: string;
};

export type countryTuple = typeof countries;
export type CountryType = countryTuple[number];
export type CountryNamesMap = {
  [country in CountryType]?: CountryNames;
};

export interface ETOnMessage extends MessageEvent {
  data: ETMessageData;
}

export type DTOptionsMetadata = {
  useCountryNames?: boolean;
};

// Data Type <Options /> props
export type DTOptionsProps = {
  data: any;
  id: string;
  gridPanelDimensions: Dimensions;
  onUpdate: (data: AnyObject, metadata?: DTOptionsMetadata) => void;
  isCountryNamesLoading: boolean;
  isCountryNamesLoaded: boolean;
  countryNamesMap: CountryNamesMap | null;
  coreI18n: any;
  countryI18n: any;
  i18n: any;
  throttle?: boolean; // added for testing so we can disable the default throttle behaviour

  // for custom props. See DTCustomProps
  [propName: string]: any;
};

export type DTGenerateResult = {
  display: string | number | boolean;
  [key: string]: any;
};

export type DTGenerationData = {
  rowNum: number;
  rowState: any;
  i18n: any;
  countryI18n: any;
  existingRowData: DTGenerationExistingRowData[];
  countryData: {
    [key in CountryType]?: any;
  };
  template: GenerationTemplate;
};

export type DTGenerationExistingRowData = {
  id: string;
  colIndex: number; // bit confusing, but this is the index of the ROW in the UI.
  dataType: DataTypeFolder;

  // this contains the actual generated data from the data type
  data: DTGenerateResult;
};

//
export type GenerationTemplateRow = {
  id: string;
  title: string;
  dataType: DataTypeFolder;
  rowState: any;
  colIndex: number;
};

export type GenerationTemplate = {
  [processOrder: number]: GenerationTemplateRow[];
};

export type DTBundle = {
  initialState?: any;

  // optional <Example /> React component to show something in the UI for the "Example" column
  Example?: any;

  // optional <Options /> React component. This shows up in the Options column in the UI
  Options?: any;

  // optional <Help /> React component
  Help?: any;

  rowStateReducer?: (state: any) => any;
  getMetadata?: (data: any) => DTMetadata;
  getStoreIntegrations?: (
    selectors: any,
    actions: any
  ) => {
    customProps?: DTCustomProps;
    actionInterceptors?: DTActionInterceptors;
  };
};

export type DTActionInterceptors = {
  [action: string]: DTActionInterceptor;
};

export interface DTActionInterceptor {
  // TODO. generics? rowState and the `any` response here is the state type of the Data Type
  (rowId: string, rowState: any, actionPayload: any): any | null;
}

export type DTInterceptorSingleAction = {
  dataType: DataTypeFolder;
  interceptor: DTActionInterceptor;
};

export type DTCustomProps = {
  // weird, but setting these to undefined prevents the Data Type from overriding the core prop names accidentally
  coreI18n?: undefined;
  countryI18n?: undefined;
  i18n?: undefined;
  data?: undefined;
  id?: undefined;
  gridPanelDimensions?: undefined;
  onUpdate?: undefined;
  [propName: string]: any;
};

export type DTWorkerGenerationData = DTGenerationData & {
  workerUtilsUrl: string; // this is the URL of the workerUtils worker file
};

export interface DTWorkerOnMessage extends MessageEvent {
  data: DTWorkerGenerationData;
}

export const dataTypes = {
  Alphanumeric,
  AutoIncrement,
  BitcoinAddress,
  Boolean,
  CVV,
  City,
  Colour,
  Company,
  Computed,
  Constant,
  Country,
  Currency,
  Date,
  Email,
  GUID,
  IBAN,
  LatLng,
  List,
  Names,
  NormalDistribution,
  NumberRange,
  OrganizationNumber,
  PAN,
  PIN,
  PersonalNumber,
  Phone,
  PostalZip,
  Region,
  Rut,
  SIRET,
  StreetAddress,
  TextFixed,
  TextRandom,
  Time,
  Track1,
  Track2,
  URLs,
  WeightedList
};

export type DataTypeFolder = keyof typeof dataTypes;

export const blacklistedDataTypeFolders = ['BitcoinAddress', 'OrganizationNumber', 'PersonalNumber', 'SIRET'];

import CSV from './exportTypes/CSV/config';
import CSharp from './exportTypes/CSharp/config';
import HTML from './exportTypes/HTML/config';
import JSON from './exportTypes/JSON/config';
import Javascript from './exportTypes/Javascript/config';
import LDIF from './exportTypes/LDIF/config';
import PHP from './exportTypes/PHP/config';
import Perl from './exportTypes/Perl/config';
import Python from './exportTypes/Python/config';
import Ruby from './exportTypes/Ruby/config';
import SQL from './exportTypes/SQL/config';
import Typescript from './exportTypes/Typescript/config';
import XML from './exportTypes/XML/config';

export const exportTypes = {
  CSV,
  CSharp,
  HTML,
  JSON,
  Javascript,
  LDIF,
  PHP,
  Perl,
  Python,
  Ruby,
  SQL,
  Typescript,
  XML
};

export type ExportTypeFolder = keyof typeof exportTypes;

import CountryAustralia from './countries/Australia/bundle';
import CountryAustria from './countries/Austria/bundle';
import CountryBelgium from './countries/Belgium/bundle';
import CountryBrazil from './countries/Brazil/bundle';
import CountryCanada from './countries/Canada/bundle';
import CountryChile from './countries/Chile/bundle';
import CountryChina from './countries/China/bundle';
import CountryColombia from './countries/Colombia/bundle';
import CountryCostaRica from './countries/CostaRica/bundle';
import CountryFrance from './countries/France/bundle';
import CountryGermany from './countries/Germany/bundle';
import CountryIndia from './countries/India/bundle';
import CountryIndonesia from './countries/Indonesia/bundle';
import CountryIreland from './countries/Ireland/bundle';
import CountryItaly from './countries/Italy/bundle';
import CountryMexico from './countries/Mexico/bundle';
import CountryNetherlands from './countries/Netherlands/bundle';
import CountryNewZealand from './countries/NewZealand/bundle';
import CountryNigeria from './countries/Nigeria/bundle';
import CountryNorway from './countries/Norway/bundle';
import CountryPakistan from './countries/Pakistan/bundle';
import CountryPeru from './countries/Peru/bundle';
import CountryPhilippines from './countries/Philippines/bundle';
import CountryPoland from './countries/Poland/bundle';
import CountryRussia from './countries/Russia/bundle';
import CountrySingapore from './countries/Singapore/bundle';
import CountrySouthAfrica from './countries/SouthAfrica/bundle';
import CountrySouthKorea from './countries/SouthKorea/bundle';
import CountrySpain from './countries/Spain/bundle';
import CountrySweden from './countries/Sweden/bundle';
import CountryTurkey from './countries/Turkey/bundle';
import CountryUK from './countries/UK/bundle';
import CountryUS from './countries/US/bundle';
import CountryUkraine from './countries/Ukraine/bundle';
import CountryVietnam from './countries/Vietnam/bundle';

export const countryList: CountryType[] = [
  'Australia',
  'Austria',
  'Belgium',
  'Brazil',
  'Canada',
  'Chile',
  'China',
  'Colombia',
  'CostaRica',
  'France',
  'Germany',
  'India',
  'Indonesia',
  'Ireland',
  'Italy',
  'Mexico',
  'Netherlands',
  'NewZealand',
  'Nigeria',
  'Norway',
  'Pakistan',
  'Peru',
  'Philippines',
  'Poland',
  'Russia',
  'Singapore',
  'SouthAfrica',
  'SouthKorea',
  'Spain',
  'Sweden',
  'Turkey',
  'UK',
  'US',
  'Ukraine',
  'Vietnam'
];
export const countries = [
  'Australia',
  'Austria',
  'Belgium',
  'Brazil',
  'Canada',
  'Chile',
  'China',
  'Colombia',
  'CostaRica',
  'France',
  'Germany',
  'India',
  'Indonesia',
  'Ireland',
  'Italy',
  'Mexico',
  'Netherlands',
  'NewZealand',
  'Nigeria',
  'Norway',
  'Pakistan',
  'Peru',
  'Philippines',
  'Poland',
  'Russia',
  'Singapore',
  'SouthAfrica',
  'SouthKorea',
  'Spain',
  'Sweden',
  'Turkey',
  'UK',
  'US',
  'Ukraine',
  'Vietnam'
] as const;
export const countryMethods = {
  Australia: CountryAustralia,
  Austria: CountryAustria,
  Belgium: CountryBelgium,
  Brazil: CountryBrazil,
  Canada: CountryCanada,
  Chile: CountryChile,
  China: CountryChina,
  Colombia: CountryColombia,
  CostaRica: CountryCostaRica,
  France: CountryFrance,
  Germany: CountryGermany,
  India: CountryIndia,
  Indonesia: CountryIndonesia,
  Ireland: CountryIreland,
  Italy: CountryItaly,
  Mexico: CountryMexico,
  Netherlands: CountryNetherlands,
  NewZealand: CountryNewZealand,
  Nigeria: CountryNigeria,
  Norway: CountryNorway,
  Pakistan: CountryPakistan,
  Peru: CountryPeru,
  Philippines: CountryPhilippines,
  Poland: CountryPoland,
  Russia: CountryRussia,
  Singapore: CountrySingapore,
  SouthAfrica: CountrySouthAfrica,
  SouthKorea: CountrySouthKorea,
  Spain: CountrySpain,
  Sweden: CountrySweden,
  Turkey: CountryTurkey,
  UK: CountryUK,
  US: CountryUS,
  Ukraine: CountryUkraine,
  Vietnam: CountryVietnam
};

export enum DataType {
  Alphanumeric = 'Alphanumeric',
  AutoIncrement = 'AutoIncrement',
  Boolean = 'Boolean',
  CVV = 'CVV',
  City = 'City',
  Colour = 'Colour',
  Company = 'Company',
  Computed = 'Computed',
  Constant = 'Constant',
  Country = 'Country',
  Currency = 'Currency',
  Date = 'Date',
  Email = 'Email',
  GUID = 'GUID',
  IBAN = 'IBAN',
  LatLng = 'LatLng',
  List = 'List',
  Names = 'Names',
  NormalDistribution = 'NormalDistribution',
  NumberRange = 'NumberRange',
  PAN = 'PAN',
  PIN = 'PIN',
  Phone = 'Phone',
  PostalZip = 'PostalZip',
  Region = 'Region',
  Rut = 'Rut',
  StreetAddress = 'StreetAddress',
  TextFixed = 'TextFixed',
  TextRandom = 'TextRandom',
  Time = 'Time',
  Track1 = 'Track1',
  Track2 = 'Track2',
  URLs = 'URLs',
  WeightedList = 'WeightedList'
}

import { GenerationOptionsType as AlphanumericGenerationOptions } from './dataTypes/Alphanumeric/Alphanumeric.state';
import { GenerationOptionsType as AutoIncrementGenerationOptions } from './dataTypes/AutoIncrement/AutoIncrement.state';
import { GenerationOptionsType as BooleanGenerationOptions } from './dataTypes/Boolean/Boolean.state';
import { GenerationOptionsType as CVVGenerationOptions } from './dataTypes/CVV/CVV.state';
import { GenerationOptionsType as CityGenerationOptions } from './dataTypes/City/City.state';
import { GenerationOptionsType as ColourGenerationOptions } from './dataTypes/Colour/Colour.state';
import { GenerationOptionsType as CompanyGenerationOptions } from './dataTypes/Company/Company.state';
import { GenerationOptionsType as ComputedGenerationOptions } from './dataTypes/Computed/Computed.state';
import { GenerationOptionsType as ConstantGenerationOptions } from './dataTypes/Constant/Constant.state';
import { GenerationOptionsType as CountryGenerationOptions } from './dataTypes/Country/Country.state';
import { GenerationOptionsType as CurrencyGenerationOptions } from './dataTypes/Currency/Currency.state';
import { GenerationOptionsType as DateGenerationOptions } from './dataTypes/Date/Date.state';
import { GenerationOptionsType as EmailGenerationOptions } from './dataTypes/Email/Email.state';
import { GenerationOptionsType as GUIDGenerationOptions } from './dataTypes/GUID/GUID.state';
import { GenerationOptionsType as IBANGenerationOptions } from './dataTypes/IBAN/IBAN.state';
import { GenerationOptionsType as LatLngGenerationOptions } from './dataTypes/LatLng/LatLng.state';
import { GenerationOptionsType as ListGenerationOptions } from './dataTypes/List/List.state';
import { GenerationOptionsType as NamesGenerationOptions } from './dataTypes/Names/Names.state';
import { GenerationOptionsType as NormalDistributionGenerationOptions } from './dataTypes/NormalDistribution/NormalDistribution.state';
import { GenerationOptionsType as NumberRangeGenerationOptions } from './dataTypes/NumberRange/NumberRange.state';
import { GenerationOptionsType as PANGenerationOptions } from './dataTypes/PAN/PAN.state';
import { GenerationOptionsType as PINGenerationOptions } from './dataTypes/PIN/PIN.state';
import { GenerationOptionsType as PhoneGenerationOptions } from './dataTypes/Phone/Phone.state';
import { GenerationOptionsType as PostalZipGenerationOptions } from './dataTypes/PostalZip/PostalZip.state';
import { GenerationOptionsType as RegionGenerationOptions } from './dataTypes/Region/Region.state';
import { GenerationOptionsType as RutGenerationOptions } from './dataTypes/Rut/Rut.state';
import { GenerationOptionsType as StreetAddressGenerationOptions } from './dataTypes/StreetAddress/StreetAddress.state';
import { GenerationOptionsType as TextFixedGenerationOptions } from './dataTypes/TextFixed/TextFixed.state';
import { GenerationOptionsType as TextRandomGenerationOptions } from './dataTypes/TextRandom/TextRandom.state';
import { GenerationOptionsType as TimeGenerationOptions } from './dataTypes/Time/Time.state';
import { GenerationOptionsType as Track1GenerationOptions } from './dataTypes/Track1/Track1.state';
import { GenerationOptionsType as Track2GenerationOptions } from './dataTypes/Track2/Track2.state';
import { GenerationOptionsType as URLsGenerationOptions } from './dataTypes/URLs/URLs.state';
import { GenerationOptionsType as WeightedListGenerationOptions } from './dataTypes/WeightedList/WeightedList.state';
interface AlphanumericDataTypeRow {
  plugin: DataType.Alphanumeric | 'Alphanumeric';
  title: string;
  settings: AlphanumericGenerationOptions;
  id?: string;
}
interface AutoIncrementDataTypeRow {
  plugin: DataType.AutoIncrement | 'AutoIncrement';
  title: string;
  settings: AutoIncrementGenerationOptions;
  id?: string;
}
interface BooleanDataTypeRow {
  plugin: DataType.Boolean | 'Boolean';
  title: string;
  settings: BooleanGenerationOptions;
  id?: string;
}
interface CVVDataTypeRow {
  plugin: DataType.CVV | 'CVV';
  title: string;
  settings: CVVGenerationOptions;
  id?: string;
}
interface CityDataTypeRow {
  plugin: DataType.City | 'City';
  title: string;
  settings: CityGenerationOptions;
  id?: string;
}
interface ColourDataTypeRow {
  plugin: DataType.Colour | 'Colour';
  title: string;
  settings: ColourGenerationOptions;
  id?: string;
}
interface CompanyDataTypeRow {
  plugin: DataType.Company | 'Company';
  title: string;
  settings: CompanyGenerationOptions;
  id?: string;
}
interface ComputedDataTypeRow {
  plugin: DataType.Computed | 'Computed';
  title: string;
  settings: ComputedGenerationOptions;
  id?: string;
}
interface ConstantDataTypeRow {
  plugin: DataType.Constant | 'Constant';
  title: string;
  settings: ConstantGenerationOptions;
  id?: string;
}
interface CountryDataTypeRow {
  plugin: DataType.Country | 'Country';
  title: string;
  settings: CountryGenerationOptions;
  id?: string;
}
interface CurrencyDataTypeRow {
  plugin: DataType.Currency | 'Currency';
  title: string;
  settings: CurrencyGenerationOptions;
  id?: string;
}
interface DateDataTypeRow {
  plugin: DataType.Date | 'Date';
  title: string;
  settings: DateGenerationOptions;
  id?: string;
}
interface EmailDataTypeRow {
  plugin: DataType.Email | 'Email';
  title: string;
  settings: EmailGenerationOptions;
  id?: string;
}
interface GUIDDataTypeRow {
  plugin: DataType.GUID | 'GUID';
  title: string;
  settings: GUIDGenerationOptions;
  id?: string;
}
interface IBANDataTypeRow {
  plugin: DataType.IBAN | 'IBAN';
  title: string;
  settings: IBANGenerationOptions;
  id?: string;
}
interface LatLngDataTypeRow {
  plugin: DataType.LatLng | 'LatLng';
  title: string;
  settings: LatLngGenerationOptions;
  id?: string;
}
interface ListDataTypeRow {
  plugin: DataType.List | 'List';
  title: string;
  settings: ListGenerationOptions;
  id?: string;
}
interface NamesDataTypeRow {
  plugin: DataType.Names | 'Names';
  title: string;
  settings: NamesGenerationOptions;
  id?: string;
}
interface NormalDistributionDataTypeRow {
  plugin: DataType.NormalDistribution | 'NormalDistribution';
  title: string;
  settings: NormalDistributionGenerationOptions;
  id?: string;
}
interface NumberRangeDataTypeRow {
  plugin: DataType.NumberRange | 'NumberRange';
  title: string;
  settings: NumberRangeGenerationOptions;
  id?: string;
}
interface PANDataTypeRow {
  plugin: DataType.PAN | 'PAN';
  title: string;
  settings: PANGenerationOptions;
  id?: string;
}
interface PINDataTypeRow {
  plugin: DataType.PIN | 'PIN';
  title: string;
  settings: PINGenerationOptions;
  id?: string;
}
interface PhoneDataTypeRow {
  plugin: DataType.Phone | 'Phone';
  title: string;
  settings: PhoneGenerationOptions;
  id?: string;
}
interface PostalZipDataTypeRow {
  plugin: DataType.PostalZip | 'PostalZip';
  title: string;
  settings: PostalZipGenerationOptions;
  id?: string;
}
interface RegionDataTypeRow {
  plugin: DataType.Region | 'Region';
  title: string;
  settings: RegionGenerationOptions;
  id?: string;
}
interface RutDataTypeRow {
  plugin: DataType.Rut | 'Rut';
  title: string;
  settings: RutGenerationOptions;
  id?: string;
}
interface StreetAddressDataTypeRow {
  plugin: DataType.StreetAddress | 'StreetAddress';
  title: string;
  settings: StreetAddressGenerationOptions;
  id?: string;
}
interface TextFixedDataTypeRow {
  plugin: DataType.TextFixed | 'TextFixed';
  title: string;
  settings: TextFixedGenerationOptions;
  id?: string;
}
interface TextRandomDataTypeRow {
  plugin: DataType.TextRandom | 'TextRandom';
  title: string;
  settings: TextRandomGenerationOptions;
  id?: string;
}
interface TimeDataTypeRow {
  plugin: DataType.Time | 'Time';
  title: string;
  settings: TimeGenerationOptions;
  id?: string;
}
interface Track1DataTypeRow {
  plugin: DataType.Track1 | 'Track1';
  title: string;
  settings: Track1GenerationOptions;
  id?: string;
}
interface Track2DataTypeRow {
  plugin: DataType.Track2 | 'Track2';
  title: string;
  settings: Track2GenerationOptions;
  id?: string;
}
interface URLsDataTypeRow {
  plugin: DataType.URLs | 'URLs';
  title: string;
  settings: URLsGenerationOptions;
  id?: string;
}
interface WeightedListDataTypeRow {
  plugin: DataType.WeightedList | 'WeightedList';
  title: string;
  settings: WeightedListGenerationOptions;
  id?: string;
}

export type DataTemplateRow =
  | AlphanumericDataTypeRow
  | AutoIncrementDataTypeRow
  | BooleanDataTypeRow
  | CVVDataTypeRow
  | CityDataTypeRow
  | ColourDataTypeRow
  | CompanyDataTypeRow
  | ComputedDataTypeRow
  | ConstantDataTypeRow
  | CountryDataTypeRow
  | CurrencyDataTypeRow
  | DateDataTypeRow
  | EmailDataTypeRow
  | GUIDDataTypeRow
  | IBANDataTypeRow
  | LatLngDataTypeRow
  | ListDataTypeRow
  | NamesDataTypeRow
  | NormalDistributionDataTypeRow
  | NumberRangeDataTypeRow
  | PANDataTypeRow
  | PINDataTypeRow
  | PhoneDataTypeRow
  | PostalZipDataTypeRow
  | RegionDataTypeRow
  | RutDataTypeRow
  | StreetAddressDataTypeRow
  | TextFixedDataTypeRow
  | TextRandomDataTypeRow
  | TimeDataTypeRow
  | Track1DataTypeRow
  | Track2DataTypeRow
  | URLsDataTypeRow
  | WeightedListDataTypeRow;

import { GenerationOptionsType as CSVGenerationOptions } from './exportTypes/CSV/CSV.state';
import { GenerationOptionsType as CSharpGenerationOptions } from './exportTypes/CSharp/CSharp.state';
import { GenerationOptionsType as HTMLGenerationOptions } from './exportTypes/HTML/HTML.state';
import { GenerationOptionsType as JSONGenerationOptions } from './exportTypes/JSON/JSON.state';
import { GenerationOptionsType as JavascriptGenerationOptions } from './exportTypes/Javascript/Javascript.state';
import { GenerationOptionsType as LDIFGenerationOptions } from './exportTypes/LDIF/LDIF.state';
import { GenerationOptionsType as PHPGenerationOptions } from './exportTypes/PHP/PHP.state';
import { GenerationOptionsType as PerlGenerationOptions } from './exportTypes/Perl/Perl.state';
import { GenerationOptionsType as PythonGenerationOptions } from './exportTypes/Python/Python.state';
import { GenerationOptionsType as RubyGenerationOptions } from './exportTypes/Ruby/Ruby.state';
import { GenerationOptionsType as SQLGenerationOptions } from './exportTypes/SQL/SQL.state';
import { GenerationOptionsType as TypescriptGenerationOptions } from './exportTypes/Typescript/Typescript.state';
import { GenerationOptionsType as XMLGenerationOptions } from './exportTypes/XML/XML.state';
interface CSVExportTypeConfig {
  plugin: ExportType.CSV | 'CSV';
  settings: CSVGenerationOptions;
}
interface CSharpExportTypeConfig {
  plugin: ExportType.CSharp | 'CSharp';
  settings: CSharpGenerationOptions;
}
interface HTMLExportTypeConfig {
  plugin: ExportType.HTML | 'HTML';
  settings: HTMLGenerationOptions;
}
interface JSONExportTypeConfig {
  plugin: ExportType.JSON | 'JSON';
  settings: JSONGenerationOptions;
}
interface JavascriptExportTypeConfig {
  plugin: ExportType.Javascript | 'Javascript';
  settings: JavascriptGenerationOptions;
}
interface LDIFExportTypeConfig {
  plugin: ExportType.LDIF | 'LDIF';
  settings: LDIFGenerationOptions;
}
interface PHPExportTypeConfig {
  plugin: ExportType.PHP | 'PHP';
  settings: PHPGenerationOptions;
}
interface PerlExportTypeConfig {
  plugin: ExportType.Perl | 'Perl';
  settings: PerlGenerationOptions;
}
interface PythonExportTypeConfig {
  plugin: ExportType.Python | 'Python';
  settings: PythonGenerationOptions;
}
interface RubyExportTypeConfig {
  plugin: ExportType.Ruby | 'Ruby';
  settings: RubyGenerationOptions;
}
interface SQLExportTypeConfig {
  plugin: ExportType.SQL | 'SQL';
  settings: SQLGenerationOptions;
}
interface TypescriptExportTypeConfig {
  plugin: ExportType.Typescript | 'Typescript';
  settings: TypescriptGenerationOptions;
}
interface XMLExportTypeConfig {
  plugin: ExportType.XML | 'XML';
  settings: XMLGenerationOptions;
}

export type ExportTypeConfig =
  | CSVExportTypeConfig
  | CSharpExportTypeConfig
  | HTMLExportTypeConfig
  | JSONExportTypeConfig
  | JavascriptExportTypeConfig
  | LDIFExportTypeConfig
  | PHPExportTypeConfig
  | PerlExportTypeConfig
  | PythonExportTypeConfig
  | RubyExportTypeConfig
  | SQLExportTypeConfig
  | TypescriptExportTypeConfig
  | XMLExportTypeConfig;

export enum ExportType {
  CSV = 'CSV',
  CSharp = 'CSharp',
  HTML = 'HTML',
  JSON = 'JSON',
  Javascript = 'Javascript',
  LDIF = 'LDIF',
  PHP = 'PHP',
  Perl = 'Perl',
  Python = 'Python',
  Ruby = 'Ruby',
  SQL = 'SQL',
  Typescript = 'Typescript',
  XML = 'XML'
}

export const getCountryList = (): string[] => countryList;

export const getCountryData = (): CountryDataType => {
  const localeStrings = getStrings();

  const data: any = {};
  countryList.map((country: CountryType) => {
    data[country] = countryMethods[country](localeStrings.countries[country]);
  });

  return data;
};

const countryRawData =
  "AF|Afghanistan`AX|Åland Islands`AL|Albania`DZ|Algeria`AS|American Samoa`AD|Andorra`AO|Angola`AI|Anguilla`AQ|Antarctica`AG|Antigua and Barbuda`AR|Argentina`AM|Armenia`AW|Aruba`AU|Australia`AT|Austria`AZ|Azerbaijan`BS|Bahamas`BH|Bahrain`BD|Bangladesh`BB|Barbados`BY|Belarus`BE|Belgium`BZ|Belize`BJ|Benin`BM|Bermuda`BT|Bhutan`BO|Bolivia`BQ|Bonaire, Sint Eustatius and Saba`BA|Bosnia and Herzegovina`BW|Botswana`BV|Bouvet Island`BR|Brazil`IO|British Indian Ocean Territory`BN|Brunei Darussalam`BG|Bulgaria`BF|Burkina Faso`BI|Burundi`KH|Cambodia`CM|Cameroon`CA|Canada`CV|Cape Verde`KY|Cayman Islands`CF|Central African Republic`TD|Chad`CL|Chile`CN|China`CX|Christmas Island`CC|Cocos (Keeling) Islands`CO|Colombia`KM|Comoros`CG|Congo, Republic of the (Brazzaville)`CD|Congo, the Democratic Republic of the (Kinshasa)`CK|Cook Islands`CR|Costa Rica`CI|Côte d'Ivoire, Republic of`HR|Croatia`CU|Cuba`CW|Curaçao`CY|Cyprus`CZ|Czech Republic`DK|Denmark`DJ|Djibouti`DM|Dominica`DO|Dominican Republic`EC|Ecuador`EG|Egypt`SV|El Salvador`GQ|Equatorial Guinea`ER|Eritrea`EE|Estonia`ET|Ethiopia`FK|Falkland Islands (Islas Malvinas)`FO|Faroe Islands`FJ|Fiji`FI|Finland`FR|France`GF|French Guiana`PF|French Polynesia`TF|French Southern and Antarctic Lands`GA|Gabon`GM|Gambia, The`GE|Georgia`DE|Germany`GH|Ghana`GI|Gibraltar`GR|Greece`GL|Greenland`GD|Grenada`GP|Guadeloupe`GU|Guam`GT|Guatemala`GG|Guernsey`GN|Guinea`GW|Guinea-Bissau`GY|Guyana`HT|Haiti`HM|Heard Island and McDonald Islands`VA|Holy See (Vatican City)`HN|Honduras`HK|Hong Kong`HU|Hungary`IS|Iceland`IN|India`ID|Indonesia`IR|Iran, Islamic Republic of`IQ|Iraq`IE|Ireland`IM|Isle of Man`IL|Israel`IT|Italy`JM|Jamaica`JP|Japan`JE|Jersey`JO|Jordan`KZ|Kazakhstan`KE|Kenya`KI|Kiribati`KP|Korea, Democratic People's Republic of`KR|Korea, Republic of`KS|Kosovo`KW|Kuwait`KG|Kyrgyzstan`LA|Laos`LV|Latvia`LB|Lebanon`LS|Lesotho`LR|Liberia`LY|Libya`LI|Liechtenstein`LT|Lithuania`LU|Luxembourg`MO|Macao`MK|Macedonia, Republic of`MG|Madagascar`MW|Malawi`MY|Malaysia`MV|Maldives`ML|Mali`MT|Malta`MH|Marshall Islands`MQ|Martinique`MR|Mauritania`MU|Mauritius`YT|Mayotte`MX|Mexico`FM|Micronesia, Federated States of`MD|Moldova`MC|Monaco`MN|Mongolia`ME|Montenegro`MS|Montserrat`MA|Morocco`MZ|Mozambique`MM|Myanmar`NA|Namibia`NR|Nauru`NP|Nepal`NL|Netherlands`NC|New Caledonia`NZ|New Zealand`NI|Nicaragua`NE|Niger`NG|Nigeria`NU|Niue`NF|Norfolk Island`MP|Northern Mariana Islands`NO|Norway`OM|Oman`PK|Pakistan`PW|Palau`PS|Palestine, State of`PA|Panama`PG|Papua New Guinea`PY|Paraguay`PE|Peru`PH|Philippines`PN|Pitcairn`PL|Poland`PT|Portugal`PR|Puerto Rico`QA|Qatar`RE|Réunion`RO|Romania`RU|Russian Federation`RW|Rwanda`BL|Saint Barthélemy`SH|Saint Helena, Ascension and Tristan da Cunha`KN|Saint Kitts and Nevis`LC|Saint Lucia`MF|Saint Martin`PM|Saint Pierre and Miquelon`VC|Saint Vincent and the Grenadines`WS|Samoa`SM|San Marino`ST|Sao Tome and Principe`SA|Saudi Arabia`SN|Senegal`RS|Serbia`SC|Seychelles`SL|Sierra Leone`SG|Singapore`SX|Sint Maarten (Dutch part)`SK|Slovakia`SI|Slovenia`SB|Solomon Islands`SO|Somalia`ZA|South Africa`GS|South Georgia and South Sandwich Islands`SS|South Sudan`ES|Spain`LK|Sri Lanka`SD|Sudan`SR|Suriname`SZ|Swaziland`SE|Sweden`CH|Switzerland`SY|Syrian Arab Republic`TW|Taiwan`TJ|Tajikistan`TZ|Tanzania, United Republic of`TH|Thailand`TL|Timor-Leste`TG|Togo`TK|Tokelau`TO|Tonga`TT|Trinidad and Tobago`TN|Tunisia`TR|Turkey`TM|Turkmenistan`TC|Turks and Caicos Islands`TV|Tuvalu`UG|Uganda`UA|Ukraine`AE|United Arab Emirates`GB|United Kingdom`US|United States`UM|United States Minor Outlying Islands`UY|Uruguay`UZ|Uzbekistan`VU|Vanuatu`VE|Venezuela, Bolivarian Republic of`VN|Vietnam`VG|Virgin Islands, British`VI|Virgin Islands, U.S.`WF|Wallis and Futuna`EH|Western Sahara`YE|Yemen`ZM|Zambia`ZW|Zimbabwe";
const regionRawData =
  'AB|Alberta`BC|British Columbia`MB|Manitoba`NB|New Brunswick`NL|Newfoundland and Labrador`NT|Northwest Territories`NS|Nova Scotia`NU|Nunavut`ON|Ontario`PE|Prince Edward Island`QC|Quebec`SK|Saskatchewan`YT|Yukon';

const convert = (data: string): any[] => {
  const pairs = data.split('`');

  return pairs.map((pair) => {
    const [value, label] = pair.split('|');
    return { value, label };
  });
};

export const countryDropdownOptions = convert(countryRawData);
export const canadianProvinceOptions = convert(regionRawData);

// export const getCountryNameMap = (): CountryMap => {
//   const localeStrings = getStrings();

//   const data: CountryMap = {};
//   countryList.map((country: CountryType) => {
//     data[country] = localeStrings.countries[country];
//   });

//   return data;
// };
