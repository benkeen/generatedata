import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as selectors from '~store/generator/generator.selectors';
import * as accountActions from '~store/account/account.actions';
import CreateAccount, { CreateAccountProps } from './CreateAccount.component';
import { Store } from '~types/general';

const mapStateToProps = (state: Store): Partial<CreateAccountProps> => {
	const i18n = selectors.getCoreI18n(state);
	return {
		i18n,
	};
};

const mapDispatchToProps = (dispatch: Dispatch): Partial<CreateAccountProps> => ({
	// @ts-ignore-line
	onSave: (): any => dispatch(accountActions.createAccount())
});

const container: any = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateAccount);

export default container;
