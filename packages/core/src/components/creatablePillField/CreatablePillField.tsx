import React, { useCallback } from 'react';
import { arrayMove } from '@generatedata/utils/array';
import { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import type { StylesConfig } from 'react-select';
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { DropdownOption } from '../dropdown/Dropdown';
import { ErrorTooltip } from '../tooltips';
import { useClasses } from './CreatablePillField.styles';
import { components } from 'react-select';
import { CSS } from '@dnd-kit/utilities';

export const MultiValue = (props: any) => {
  const onMouseDown = (e: any): void => {
    e.preventDefault();
    e.stopPropagation();
  };
  const innerProps = { onMouseDown };

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props.data.value
  });

  return (
    <div ref={setNodeRef} style={{ transform: CSS.Translate.toString(transform), transition }} {...attributes} {...listeners}>
      <components.MultiValue {...props} innerProps={innerProps} />
    </div>
  );
};

const MultiValueRemove = (props: any) => {
  return (
    <components.MultiValueRemove
      {...props}
      innerProps={{
        onPointerDown: (e) => e.stopPropagation(),
        ...props.innerProps
      }}
    />
  );
};

const selectStyles: StylesConfig<DropdownOption, true> = {
  control: (base) => ({
    ...base,
    boxShadow: 'none',
    minHeight: 30,
    maxHeight: 100,
    overflow: 'scroll'
  }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: 4
  }),
  clearIndicator: (base) => ({
    ...base,
    padding: 4
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: '#e0ebfd'
  }),
  valueContainer: (base) => ({
    ...base,
    padding: '0px 2px'
  }),
  container: (base) => ({
    ...base
  }),
  input: (base) => ({
    ...base,
    margin: 0,
    padding: 0
  }),
  indicatorsContainer: (base) => ({
    ...base,
    alignItems: 'flex-start'
  })
};

export const createOption = (label: string): DropdownOption => ({
  label,
  value: label
});

// const SortableCreatableSelect: any = SortableContainer(CreatableSelect);

export type CreatablePillFieldProps = {
  onChange: (newValues: string[]) => void;
  value: string[];
  error?: string;
  placeholder?: string;
  onValidateNewItem?: (value: string) => boolean;
  className?: string;
  isClearable?: boolean;
};

export const CreatablePillField = ({
  onChange,
  onValidateNewItem,
  value,
  error = '',
  placeholder = 'Press enter to create item',
  className,
  isClearable = true
}: CreatablePillFieldProps) => {
  const classNames = useClasses();

  const [newTempValue, setNewTempValue] = useState('');
  const [activeItems, setActiveItems] = useState<{ value: string; label: string }[]>(() => value.map(createOption));

  // const options = activeItems.map(createOption);
  // const [selected, setSelected] = React.useState<ColorOption[]>([colorOptions[4], colorOptions[5]]);
  // const onChange = (selectedOptions: OnChangeValue<ColorOption, true>) => setSelected([...selectedOptions]);

  const handleInputChange = (newTempValue: string): void => setNewTempValue(newTempValue);

  const handleKeyDown = (e: any): void => {
    if (!newTempValue) {
      return;
    }
    switch (e.key) {
      case 'Enter':
      case 'Tab':
        if (onValidateNewItem) {
          const isValid = onValidateNewItem(newTempValue);
          if (!isValid) {
            return;
          }
        }
        setNewTempValue('');
        onChange([...value, newTempValue]);
        e.preventDefault();
    }
  };

  const onDragOver = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (!active || !over) return;

      console.log('onDragOver ---', active.id, over.id);
      // const sortedItems = ;

      setActiveItems((items) => {
        const oldIndex = items.findIndex((item) => item.value === active.id);
        const newIndex = items.findIndex((item) => item.value === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    },
    [setActiveItems]
  );

  const onDragEnd = useCallback((event: DragEndEvent) => {
    console.log('onDragEnd ---');
    onChange(activeItems.map((item) => item.value));
  }, []);

  const classes: string[] = [];
  if (className) {
    classes.push(className);
  }
  if (error) {
    classes.push(classNames.errorField);
  }

  // onCreateOption={(a: any) => console.log(a)}

  return (
    <ErrorTooltip title={error} arrow disableHoverListener={!error} disableFocusListener={!error}>
      <span>
        <DndContext modifiers={[restrictToParentElement]} onDragOver={onDragOver} collisionDetection={closestCenter}>
          <SortableContext items={activeItems.map((item) => item.value)} strategy={() => null}>
            <CreatableSelect
              className={classes.join(' ')}
              styles={selectStyles}
              components={{
                MultiValue,
                MultiValueRemove
              }}
              inputValue={newTempValue}
              isClearable={isClearable}
              isMulti
              menuIsOpen={false}
              // onChange={(options: any): void => {
              //   const newValues = options ? options.map(({ value }: DropdownOption) => value) : [];
              //   console.log('....');
              //   onChange(newValues);
              // }}
              onInputChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              value={activeItems}
              menuPlacement="auto"
              menuPortalTarget={document.body}
            />
          </SortableContext>
        </DndContext>
      </span>
    </ErrorTooltip>
  );
};
