import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DragIndicator from '@material-ui/icons/DragIndicator';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import Dropdown from '~components/dropdown/Dropdown';
import { DataRow } from '~store/generator/generator.reducer';
import { DataTypeFolder } from '../../../../_plugins';
import * as styles from './Grid.scss';
import * as sharedStyles from '../../../styles/shared.scss';
import TextField from '~components/TextField';
import { SmallSpinner } from '~components/loaders/loaders';
import { SmallScreenSettingsIcon } from './SmallScreenSettingsIcon';

const getItemStyle = (isDragging: boolean, draggableStyle: any): React.CSSProperties => {
	const styles: React.CSSProperties = {
		...draggableStyle,
		userSelect: 'none',
		margin: `0 0 0 0`,
	};
	if (isDragging) {
		styles.background = '#e0ebfd';
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
	isDataTypeLoaded: boolean;
	onChangeTitle: (id: string, value: string) => void;
	onConfigureDataType: (id: string, value: string) => void;
	onSelectDataType: (dataType: DataTypeFolder, id: string) => void;
	onRemove: (id: string) => void;
	dtCustomProps: { [propName: string]: any };
	dtDropdownOptions: any;
	gridPanelDimensions: {
		width: number;
		height: number;
	};
	showHelpDialog: (dataType: DataTypeFolder) => void;
};

const NoExample = ({ coreI18n, emptyColClass }: any): JSX.Element => <div className={emptyColClass}>{coreI18n.noExamplesAvailable}</div>;
const NoOptions = ({ coreI18n, emptyColClass }: any): JSX.Element => <div className={emptyColClass}>{coreI18n.noOptionsAvailable}</div>;

export const GridRow = ({
	row, index, Example, Options, onRemove, onChangeTitle, onConfigureDataType, onSelectDataType, dtDropdownOptions,
	i18n, countryI18n, selectedDataTypeI18n, dtCustomProps, gridPanelDimensions, showHelpDialog, isDataTypeLoaded
}: GridRowProps): JSX.Element => {
	let example: any = null;
	let options: any = null;

	if (isDataTypeLoaded) {
		if (Example) {
			example = (
				<Example
					coreI18n={i18n}
					countryI18n={countryI18n}
					i18n={selectedDataTypeI18n}
					id={row.id}
					data={row.data}
					onUpdate={(data: any): void => onConfigureDataType(row.id, data)}
					emptyColClass={sharedStyles.emptyCol}
					gridPanelDimensions={gridPanelDimensions}
				/>
			);
		} else {
			example = <NoExample coreI18n={i18n} emptyColClass={sharedStyles.emptyCol} />;
		}

		if (Options) {
			options = (
				<Options
					coreI18n={i18n}
					countryI18n={countryI18n}
					i18n={selectedDataTypeI18n}
					id={row.id}
					data={row.data}
					onUpdate={(data: any): void => onConfigureDataType(row.id, data)}
					gridPanelDimensions={gridPanelDimensions}
					emptyColClass={sharedStyles.emptyCol}
					{...dtCustomProps}
				/>
			);
		} else {
			options = <NoOptions coreI18n={i18n} emptyColClass={sharedStyles.emptyCol} />;
		}
	} else if (!isDataTypeLoaded && row.dataType) {
		example = <SmallSpinner />;
	}

	return (
		<Draggable key={row.id} draggableId={row.id} index={index}>
			{(provided: any, snapshot: any): any => {

				// the title field is always required, regardless of Export Type
				const titleColError = row.dataType && row.title.trim() === '' ? i18n.requiredField : '';

				return (
					<div className={styles.gridRow} key={row.id}
						 ref={provided.innerRef}
						 {...provided.draggableProps}
						 style={getItemStyle(
							 snapshot.isDragging,
							 provided.draggableProps.style
						 )}
					>
						<div className={styles.orderCol}{...provided.dragHandleProps}>
							<DragIndicator fontSize="small"/>
							{index + 1}
						</div>
						<div className={styles.dataTypeCol}>
							<Dropdown
								className={styles.dataTypeColDropdown}
								isGrouped={true}
								value={row.dataType}
								onChange={(i: any): void => onSelectDataType(i.value, row.id)}
								options={dtDropdownOptions}
							/>
							<div className={styles.dataTypeHelp}>
								{row.dataType ? <InfoIcon fontSize="inherit" onClick={(): void => showHelpDialog(row.dataType as DataTypeFolder)}/> : null}
							</div>
						</div>
						<div className={styles.titleCol}>
							<TextField
								error={titleColError}
								value={row.title}
								onChange={(e: any): void => onChangeTitle(row.id, e.target.value)}
							/>
						</div>
						<div className={styles.examplesCol}>{example}</div>
						<div className={styles.optionsCol}>{options}</div>
						<div className={styles.settingsIconCol} onClick={(): void => {
							if (row.dataType === null) {
								return;
							}
						}}>
							<SmallScreenSettingsIcon
								id={row.id}
								data={row.data}
								dataType={row.dataType}
								Example={Example}
								Options={Options}
								isDataTypeLoaded={isDataTypeLoaded}
								i18n={i18n}
								countryI18n={countryI18n}
								gridPanelDimensions={gridPanelDimensions}
								selectedDataTypeI18n={selectedDataTypeI18n}
								onConfigureDataType={onConfigureDataType}
								dtCustomProps={dtCustomProps}
							/>
						</div>
						<div className={styles.deleteCol} onClick={(): void => onRemove(row.id)}>
							<HighlightOffIcon />
						</div>
					</div>
				);
			}}
		</Draggable>
	);
};
