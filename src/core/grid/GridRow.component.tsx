import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DragIndicator from '@material-ui/icons/DragIndicator';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
// import { getSortedGroupedDataTypes, getDataType, getCustomProps } from '../../utils/dataTypeUtils';
// import { getCustomProps, getDataType } from '../../utils/dataTypeUtils';
import Dropdown from '../../components/dropdown/Dropdown';
import * as styles from './Grid.scss';
import { DataRow } from '../generator/generator.reducer';
import { DataTypeFolder } from '../../_plugins';

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

export type GridRowProps = {
	row: DataRow;
	index: number;
	Example: any;
	Options: any;
	i18n: any;
	countryI18n: any;
	selectedDataTypeI18n: any;
	onChangeTitle: (id: string, value: string) => void;
	onConfigureDataType: (id: string, value: string) => void;
	onSelectDataType: (dataType: DataTypeFolder, id: string) => void;
	onRemove: (id: string) => void;
	dtCustomProps: { [propName: string]: any };
	dtDropdownOptions: any;
	dimensions: { // TODO rename... what dimensions is this again? the whole screen size? Grid panel?
		width: number;
		height: number;
	}
};

export const GridRow = ({
	row, index, Example, Options, onRemove, onChangeTitle, onConfigureDataType, onSelectDataType, dtDropdownOptions,
	i18n, countryI18n, selectedDataTypeI18n, dtCustomProps, dimensions
}: GridRowProps) => {
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
							onChange={(i: any): void => onSelectDataType(i.value, row.id)}
							options={dtDropdownOptions}
						/>
					</div>
					<div className={styles.titleCol}>
						<input type="text" value={row.title} onChange={(e): void => onChangeTitle(row.id, e.target.value)} />
					</div>
					<div className={styles.examplesCol}>
						<Example
							coreI18n={i18n}
							countryI18n={countryI18n}
							i18n={selectedDataTypeI18n}
							id={row.id}
							data={row.data}
							onUpdate={(data: any): void => onConfigureDataType(row.id, data)}
							dimensions={{ height: dimensions.height, width: dimensions.width }}
						/>
					</div>
					<div className={styles.optionsCol}>
						<Options
							coreI18n={i18n}
							countryI18n={countryI18n}
							i18n={selectedDataTypeI18n}
							id={row.id}
							data={row.data}
							onUpdate={(data: any): void => onConfigureDataType(row.id, data)}
							dimensions={{ height: dimensions.height, width: dimensions.width }}
							{...dtCustomProps}
						/>
					</div>
					<div className={styles.helpCol} onClick={(): void => {
						if (row.dataType === null) {
							return;
						}
						// setInitialDialogSection(row.dataType);
						// showHelpDialog(true);
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
}
