import * as React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { CreatablePillField, CreatablePillFieldProps } from './CreatablePillField';

export default {
  title: 'Components/CreatablePillField',
  component: CreatablePillField
} as Meta;

const Template: StoryFn<CreatablePillFieldProps> = (args) => {
  const [value, setValue] = React.useState<string[]>(args.value || []);

  console.log('.....', value);

  return <CreatablePillField {...args} value={value} onChange={setValue} />;
};

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Add a pill...',
  value: ['Example Pill 1', 'Example Pill 2']
};

export const WithMaxPills = Template.bind({});
WithMaxPills.args = {
  placeholder: 'Add a pill...',
  value: ['Pill 1', 'Pill 2', 'Pill 3'],
  maxPills: 3
};

export const Disabled = Template.bind({});
Disabled.args = {
  placeholder: 'Add a pill...',
  value: ['Disabled Pill 1', 'Disabled Pill 2'],
  disabled: true
};

// export const WithCustomValidation = Template.bind({});
// WithCustomValidation.args = {
//   placeholder: 'Add a pill...',
//   pills: ['Valid Pill'],
//   validatePill: (pill) => pill.length >= 3
// };

export const WithInitialInputValue = Template.bind({});
WithInitialInputValue.args = {
  placeholder: 'Add a pill...',
  value: ['Initial Pill'],
  initialInputValue: 'Pre-filled'
};
