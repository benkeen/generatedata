import { DTBundle } from '../../';
import { Help, Options, getMetadata, rowStateReducer } from './Email';
import { initialState } from './Email.state';
import { customProps } from './Email.store';

const bundle: DTBundle = {
  initialState,
  Help,
  Options,
  getMetadata,
  customProps,
  rowStateReducer
};

export default bundle;
