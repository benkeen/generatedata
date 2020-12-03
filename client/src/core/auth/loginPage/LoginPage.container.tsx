import { connect } from 'react-redux';
// import { Dispatch } from 'redux';
import * as selectors from '~store/generator/generator.selectors';
import LoginPage, { LoginPageProps } from './LoginPage.component';


const mapStateToProps = (state: any): Partial<LoginPageProps> => ({
	i18n: selectors.getCoreI18n(state)
});

// dispatch: Dispatch
const mapDispatchToProps = (): Partial<LoginPageProps> => ({
});

const container: any = connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginPage);

export default container;
