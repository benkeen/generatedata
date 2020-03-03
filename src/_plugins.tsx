// TODO auto-generate this. 

import Alphanumeric from './plugins/dataTypes/Alphanumeric/bundle';
import AutoIncrement from './plugins/dataTypes/AutoIncrement/bundle';
import Boolean from './plugins/dataTypes/Boolean/bundle';
import CVV from './plugins/dataTypes/CVV/bundle';
import City from './plugins/dataTypes/City/bundle';
import Company from './plugins/dataTypes/Company/bundle';
import Composite from './plugins/dataTypes/Composite/bundle';
import Computed from './plugins/dataTypes/Computed/bundle';
import Constant from './plugins/dataTypes/Constant/bundle';
import Country from './plugins/dataTypes/Country/bundle';
import Currency from './plugins/dataTypes/Currency/bundle';
import Date from './plugins/dataTypes/Date/bundle';
import Email from './plugins/dataTypes/Email/bundle';
import GUID from './plugins/dataTypes/GUID/bundle';
import IBAN from './plugins/dataTypes/IBAN/bundle';
import LatLng from './plugins/dataTypes/LatLng/bundle';
import List from './plugins/dataTypes/List/bundle';
import Names from './plugins/dataTypes/Names/bundle';
import NormalDistribution from './plugins/dataTypes/NormalDistribution/bundle';
import NumberRange from './plugins/dataTypes/NumberRange/bundle';
import OrganizationNumber from './plugins/dataTypes/OrganizationNumber/bundle';
import PAN from './plugins/dataTypes/PAN/bundle';
import PIN from './plugins/dataTypes/PIN/bundle';
import PersonalNumber from './plugins/dataTypes/PersonalNumber/bundle';
import Phone from './plugins/dataTypes/Phone/bundle';
import PostalZip from './plugins/dataTypes/PostalZip/bundle';
import Region from './plugins/dataTypes/Region/bundle';
import Rut from './plugins/dataTypes/Rut/bundle';
import SIRET from './plugins/dataTypes/SIRET/bundle';
import StreetAddress from './plugins/dataTypes/StreetAddress/bundle';
import TextFixed from './plugins/dataTypes/TextFixed/bundle';
import TextRandom from './plugins/dataTypes/TextRandom/bundle';
import Track1 from './plugins/dataTypes/Track1/bundle';
import Track2 from './plugins/dataTypes/Track2/bundle';
import Tree from './plugins/dataTypes/Tree/bundle';

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

export const exportTypes = {
	JSON
};

export type ExportTypeFolder = keyof typeof exportTypes;

// -------------------------------------------------------------------------------------------------------
