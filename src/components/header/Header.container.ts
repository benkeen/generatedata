import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as initActions from '../../core/init/init.actions';
import * as initSelectors from '../../core/init/init.selectors';
import Header from './Header.component';
import { GDLocale } from '../../../types/general';
import * as generatorSelectors from '../../core/generator/generator.selectors';
import * as generatorActions from '../../core/generator/generator.actions';

const mapStateToProps = (state: any) => ({
	i18n: initSelectors.getCoreI18n(state),
	locale: initSelectors.getLocale(state),
    isGridVisible: generatorSelectors.isGridVisible(state),
    isPreviewVisible: generatorSelectors.isPreviewVisible(state),
    isLoggedIn: false // TODO
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    // @ts-ignore-line
	onChangeLocale: (locale: GDLocale) => dispatch(initActions.selectLocale(locale)),
    toggleGrid: () => dispatch(generatorActions.toggleGrid()),
    togglePreview: () => dispatch(generatorActions.togglePreview())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);
