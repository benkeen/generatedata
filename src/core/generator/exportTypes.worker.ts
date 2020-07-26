const context: Worker = self as any;

let workerResources: any;
let loadedExportTypeWorkers: any = {};
let exportTypeWorkerMap: any = {};

// sigh.... we just need the one coreWorker... TODO

context.onmessage = (e: MessageEvent) => {
	const { rows, columns, isFirstBatch, isLastBatch, exportType, numResults, exportTypeSettings } = e.data;

	workerResources = e.data.workerResources;
	exportTypeWorkerMap = workerResources.exportTypes;

	// load the appropriate Export Type generator web worker files. Pretty sure this caches them so we can safely
	// import them every time
	loadedExportTypeWorkers[exportType] = new Worker(exportTypeWorkerMap[exportType]);

	const worker = loadedExportTypeWorkers[exportType];

	worker.postMessage({
		isFirstBatch,
		isLastBatch,
		numResults,
		rows,
		columns,
		settings: exportTypeSettings[exportType],
		workerResources
	});

	worker.onmessage = (e: MessageEvent): void => {
		context.postMessage(e.data);
	};
};


export {};
