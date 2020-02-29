import Alphanumeric from '/Applications/MAMP/htdocs/generatedata/src/plugins/dataTypes/Alphanumeric/bundle';
import AutoIncrement from '/Applications/MAMP/htdocs/generatedata/src/plugins/dataTypes/AutoIncrement/bundle';
import Boolean from '/Applications/MAMP/htdocs/generatedata/src/plugins/dataTypes/Boolean/bundle';
import CVV from '/Applications/MAMP/htdocs/generatedata/src/plugins/dataTypes/CVV/bundle';
import City from '/Applications/MAMP/htdocs/generatedata/src/plugins/dataTypes/City/bundle';
import Company from '/Applications/MAMP/htdocs/generatedata/src/plugins/dataTypes/Company/bundle';
import Composite from '/Applications/MAMP/htdocs/generatedata/src/plugins/dataTypes/Composite/bundle';
import Computed from '/Applications/MAMP/htdocs/generatedata/src/plugins/dataTypes/Computed/bundle';
import Constant from '/Applications/MAMP/htdocs/generatedata/src/plugins/dataTypes/Constant/bundle';
import Country from '/Applications/MAMP/htdocs/generatedata/src/plugins/dataTypes/Country/bundle';
import Currency from '/Applications/MAMP/htdocs/generatedata/src/plugins/dataTypes/Currency/bundle';
import Date from '/Applications/MAMP/htdocs/generatedata/src/plugins/dataTypes/Date/bundle';
import Email from '/Applications/MAMP/htdocs/generatedata/src/plugins/dataTypes/Email/bundle';
import GUID from '/Applications/MAMP/htdocs/generatedata/src/plugins/dataTypes/GUID/bundle';
import IBAN from '/Applications/MAMP/htdocs/generatedata/src/plugins/dataTypes/IBAN/bundle';
import LatLng from '/Applications/MAMP/htdocs/generatedata/src/plugins/dataTypes/LatLng/bundle';
import List from '/Applications/MAMP/htdocs/generatedata/src/plugins/dataTypes/List/bundle';
import Names from '/Applications/MAMP/htdocs/generatedata/src/plugins/dataTypes/Names/bundle';
import NormalDistribution from '/Applications/MAMP/htdocs/generatedata/src/plugins/dataTypes/NormalDistribution/bundle';
import NumberRange from '/Applications/MAMP/htdocs/generatedata/src/plugins/dataTypes/NumberRange/bundle';
import OrganizationNumber from '/Applications/MAMP/htdocs/generatedata/src/plugins/dataTypes/OrganizationNumber/bundle';
import PAN from '/Applications/MAMP/htdocs/generatedata/src/plugins/dataTypes/PAN/bundle';
import PIN from '/Applications/MAMP/htdocs/generatedata/src/plugins/dataTypes/PIN/bundle';
import PersonalNumber from '/Applications/MAMP/htdocs/generatedata/src/plugins/dataTypes/PersonalNumber/bundle';
import Phone from '/Applications/MAMP/htdocs/generatedata/src/plugins/dataTypes/Phone/bundle';
import PostalZip from '/Applications/MAMP/htdocs/generatedata/src/plugins/dataTypes/PostalZip/bundle';
import Region from '/Applications/MAMP/htdocs/generatedata/src/plugins/dataTypes/Region/bundle';
import Rut from '/Applications/MAMP/htdocs/generatedata/src/plugins/dataTypes/Rut/bundle';
import SIRET from '/Applications/MAMP/htdocs/generatedata/src/plugins/dataTypes/SIRET/bundle';
import StreetAddress from '/Applications/MAMP/htdocs/generatedata/src/plugins/dataTypes/StreetAddress/bundle';
import TextFixed from '/Applications/MAMP/htdocs/generatedata/src/plugins/dataTypes/TextFixed/bundle';
import TextRandom from '/Applications/MAMP/htdocs/generatedata/src/plugins/dataTypes/TextRandom/bundle';
import Track1 from '/Applications/MAMP/htdocs/generatedata/src/plugins/dataTypes/Track1/bundle';
import Track2 from '/Applications/MAMP/htdocs/generatedata/src/plugins/dataTypes/Track2/bundle';
import Tree from '/Applications/MAMP/htdocs/generatedata/src/plugins/dataTypes/Tree/bundle';

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

export type DataTypeFolder = any; // keyof typeof dataTypes;


// -------------------------------------------------------------------------------------------------------


import JSON from '/Applications/MAMP/htdocs/generatedata/src/plugins/exportTypes/JSON/bundle';

export const exportTypes = {
	JSON
};

export type ExportTypeFolder = any; // keyof typeof exportTypes;
