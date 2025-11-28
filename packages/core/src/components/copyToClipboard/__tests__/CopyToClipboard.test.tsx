import React from 'react';
import { render } from '@testing-library/react';
import { Copy } from '../CopyToClipboard';

jest.mock('copy-to-clipboard', () => {
  return jest.fn();
});

const defaultProps = {
  message: 'Message here',
  tooltip: 'Tooltip here',
  content: 'Content here',
  autoHideDuration: 0
};

describe('CopyToClipboard', () => {
  it('renders copy icon with tooltip', () => {
    const { baseElement } = render(<Copy {...defaultProps} />);

    expect(baseElement.querySelector('.copyIcon')).toBeTruthy();
    expect(baseElement.innerHTML).toContain(defaultProps.tooltip);
  });
});
