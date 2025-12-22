import { DataTypeFolder, DTOptionsMetadata } from '@generatedata/plugins';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as actions from '~store/generator/generator.actions';
import { LoadDataTypeBundleOptions } from '~store/generator/generator.actions';
import { DataRow } from '~store/generator/generator.reducer';
import * as selectors from '~store/generator/generator.selectors';
import { Store } from '~types/general';
import { getCustomProps, getDataType, getSortedGroupedDataTypes } from '~utils/dataTypeUtils';
import * as coreUtils from '../../../utils/coreUtils';
import { GridRow, GridRowProps } from './GridRow.component';

type OwnProps = {
  row: DataRow;
  index: number;
  gridPanelDimensions: {
    width: number;
    height: number;
  };
  showHelpDialog: (dataType: DataTypeFolder) => void;
};

const mapStateToProps = (
  state: Store,
  ownProps: OwnProps
): Pick<
  GridRowProps,
  | 'dtDropdownOptions'
  | 'i18n'
  | 'countryI18n'
  | 'selectedDataTypeI18n'
  | 'Example'
  | 'Options'
  | 'isDataTypeLoaded'
  | 'isCountryNamesLoading'
  | 'isCountryNamesLoaded'
  | 'countryNamesMap'
  | 'dtCustomProps'
> => {
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
    isCountryNamesLoading: selectors.isCountryNamesLoading(state),
    isCountryNamesLoaded: selectors.isCountryNamesLoaded(state),
    countryNamesMap: coreUtils.getCountryNames(),
    dtCustomProps,
    ...ownProps
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch
): Pick<GridRowProps, 'onRemove' | 'onChangeTitle' | 'onConfigureDataType' | 'onSelectDataType'> => ({
  onRemove: (id: string): any => dispatch(actions.removeRow(id)),
  onChangeTitle: (id: string, value: string): any => dispatch(actions.onChangeTitle(id, value)),
  onConfigureDataType: (id: string, data: any, metadata?: DTOptionsMetadata): any =>
    dispatch(actions.onConfigureDataType(id, data, metadata)),
  onSelectDataType: (dataType: DataTypeFolder, opts: LoadDataTypeBundleOptions): any => dispatch(actions.onSelectDataType(dataType, opts))
});

export default connect(mapStateToProps, mapDispatchToProps)(GridRow);
