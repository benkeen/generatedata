import { connect } from 'react-redux';
import Page, { PageProps } from './Page.component';
import * as selectors from '../../core/generator/generator.selectors';

const mapStateToProps = (state: any): Partial<PageProps> => ({
	localeFileLoaded: selectors.localeFileLoaded(state)
});

const mapDispatchToProps = (): Partial<PageProps> => ({});

const con: any = connect(
	mapStateToProps,
	mapDispatchToProps
)(Page);

export default con;
