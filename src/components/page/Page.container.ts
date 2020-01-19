import { connect } from 'react-redux';
import Page from './Page.component';
import * as initSelectors from '../../core/init/init.selectors';

const mapStateToProps = (state: any): any => ({
	localeFileLoaded: initSelectors.localeFileLoaded(state)
});

const mapDispatchToProps = (): any => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps

// @ts-ignore
)(Page);
