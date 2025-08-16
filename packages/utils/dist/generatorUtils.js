var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
/**
 * This utility file contains the guts of the data generation code. It farms out work to the various plugins
 * and orchestrates the many independent tasks to gather together and return the data. It's used by both:
 *    1. the UI, called via web workers to run performantly in browsers in separate threads off the main UI thread
 *    2. the node script for server-side data generation
 */
let isPaused = false;
let lastMainProcessOptions = null;
let currentSpeed; // TODO possible range?
const workerQueue = {};
export const generate = ({ i18n, workerUtils, countryNames, countryData, dataTypeInterface, columns, template, exportTypeSettings, onComplete, exportTypeInterface, generationSettings }) => {
    const { numResults, packetSize, stripWhitespace } = generationSettings;
    const onBatchComplete = ({ completedBatchNum, numGeneratedRows, generatedData }) => {
        const isLastBatch = numGeneratedRows >= numResults;
        const displayData = generatedData.map((row) => row.map((i) => i.display));
        generateExportTypes({
            numResults,
            isFirstBatch: completedBatchNum === 1,
            isLastBatch,
            currentBatch: completedBatchNum,
            batchSize: packetSize,
            rows: displayData,
            columns,
            stripWhitespace: stripWhitespace, // TODO we knows it's defined here
            settings: exportTypeSettings,
            workerUtils,
            onComplete: (data) => onComplete(data, { isLastBatch, numGeneratedRows }),
            exportTypeInterface
        });
    };
    generateDataTypes({
        numResults,
        batchSize: packetSize,
        i18n,
        template,
        countryNames,
        countryData,
        onBatchComplete,
        workerUtils,
        dataTypeInterface
    });
};
export const generateDataTypes = (options) => {
    const { numResults, batchSize } = options, otherOptions = __rest(options, ["numResults", "batchSize"]);
    const numBatches = Math.ceil(numResults / batchSize);
    mainProcess(Object.assign({ numResults,
        numBatches,
        batchSize, batchNum: 1, unchanged: options.unchanged || {} }, otherOptions));
};
export const generateExportTypes = (options) => {
    const { exportTypeInterface, onComplete } = options, other = __rest(options, ["exportTypeInterface", "onComplete"]);
    if (exportTypeInterface.context === 'node') {
        onComplete(exportTypeInterface.send(other));
    }
    else {
        // pass off work to the Export Type worker
        exportTypeInterface.send(other);
        // listen for the response and post
        exportTypeInterface.onSuccess((resp) => {
            onComplete(resp.data);
        });
    }
};
const pauseGeneration = () => {
    isPaused = true;
};
const continueGeneration = () => {
    isPaused = false;
    mainProcess(lastMainProcessOptions);
};
const setSpeed = (speed) => {
    currentSpeed = speed;
};
// our high-level API that this utility file offers
export default {
    generate,
    generateDataTypes,
    generateExportTypes,
    pause: pauseGeneration,
    continue: continueGeneration,
    setSpeed
};
// -------------------------------------------------------------------------------------------------------------------
// Internal methods
const mainProcess = (mainProcessOptions) => {
    const { numResults, numBatches, batchSize, batchNum } = mainProcessOptions, other = __rest(mainProcessOptions, ["numResults", "numBatches", "batchSize", "batchNum"]);
    const { firstRow, lastRow } = getBatchInfo({ numResults, numBatches, batchSize, batchNum });
    const lagTime = (100 - currentSpeed) * 50;
    // if the generation has been paused, halt now and keep track of where we were at
    if (isPaused) {
        lastMainProcessOptions = mainProcessOptions;
        return;
    }
    setTimeout(() => {
        generateDataTypeBatch(Object.assign({ firstRow, lastRow, numResults, batchNum }, other))
            .then(() => {
            if (batchNum === numBatches) {
                return;
            }
            mainProcess(Object.assign(Object.assign({}, mainProcessOptions), { batchNum: mainProcessOptions.batchNum + 1 }));
        });
    }, lagTime);
};
const getBatchInfo = ({ numResults, numBatches, batchSize, batchNum }) => {
    const firstRow = ((batchNum - 1) * batchSize) + 1;
    let lastRow = batchNum * batchSize;
    if (batchNum === numBatches) {
        lastRow = numResults;
    }
    return {
        firstRow,
        lastRow
    };
};
// this resolve the promise for every batch of data generated
const generateDataTypeBatch = (options) => new Promise((resolve) => {
    const { batchNum, numResults, firstRow, lastRow, onBatchComplete } = options, other = __rest(options, ["batchNum", "numResults", "firstRow", "lastRow", "onBatchComplete"]);
    const rowPromises = [];
    // rows are independent! The only necessarily synchronous bit is between process batches. So here we just run
    // them all in a loop
    for (let rowNum = firstRow; rowNum <= lastRow; rowNum++) {
        const currRowData = [];
        rowPromises.push(processDataTypeBatchGroup(Object.assign({ rowNum,
            currRowData }, other)));
    }
    Promise.all(rowPromises)
        .then((generatedData) => {
        onBatchComplete({
            completedBatchNum: batchNum,
            numGeneratedRows: lastRow,
            numResults,
            generatedData
        });
        // @ts-ignore-line
        resolve();
    });
});
const processDataTypeBatchGroup = (options) => {
    const { template, currRowData } = options;
    const processGroups = Object.keys(template);
    return new Promise((resolveAll) => {
        let group = Promise.resolve();
        // process each batch sequentially. This ensures the data generated from one processing batch is available to any
        // dependent children. For example, the Region data type needs the Country data being generated first so it
        // knows what country regions to generate if a mapping had been selected in the UI
        processGroups.forEach((processBatchNumberStr, batchIndex) => {
            const processBatchNum = parseInt(processBatchNumberStr, 10);
            const currBatch = template[processBatchNum];
            // yup. We're mutating the currRowData param on each loop. We don't care hhahaha!!! Up yours, linter!
            group = group
                .then(() => processDataTypeBatch(Object.assign({ cells: currBatch }, options)))
                .then((promises) => {
                // this bit's sneaky. It ensures that the CURRENT batch within the row being generated is fully processed
                // before starting the next. That way, the generated data from earlier batches is available to later
                // Data Types for generating their own data
                return new Promise((resolveBatch) => {
                    Promise.all(promises)
                        .then((singleBatchResponses) => {
                        for (let i = 0; i < singleBatchResponses.length; i++) {
                            currRowData.push({
                                id: currBatch[i].id,
                                colIndex: currBatch[i].colIndex,
                                dataType: currBatch[i].dataType,
                                data: singleBatchResponses[i]
                            });
                        }
                        resolveBatch();
                        if (batchIndex === processGroups.length - 1) {
                            currRowData.sort((a, b) => a.colIndex < b.colIndex ? -1 : 1);
                            resolveAll(currRowData.map((row) => row.data));
                        }
                    });
                });
            });
        });
    });
};
const processDataTypeBatch = (options) => {
    const { cells, unchanged, rowNum, i18n, dataTypeInterface, currRowData } = options, otherOptions = __rest(options, ["cells", "unchanged", "rowNum", "i18n", "dataTypeInterface", "currRowData"]);
    return cells.map((currCell) => {
        const dataType = currCell.dataType;
        return new Promise((resolve, reject) => {
            if (unchanged[currCell.colIndex]) {
                resolve(unchanged[currCell.colIndex][rowNum - 1]);
            }
            else {
                queueJob(dataType, dataTypeInterface[dataType], Object.assign({ rowNum: rowNum, i18n: i18n.dataTypes[dataType], countryI18n: i18n.countries, rowState: currCell.rowState, existingRowData: currRowData }, otherOptions), resolve, reject);
            }
        });
    });
};
const queueJob = (dataType, workerInterface, payload, resolve, reject) => {
    if (!workerQueue[dataType]) {
        workerQueue[dataType] = {
            processing: false,
            queue: []
        };
    }
    workerQueue[dataType].queue.push({
        payload,
        resolve,
        reject
    });
    processQueue(dataType, workerInterface);
};
const processQueue = (dataType, workerInterface) => {
    if (workerQueue[dataType].processing) {
        return;
    }
    const queue = workerQueue[dataType].queue;
    if (!queue.length) {
        return;
    }
    workerQueue[dataType].processing = true;
    const { payload, resolve, reject } = queue[0];
    if (workerInterface.context === 'node') {
        const resp = workerInterface.send(payload);
        resolve(resp);
        processNextItem(dataType, workerInterface);
    }
    else {
        workerInterface.send(payload);
        // @ts-ignore
        workerInterface.onSuccess((resp) => {
            resolve(resp.data);
            processNextItem(dataType, workerInterface);
        });
        // @ts-ignore
        workerInterface.onError((resp) => {
            reject(resp);
            processNextItem(dataType, workerInterface);
        });
    }
};
const processNextItem = (dataType, workerInterface) => {
    workerQueue[dataType].queue.shift();
    workerQueue[dataType].processing = false;
    processQueue(dataType, workerInterface);
};
//# sourceMappingURL=generatorUtils.js.map