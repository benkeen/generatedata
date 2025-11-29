import { DTBundle } from '../../';
import { Example, Help, Options, getMetadata } from './OrganizationNumber';
import { initialState } from './OrganizationNumber.state';

const bundle: DTBundle = {
  initialState,
  Example,
  Options,
  Help,
  getMetadata
};

export default bundle;
