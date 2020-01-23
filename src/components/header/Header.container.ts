import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as initActions from '../../core/init/init.actions';
import * as initSelectors from '../../core/init/init.selectors';
import Header, { HeaderProps } from './Header.component';
import { GDLocale } from '../../../types/general';
import * as generatorSelectors from '../../core/generator/generator.selectors';
import * as generatorActions from '../../core/generator/generator.actions';

const mapStateToProps = (state: any): Partial<HeaderProps> => ({
	i18n: initSelectors.getCoreI18n(state),
	locale: initSelectors.getLocale(state),
	isGridVisible: generatorSelectors.isGridVisible(state),
	isPreviewVisible: generatorSelectors.isPreviewVisible(state),
	builderLayout: generatorSelectors.getBuilderLayout(state),
	isLoggedIn: false // TODO
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<HeaderProps> => ({
	// @ts-ignore
	onChangeLocale: (locale: GDLocale): any => dispatch(initActions.selectLocale(locale)),
	toggleGrid: (): any => dispatch(generatorActions.toggleGrid()),
	togglePreview: (): any => dispatch(generatorActions.togglePreview()),
	toggleLayout: (): any => dispatch(generatorActions.toggleLayout())
});

const container: any = connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);

export default container;