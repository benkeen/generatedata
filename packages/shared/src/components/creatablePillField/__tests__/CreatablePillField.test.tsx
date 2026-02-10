import { render } from '@testing-library/react';
import { CreatablePillField } from '../CreatablePillField';

const defaultProps = {
  onChange: () => {},
  items: ['one', 'two', 'three']
};

describe('CreatablePillField', () => {
  it('renders', () => {
    const { baseElement } = render(<CreatablePillField {...defaultProps} />);

    expect(baseElement).not.toBeUndefined();
  });
});
