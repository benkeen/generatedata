const context: Worker = self as any;

let workerResources: any;
let loadedExportTypeWorkers: any = {};
let exportTypeWorkerMap: any = {};

context.onmessage = (e: any) => {
	const { exportType, numResults } = e.data;

	workerResources = e.data.workerResources;
	exportTypeWorkerMap = workerResources.dataTypes;

	// load the appropriate Export Type generator web worker files. Pretty sure this caches them so we can safely
	// import them every time
	loadedExportTypeWorkers[exportType] = new Worker(exportTypeWorkerMap[exportType])

};

export {};
