import * as React from 'react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DragIndicator from '@material-ui/icons/DragIndicator';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import { getSortedGroupedDataTypes, getDataType, getCustomProps } from '../../utils/dataTypeUtils';
import Dropdown from '../../components/dropdown/Dropdown';
import { getCustomProps, getDataType } from '../../utils/dataTypeUtils';
import * as styles from './Grid.component';


export const GridRow = () => {

	// TODO memoize
	const dataTypes = getSortedGroupedDataTypes();

	const { Example, Options, customProps } = getDataType(row.dataType);
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
					{...getCustomProps(customProps)}
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
}
