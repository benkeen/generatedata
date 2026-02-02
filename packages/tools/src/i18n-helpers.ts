import fs from 'fs';
import path from 'path';

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

export type I18nValidationError = {
  type: 'parse-error' | 'missing-keys' | 'missing-comments';
  fileName: string;
  details: string | string[];
};

export type I18nValidationResult = {
  valid: boolean;
  errors: I18nValidationError[];
  folderPath: string;
};

export const validateI18nFileSet = (folderPath: string, options?: { checkComments?: boolean }): I18nValidationResult => {
  const { checkComments = true } = options ?? {};
  const errors: I18nValidationError[] = [];
  const fileNames = fs.readdirSync(folderPath).filter((fileName) => fileName.endsWith('.json'));
  const allKeysSet = new Set<string>();
  const fileKeyMaps: Record<string, Set<string>> = {};
  const fileDataMaps: Record<string, Record<string, string>> = {};

  // First pass: read all files and collect keys
  for (const fileName of fileNames) {
    const filePath = path.join(folderPath, fileName);
    let data;
    try {
      data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (e) {
      errors.push({
        type: 'parse-error',
        fileName,
        details: e instanceof Error ? e.message : String(e)
      });
      continue;
    }

    const keys = Object.keys(data);
    fileKeyMaps[fileName] = new Set(keys);
    fileDataMaps[fileName] = data;
    keys.forEach((key) => allKeysSet.add(key));
  }

  const allKeys = Array.from(allKeysSet).sort();

  // Second pass: check for missing keys in each file
  for (const [fileName, keySet] of Object.entries(fileKeyMaps)) {
    const missingKeys = allKeys.filter((key) => !keySet.has(key));
    if (missingKeys.length > 0) {
      errors.push({
        type: 'missing-keys',
        fileName,
        details: missingKeys
      });
    }
  }

  // Third pass: check for missing comments in en.json (the source file)
  if (checkComments && fileKeyMaps['en.json']) {
    const enKeys = Array.from(fileKeyMaps['en.json']);
    const contentKeys = enKeys.filter((key) => !key.endsWith(':comment'));
    const missingComments: string[] = [];

    for (const key of contentKeys) {
      const commentKey = `${key}:comment`;
      if (!fileKeyMaps['en.json'].has(commentKey)) {
        missingComments.push(key);
      }
    }

    if (missingComments.length > 0) {
      errors.push({
        type: 'missing-comments',
        fileName: 'en.json',
        details: missingComments.sort()
      });
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    folderPath
  };
};

export const formatValidationErrors = (result: I18nValidationResult): string => {
  if (result.valid) {
    return `✓ All i18n files in ${result.folderPath} are valid and have consistent keys.`;
  }

  const lines: string[] = [
    ``,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `  i18n Validation Errors: ${result.folderPath}`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    ``
  ];

  // Group errors by type
  const parseErrors = result.errors.filter((e) => e.type === 'parse-error');
  const missingKeyErrors = result.errors.filter((e) => e.type === 'missing-keys');
  const missingCommentErrors = result.errors.filter((e) => e.type === 'missing-comments');

  if (parseErrors.length > 0) {
    lines.push(`  ❌ Parse Errors (${parseErrors.length} file${parseErrors.length > 1 ? 's' : ''}):`);
    lines.push(`  ─────────────────────────────────────`);
    for (const error of parseErrors) {
      lines.push(`    • ${error.fileName}`);
      lines.push(`      ${error.details}`);
    }
    lines.push(``);
  }

  if (missingKeyErrors.length > 0) {
    lines.push(`  ⚠ Missing Keys (${missingKeyErrors.length} file${missingKeyErrors.length > 1 ? 's' : ''}):`);
    lines.push(`  ─────────────────────────────────────`);
    for (const error of missingKeyErrors) {
      const keys = error.details as string[];
      lines.push(`    • ${error.fileName} (${keys.length} missing):`);
      for (const key of keys) {
        lines.push(`        - ${key}`);
      }
    }
    lines.push(``);
  }

  if (missingCommentErrors.length > 0) {
    lines.push(`  💬 Missing Comments (in en.json):`);
    lines.push(`  ─────────────────────────────────────`);
    for (const error of missingCommentErrors) {
      const keys = error.details as string[];
      lines.push(`    Keys without a corresponding ":comment" property (${keys.length}):`);
      for (const key of keys) {
        lines.push(`        - ${key}`);
      }
    }
    lines.push(``);
  }

  const totalErrors = result.errors.reduce((sum, e) => {
    return sum + (e.type === 'missing-keys' || e.type === 'missing-comments' ? (e.details as string[]).length : 1);
  }, 0);

  lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  lines.push(
    `  Total: ${totalErrors} error${totalErrors > 1 ? 's' : ''} in ${result.errors.length} file${result.errors.length > 1 ? 's' : ''}`
  );
  lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  lines.push(``);

  return lines.join('\n');
};
