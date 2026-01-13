import clientConfig from '@generatedata/config/clientConfig';
import serverConfig from '@generatedata/config/serverConfig';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createDockerComposeFile = async () => {
  const placeholders = {
    '%GD_API_SERVER_PORT%': clientConfig.api.GD_API_SERVER_PORT,
    '%GD_MYSQL_ROOT_PASSWORD%': serverConfig.database.GD_MYSQL_ROOT_PASSWORD,
    '%GD_DB_PORT%': serverConfig.database.GD_DB_PORT,
    '%GD_DB_NAME%': serverConfig.database.GD_DB_NAME
  };

  const dbStructureTemplate = fs.readFileSync(path.join(__dirname, './templates/docker-compose.yml.template'), 'utf8');
  let newFile = dbStructureTemplate;
  Object.keys(placeholders).forEach((placeholder) => {
    newFile = newFile.replaceAll(placeholder, placeholders[placeholder]);
  });

  fs.writeFileSync(path.join(__dirname, '../../../docker-compose.yml'), newFile);
};

createDockerComposeFile();
