import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../core/generator/generator.actions';
import * as initSelectors from '../../core/init/init.selectors';
import Footer from './Footer.component';
import { GDLocale } from '../../../types/general';
import * as initActions from '../../core/init/init.actions';

const mapStateToProps = (state: any) => ({
    i18n: initSelectors.getCoreI18n(state),
    locale: initSelectors.getLocale(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onAddRows: (numRows: number) => dispatch(actions.addRows(numRows)),
    // @ts-ignore-line
    onChangeLocale: (locale: GDLocale) => dispatch(initActions.selectLocale(locale))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Footer);
