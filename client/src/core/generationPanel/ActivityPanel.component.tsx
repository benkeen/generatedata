import React, { useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, CartesianGrid, XAxis, YAxis, Bar, Label } from 'recharts';
import CountUp from 'react-countup';
import Measure from 'react-measure';
import IconButton from '@material-ui/core/IconButton';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import Pause from '@material-ui/icons/Pause';
import PlayArrow from '@material-ui/icons/PlayArrow';
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Dialog, DialogContent, DialogTitle, DialogActions } from '~components/dialogs';
import usePrevious from '../../hooks/usePrevious';
import useDidUpdate from '../../hooks/useDidUpdate';
import styles from './ActivityPanel.scss';
import { DataPacket, LoadTimeGraphDuration } from '~store/packets/packets.reducer';
import * as coreUtils from '~utils/coreUtils';
import C from '../constants';
import { Tooltip } from '~components/tooltips';
import { getPercentageLabel } from './generation.helpers';

export type ActivityPanelProps = {
	visible: boolean;
	fullI18n: any;
	packet: DataPacket | null;
	onClose: () => void;
	onPause: () => void;
	onContinue: () => void;
	onAbort: () => void;
	onDownload: () => void;
	onChangeSpeed: (speed: number) => void;
	workerResources: any;
	logDataBatch: (numGeneratedRows: number, data: any) => void;
	batchLoadTimes: object[];
	dataSize: string;
	estimatedSize: string;
	estimatedTime: string;
	loadTimeGraphDuration: LoadTimeGraphDuration;
};

const valueLabelFormat = (value: number): string => `${value}%`;

const ActivityPanel = ({
	visible, onClose, packet, onContinue, onPause, workerResources, logDataBatch, batchLoadTimes, onAbort,
	onDownload, onChangeSpeed, dataSize, estimatedSize, estimatedTime, fullI18n
}: ActivityPanelProps): any => {
	if (packet === null || fullI18n === null) {
		return null;
	}

	const coreI18n = fullI18n.core;

	const { isPaused, config, dataTypeWorkerId, exportTypeWorkerId, numGeneratedRows, speed } = packet;
	const { numRowsToGenerate, columns, template, exportType, exportTypeSettings, stripWhitespace } = config;

	const [dimensions, setDimensions] = React.useState<any>({ height: 0, width: 0 });
	const prevGeneratedRows = usePrevious(numGeneratedRows);
	const dataTypeWorker = coreUtils.getDataTypeWorker(dataTypeWorkerId);
	const exportTypeWorker = coreUtils.getExportTypeWorker(exportTypeWorkerId);

	const abortPacket = (): void => {
		onAbort();
		dataTypeWorker.postMessage({ action: C.ACTIVITY_PANEL_ACTIONS.ABORT });
		coreUtils.destroyDataTypeWorker(dataTypeWorkerId);
	};

	useEffect(() => {
		if (numGeneratedRows !== 0) {
			return;
		}

		dataTypeWorker.postMessage({
			action: 'generate',
			numResults: numRowsToGenerate,
			batchSize: C.GENERATION_BATCH_SIZE,
			speed,
			columns,
			i18n: fullI18n,
			template,
			workerResources
		});

		dataTypeWorker.onmessage = ({ data }: any): void => {
			const { completedBatchNum, numGeneratedRows, generatedData } = data;
			const isLastBatch = numGeneratedRows >= numRowsToGenerate;
			const displayData = generatedData.map((row: any) => row.map((i: any) => i.display));

			exportTypeWorker.postMessage({
				rows: displayData,
				columns,
				exportType,
				exportTypeSettings,
				stripWhitespace,
				isFirstBatch: completedBatchNum === 1,
				isLastBatch,
				workerResources
			});

			exportTypeWorker.onmessage = (resp: any): void => {
				logDataBatch(numGeneratedRows, resp.data);
			};
		};
	}, [numGeneratedRows]);

	useDidUpdate(() => {
		dataTypeWorker.postMessage({
			action: isPaused ? C.ACTIVITY_PANEL_ACTIONS.PAUSE : C.ACTIVITY_PANEL_ACTIONS.CONTINUE
		});
	}, [isPaused]);

	useDidUpdate(() => {
		dataTypeWorker.postMessage({
			action: C.ACTIVITY_PANEL_ACTIONS.CHANGE_SPEED,
			speed
		});
	}, [speed]);

	const percentage = (numGeneratedRows / numRowsToGenerate) * 100;
	const isComplete = percentage === 100;

	const pieChartData = [
		{ name: coreI18n.complete, value: percentage, color: '#275eb5' },
		{ name: coreI18n.incomplete, value: 100-percentage, color: '#efefef' }
	];

	const pauseContinueIcon = isPaused ?
		<PlayArrow fontSize="large" onClick={onContinue} /> :
		<Pause fontSize="large" onClick={onPause} />;

	const marks = [
		{
			value: 0,
			label: coreI18n.seriouslySlow
		},
		{
			value: 100,
			label: coreI18n.cpuMeltinglyFast
		}
	];

	const getActionButtons = (): JSX.Element => {
		if (isComplete) {
			return (
				<div>
					<Button onClick={onAbort} color="default" variant="outlined" style={{ marginRight: 10 }}>
						{coreI18n.clear}
					</Button>
					<Button onClick={onDownload} color="primary" variant="outlined" style={{ marginRight: 10 }}>
						{coreI18n.download}
					</Button>
				</div>
			);
		}

		return (
			<Button onClick={abortPacket} color="secondary" variant="outlined" style={{ marginRight: 10 }}>
				{coreI18n.cancel}
			</Button>
		);
	};

	const getGenerationControls = (): React.ReactNode => {
		// TODO apply class to fade out instead
		if (isComplete) {
			return null;
		}

		const tooltip = isPaused ? coreI18n.play : coreI18n.pause;

		return (
			<div style={{ flex: 1, display: 'flex', marginRight: 80 }}>
				<Tooltip title={tooltip} placement="top" arrow style={{ marginRight: 50 }}>
					<span>
						<IconButton size="medium" aria-label={tooltip}>
							{pauseContinueIcon}
						</IconButton>
					</span>
				</Tooltip>
				<Slider
					value={speed}
					aria-labelledby="discrete-slider-always"
					step={1}
					min={1}
					max={100}
					valueLabelDisplay="auto"
					valueLabelFormat={valueLabelFormat}
					marks={marks}
					onChange={(e, value): void => onChangeSpeed(value as number)}
				/>
			</div>
		);
	};

	const panel1Width = dimensions.width / 100 * 20;
	const pieSize = Math.floor(panel1Width * 0.9);

	return (
		<Measure
			bounds
			onResize={(contentRect: any): void => setDimensions(contentRect.bounds)}
		>
			{({ measureRef }): any => (
				<Dialog className={styles.activityPanel} onClose={onClose} open={visible}>
					<div style={{ width: '100%', height: '100%' }} ref={measureRef}>
						<DialogTitle onClose={onClose} customCloseIcon={ExpandMore}>
							Generated: <CountUp start={prevGeneratedRows} end={numGeneratedRows} separator="," className={styles.counter} /> rows
						</DialogTitle>
						<DialogContent dividers style={{ padding: 0 }}>
							<div className={styles.overlayWrapper}>
								<div style={{ display: 'flex' }}>

									<div className={styles.panel1} style={{ width: panel1Width }}>
										<div className={styles.pie}>
											<h3>{getPercentageLabel(percentage, numRowsToGenerate)}%</h3>
											<PieChart width={pieSize} height={pieSize}>
												<Pie
													dataKey="value"
													isAnimationActive={false}
													data={pieChartData}
													cx={pieSize/2}
													cy={pieSize/2}
													innerRadius={pieSize/4}
													outerRadius={pieSize/2 - 5}
													startAngle={90}
													endAngle={-270}>
													{pieChartData.map((entry, index) => <Cell key={index} fill={pieChartData[index].color} />)}
												</Pie>
											</PieChart>
										</div>

										<div className={styles.dataPanel}>
											<div className={styles.dataRow}>
												<div className={styles.dataRowLabel}>Estimated time:</div>
												<div className={styles.dataRowValue}>{estimatedTime}</div>
											</div>
											<div className={styles.dataRow}>
												<div className={styles.dataRowLabel}>Remaining time:</div>
												<div className={styles.dataRowValue} />
											</div>
											<div className={styles.dataRow}>
												<div className={styles.dataRowLabel}>Estimated size:</div>
												<div className={styles.dataRowValue}>{estimatedSize}</div>
											</div>
											<div className={styles.dataRow}>
												<div className={styles.dataRowLabel}>Size:</div>
												<div className={styles.dataRowValue}>{dataSize}</div>
											</div>
										</div>
									</div>

									<div className={styles.panel2}>
										<h4>{coreI18n.rowsGeneratedPerSecond}</h4>
										<BarChart
											width={dimensions.width - pieSize}
											height={dimensions.height - 185}
											data={batchLoadTimes}
											margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
											<CartesianGrid strokeDasharray="3 3" />
											<XAxis dataKey="label" interval={0} tick={{ fontSize: 8 }}>
												<Label value={coreI18n.seconds} offset={0} position="insideBottom" />
											</XAxis>
											<YAxis dataKey="rowsPerSecond" />
											<Bar dataKey="rowsPerSecond" stroke="#275eb5" fill="#275eb5" isAnimationActive={false} />
										</BarChart>
									</div>
								</div>
							</div>
						</DialogContent>
						<DialogActions className={styles.actionsRow}>
							{getGenerationControls()}
							{getActionButtons()}
						</DialogActions>
					</div>
				</Dialog>
			)}
		</Measure>
	);
};

export default ActivityPanel;
