import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import GeneratorControls, { GeneratorControlsProps } from './GeneratorControls.component';
import * as selectors from '../store/generator/generator.selectors';
import * as actions from '~store/account/account.actions';
import * as mainSelectors from '~store/main/main.selectors';

const mapStateToProps = (state: any): Partial<GeneratorControlsProps> => ({
	i18n: selectors.getCoreI18n(state),
	isLoggedIn: mainSelectors.isLoggedIn(state),
	dataSetName: selectors.getCurrentDataSetName(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<GeneratorControlsProps> => ({
	onUpdate: (dataSetName: string): any => dispatch(actions.renameDataSet(dataSetName)),
	onSaveDataSet: (): any => dispatch(actions.showSaveDataSetDialog()),
});

const container: any = connect(
	mapStateToProps,
	mapDispatchToProps
)(GeneratorControls);

export default container;
