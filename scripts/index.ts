
type GenerationSettings = {
    rows: number; // The number of rows to be generated

    // optional
    stripWhitespace?: boolean; // default: false
    generationType?: 'returnValue' | 'file'; // default: returnValue.
    filename?: string; // the filename to generated.
    folder?: string; // the folder where the data is generated
    packetSize?: 100; //
    onError?: (err: any) => void;
    onPacketComplete?: (result: any) => void;
}

const generate = async (settings: GenerationSettings, dataConfig) => {
    // do stuff
};

(async () => {
    const settings = {
        rows: 100
    };
    const dataConfig = {

    };
    await generate(settings, dataConfig);
})();
