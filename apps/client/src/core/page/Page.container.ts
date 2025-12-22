import { connect } from 'react-redux';
import * as mainSelectors from '~store/main/main.selectors';
import Page, { PageProps } from './Page.component';

const mapStateToProps = (state: any): Pick<PageProps, 'localeFileLoaded'> => ({
  localeFileLoaded: mainSelectors.localeFileLoaded(state)
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
