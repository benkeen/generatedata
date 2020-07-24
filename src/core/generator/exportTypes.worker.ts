const context: Worker = self as any;

let workerResources: any;
let loadedExportTypeWorkers: any = {};
let exportTypeWorkerMap: any = {};

context.onmessage = (e: any) => {
	const { exportType, numResults, exportTypeSettings } = e.data;

	workerResources = e.data.workerResources;
	exportTypeWorkerMap = workerResources.exportTypes;

	console.log("in export types worker??? ", e.data);


	// load the appropriate Export Type generator web worker files. Pretty sure this caches them so we can safely
	// import them every time
	loadedExportTypeWorkers[exportType] = new Worker(exportTypeWorkerMap[exportType]);

	loadedExportTypeWorkers[exportType].postMessage({
		settings: loadedExportTypeWorkers[exportType]
	});
};

export {};
