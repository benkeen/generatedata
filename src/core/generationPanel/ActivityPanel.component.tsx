import React, { useEffect } from 'react';
import { PieChart, Pie, Cell, AreaChart, CartesianGrid, XAxis, YAxis, Area } from 'recharts';
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
	packetId: string | null;
	visible: boolean;
	i18n: any;
	packet: DataPacket | null;
	onClose: () => void;
	onPause: () => void;
	onContinue: () => void;
	onAbort: () => void;
	workerResources: any;
	logDataBatch: (packetId: string, numGeneratedRows: number, data: any) => void;
	batchLoadTimes: object[];
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

const ActivityPanel = ({
	packetId, visible, onClose, i18n, packet, onContinue, onPause, workerResources, logDataBatch, batchLoadTimes
}: ActivityPanelProps): any => {
	if (packetId === null || packet === null) { // just for TS. They'll be null together.
		return null;
	}

	const { isPaused, config, dataTypeWorkerId, exportTypeWorkerId, numGeneratedRows } = packet;
	const { numRowsToGenerate, columns, template, exportType, exportTypeSettings } = config;

	const prevGeneratedRows = usePrevious(numGeneratedRows);
	const dataTypeWorker = coreUtils.getDataTypeWorker(dataTypeWorkerId);
	const exportTypeWorker = coreUtils.getExportTypeWorker(exportTypeWorkerId);

	useEffect(() => {
		if (numGeneratedRows !== 0) {
			return;
		}

		dataTypeWorker.postMessage({
			action: C.ACTIVITY_PANEL_ACTIONS.GENERATE,
			numResults: numRowsToGenerate,
			batchSize: C.GENERATION_BATCH_SIZE,
			columns,
			i18n: getStrings(),
			template,
			workerResources
		});

		dataTypeWorker.onmessage = ({ data }: any): void => {
			const { completedBatchNum, numGeneratedRows, generatedData } = data;
			const isLastBatch = numGeneratedRows >= numRowsToGenerate;

			exportTypeWorker.postMessage({
				rows: generatedData,
				columns,
				exportType,
				exportTypeSettings,
				isFirstBatch: completedBatchNum === 1,
				isLastBatch,
				workerResources
			});

			exportTypeWorker.onmessage = (resp: any) => {
				logDataBatch(packetId, numGeneratedRows, resp.data);
			};
		};
	}, [numGeneratedRows]);

	const animation = true;
	const percentage = (numGeneratedRows / numRowsToGenerate) * 100;
	const pieChartData = [
		{ name: "Complete", value: percentage, color: '#275eb5' },
		{ name: "Incomplete", value: 100-percentage, color: '#efefef' }
	];

	const pauseContinueIcon = isPaused ? <PlayArrow fontSize="large" onClick={onPause} /> : <Pause fontSize="large" onClick={onContinue} />;

	return (
		<Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={visible}>
			<div style={{ width: 500, padding: 20 }}>
				<DialogContent dividers style={{ padding: 0 }}>
					<div className={styles.overlayWrapper}>
						<div style={{ display: 'flex' }}>

							<div className={styles.panel1}>
								<h3>{getPercentageLabel(percentage, numRowsToGenerate)}%</h3>

								<PieChart width={200} height={200}>
									<Pie
										dataKey="value"
										isAnimationActive={animation}
										data={pieChartData}
										cx={100}
										cy={100}
										innerRadius={40}
										outerRadius={90}
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

								<AreaChart
									width={500}
									height={400}
									data={batchLoadTimes}
									margin={{
										top: 10, right: 30, left: 0, bottom: 0,
									}}
								>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="name" />
									<YAxis />
									<Area type="monotone" dataKey="duration" stroke="#8884d8" fill="#8884d8" />
								</AreaChart>

							</div>
						</div>
					</div>
				</DialogContent>
			</div>
		</Dialog>
	);
};

export default ActivityPanel;
