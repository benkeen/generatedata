import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import TourDialog, { TourDialogProps } from './Tour.component';
import * as selectors from '~store/generator/generator.selectors';
import * as mainSelectors from '~store/main/main.selectors';
import * as mainActions from '~store/main/main.actions';

const mapStateToProps = (state: any): Partial<TourDialogProps> => ({
	i18n: selectors.getCoreI18n(state),
	visible: mainSelectors.shouldShowTour(state),
	tourBundleLoaded: mainSelectors.isTourBundleLoaded(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<TourDialogProps> => ({
	loadTourBundle: () => dispatch(mainActions.loadTourBundle()),
	onClose: () => dispatch(mainActions.toggleTour())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TourDialog);
