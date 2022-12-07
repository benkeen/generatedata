import { Dispatch } from 'redux';
import { createGenerationWorker } from '~utils/coreUtils';
import * as selectors from '../generator/generator.selectors';
import * as packetSelectors from './packets.selectors';
import { getDownloadFileInfo } from '~utils/exportTypeUtils';
import { getGeneratorRoute } from '~utils/routeUtils';
import { GDAction } from '~types/general';
import { downloadFile } from '../../generationPanel/generation.helpers';
import * as mainSelectors from '~store/main/main.selectors';
import { apolloClient } from '~core/apolloClient';
import { gql } from '@apollo/client';

export const START_GENERATION = 'START_GENERATION';
export const startGeneration = (): any => (dispatch: Dispatch, getState: any): void => {
	const state = getState();

	// whenever we start generating some data, we stash all the current settings into the data packet instance. That way,
	// we can happily generate multiple independent packets simultaneously while the user starts work on a new
	// data set in the UI
	dispatch({
		type: START_GENERATION,
		payload: {
			generationWorkerId: createGenerationWorker(),
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

export const UPDATE_TOTAL_GENERATION_COUNT = 'UPDATE_TOTAL_GENERATION_COUNT';
export const updateTotalGenerationCount = (count: number): GDAction => ({ type: UPDATE_TOTAL_GENERATION_COUNT, payload: { count } });

export const LOG_DATA_BATCH = 'LOG_DATA_BATCH';
export const logDataBatch = (packetId: string, numGeneratedRows: number, dataStr: string): any => async (dispatch: Dispatch, getState: any): Promise<any> => {
	const state = getState();
	const numRowsToGenerate = selectors.getNumRowsToGenerate(state);
	const isLoggedIn = mainSelectors.isLoggedIn(state);
	const currentDataSetId = selectors.getCurrentDataSetId(state);

	// if the packet has been fully generated track the generated row count
	if (isLoggedIn && currentDataSetId !== null && numRowsToGenerate === numGeneratedRows) {
		const resp = await apolloClient.mutate({
			mutation: gql`
                mutation UpdateDataSetGenerationCount($dataSetId: ID!, $generatedRows: Int!) {
                    updateDataSetGenerationCount(dataSetId: $dataSetId, generatedRows: $generatedRows) {
                        success
						error
                    }
                }
			`,
			variables: {
				dataSetId: currentDataSetId,
				generatedRows: numGeneratedRows
			}
		});

		if (resp.data.updateDataSetGenerationCount.success) {
			dispatch(updateTotalGenerationCount(numGeneratedRows));
		}
	}

	dispatch({
		type: LOG_DATA_BATCH,
		payload: {
			packetId,
			numGeneratedRows,
			dataStr
		}
	});
};

export const PAUSE_GENERATION = 'PAUSE_GENERATION';
export const pauseGeneration = (packetId: string): GDAction => ({ type: PAUSE_GENERATION, payload: { packetId } });

export const CONTINUE_GENERATION = 'CONTINUE_GENERATION';
export const continueGeneration = (packetId: string): GDAction => ({ type: CONTINUE_GENERATION, payload: { packetId } });

export const ABORT_GENERATION = 'ABORT_GENERATION';
export const abortGeneration = (packetId: string): GDAction => ({ type: ABORT_GENERATION, payload: { packetId } });

export const HIDE_ACTIVITY_PANEL = 'HIDE_ACTIVITY_PANEL';
export const hideActivityPanel = (): GDAction => ({ type: HIDE_ACTIVITY_PANEL });

export const SHOW_ACTIVITY_PANEL = 'SHOW_ACTIVITY_PANEL';
export const showActivityPanel = (packetId: string, history: any) => (dispatch: Dispatch, getState: any): void => {
	const state = getState();
	const locale = mainSelectors.getLocale(state);

	history.push(getGeneratorRoute(locale));
	dispatch({
		type: SHOW_ACTIVITY_PANEL,
		payload: { packetId }
	});
};

export const CHANGE_SPEED = 'CHANGE_SPEED';
export const changeSpeed = (speed: number): GDAction => ({
	type: CHANGE_SPEED,
	payload: { speed }
});

export const promptToDownload = () => (dispatch: Dispatch, getState: any): void => {
	const state = getState();
	const packetId = packetSelectors.getCurrentPacketId(state);
	const dataString = packetSelectors.getCompletedDataString(state);
	const packet = packetSelectors.getCurrentPacket(state);
	const { exportType, exportTypeSettings } = packet!.config;

	const { filename, fileType } = getDownloadFileInfo(packetId!, exportType, exportTypeSettings);

	downloadFile(filename, dataString, fileType);
};
