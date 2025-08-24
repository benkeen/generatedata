import { connect } from 'react-redux';
import Page, { PageProps } from './Page.component';
import * as mainSelectors from '../store/main/main.selectors';

const mapStateToProps = (state: any): Pick<PageProps, 'localeFileLoaded'> => ({
	localeFileLoaded: mainSelectors.localeFileLoaded(state)
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
