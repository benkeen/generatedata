import * as React from 'react';
// @ts-ignore-line
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Measure from 'react-measure';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DragIndicator from '@material-ui/icons/DragIndicator';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import * as styles from './Grid.scss';
import Dropdown from '../../components/dropdown/Dropdown';
import { getSortedGroupedDataTypes, getDataType } from '../../utils/dataTypeUtils';
import HelpDialog from '../helpDialog/HelpDialog.component';
import { DataRow } from '../generator/generator.reducer';
import { DataTypeFolder } from '../../_plugins';


const SMALL_BREAKPOINT = 650;
const MEDIUM_BREAKPOINT = 780;

export type GridProps = {
	rows: DataRow[];
	onRemove: (id: string) => void;
	onAddRows: (numRows: number) => void;
	onChangeTitle: (id: string, value: string) => void;
	onSelectDataType: (id: string, value: string) => void;
	maybeLoadDataType: (dataType: DataTypeFolder) => void;
	onConfigureDataType: (id: string, value: string) => void;
	onSort: (id: string, newIndex: number) => void;
	toggleGrid: () => void;
	i18n: any;
	countryI18n: any;
	dataTypeI18n: any;
	columnTitle: string;
	loadedDataTypes: any; // TODO
};

const getItemStyle = (isDragging: boolean, draggableStyle: any): React.CSSProperties => {
	const styles: React.CSSProperties = {
		...draggableStyle,
		userSelect: 'none',
		margin: `0 0 0 0`,
	};
	if (isDragging) {
		styles.background = '#0099cc';
	}
	return styles;
};


const Grid = ({
	rows, onRemove, onAddRows, onChangeTitle, onSelectDataType, onConfigureDataType, onSort, i18n, countryI18n, dataTypeI18n,
	columnTitle, toggleGrid, maybeLoadDataType
}: GridProps): JSX.Element => {
	const [numRows, setNumRows] = React.useState(1);
	const [helpDialogVisible, showHelpDialog] = React.useState(false);
	const [initialHelpSection, setInitialDialogSection] = React.useState('');
	const [dimensions, setDimensions] = React.useState<any>({ height: 0, width: 0 });

	// TODO memoize
	const dataTypes = getSortedGroupedDataTypes();

	const getRows = (rows: DataRow[]): JSX.Element[] => {
		return rows.map((row, index) => {
			// @ts-ignore
			const { Example, Options } = getDataType(row.dataType);

			let example: any = null;
			let option: any = null;
			if (row.dataType) {
				if (Example) {
					example = (
						<Example
							coreI18n={i18n}
							countryI18n={countryI18n}
							i18n={row.dataType ? dataTypeI18n[row.dataType] : null}
							id={row.id}
							data={row.data}
							onUpdate={(data: any): void => onConfigureDataType(row.id, data)}
							dimensions={{ height: dimensions.height, width: dimensions.width }}
						/>
					);
				} else {
					example = <div className={styles.emptyCol}>{i18n.noExamplesAvailable}</div>;
				}

				if (Options) {
					option = (
						<Options
							coreI18n={i18n}
							countryI18n={countryI18n}
							i18n={row.dataType ? dataTypeI18n[row.dataType] : null}
							id={row.id}
							data={row.data}
							onUpdate={(data: any): void => onConfigureDataType(row.id, data)}
							dimensions={{ height: dimensions.height, width: dimensions.width }}
						/>
					);
				} else {
					option = <div className={styles.emptyCol}>{i18n.noOptionsAvailable}</div>;
				}
			}

			return (
				<Draggable key={row.id} draggableId={row.id} index={index}>
					{(provided: any, snapshot: any): any => (
						<div className={styles.gridRow} key={row.id}
							ref={provided.innerRef}
							{...provided.draggableProps}
							style={getItemStyle(
								snapshot.isDragging,
								provided.draggableProps.style
							)}
						>
							<div className={styles.orderCol}{...provided.dragHandleProps}>
								<DragIndicator fontSize="small" />
								{index + 1}
							</div>
							<div className={styles.dataTypeCol}>
								<Dropdown
									isGrouped={true}
									value={row.dataType}
									onChange={(i: any): void => onSelectDataType(row.id, i.value)}
									options={dataTypes}
								/>
							</div>
							<div className={styles.titleCol}>
								<input type="text" value={row.title} onChange={(e): void => onChangeTitle(row.id, e.target.value)} />
							</div>
							<div className={styles.examplesCol}>{example}</div>
							<div className={styles.optionsCol}>{option}</div>
							<div className={styles.helpCol} onClick={(): void => {
								if (row.dataType === null) {
									return;
								}
								setInitialDialogSection(row.dataType);
								showHelpDialog(true);
							}}>
								{row.dataType ? <SettingsIcon /> : null}
							</div>
							<div className={styles.deleteCol} onClick={(): void => onRemove(row.id)}>
								<HighlightOffIcon />
							</div>
						</div>
					)}
				</Draggable>
			);
		});
	};

	let gridSizeClass = '';
	if (dimensions.width < SMALL_BREAKPOINT) {
		gridSizeClass = styles.gridSmall;
	} else if (dimensions.width < MEDIUM_BREAKPOINT) {
		gridSizeClass = styles.gridMedium;
	}

	const addRowsBtnLabel = numRows === 1 ? i18n.row : i18n.rows;

	return (
		<>
			<div style={{ position: 'fixed', right: 0, padding: 10 }} onClick={toggleGrid}>
				<Tooltip title={i18n.closePanel} placement="bottom">
					<IconButton size="small" aria-label={i18n.closePanel}>
						<CloseIcon fontSize="large" />
					</IconButton>
				</Tooltip>
			</div>

			<Measure
				bounds
				onResize={(contentRect: any): void => setDimensions(contentRect.bounds)}
			>
				{({ measureRef }): any => (
					<div className={`${styles.gridWrapper} ${gridSizeClass}`} ref={measureRef}>
						<div>
							<div className={styles.gridHeaderWrapper}>
								<div className={`${styles.gridRow} ${styles.gridHeader}`} style={{ flex: `0 0 auto` }}>
									<div className={styles.orderCol}>{rows.length}</div>
									<div className={styles.dataTypeCol}>
										{i18n.dataType}
									</div>
									<div className={styles.titleCol}>{columnTitle}</div>
									<div className={styles.examplesCol}>{i18n.examples}</div>
									<div className={styles.optionsCol}>{i18n.options}</div>
									<div className={styles.helpCol} />
									<div className={styles.deleteCol} />
								</div>
							</div>
						</div>
						<div className={styles.scrollableGridRows}>
							<div className={styles.gridRowsWrapper}>
								<DragDropContext onDragEnd={({ draggableId, destination }: any): any => onSort(draggableId, destination.index)}>
									<Droppable droppableId="droppable">
										{(provided: any): any => (
											<div
												className={styles.grid}
												{...provided.droppableProps}
												ref={provided.innerRef}
											>
												{getRows(rows)}
												{provided.placeholder}
											</div>
										)}
									</Droppable>
								</DragDropContext>
								<form onSubmit={(e): any => e.preventDefault()} className={styles.addRows}>
									<span>{i18n.add}</span>
									<input type="number"
										value={numRows}
										onChange={(e): void => setNumRows(parseInt(e.target.value, 10))}
										min={1}
										max={1000}
										step={1}
									/>
									<Button
										size="small"
										onClick={(): void => onAddRows(numRows)}
										variant="contained"
										color="primary"
										disableElevation>
										{addRowsBtnLabel}
									</Button>
								</form>
							</div>
						</div>
						<HelpDialog
							visible={helpDialogVisible}
							initialDataType={initialHelpSection}
							onClose={(): any => showHelpDialog(false)}
							coreI18n={i18n}
							dataTypeI18n={dataTypeI18n}
							onSelectDataType={maybeLoadDataType}
						/>
					</div>
				)}
			</Measure>
		</>
	);
};

export default Grid;
