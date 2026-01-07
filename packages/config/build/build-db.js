import dateFns from 'date-fns';
import serverConfig from '@generatedata/config/serverConfig';
import { getPasswordHash } from './helpers.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createDatabaseInitFile = async () => {
  const now = Math.round(new Date().getTime() / 1000);
  const newPasswordHash = await getPasswordHash(serverConfig.defaultAdminAccount.GD_DEFAULT_ADMIN_PASSWORD);
  const mysqlDateTime = dateFns.format(dateFns.fromUnixTime(now), 'yyyy-LL-dd HH:mm:ss');

  const placeholders = {
    '%FIRST_NAME%': serverConfig.defaultAdminAccount.GD_DEFAULT_ADMIN_FIRST_NAME,
    '%LAST_NAME%': serverConfig.defaultAdminAccount.GD_DEFAULT_ADMIN_LAST_NAME,
    '%EMAIL%': serverConfig.defaultAdminAccount.GD_DEFAULT_ADMIN_EMAIL,
    '%PASSWORD%': newPasswordHash,
    '%DATE_CREATED%': mysqlDateTime,
    '%LAST_UPDATED%': mysqlDateTime
  };

  const dbStructureTemplate = fs.readFileSync(path.join(__dirname, './templates/dbStructure.template.sql'), 'utf8');
  let newFile = dbStructureTemplate;
  Object.keys(placeholders).forEach((placeholder) => {
    newFile = newFile.replace(placeholder, placeholders[placeholder]);
  });

  fs.writeFileSync(path.join(__dirname, '../_dbStructure.sql'), newFile);
};

createDatabaseInitFile();
