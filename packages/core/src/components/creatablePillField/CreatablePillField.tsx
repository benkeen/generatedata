import React, { useCallback, useEffect } from 'react';
import { arrayMove } from '@generatedata/utils/array';
import { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import type { StylesConfig } from 'react-select';
import { closestCorners, DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, useSortable, rectSortingStrategy } from '@dnd-kit/sortable';
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

// the index is used to ensure unique values. If there are two identical values, deleting and sorting won't work properly.
// However, this still leads to some issues if you have identical values and try to sort them: they get re-sorted after
// the drag completes. But it's a minor issue for now.
export const createOption = (label: string, index: number): DropdownOption => ({
  label,
  value: `${label}_${index}`
});

export type CreatablePillFieldProps = {
  onChange: (newValues: string[]) => void;
  items: string[];
  error?: string;
  placeholder?: string;
  onValidateNewItem?: (value: string) => boolean;
  className?: string;
  isClearable?: boolean;
};

export const CreatablePillField = ({
  onChange,
  onValidateNewItem,
  items,
  error = '',
  placeholder = 'Press enter to create item',
  className,
  isClearable = true
}: CreatablePillFieldProps) => {
  const classNames = useClasses();
  const [newTempValue, setNewTempValue] = useState('');
  const [activeItems, setActiveItems] = useState<{ value: string; label: string }[]>(() => items.map(createOption));

  useEffect(() => {
    setActiveItems(items.map(createOption));
  }, [items]);

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
        onChange([...items, newTempValue]);
        e.preventDefault();
    }
  };

  const onDragOver = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (!active || !over) return;

      setActiveItems((items) => {
        const oldIndex = items.findIndex((item) => item.value === active.id);
        const newIndex = items.findIndex((item) => item.value === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    },
    [setActiveItems]
  );

  const onDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (!active || !over) return;

      onChange(activeItems.map((i) => i.label));
    },
    [activeItems]
  );

  const classes: string[] = [];
  if (className) {
    classes.push(className);
  }
  if (error) {
    classes.push(classNames.errorField);
  }

  return (
    <ErrorTooltip title={error} arrow disableHoverListener={!error} disableFocusListener={!error}>
      <span>
        <DndContext modifiers={[restrictToParentElement]} onDragOver={onDragOver} onDragEnd={onDragEnd} collisionDetection={closestCorners}>
          <SortableContext items={activeItems.map((item) => item.value)} strategy={rectSortingStrategy}>
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
              onChange={(options: any): void => {
                const newValues = options ? options.map(({ label }: DropdownOption) => label) : [];
                onChange(newValues);
              }}
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
