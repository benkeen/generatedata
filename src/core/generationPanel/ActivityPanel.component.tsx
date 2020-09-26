import React, { useEffect } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import CountUp from 'react-countup';
import Pause from '@material-ui/icons/Pause';
import PlayArrow from '@material-ui/icons/PlayArrow';
import { Dialog, DialogContent } from '~components/dialogs'; // DialogTitle, DialogActions
import usePrevious from '../../hooks/usePrevious';
import styles from './ActivityPanel.scss';
import * as coreUtils from '~utils/coreUtils';
import C from '../constants';
import { getStrings } from '~utils/langUtils';
import { DataPacket } from '../store/packets/packets.reducer';

export type ActivityPanelProps = {
	visible: boolean;
	i18n: any;
	packet: DataPacket | null;
	onClose: () => void;
	onPause: () => void;
	onContinue: () => void;
	onAbort: () => void;
	workerResources: any;
};

const getPercentageLabel = (percentage: number, numRowsToGenerate: number) => {
	let decimalPlaces = 0;
	if (numRowsToGenerate >= 10000) {
		decimalPlaces = 1;
	} else if (numRowsToGenerate >= 1000000) {
		decimalPlaces = 2;
	}
	return percentage.toFixed(decimalPlaces);
};

const ActivityPanel = ({ visible, onClose, i18n, packet, onContinue, onPause, workerResources }: ActivityPanelProps): any => {
	if (packet === null) {
		return null;
	}

	console.log(packet);

	const { isPaused, data, dataTypeWorkerId, exportTypeWorkerId, numGeneratedRows } = packet;
	const { numRowsToGenerate, columns, template, exportType, exportTypeSettings } = data;

	const prevGeneratedRows = usePrevious(numGeneratedRows);

	const dataTypeWorker = coreUtils.getDataTypeWorker(dataTypeWorkerId);
	const exportTypeWorker = coreUtils.getExportTypeWorker(exportTypeWorkerId);

	useEffect(() => {
		if (numGeneratedRows === 0) {
			dataTypeWorker.postMessage({
				action: C.ACTIVITY_PANEL_ACTIONS.GENERATE,
				numResults: numRowsToGenerate,
				batchSize: C.GENERATION_BATCH_SIZE,
				columns,
				i18n: getStrings(),
				template,
				workerResources
			});
		}

		// start();

		dataTypeWorker.onmessage = ({ data }: any): void => {
			const { generatedData } = data;

			console.log(data);

			// exportTypeWorker.postMessage({
			// 	rows: generatedData,
			// 	columns,
			// 	exportType,
			// 	exportTypeSettings,
			// 	// isFirstBatch: true,
			// 	// isLastBatch: true,
			// 	workerResources
			// });

			// exportTypeWorker.onmessage = () => {
			//
			// };

			// on THAT response, do these:

			// const { numGeneratedRows } = response.data; // data, completedBatchNum, isComplete

			if (numGeneratedRows >= numRowsToGenerate) {
				// console.log("done", end());
			}

			// dispatch(setBatchGeneratedComplete());
		};

	}, [numGeneratedRows]);

	const animation = true;
	const percentage = (numGeneratedRows / numRowsToGenerate) * 100;
	const pieChartData = [
		{ name: "Complete", value: percentage, color: '#275eb5' },
		{ name: "Incomplete", value: 100-percentage, color: '#efefef' }
	];

	const pauseContinueIcon = isPaused ? <Pause fontSize="large" onClick={onContinue} /> : <PlayArrow fontSize="large" onClick={onPause} />;

	return (
		<Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={visible}>
			<DialogContent dividers style={{ padding: 0 }}>
				<div className={styles.overlayWrapper}>
					<div style={{ display: 'flex' }}>

						<div className={styles.panel1}>
							<h3>{getPercentageLabel(percentage, numRowsToGenerate)}%</h3>

							<PieChart width={380} height={380}>
								<Pie
									dataKey="value"
									isAnimationActive={animation}
									data={pieChartData}
									cx={190}
									cy={190}
									innerRadius={100}
									outerRadius={140}
									startAngle={90}
									endAngle={-270}
									label>
									{pieChartData.map((entry, index) => <Cell key={index} fill={pieChartData[index].color} />)}
								</Pie>
							</PieChart>

							<div style={{ border: '1px solid #cccccc' }}>
								{pauseContinueIcon}
							</div>
						</div>

						<div className={styles.panel2}>
							<div>
								Rows generated <CountUp start={prevGeneratedRows} end={numGeneratedRows} separator="," />
							</div>
							<div>
								Estimated time:
							</div>
							<div>
								Remaining time:
							</div>

							Speed over time graph :)
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ActivityPanel;
