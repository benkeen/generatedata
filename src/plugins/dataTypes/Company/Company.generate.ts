import { ExportTypeMetadata } from '../../../../types/exportTypes';
import { getRandomNum } from '../../../utils/randomUtils';
import { lipsum } from '../../../resources/lipsum';
import { uppercaseWords } from '../../../utils/generalUtils';

const wordsArr = lipsum.split(/\s+/);
const numWords = wordsArr.length;

const companyTypes = [
    'Company', 'Corp.', 'Corporation', 'Inc.', 'Incorporated', 'LLC', 'LLP', 'Ltd', 'Limited',
    'PC', 'Foundation', 'Institute', 'Associates', 'Industries', 'Consulting'
];

const removePunctuation = (arr: string[]) => arr.map((i: string) => i.replace(/[.,:;]/g, ''));

export const generate = () => {
    const numCompanyNameWords = getRandomNum(1, 3);
    const offset = getRandomNum(0, numWords - (numCompanyNameWords + 1));
    const selectedWords = removePunctuation(wordsArr.slice(offset, offset + numCompanyNameWords));
    const companyType = companyTypes[getRandomNum(0, companyTypes.length)];

    return {
        display: uppercaseWords(selectedWords.join(' ')) + ' ' + companyType
    };
};

export const getMetadata = (): ExportTypeMetadata => ({
    sql: {
        field: 'varchar(255)',
        field_Oracle: 'varchar2(255)',
        field_MSSQL: 'VARCHAR(255) NULL'
    }
});
