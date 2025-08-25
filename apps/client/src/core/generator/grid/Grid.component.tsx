import React, { useMemo } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useWindowSize } from 'react-hooks-window-size';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import * as styles from './Grid.scss';
import { Tooltip } from '~components/tooltips';
import { PrimaryButton } from '~components/Buttons.component';
import { DataRow } from '~store/generator/generator.reducer';
import { DataTypeFolder } from '@generatedata/plugins';
import GridRow from './GridRow.container';
import C from '@generatedata/config/constants';
import { useMeasure } from '@uidotdev/usehooks';

export type GridProps = {
	rows: DataRow[];
	onAddRows: (numRows: number) => void;
	onSort: (id: string, newIndex: number) => void;
	toggleGrid: () => void;
	i18n: any;
	columnTitle: string;
	changeSmallScreenVisiblePanel: () => void;
	showHelpDialog: (section: DataTypeFolder) => void;
};

const Grid = ({ rows, onAddRows, onSort, i18n, columnTitle, toggleGrid, changeSmallScreenVisiblePanel, showHelpDialog }: GridProps) => {
	const [numRows, setNumRows] = React.useState(1);
	const windowSize = useWindowSize();
	const [measureRef, { width = 0, height = 0 }] = useMeasure();

	let gridSizeClass = '';
	if (width && width < C.GRID.SMALL_BREAKPOINT) {
		gridSizeClass = styles.gridSmall;
	} else if (width && width < C.GRID.MEDIUM_BREAKPOINT) {
		gridSizeClass = styles.gridMedium;
	}

	const addRowsBtnLabel = numRows === 1 ? i18n.row : i18n.rows;

	const onClose = (): void => {
		if (windowSize.width <= C.SMALL_SCREEN_WIDTH) {
			changeSmallScreenVisiblePanel();
		} else {
			toggleGrid();
		}
	};

	// to prevent repaints
	const memoizedDimensions = useMemo(() => ({ width, height }), [width, height]) as { width: number; height: number };

	return (
		<>
			<div style={{ position: 'fixed', right: 0, padding: 10 }}>
				<span onClick={onClose}>
					<Tooltip title={<span dangerouslySetInnerHTML={{ __html: i18n.closePanel }} />} placement="bottom" arrow>
						<IconButton size="small" aria-label={i18n.closePanel}>
							<CloseIcon fontSize="large" />
						</IconButton>
					</Tooltip>
				</span>
			</div>

			<div className={`${styles.gridWrapper} ${gridSizeClass}`} ref={measureRef}>
				<div>
					<div className={styles.gridHeaderWrapper}>
						<div className={`${styles.gridRow} ${styles.gridHeader} tour-gridHeader`} style={{ flex: '0 0 auto' }}>
							<div className={styles.orderCol}>{rows.length}</div>
							<div className={styles.dataTypeCol}>{i18n.dataType}</div>
							<div className={styles.titleCol}>{columnTitle}</div>
							<div className={styles.examplesCol}>{i18n.examples}</div>
							<div className={styles.optionsCol}>{i18n.options}</div>
							<div className={styles.settingsIconCol} />
							<div className={styles.deleteCol} />
						</div>
					</div>
				</div>
				<div className={`${styles.scrollableGridRows} tour-scrollableGridRows`}>
					<div className={`${styles.gridRowsWrapper} tour-gridRows`}>
						<DragDropContext onDragEnd={({ draggableId, destination }: any): any => onSort(draggableId, destination.index)}>
							<Droppable droppableId="droppable">
								{(provided: any): any => (
									<div className={styles.grid} {...provided.droppableProps} ref={provided.innerRef}>
										{rows.map((row, index) => (
											<GridRow
												row={row}
												key={row.id}
												index={index}
												gridPanelDimensions={memoizedDimensions}
												showHelpDialog={showHelpDialog}
											/>
										))}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
						</DragDropContext>

						<form onSubmit={(e): any => e.preventDefault()} className={`${styles.addRows} tour-addRows`}>
							<span>{i18n.add}</span>
							<input
								type="number"
								value={numRows}
								onChange={(e): void => setNumRows(parseInt(e.target.value, 10))}
								min={1}
								max={1000}
								step={1}
							/>
							<PrimaryButton size="small" onClick={(): void => onAddRows(numRows)}>
								{addRowsBtnLabel}
							</PrimaryButton>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Grid;
