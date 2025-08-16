import Australia from './countries/Australia/names';
import Austria from './countries/Austria/names';
import Belgium from './countries/Belgium/names';
import Brazil from './countries/Brazil/names';
import Canada from './countries/Canada/names';
import Chile from './countries/Chile/names';
import China from './countries/China/names';
import Germany from './countries/Germany/names';
import India from './countries/India/names';
import Netherlands from './countries/Netherlands/names';
import Nigeria from './countries/Nigeria/names';
import Singapore from './countries/Singapore/names';
import Spain from './countries/Spain/names';
import Turkey from './countries/Turkey/names';
import US from './countries/US/names';
import Vietnam from './countries/Vietnam/names';

const nameFiles = {
  Australia,
  Austria,
  Belgium,
  Brazil,
  Canada,
  Chile,
  China,
  Germany,
  India,
  Netherlands,
  Nigeria,
  Singapore,
  Spain,
  Turkey,
  US,
  Vietnam
};
export default nameFiles;

export type CountryNameFiles = keyof typeof nameFiles;
