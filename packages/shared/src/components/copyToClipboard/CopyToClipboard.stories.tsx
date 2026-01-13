import * as React from 'react';
import { CopyToClipboard } from './CopyToClipboard';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CopyToClipboard> = {
  title: 'Components/CopyToClipboard',
  component: CopyToClipboard,
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
type Story = StoryObj<typeof CopyToClipboard>;

export const Default: Story = {
  render: (args) => <CopyToClipboard {...args} />
};
