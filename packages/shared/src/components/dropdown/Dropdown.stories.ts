import * as React from 'react';
import { Dropdown } from './Dropdown';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    tooltipMessage: { control: 'text' }
  },
  args: {
    text: 'Sample text to copy',
    tooltipMessage: 'Copy to clipboard'
  }
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' }
    ],
    value: 'option1',
    placeholder: 'Select an option'
  }
};
