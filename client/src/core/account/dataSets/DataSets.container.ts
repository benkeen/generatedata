// import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as selectors from '~store/generator/generator.selectors';
import DataSets, { DataSetsProps } from './DataSets.component';
import { Store } from '~types/general';

const mapStateToProps = (state: Store): Partial<DataSetsProps> => ({
	i18n: selectors.getCoreI18n(state)
});

// dispatch: Dispatch
const mapDispatchToProps = (): Partial<DataSetsProps> => ({
});

const container: any = connect(
	mapStateToProps,
	mapDispatchToProps
)(DataSets);

export default container;
