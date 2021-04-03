import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { PanelButtons, PanelButtonsProps } from './PanelButtons.component';
import * as selectors from '~store/generator/generator.selectors';
// import * as generatorActions from '~store/generator/generator.actions';

const mapStateToProps = (state: any): Partial<PanelButtonsProps> => ({
	i18n: selectors.getCoreI18n(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<PanelButtonsProps> => ({
	selectVersion: (): any => {}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PanelButtons);
