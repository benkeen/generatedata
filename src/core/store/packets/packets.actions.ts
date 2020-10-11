import { Dispatch } from 'redux';
import { createDataTypeWorker, createExportTypeWorker } from '~utils/coreUtils';
import * as selectors from '../generator/generator.selectors';
import * as packetSelectors from '../packets/packets.selectors';
import { getDownloadFileInfo } from '~utils/exportTypeUtils';
import { GDAction } from '~types/general';
import { downloadFile } from '../../generationPanel/generation.helpers';

export const START_GENERATION = 'START_GENERATION';
export const startGeneration = (): any => (dispatch: Dispatch, getState: any): void => {
	const state = getState();


	// whenever we start generating some data, we stash all the current settings into the data packet instance. That way,
	// we can happily generate multiple independent packets simultaneously while the user starts work on a new
	// data set in the UI
	dispatch({
		type: START_GENERATION,
		payload: {
			dataTypeWorkerId: createDataTypeWorker(),
			exportTypeWorkerId: createExportTypeWorker(),
			numRowsToGenerate: selectors.getNumRowsToGenerate(state),
			stripWhitespace: selectors.shouldStripWhitespace(state),
			template: selectors.getGenerationTemplate(state),
			dataTypes: selectors.getRowDataTypes(state),
			columns: selectors.getColumns(state),
			exportType: selectors.getExportType(state),
			exportTypeSettings: selectors.getCurrentExportTypeSettings(state)
		}
	});
};

export const LOG_DATA_BATCH = 'LOG_DATA_BATCH';
export const logDataBatch = (packetId: string, numGeneratedRows: number, dataStr: string): GDAction => ({
	type: LOG_DATA_BATCH,
	payload: {
		packetId,
		numGeneratedRows,
		dataStr
	}
});

export const PAUSE_GENERATION = 'PAUSE_GENERATION';
export const pauseGeneration = (packetId: string): GDAction => ({ type: PAUSE_GENERATION, payload: { packetId } });

export const CONTINUE_GENERATION = 'CONTINUE_GENERATION';
export const continueGeneration = (packetId: string): GDAction => ({ type: CONTINUE_GENERATION, payload: { packetId } });

export const ABORT_GENERATION = 'ABORT_GENERATION';
export const abortGeneration = (packetId: string): GDAction => ({ type: ABORT_GENERATION, payload: { packetId } });

export const HIDE_ACTIVITY_PANEL = 'HIDE_ACTIVITY_PANEL';
export const hideActivityPanel = (): GDAction => ({ type: HIDE_ACTIVITY_PANEL });

export const SHOW_ACTIVITY_PANEL = 'SHOW_ACTIVITY_PANEL';
export const showActivityPanel = (packetId: string): GDAction => ({ type: SHOW_ACTIVITY_PANEL, payload: { packetId } });

export const CHANGE_SPEED = 'CHANGE_SPEED';
export const changeSpeed = (speed: any) => {
	console.log({ speed });
};

export const promptToDownload = () => (dispatch: Dispatch, getState: any): void => {
	const state = getState();
	const packetId = packetSelectors.getCurrentPacketId(state);
	const dataString = packetSelectors.getCompletedDataString(state);
	const packet = packetSelectors.getCurrentPacket(state);
	const { exportType, exportTypeSettings } = packet!.config;

	const { filename, fileType } = getDownloadFileInfo(packetId!, exportType, exportTypeSettings);

	downloadFile(filename, dataString, fileType);
};
