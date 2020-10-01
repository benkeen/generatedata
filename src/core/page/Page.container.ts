import { connect } from 'react-redux';
import Page, { PageProps } from './Page.component';
import * as mainSelectors from '../store/main/main.selectors';

const mapStateToProps = (state: any): Partial<PageProps> => ({
	localeFileLoaded: mainSelectors.localeFileLoaded(state)
});

const mapDispatchToProps = (): Partial<PageProps> => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Page);
