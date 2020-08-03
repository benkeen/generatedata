const context: Worker = self as any;

let workerResources: any;
let loadedExportTypeWorkers: any = {};
let exportTypeWorkerMap: any = {};

let abortedMessageIds: any = {};

// sigh.... we just need the one coreWorker... TODO

context.onmessage = (e: MessageEvent) => {
	const { _action, _messageId, rows, columns, isFirstBatch, isLastBatch, exportType, numResults, exportTypeSettings } = e.data;

	if (_action === 'abort') {
		abortedMessageIds[_messageId] = true;
	}

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
		if (abortedMessageIds[_messageId]) {
			console.log("ABORTED");
		} else {
			context.postMessage(e.data);
		}
	};
};


export {};
