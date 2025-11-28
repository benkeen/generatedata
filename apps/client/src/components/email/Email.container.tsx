import { connect } from 'react-redux';
import * as selectors from '~store/generator/generator.selectors';
import { Store } from '~types/general';
import Email, { EmailProps } from './Email.component';

const mapStateToProps = (state: Store): Pick<EmailProps, 'i18n'> => ({
  i18n: selectors.getCoreI18n(state)
});

const container: any = connect(mapStateToProps)(Email);

export default container;
