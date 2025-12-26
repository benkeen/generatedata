import * as React from 'react';
import type { StoryObj } from '@storybook/react';

import { fn } from 'storybook/test';

import { RadioPill, RadioPillRow } from './RadioPill';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Pills',
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' }
  },
  args: { onClick: fn() }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const RadioPillButtons: Story = {
  render: () => {
    const [selectedPill, setSelectedPill] = React.useState('pill1');

    const onClick = (val: string) => {
      setSelectedPill(val);
    };

    return (
      <RadioPillRow>
        <RadioPill name="pill1" label="Pill 1" checked={selectedPill === 'pill1'} onClick={() => onClick('pill1')} />
        <RadioPill name="pill1" label="Pill 2" checked={selectedPill === 'pill2'} onClick={() => onClick('pill2')} />
        <RadioPill name="pill1" label="Pill 3" checked={selectedPill === 'pill3'} onClick={() => onClick('pill3')} />
      </RadioPillRow>
    );
  }
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
