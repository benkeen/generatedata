import { DataTypeFolder } from '@generatedata/plugins';
import { fireEvent, render } from '@testing-library/react';
import sinon from 'sinon';
import { getDataTypeI18n, getTestI18n } from '../../../../../tests/testHelpers';
import * as dataTypeUtils from '~utils/dataTypeUtils';
import HelpDialog from '../HelpDialog.component';

const i18n = getTestI18n();
const NamesI18n = getDataTypeI18n('Names');

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
