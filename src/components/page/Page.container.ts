import { connect } from 'react-redux';
import Page from './Page.component';
import * as initSelectors from '../../core/init/init.selectors';

const mapStateToProps = (state: any) => ({
    localeFileLoaded: initSelectors.localeFileLoaded(state)
});

const mapDispatchToProps = () => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Page);
