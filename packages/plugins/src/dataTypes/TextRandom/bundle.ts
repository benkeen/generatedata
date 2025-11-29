import { DTBundle } from '../../';
import { Help, Options, getMetadata, rowStateReducer } from './TextRandom';
import { initialState } from './TextRandom.state';

const bundle: DTBundle = {
  initialState,
  Options,
  Help,
  getMetadata,
  rowStateReducer
};

export default bundle;
