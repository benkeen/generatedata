import {DataSetConfig, ExportType, GenerationSettings} from '~types/generator';
import { generate } from '../client/src/utils/generatorUtils';

(async () => {
    const settings: GenerationSettings = {
        rows: 100
    };

    const dataConfig: DataSetConfig = {
        rows: [],
        exportType: {
            plugin: ExportType.JSON,
            settings: {
                dataStructureFormat: 'simple'
            }
        }
    };

    await generate(dataConfig, settings);
})();
