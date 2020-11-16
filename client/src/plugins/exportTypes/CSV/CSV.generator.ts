import { ETOnMessage, ETMessageData } from '~types/exportTypes';

const context: Worker = self as any;

let workerUtilsLoaded = false;
context.onmessage = (e: ETOnMessage) => {
	const { workerResources } = e.data;

	if (!workerUtilsLoaded) {
		importScripts(workerResources.workerUtils);
		workerUtilsLoaded = true;
	}

	context.postMessage(generate(e.data));
};

const generate = (data: ETMessageData): string => {
	const { columns, rows, isFirstBatch, settings } = data;
	const { delimiter, lineEndings } = settings;

	const map: any = {
		Windows: '\r\n',
		Unix: '\n',
		Mac: '\r'
	};
	const eol = map[lineEndings];

	let content = '';
	if (isFirstBatch) {
		const titleRow = columns.map(({ title }) => title).join(delimiter);
		content += `${titleRow}${eol}`;
	}

	const numCols = columns.length;
	rows.forEach((row) => {
		const cleanRow = [];
		for (let i=0; i<numCols; i++) {
			// see if any of the cells contains the delimiter. If it does, wrap the cell in double quotes
			if (row[i].indexOf(delimiter) !== -1) {
				cleanRow.push(`"${rows[i]}"`);
			} else {
				cleanRow.push(row[i]);
			}
		}
		content += cleanRow.join(delimiter) + eol;
	});

	return content;
};

