import * as React from 'react';
import NumberFormat from 'react-number-format';
import { PieChart, Pie, Cell } from 'recharts';
import Button from '@material-ui/core/Button';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '~components/dialogs';
// import { CircularProgressWithLabel } from '~components/loaders';
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

const GenerationPanel = ({ visible, onClose, i18n, stripWhitespace, numGeneratedRows, numRowsToGenerate, onChangeNumRowsToGenerate,
	onGenerate, isGenerating }: GenerationPanelProps): JSX.Element => {

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
		let paddingAngle = 0;
		let percentage = 0;
		if (isGenerating) {
			paddingAngle = 3;
			percentage = Math.round((numGeneratedRows / numRowsToGenerate) * 100);
			data = [
				{ name: "Incomplete", value: 100-percentage, color: '#efefef' },
				{ name: "Complete", value: percentage, color: '#275eb5' }
			];
		}

		return (
			<div className={styles.overlayWrapper}>

				<div style={{ display: 'flex' }}>
					<div className={styles.panel1}>
						<h3>{percentage}%</h3>
						<PieChart width={380} height={380}>
							<Pie
								dataKey="value"
								isAnimationActive={true}
								data={data}
								cx={190}
								cy={190}
								innerRadius={100}
								outerRadius={140}
								startAngle={90}
								endAngle={-270}
								paddingAngle={paddingAngle}
								label>
								{data.map((entry, index) => <Cell key={index} fill={data[index].color} />)}
							</Pie>
						</PieChart>
					</div>

					<div className={styles.panel2}>
						<div>Rows generated <b>{numGeneratedRows}</b></div>
						<div>Estimated remaining time: </div>
					</div>
				</div>

				<div className={styles.generateOverlay}>
					<div className={`${styles.row} ${styles.generationRow}`}>
						Generate
						<NumberFormat
							value={numRowsToGenerate}
							displayType="input"
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
				<div className={styles.background} />

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
