const messageIds: any = {};
const liveMessages: any = {};

// wrapper method for the worker calls. This just adds a layer to abort any previous unfinished messages that are
// sent to the worker. It's up to the worker to handle aborting it however it sees fit, but the important part is
// that it doesn't post back any data from stale requests
export const performTask = (workerName: string, worker: any, postMessagePayload: any, onMessage: any) => {

	if (liveMessages[workerName]) {
		console.log("trying to abort");
		worker.postMessage({ _action: 'abort', _messageId: messageIds[workerName] });
		liveMessages[workerName] = false;
	}

	if (!messageIds[workerName]) {
		messageIds[workerName] = 1;
	} else {
		messageIds[workerName]++;
	}

	worker.postMessage({
		...postMessagePayload,
		_messageId: 1
	});

	worker.onmessage = (data: any) => {
		onMessage(data);
	};
};
