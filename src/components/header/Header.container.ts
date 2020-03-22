import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Header, { HeaderProps } from './Header.component';
import { GDLocale } from '../../../types/general';
import * as selectors from '../../core/generator/generator.selectors';
import * as actions from '../../core/generator/generator.actions';

const mapStateToProps = (state: any): Partial<HeaderProps> => ({
	i18n: selectors.getCoreI18n(state),
	locale: selectors.getLocale(state),
	isGridVisible: selectors.isGridVisible(state),
	isPreviewVisible: selectors.isPreviewVisible(state),
	builderLayout: selectors.getBuilderLayout(state),
	isLoggedIn: false // TODO
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<HeaderProps> => ({
	// @ts-ignore
	onChangeLocale: (locale: GDLocale): any => dispatch(actions.selectLocale(locale)),
	toggleGrid: (): any => dispatch(actions.toggleGrid()),
	togglePreview: (): any => dispatch(actions.togglePreview()),
	toggleLayout: (): any => dispatch(actions.toggleLayout())
});

const container: any = connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);

export default container;
