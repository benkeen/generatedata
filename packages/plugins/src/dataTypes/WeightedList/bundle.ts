import { DTBundle } from '../../';
import { Example, Help, Options, getMetadata, rowStateReducer } from './WeightedList';
import { initialState } from './WeightedList.state';

const bundle: DTBundle = {
  initialState,
  Example,
  Options,
  Help,
  getMetadata,
  rowStateReducer
};

export default bundle;
