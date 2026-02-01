import fs from 'fs';

/**
 * Sorts the keys in an i18n JSON file alphabetically.
 */
export const sortI18nFile = (filePath: string) => {
  let data;
  try {
    data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (e) {
    throw new Error(`Failed to read or parse i18n file at ${filePath}: ${JSON.stringify(e)}`);
  }

  const sortedKeys = Object.keys(data).sort();

  let sortedObj: any = {};
  sortedKeys.forEach((key) => {
    sortedObj[key] = data[key];
  });

  fs.writeFileSync(filePath, JSON.stringify(sortedObj, null, '\t'));
};

export const removeKey = (key: string, filePath: string) => {
  const fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const updatedFileContent = { ...fileContent };
  delete updatedFileContent[key];

  fs.writeFileSync(filePath, JSON.stringify(updatedFileContent, null, '\t'));
};
