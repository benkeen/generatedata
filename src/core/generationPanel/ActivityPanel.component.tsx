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
import * as selectors from '../store/generator/generator.selectors';
import { updateGeneratedRowsCount } from '../store/generator/generator.actions';

export type GenerationPanelProps = {
	visible: boolean;
	onChangeNumRowsToGenerate: (numRows: number) => void;
	onClose: () => void;
	onGenerate: () => void;
	numRowsToGenerate: number;
	i18n: any;
	stripWhitespace: boolean;
	onToggleStripWhitespace: () => void;
	numGeneratedRows: number;
	isPaused: boolean;
	//isComplete: boolean
	onPause: () => void;
	onContinue: () => void;
	onAbort: () => void;
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
	visible, onClose, i18n, stripWhitespace, numGeneratedRows, numRowsToGenerate, onChangeNumRowsToGenerate,
	onGenerate, isPaused, onContinue, onPause
}: GenerationPanelProps): JSX.Element => {
	const prevGeneratedRows = usePrevious(numGeneratedRows);

	useEffect(() => {
		const dataTypeWorker = coreUtils.getDataTypeWorker('preview');

		dataTypeWorker.postMessage({
			action: 'generate', // 'generate', 'pause', 'continue', 'abort'
			numResults: numRowsToGenerate,
			batchSize: C.GENERATION_BATCH_SIZE,
			columns,
			i18n: getStrings(),
			template,
			workerResources: {
				workerUtils: coreUtils.getWorkerUtils(),
				dataTypes: coreUtils.getDataTypeWorkerMap(dataTypes),
				exportTypes: coreUtils.getExportTypeWorkerMap(selectors.getLoadedExportTypes(state)),
				countries: coreUtils.getCountries()
			}
		});

		// start();

		dataTypeWorker.onmessage = (response: any): void => {

			// pass data on to exportTypeWorker here.

			// on THAT response, do these:

			const { numGeneratedRows } = response.data; // data, completedBatchNum, isComplete

			dispatch(updateGeneratedRowsCount(numGeneratedRows));

			if (numGeneratedRows >= numRowsToGenerate) {
				// console.log("done", end());
			}
			// dispatch(setBatchGeneratedComplete());
		};

	}, []);

	const animation = true;
	const percentage = (numGeneratedRows / numRowsToGenerate) * 100;
	const data = [
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
									data={data}
									cx={190}
									cy={190}
									innerRadius={100}
									outerRadius={140}
									startAngle={90}
									endAngle={-270}
									label>
									{data.map((entry, index) => <Cell key={index} fill={data[index].color} />)}
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
