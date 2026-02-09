import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ClearPageDialog from '../ClearPage.component';
import { getTestI18n } from '../../../../../tests/testHelpers';

const i18n = getTestI18n();

jest.mock('copy-to-clipboard', () => {
  return jest.fn();
});

const defaultProps = {
  visible: true,
  onClose: () => {},
  onClear: () => {},
  i18n
};

describe('ClearPageDialog', () => {
  it('clicking "No" calls onClose', () => {
    const onClose = jest.fn();
    const { baseElement } = render(<ClearPageDialog {...defaultProps} onClose={onClose} />);

    const closeButton = baseElement.querySelector('.cancelClearPage') as HTMLButtonElement;
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });
});
