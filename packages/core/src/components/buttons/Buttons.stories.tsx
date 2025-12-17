import * as React from 'react';
import type { StoryObj } from '@storybook/react';

import { fn } from 'storybook/test';

import { NullButton, PreviewPanelButton, PrimaryButton, SecondaryButton } from './Buttons.component';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Buttons',
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' }
  },
  args: { onClick: fn() }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryButtonStory: Story = {
  render: () => <PrimaryButton>This is a primary button</PrimaryButton>
};

export const SecondaryButtonStory: Story = {
  render: () => <SecondaryButton>This is a secondary button</SecondaryButton>
};

export const NullButtonStory: Story = {
  render: () => <NullButton>This is a null button</NullButton>
};

export const PreviewPanelButtonStory: Story = {
  render: () => (
    <div style={{ padding: 50, backgroundColor: 'black' }}>
      <PreviewPanelButton>Preview Panel Button</PreviewPanelButton>
    </div>
  )
};
