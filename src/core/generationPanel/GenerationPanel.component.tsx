import * as React from 'react';
import NumberFormat from 'react-number-format';
import { PieChart, Pie, Cell } from 'recharts';
import CountUp from 'react-countup';
import Button from '@material-ui/core/Button';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '~components/dialogs';
import usePrevious from '../../hooks/usePrevious';
import styles from './GenerationPanel.scss';

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
	isGenerating: boolean;
};

const getPercentageLabel = (percentage: number, numRowsToGenerate: number) => {
	let decimalPlaces = 0;
	if (numRowsToGenerate >= 10000) {
		decimalPlaces = 1;
	} else if (numRowsToGenerate >= 1000000) {
		decimalPlaces = 2;
	}
	console.log(decimalPlaces);

	return percentage.toFixed(decimalPlaces);
};

const GenerationPanel = ({ visible, onClose, i18n, stripWhitespace, numGeneratedRows, numRowsToGenerate, onChangeNumRowsToGenerate,
	onGenerate, isGenerating }: GenerationPanelProps): JSX.Element => {
	const prevGeneratedRows = usePrevious(numGeneratedRows);

	const onCloseDialog = (): void => {
		if (isGenerating) {
			// TODO
		}
		onClose();
	};

	const getContent = (): React.ReactNode => {
		let data = [
			{ name: "Incomplete", value: 100, color: '#efefef' },
		];

		let percentage = 0;
		let animation = false;

		if (isGenerating) {
			animation = true;
			percentage = (numGeneratedRows / numRowsToGenerate) * 100;
			data = [
				{ name: "Complete", value: percentage, color: '#275eb5' },
				{ name: "Incomplete", value: 100-percentage, color: '#efefef' }
			];
		}

		let overlayClasses = styles.generateOverlay;
		let backgroundClasses = styles.background;
		if (isGenerating) {
			overlayClasses += ` ${styles.fadeOut}`;
			backgroundClasses += ` ${styles.fadeOut}`;
		}

		return (
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
						Speed over time graph
					</div>
				</div>

				<div className={overlayClasses}>
					<div className={`${styles.row} ${styles.generationRow}`}>
						Generate
						<NumberFormat
							value={numRowsToGenerate}
							displayType="input"
							autoFocus
							thousandSeparator={true}
							onValueChange={({ value }): void => onChangeNumRowsToGenerate(parseInt(value, 10))}
						/>
						rows
					</div>

					<div className={styles.row}>
						<input type="checkbox" id="stripWhitespace" checked={stripWhitespace} />
						<label htmlFor="stripWhitespace">strip whitespace from generated content</label>
					</div>
				</div>
				<div className={backgroundClasses} />

			</div>
		);
	};

	// TODO move clearGeneration code to onExit. That seems to run after the fade-out transition is complete
	return (
		<Dialog onClose={onCloseDialog} aria-labelledby="customized-dialog-title" open={visible}>
			<DialogTitle onClose={onCloseDialog}>{i18n.generate}</DialogTitle>
			<DialogContent dividers style={{ padding: 0 }}>
				{getContent()}
			</DialogContent>
			<DialogActions>
				<Button onClick={onGenerate} color="primary" variant="outlined">Generate</Button>
			</DialogActions>
		</Dialog>
	);
};

export default GenerationPanel;
