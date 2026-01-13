import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { TextField, type TextFieldProps } from './TextField';

export default {
  title: 'Components/TextField',
  component: TextField
} as Meta;

const Template: StoryFn<TextFieldProps> = (args: TextFieldProps) => <TextField {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Default Text Field',
  onChange: () => {}
};

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
  label: 'Text Field with Helper Text',
  placeholder: 'Enter text here',
  helperText: 'This is some helper text.'
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled Text Field',
  placeholder: 'Cannot enter text',
  disabled: true
};

export const WithError = Template.bind({});
