import * as React from 'react';
// @ts-ignore-line
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import useDimensions from 'react-use-dimensions';
import Button from '@material-ui/core/Button';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import HelpIcon from '@material-ui/icons/HelpOutline';
import DragIndicator from '@material-ui/icons/DragIndicator';
import SettingsIcon from '@material-ui/icons/Settings';
import * as styles from './Grid.scss';
import Dropdown from '../dropdown/Dropdown';
import { getSortedGroupedDataTypes, getDataTypeComponents } from '../../utils/dataTypeUtils';
import HelpDialog from '../helpDialog/HelpDialog.container';
import { DataRow } from '../../core/generator/generator.reducer';

const BREAKPOINT = 700;

type GridProps = {
    rows: DataRow[];
    onRemove: (id: string) => void;
    onAddRows: (numRows: number) => void;
    onChangeTitle: (id: string, value: string) => void;
    onSelectDataType: (id: string, value: string) => void;
    onConfigureDataType: (id: string, value: string) => void;
    onSort: (id: string, newIndex: number) => void;
    i18n: any;
    dataTypeI18n: any;
}

let grid = 0;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => {
    const styles: React.CSSProperties = {
        ...draggableStyle,
        userSelect: 'none',
        margin: `0 0 ${grid}px 0`,
    };
    if (isDragging) {
        styles.background = '#0099cc';
    }
    return styles;
};


const Grid = ({ rows, onRemove, onAddRows, onChangeTitle, onSelectDataType, onConfigureDataType, onSort, i18n, dataTypeI18n }: GridProps) => {
	const [numRows, setNumRows] = React.useState(1);
	const [helpDialogVisible, showHelpDialogSection] = React.useState(false);
    const [initialHelpSection, setInitialDialogSection] = React.useState('');
    const [ref, { width: gridWidth }] = useDimensions();

	// TODO memoize
	const dataTypes = getSortedGroupedDataTypes();

	const HelpColIcon = (gridWidth < BREAKPOINT) ? SettingsIcon : HelpIcon;


	const getRows = (rows: DataRow[]) => {
		return rows.map((row, index) => {
			const { Example, Options } = getDataTypeComponents(row.dataType);

            let example: any = null;
            let option: any = null;
            if (row.dataType) {
                if (Example) {
                    example = (
                        <Example
                            coreI18n={i18n}
                            i18n={row.dataType ? dataTypeI18n[row.dataType] : null}
                            id={row.id}
                            data={row.data}
                            onUpdate={(data: any) => onConfigureDataType(row.id, data)}
                        />
                    );
                } else {
                    example = <div className={styles.emptyCol}>{i18n.no_examples_available}</div>
                }

                if (Options) {
                    option = (
                        <Options
                            coreI18n={i18n}
                            i18n={row.dataType ? dataTypeI18n[row.dataType] : null}
                            id={row.id}
                            data={row.data}
                            onUpdate={(data: any) => onConfigureDataType(row.id, data)}
                        />
                    );
                } else {
                    option = <div className={styles.emptyCol}>{i18n.no_options_available}</div>;
                }
            }

			return (
                <Draggable key={row.id} draggableId={row.id} index={index}>
                    {(provided: any, snapshot: any) => (
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
                            <div className={styles.titleCol}>
                                <input type="text" value={row.title} onChange={(e) => onChangeTitle(row.id, e.target.value)} />
                            </div>
                            <div className={styles.dataTypeCol}>
                                <Dropdown
                                    isGrouped={true}
                                    value={row.dataType}
                                    onChange={(i: any) => onSelectDataType(row.id, i.value)}
                                    options={dataTypes}
                                />
                            </div>
                            <div className={styles.examplesCol}>{example}</div>
                            <div className={styles.optionsCol}>{option}</div>
                            <div className={styles.helpCol} onClick={() => {
                                if (row.dataType === null) {
                                    return;
                                }
                                setInitialDialogSection(row.dataType);
                                showHelpDialogSection(true);
                            }}>
                                {row.dataType ? <HelpColIcon /> : null}
                            </div>
                            <div className={styles.deleteCol} onClick={() => onRemove(row.id)}>
                                <HighlightOffIcon />
                            </div>
                        </div>
                    )}
                </Draggable>
			);
		});
	};

    let gridSizeClass = '';
    if (gridWidth < BREAKPOINT) {
        gridSizeClass = styles.gridSmall;
    }

	return (
		<div className={`${styles.gridWrapper} ${gridSizeClass}`} ref={ref}>
            <div>
                <div className={styles.gridHeaderWrapper}>
                    <div className={`${styles.gridRow} ${styles.gridHeader}`} style={{ flex: `0 0 auto` }}>
                        <div className={styles.orderCol} />
                        <div className={styles.titleCol}>{i18n.row_label}</div>
                        <div className={styles.dataTypeCol}>{i18n.data_type}</div>
                        <div className={styles.examplesCol}>{i18n.examples}</div>
                        <div className={styles.optionsCol}>{i18n.options}</div>
                        <div className={styles.helpCol} />
                        <div className={styles.deleteCol} />
                    </div>
                </div>
            </div>

            <div className={styles.scrollableGridRows}>
                <div className={styles.gridRowsWrapper}>
                    <DragDropContext onDragEnd={({ draggableId, destination }: any) => onSort(draggableId, destination.index)}>
                        <Droppable droppableId="droppable">
                            {(provided: any) => (
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

                    <div className={styles.addRows}>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <span>{i18n.add}</span>
                            <input type="number" value={numRows} onChange={(e) => setNumRows(parseInt(e.target.value, 10))}
                                min={1} max={1000} step={1} />
                            <Button size="small"
                                onClick={() => onAddRows(numRows)} variant="contained" color="primary" disableElevation>{i18n.rows}</Button>
                        </form>
                    </div>
                </div>
            </div>

			<HelpDialog
				visible={helpDialogVisible}
				initialDataType={initialHelpSection}
				onClose={() => showHelpDialogSection(false)}
				coreI18n={i18n}
				i18n={dataTypeI18n[initialHelpSection]}
			/>
		</div>
	);
};

export default Grid;
