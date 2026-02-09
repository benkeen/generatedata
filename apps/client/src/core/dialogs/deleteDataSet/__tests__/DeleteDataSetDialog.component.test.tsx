import { fireEvent, render } from '@testing-library/react';
import DeleteDataSetDialog from '../DeleteDataSetDialog.component';
import { getTestI18n } from '../../../../../tests/testHelpers';

const i18n = getTestI18n();

const defaultProps = {
  visible: true,
  onClose: () => {},
  onDelete: () => {},
  i18n,
  dataSetName: 'Data Set Name'
};

describe('DeleteDataSetDialog', () => {
  it('clicking close calls the onClose callback', () => {
    const onClose = jest.fn();
    const { baseElement } = render(<DeleteDataSetDialog {...defaultProps} onClose={onClose} />);

    const closeButton = baseElement.querySelector('.MuiDialogTitle-root button') as HTMLButtonElement;
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });
});
