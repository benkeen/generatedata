import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { GridRow, GridRowProps } from './GridRow.component';
import { getCustomProps, getDataType, getSortedGroupedDataTypes } from '~utils/dataTypeUtils';
import { Store } from '~types/general';
import { DataRow } from '~store/generator/generator.reducer';
import * as actions from '~store/generator/generator.actions';
import * as selectors from '~store/generator/generator.selectors';
import { DataTypeFolder } from '../../../../_plugins';

type OwnProps = {
	row: DataRow;
	index: number;
	gridPanelDimensions: {
		width: number;
		height: number;
	};
	showHelpDialog: (dataType: DataTypeFolder) => void;
};

const mapStateToProps = (state: Store, ownProps: OwnProps): Partial<GridRowProps> => {
	const { dataType } = ownProps.row;

	const { Example, Options, customProps, isLoaded } = getDataType(dataType);
	const dataTypeI18n = selectors.getDataTypeI18n(state);
	const dtCustomProps = getCustomProps(customProps, state);

	return {
		dtDropdownOptions: getSortedGroupedDataTypes(),
		i18n: selectors.getCoreI18n(state),
		countryI18n: selectors.getCountryI18n(state),
		selectedDataTypeI18n: dataTypeI18n && dataType ? dataTypeI18n[dataType] : null,
		Example,
		Options,
		isDataTypeLoaded: isLoaded,
		dtCustomProps,
		...ownProps
	};
};

const mapDispatchToProps = (dispatch: Dispatch): Partial<GridRowProps> => ({
	onRemove: (id: string): any => dispatch(actions.removeRow(id)),
	onChangeTitle: (id: string, value: string): any => dispatch(actions.onChangeTitle(id, value)),
	onConfigureDataType: (id: string, data: any): any => dispatch(actions.onConfigureDataType(id, data)),
	onSelectDataType: (dataType: DataTypeFolder, id: string): any => dispatch(actions.onSelectDataType(dataType, id)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GridRow);
