import generate, { DataType, GDTemplate } from '../src';
import { ExportType } from "../../client/_plugins";

describe('Generation test', () => {
    it('First test', async () => {
        const template: GDTemplate = {
            generationSettings: {
                numResults: 10
            },
            dataTemplate: [
                {
                    plugin: DataType.Names,
                    title: 'First Name',
                    settings: {
                        options: ['Name']
                    }
                },
                {
                    plugin: DataType.Names,
                    title: 'Last Name',
                    settings: {
                        options: ['Surname']
                    }
                }
            ],
            exportSettings: {
                plugin: ExportType.JSON,
                settings: {
                    dataStructureFormat: 'simple'
                }
            }
        };

        const data = await generate(template);
        expect(data).toEqual('...'); // expected to fail!
    });
});

