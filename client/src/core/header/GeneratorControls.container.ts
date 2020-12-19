// import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import GeneratorControls, { GeneratorControlsProps } from './GeneratorControls.component';
import * as selectors from '../store/generator/generator.selectors';

const mapStateToProps = (state: any): Partial<GeneratorControlsProps> => ({
	i18n: selectors.getCoreI18n(state),
	dataSetName: ''
});

// dispatch: Dispatch
const mapDispatchToProps = (): Partial<GeneratorControlsProps> => ({
	// onLogout: (): any => dispatch(mainActions.logout())
});

const container: any = connect(
	mapStateToProps,
	mapDispatchToProps
)(GeneratorControls);

export default container;
