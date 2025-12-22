import { DataTypeFolder } from '@generatedata/plugins';
import langUtils from '@generatedata/utils/lang';
import { fireEvent, render } from '@testing-library/react';
import sinon from 'sinon';
import * as dataTypeUtils from '~utils/dataTypeUtils';
import HelpDialog from '../HelpDialog.component';
const i18n = require('../../../../i18n/en.json');
const NamesI18n = require('../../../../plugins/dataTypes/Names/i18n/en.json');

const defaultProps = {
  initialDataType: 'Names' as DataTypeFolder,
  visible: true,
  onClose: () => {},
  coreI18n: i18n,
  dataTypeI18n: {
    Names: NamesI18n
  },
  onSelectDataType: () => {},
  loadedDataTypes: {}
};

describe('HelpDialog', () => {
  it('clicking close calls the onClose callback', () => {
    sinon.stub(langUtils, 'getStrings').returns({
      core: i18n,
      dataTypes: {
        Names: NamesI18n
      }
    });
    sinon.stub(dataTypeUtils, 'getSortedGroupedDataTypes').returns([
      {
        label: 'Blah',
        options: [{ value: 'Names', label: 'Names' }]
      }
    ]);

    const onClose = jest.fn();
    const { baseElement } = render(<HelpDialog {...defaultProps} onClose={onClose} />);

    const closeButton = baseElement.querySelector('.MuiDialogTitle-root button') as HTMLButtonElement;
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });
});
