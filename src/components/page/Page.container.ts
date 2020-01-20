import { connect } from 'react-redux';
import Page, { PageProps } from './Page.component';
import * as initSelectors from '../../core/init/init.selectors';

const mapStateToProps = (state: any): Partial<PageProps> => ({
	localeFileLoaded: initSelectors.localeFileLoaded(state)
});

const mapDispatchToProps = (): Partial<PageProps> => ({});

const con: any = connect(
	mapStateToProps,
	mapDispatchToProps
)(Page);

export default con;