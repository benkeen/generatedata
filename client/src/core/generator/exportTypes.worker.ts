const context: Worker = self as any;

let workerResources: any;
let loadedExportTypeWorkers: any = {};
let exportTypeWorkerMap: any = {};
let abortedMessageIds: any = {};

context.onmessage = (e: MessageEvent) => {
	const {
		_action, _messageId, rows, columns, isFirstBatch, isLastBatch, exportType, numResults,
		exportTypeSettings, stripWhitespace
	} = e.data;

	if (_action === 'abort') {
		abortedMessageIds[_messageId] = true;
	}

	workerResources = e.data.workerResources;
	exportTypeWorkerMap = workerResources.exportTypes;

	if (!loadedExportTypeWorkers[exportType]) {
		loadedExportTypeWorkers[exportType] = new Worker(exportTypeWorkerMap[exportType]);
	}

	const worker = loadedExportTypeWorkers[exportType];

	worker.postMessage({
		isFirstBatch,
		isLastBatch,
		numResults,
		rows,
		columns,
		settings: exportTypeSettings,
		stripWhitespace,
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
