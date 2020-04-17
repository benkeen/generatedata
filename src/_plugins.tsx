// TODO auto-generate this.

import Alphanumeric from './plugins/dataTypes/Alphanumeric/config';
import AutoIncrement from './plugins/dataTypes/AutoIncrement/config';
import Boolean from './plugins/dataTypes/Boolean/config';
import CVV from './plugins/dataTypes/CVV/config';
import City from './plugins/dataTypes/City/config';
import Company from './plugins/dataTypes/Company/config';
import Composite from './plugins/dataTypes/Composite/config';
import Computed from './plugins/dataTypes/Computed/config';
import Constant from './plugins/dataTypes/Constant/config';
import Country from './plugins/dataTypes/Country/config';
import Currency from './plugins/dataTypes/Currency/config';
import Date from './plugins/dataTypes/Date/config';
import Email from './plugins/dataTypes/Email/config';
import GUID from './plugins/dataTypes/GUID/config';
import IBAN from './plugins/dataTypes/IBAN/config';
import LatLng from './plugins/dataTypes/LatLng/config';
import List from './plugins/dataTypes/List/config';
import Names from './plugins/dataTypes/Names/config';
import NormalDistribution from './plugins/dataTypes/NormalDistribution/config';
import NumberRange from './plugins/dataTypes/NumberRange/config';
import OrganizationNumber from './plugins/dataTypes/OrganizationNumber/config';
import PAN from './plugins/dataTypes/PAN/config';
import PIN from './plugins/dataTypes/PIN/config';
import PersonalNumber from './plugins/dataTypes/PersonalNumber/config';
import Phone from './plugins/dataTypes/Phone/config';
import PostalZip from './plugins/dataTypes/PostalZip/config';
import Region from './plugins/dataTypes/Region/config';
import Rut from './plugins/dataTypes/Rut/config';
import SIRET from './plugins/dataTypes/SIRET/config';
import StreetAddress from './plugins/dataTypes/StreetAddress/config';
import TextFixed from './plugins/dataTypes/TextFixed/config';
import TextRandom from './plugins/dataTypes/TextRandom/config';
import Track1 from './plugins/dataTypes/Track1/config';
import Track2 from './plugins/dataTypes/Track2/config';
import Tree from './plugins/dataTypes/Tree/config';

export const dataTypes = {
	Alphanumeric,
	AutoIncrement,
	Boolean,
	CVV,
	City,
	Company,
	Composite,
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
	Track1,
	Track2,
	Tree
};

export type DataTypeFolder = keyof typeof dataTypes;


// -------------------------------------------------------------------------------------------------------

import JSON from './plugins/exportTypes/JSON/config';
import SQL from './plugins/exportTypes/SQL/config';

export const exportTypes = {
	JSON,
	SQL
};

export type ExportTypeFolder = keyof typeof exportTypes;

// -------------------------------------------------------------------------------------------------------

export type CountryType = 'Australia' | 'Austria' | 'Belgium';
