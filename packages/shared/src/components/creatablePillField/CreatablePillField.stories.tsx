import React, { useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CreatablePillField } from './CreatablePillField';

export default {
  title: 'Components/CreatablePillField',
  component: CreatablePillField
} as Meta;

export const DefaultExample: StoryObj = {
  render: () => {
    const [items, setItems] = React.useState<string[]>(['A', 'B', 'C', 'D', 'EEE', 'FFF', 'GGG']);

    return (
      <>
        <ul>
          <li>Allows adding new pills by typing and pressing Enter.</li>
          <li>Allows sorting pills by dragging and dropping.</li>
          <li>Clear all button</li>
        </ul>
        <div style={{ width: 300 }}>
          <CreatablePillField items={items} onChange={setItems} />
        </div>
      </>
    );
  }
};

export const CustomPlaceholder: StoryObj = {
  render: () => {
    const [items, setItems] = React.useState<string[]>([]);

    return (
      <>
        <div style={{ width: 300 }}>
          <CreatablePillField items={items} onChange={setItems} placeholder="This is a custom placeholder" />
        </div>
      </>
    );
  }
};

export const NotClearable: StoryObj = {
  render: () => {
    const [items, setItems] = React.useState<string[]>(['A', 'B', 'C']);

    return (
      <>
        <div style={{ width: 300 }}>
          <CreatablePillField items={items} onChange={setItems} isClearable={false} />
        </div>
      </>
    );
  }
};

export const ErrorState: StoryObj = {
  render: () => {
    const [items, setItems] = React.useState<string[]>(['A', 'B', 'C']);

    return (
      <>
        <div style={{ width: 300 }}>
          <CreatablePillField items={items} onChange={setItems} isClearable={false} error="Whoah this is an error." />
        </div>
      </>
    );
  }
};

export const NewPillValidation: StoryObj = {
  render: () => {
    const [items, setItems] = React.useState<string[]>(['AAA', 'BBB', 'CCC']);
    const [error, setError] = React.useState('');

    const onAddItem = useCallback((value: string) => {
      setError('');
      const isValid = value.length === 3;

      if (!isValid) {
        setError('New pills must be exactly 3 characters long.');
      }
      return isValid;
    }, []);

    return (
      <>
        <p>
          This example only lets you add new pills that are exactly 3 characters long. Note that the error message doesn't work well for
          this scenario, so handling the error separately like in this example is recommended.
        </p>

        <div style={{ width: 300 }}>
          <CreatablePillField items={items} onChange={setItems} isClearable={false} onValidateNewItem={onAddItem} />
          <div style={{ color: 'red' }}>{error}</div>
        </div>
      </>
    );
  }
};

// export const Default = Template.bind({});
// Default.args = {
//   placeholder: 'Add a pill...',
//   value: ['Example Pill 1', 'Example Pill 2']
// };

// export const WithMaxPills = Template.bind({});
// WithMaxPills.args = {
//   placeholder: 'Add a pill...',
//   value: ['Pill 1', 'Pill 2', 'Pill 3'],
//   maxPills: 3
// };

// export const Disabled = Template.bind({});
// Disabled.args = {
//   placeholder: 'Add a pill...',
//   value: ['Disabled Pill 1', 'Disabled Pill 2'],
//   disabled: true
// };

// // export const WithCustomValidation = Template.bind({});
// // WithCustomValidation.args = {
// //   placeholder: 'Add a pill...',
// //   pills: ['Valid Pill'],
// //   validatePill: (pill) => pill.length >= 3
// // };

// export const WithInitialInputValue = Template.bind({});
// WithInitialInputValue.args = {
//   placeholder: 'Add a pill...',
//   value: ['Initial Pill'],
//   initialInputValue: 'Pre-filled'
// };
