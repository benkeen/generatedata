import fs from 'fs';
import path from 'path';
import os from 'os';
import {
  sortI18nFile,
  sortI18nFileSet,
  formatSortResults,
  removeKey,
  validateI18nFileSet,
  formatValidationErrors,
  type SortI18nFileSetResult,
  type I18nValidationResult
} from '../i18n-helpers';

describe('sortI18nFile', () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'i18n-test-'));
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it('sorts keys alphabetically in a JSON file', () => {
    const filePath = path.join(tempDir, 'test.json');
    const unsortedData = { zebra: 'z', apple: 'a', mango: 'm' };
    fs.writeFileSync(filePath, JSON.stringify(unsortedData));

    sortI18nFile(filePath);

    const result = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const keys = Object.keys(result);
    expect(keys).toEqual(['apple', 'mango', 'zebra']);
  });

  it('preserves values while sorting', () => {
    const filePath = path.join(tempDir, 'test.json');
    const unsortedData = { b: 'value-b', a: 'value-a' };
    fs.writeFileSync(filePath, JSON.stringify(unsortedData));

    sortI18nFile(filePath);

    const result = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    expect(result.a).toBe('value-a');
    expect(result.b).toBe('value-b');
  });

  it('throws an error for invalid JSON', () => {
    const filePath = path.join(tempDir, 'invalid.json');
    fs.writeFileSync(filePath, 'not valid json');

    expect(() => sortI18nFile(filePath)).toThrow(/Failed to read or parse i18n file/);
  });

  it('throws an error for non-existent file', () => {
    const filePath = path.join(tempDir, 'nonexistent.json');

    expect(() => sortI18nFile(filePath)).toThrow(/Failed to read or parse i18n file/);
  });
});

describe('sortI18nFileSet', () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'i18n-test-'));
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it('sorts all JSON files in a folder', () => {
    fs.writeFileSync(path.join(tempDir, 'en.json'), JSON.stringify({ z: '1', a: '2' }));
    fs.writeFileSync(path.join(tempDir, 'fr.json'), JSON.stringify({ c: '3', b: '4' }));

    const result = sortI18nFileSet(tempDir);

    expect(result.sortedFiles).toContain('en.json');
    expect(result.sortedFiles).toContain('fr.json');
    expect(result.errors).toHaveLength(0);
    expect(result.folderPath).toBe(tempDir);

    // Verify files are actually sorted
    const enContent = JSON.parse(fs.readFileSync(path.join(tempDir, 'en.json'), 'utf-8'));
    expect(Object.keys(enContent)).toEqual(['a', 'z']);
  });

  it('ignores non-JSON files', () => {
    fs.writeFileSync(path.join(tempDir, 'en.json'), JSON.stringify({ b: '1', a: '2' }));
    fs.writeFileSync(path.join(tempDir, 'readme.txt'), 'not json');

    const result = sortI18nFileSet(tempDir);

    expect(result.sortedFiles).toEqual(['en.json']);
    expect(result.errors).toHaveLength(0);
  });

  it('collects errors for invalid JSON files', () => {
    fs.writeFileSync(path.join(tempDir, 'valid.json'), JSON.stringify({ a: '1' }));
    fs.writeFileSync(path.join(tempDir, 'invalid.json'), 'not valid json');

    const result = sortI18nFileSet(tempDir);

    expect(result.sortedFiles).toContain('valid.json');
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].fileName).toBe('invalid.json');
    expect(result.errors[0].error).toContain('Failed to read or parse');
  });

  it('returns empty arrays for folder with no JSON files', () => {
    fs.writeFileSync(path.join(tempDir, 'readme.txt'), 'text file');

    const result = sortI18nFileSet(tempDir);

    expect(result.sortedFiles).toHaveLength(0);
    expect(result.errors).toHaveLength(0);
  });
});

describe('formatSortResults', () => {
  it('formats successful sort results', () => {
    const result: SortI18nFileSetResult = {
      folderPath: '/path/to/locales',
      sortedFiles: ['en.json', 'fr.json'],
      errors: []
    };

    const formatted = formatSortResults(result);

    expect(formatted).toContain('Sorted 2 files');
    expect(formatted).toContain('/path/to/locales');
  });

  it('formats single file success with correct grammar', () => {
    const result: SortI18nFileSetResult = {
      folderPath: '/path/to/locales',
      sortedFiles: ['en.json'],
      errors: []
    };

    const formatted = formatSortResults(result);

    expect(formatted).toContain('Sorted 1 file');
    expect(formatted).not.toContain('files');
  });

  it('formats errors when present', () => {
    const result: SortI18nFileSetResult = {
      folderPath: '/path/to/locales',
      sortedFiles: [],
      errors: [{ fileName: 'broken.json', error: 'Parse error' }]
    };

    const formatted = formatSortResults(result);

    expect(formatted).toContain('i18n Sort Errors');
    expect(formatted).toContain('broken.json');
    expect(formatted).toContain('Parse error');
  });

  it('returns empty string when no files sorted and no errors', () => {
    const result: SortI18nFileSetResult = {
      folderPath: '/path/to/locales',
      sortedFiles: [],
      errors: []
    };

    const formatted = formatSortResults(result);

    expect(formatted).toBe('');
  });
});

describe('removeKey', () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'i18n-test-'));
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it('removes a key from a JSON file', () => {
    const filePath = path.join(tempDir, 'test.json');
    fs.writeFileSync(filePath, JSON.stringify({ a: '1', b: '2', c: '3' }));

    removeKey('b', filePath);

    const result = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    expect(result).toEqual({ a: '1', c: '3' });
  });

  it('does nothing if key does not exist', () => {
    const filePath = path.join(tempDir, 'test.json');
    fs.writeFileSync(filePath, JSON.stringify({ a: '1', b: '2' }));

    removeKey('nonexistent', filePath);

    const result = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    expect(result).toEqual({ a: '1', b: '2' });
  });
});

describe('validateI18nFileSet', () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'i18n-test-'));
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it('returns valid for consistent files', () => {
    fs.writeFileSync(path.join(tempDir, 'en.json'), JSON.stringify({ hello: 'Hello', 'hello:comment': 'A greeting' }));
    fs.writeFileSync(path.join(tempDir, 'fr.json'), JSON.stringify({ hello: 'Bonjour' }));

    const result = validateI18nFileSet(tempDir);

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('detects missing keys in locale files', () => {
    fs.writeFileSync(
      path.join(tempDir, 'en.json'),
      JSON.stringify({
        hello: 'Hello',
        'hello:comment': 'A greeting',
        goodbye: 'Goodbye',
        'goodbye:comment': 'A farewell'
      })
    );
    fs.writeFileSync(path.join(tempDir, 'fr.json'), JSON.stringify({ hello: 'Bonjour' }));

    const result = validateI18nFileSet(tempDir);

    expect(result.valid).toBe(false);
    const missingKeyError = result.errors.find((e) => e.type === 'missing-keys' && e.fileName === 'fr.json');
    expect(missingKeyError).toBeDefined();
    expect(missingKeyError!.details).toContain('goodbye');
  });

  it('detects parse errors', () => {
    fs.writeFileSync(path.join(tempDir, 'en.json'), JSON.stringify({ hello: 'Hello', 'hello:comment': 'A greeting' }));
    fs.writeFileSync(path.join(tempDir, 'invalid.json'), 'not valid json');

    const result = validateI18nFileSet(tempDir);

    expect(result.valid).toBe(false);
    const parseError = result.errors.find((e) => e.type === 'parse-error');
    expect(parseError).toBeDefined();
    expect(parseError!.fileName).toBe('invalid.json');
  });

  it('detects missing comments in en.json', () => {
    fs.writeFileSync(
      path.join(tempDir, 'en.json'),
      JSON.stringify({
        hello: 'Hello',
        'hello:comment': 'A greeting',
        goodbye: 'Goodbye' // missing goodbye:comment
      })
    );

    const result = validateI18nFileSet(tempDir);

    expect(result.valid).toBe(false);
    const missingCommentError = result.errors.find((e) => e.type === 'missing-comments');
    expect(missingCommentError).toBeDefined();
    expect(missingCommentError!.details).toContain('goodbye');
  });

  it('skips comment validation when checkComments is false', () => {
    fs.writeFileSync(
      path.join(tempDir, 'en.json'),
      JSON.stringify({
        hello: 'Hello',
        goodbye: 'Goodbye' // no comments
      })
    );

    const result = validateI18nFileSet(tempDir, { checkComments: false });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('returns the folder path in the result', () => {
    fs.writeFileSync(path.join(tempDir, 'en.json'), JSON.stringify({ hello: 'Hello', 'hello:comment': 'A greeting' }));

    const result = validateI18nFileSet(tempDir);

    expect(result.folderPath).toBe(tempDir);
  });
});

describe('formatValidationErrors', () => {
  it('formats valid result', () => {
    const result: I18nValidationResult = {
      valid: true,
      errors: [],
      folderPath: '/path/to/locales'
    };

    const formatted = formatValidationErrors(result);

    expect(formatted).toContain('All i18n files');
    expect(formatted).toContain('valid');
    expect(formatted).toContain('/path/to/locales');
  });

  it('formats parse errors', () => {
    const result: I18nValidationResult = {
      valid: false,
      errors: [
        {
          type: 'parse-error',
          fileName: 'broken.json',
          details: 'Unexpected token'
        }
      ],
      folderPath: '/path/to/locales'
    };

    const formatted = formatValidationErrors(result);

    expect(formatted).toContain('Parse Errors');
    expect(formatted).toContain('broken.json');
    expect(formatted).toContain('Unexpected token');
  });

  it('formats missing key errors', () => {
    const result: I18nValidationResult = {
      valid: false,
      errors: [
        {
          type: 'missing-keys',
          fileName: 'fr.json',
          details: ['hello', 'goodbye']
        }
      ],
      folderPath: '/path/to/locales'
    };

    const formatted = formatValidationErrors(result);

    expect(formatted).toContain('Missing Keys');
    expect(formatted).toContain('fr.json');
    expect(formatted).toContain('2 missing');
    expect(formatted).toContain('hello');
    expect(formatted).toContain('goodbye');
  });

  it('formats missing comment errors', () => {
    const result: I18nValidationResult = {
      valid: false,
      errors: [
        {
          type: 'missing-comments',
          fileName: 'en.json',
          details: ['welcomeMessage']
        }
      ],
      folderPath: '/path/to/locales'
    };

    const formatted = formatValidationErrors(result);

    expect(formatted).toContain('Missing Comments');
    expect(formatted).toContain('welcomeMessage');
  });

  it('includes total error count', () => {
    const result: I18nValidationResult = {
      valid: false,
      errors: [
        {
          type: 'missing-keys',
          fileName: 'fr.json',
          details: ['key1', 'key2']
        },
        {
          type: 'parse-error',
          fileName: 'broken.json',
          details: 'Error'
        }
      ],
      folderPath: '/path/to/locales'
    };

    const formatted = formatValidationErrors(result);

    // Should count 2 missing keys + 1 parse error = 3 total
    expect(formatted).toContain('Total: 3 errors');
  });
});
