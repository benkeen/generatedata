import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as selectors from '~store/generator/generator.selectors';
import * as actions from '~store/generator/generator.actions';
import ClearPageDialog, { ClearPageDialogProps } from './ClearPage.component';

const mapStateToProps = (state: any): Partial<ClearPageDialogProps> => ({
	i18n: selectors.getCoreI18n(state),
	visible: selectors.isClearPageDialogVisible(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<ClearPageDialogProps> => ({
	onClose: (): any => dispatch(actions.hideClearPageDialog()),
	onClear: (): any => dispatch(actions.clearPage())
});

const container: any = connect(mapStateToProps, mapDispatchToProps)(ClearPageDialog);

export default container;
