import { generateSimple, isNested } from '../JSON.generator';
import { ExportTypeGenerationData } from '../../../../../types/general';


describe('isNested', () => {
    it('should return false when no columns have dots in them', () => {
        const cols = [
            'one',
            'two',
            'three'
        ];
        expect(isNested(cols)).toEqual(false);
    });

    it('should return false when there are no columns', () => {
        expect(isNested([])).toEqual(false);
    });


    it('should return true when one item contains a dot', () => {
        expect(isNested(['a.c', 'b', 'c'])).toEqual(true);
        expect(isNested(['a', 'b.e', 'b.c'])).toEqual(true);
        expect(isNested(['a', 'b', 'b.c'])).toEqual(true);
    });
});


describe('generateSimple', () => {
    const data: ExportTypeGenerationData = {
        columns: [
        	{ title: 'One', dataType: 'Names' },
			{ title: 'Two', dataType: 'Names' }
		],
        rows: [
            ['Row #1, Cell #1', 'Row #1, Cell #2'],
            ['Row #2, Cell #1', 'Row #2, Cell #2']
        ],
        isFirstBatch: true,
        isLastBatch: true,
		dataTypeMetadata: {}
    };

    // my IDE likes to convert tabs to spaces & I'm not going to argue with it. This'll work across all developers
    // systems, regardless of their preferences
    it('should return expected JSON content', () => {
        expect(generateSimple(data, false)).toEqual(
`[
\t{
\t\t"One": "Row #1, Cell #1",
\t\t"Two": "Row #1, Cell #2"
\t},
\t{
\t\t"One": "Row #2, Cell #1",
\t\t"Two": "Row #2, Cell #2"
\t}
]`
        );
    });

    it('should return expected minified JSON content', () => {
        expect(generateSimple(data, true)).toEqual(
            `[{"One":"Row #1, Cell #1","Two":"Row #1, Cell #2"},{"One":"Row #2, Cell #1","Two":"Row #2, Cell #2"}]`
        );
    });

    it('should escape double quotes within property names', () => {
        const doubleQuoteData: ExportTypeGenerationData = {
            columns: [
            	{ title: 'Name', dataType: 'Names' },
				{ title: '"Phone" Number', dataType: 'Names' }
			],
            rows: [
                ['Tom', '(604) 123-1234'],
                ['Susan', '(604) 733-1224'],
            ],
            isFirstBatch: true,
            isLastBatch: true,
			dataTypeMetadata: {}
        };

        expect(generateSimple(doubleQuoteData, false)).toEqual(
            `[
\t{
\t\t"Name": "Tom",
\t\t"\"Phone\" Number": "(604) 123-1234"
\t},
\t{
\t\t"Name": "Susan",
\t\t"\"Phone\" Number": "(604) 733-1224"
\t}
]`
        );
    });

    it('should escape double quotes within values', () => {
        const doubleQuoteValueData: ExportTypeGenerationData = {
            columns: [
            	{ title: 'Name', dataType: 'Names' },
				{ title: 'Phone', dataType: 'Names' }
			],
            rows: [
                ['Tom', '"Whoah" he said...'],
                ['Susan', 'Like "TOTALLY!"'],
            ],
            isFirstBatch: true,
            isLastBatch: true,
			dataTypeMetadata: {}
        };

        expect(generateSimple(doubleQuoteValueData, false)).toEqual(
            `[
\t{
\t\t"Name": "Tom",
\t\t"Phone": "\"Whoah\" he said..."
\t},
\t{
\t\t"Name": "Susan",
\t\t"Phone": "Like \"TOTALLY!\""
\t}
]`
        );
    });

    it('should not put double quotes around numbers', () => {
        const numData: ExportTypeGenerationData = {
            columns: [
				{ title: 'Num1', dataType: 'Names' },
				{ title: 'Num2', dataType: 'Names' },
				{ title: 'Num3', dataType: 'Names' },
				{ title: 'Num4', dataType: 'Names' },
				{ title: 'Num5', dataType: 'Names' },
				{ title: 'Num6', dataType: 'Names' }
			],
            rows: [
                ['0', 0, '1', 1, '1.23', 1.23]
            ],
            isFirstBatch: true,
            isLastBatch: true,
			dataTypeMetadata: {}
        };

        expect(generateSimple(numData, true)).toEqual(
            `[{"Num1":0,"Num2":0,"Num3":1,"Num4":1,"Num5":1.23,"Num6":1.23}]`
        );
    });

    it('should not put double quotes around boolean values', () => {
        const numData: ExportTypeGenerationData = {
            columns: [
            	{ title: 'a', dataType: 'Names' },
				{ title: 'b', dataType: 'Names' },
				{ title: 'c', dataType: 'Names' },
				{ title: 'd', dataType: 'Names' }
			],
            rows: [
                ['false', false, 'true', true]
            ],
            isFirstBatch: true,
            isLastBatch: true,
			dataTypeMetadata: {}
        };

        expect(generateSimple(numData, true)).toEqual(
            `[{"a":false,"b":false,"c":true,"d":true}]`
        );
    });

});
