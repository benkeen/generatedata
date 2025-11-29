import { DTBundle } from '../../';
import { Example, Help, Options, getMetadata } from './PersonalNumber';
import { initialState } from './PersonalNumber.state';

const bundle: DTBundle = {
  initialState,
  Example,
  Options,
  Help,
  getMetadata
};

export default bundle;
