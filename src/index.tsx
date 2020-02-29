import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';
import { getDataTypeLocales } from './utils/dataTypeUtils';

console.log(getDataTypeLocales());

ReactDOM.render(<App />, document.getElementById('root'));
