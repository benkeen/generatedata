import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import SchemaDialog, { SchemaDialogProps } from './Schema.component';
import * as selectors from '~store/generator/generator.selectors';
import * as actions from '~store/generator/generator.actions';

const mapStateToProps = (state: any): Partial<SchemaDialogProps> => ({
	visible: selectors.isSchemaDialogVisible(state),
	i18n: selectors.getCoreI18n(state),
	schema: selectors.getGenerationSchema(state),
	theme: selectors.getTheme(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<SchemaDialogProps> => ({
	onClose: (): any => dispatch(actions.hideSchemaDialog())
});

const container: any = connect(
	mapStateToProps,
	mapDispatchToProps
)(SchemaDialog);

export default container;
