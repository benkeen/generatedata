import {DataSetConfig, ExportType, GenerationSettings} from '~types/generator';

const generate = async (dataConfig: DataSetConfig, settings: GenerationSettings) => {
    // do stuff
};

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
