import type { StoryObj } from '@storybook/react';

import { useState } from 'react';

import { DatePicker } from './';

// import { fn } from 'storybook/test';

const meta = {
  title: 'Components/DatePicker',
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryButtonStory: Story = {
  render: () => {
    const [value, setValue] = useState<Date | null>(null);

    return <DatePicker label="Select date" value={value} onChange={(newValue) => setValue(newValue)} />;
  }
};
