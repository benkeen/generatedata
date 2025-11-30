import { CreatablePillField, Dialog, DialogActions, DialogContent, DialogTitle, Dropdown, TextField, Tooltip } from '@generatedata/core';
import { langUtils } from '@generatedata/utils';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import Button from '@mui/material/Button';
import * as React from 'react';
import { DTExampleProps, DTHelpProps, DTMetadata, DTOptionsProps } from '../../';
import {
  convertListItemsToObj,
  GenerationOptionsType,
  getWeightedListItems,
  getWeightedListLabels,
  presets,
  WeightedListItem,
  WeightedListState,
  WeightedListTypeEnum
} from './WeightedList.state';
import { useClasses } from './WeightedList.styles';

export const Example = ({ data, onUpdate, i18n }: DTExampleProps) => {
  const onChange = (example: any): void => {
    let values: WeightedListItem[] = [];
    if (example === 'even-odd') {
      values = presets.evenOdd.values;
    } else if (example === 'professions') {
      values = presets.professions.values;
    } else if (example === 'household-pets') {
      values = presets.householdPets.values;
    }
    onUpdate({
      ...data,
      example: example,
      values
    });
  };

  const options = [
    { value: 'even-odd', label: i18n.mostlyEvenNumbers },
    { value: 'professions', label: i18n.professions },
    { value: 'household-pets', label: i18n.householdPets }
  ];

  return <Dropdown value={data.example} onChange={(i: any): void => onChange(i.value)} options={options} />;
};

const WeightedListDialog = ({ visible, data, id, onClose, onUpdate, coreI18n, i18n }: any) => {
  const exactlyField = React.useRef<any>();
  const dtListBetweenLow = React.useRef<any>();
  const [showErrors, setShowErrors] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [weight, setWeight] = React.useState('');
  const [displayStrings, setDisplayStrings] = React.useState<string[]>([]);
  const classNames = useClasses();

  const onChangeValue = (e: any): void => setValue(e.target.value);
  const onChangeWeight = (e: any): void => setWeight(e.target.value);

  React.useEffect(() => {
    setDisplayStrings(getWeightedListLabels(data.values));
  }, [data.values]);

  const onChange = (field: string, value: any): void => {
    onUpdate({
      ...data,
      [field]: value
    });
  };

  const onAdd = (): void => {
    setShowErrors(true);
    if (value && weight) {
      onUpdate({
        ...data,
        values: [...data.values, { value, weight }]
      });
      setShowErrors(false);
      setValue('');
      setWeight('');
    }
  };

  const updateDelimiter = (e: any): void => {
    onUpdate({
      ...data,
      delimiter: e.target.value
    });
  };

  let exactlyError = '';
  let betweenLowError = '';
  let betweenHighError = '';
  if (data.listType === WeightedListTypeEnum.exactly) {
    if (!data.exactly) {
      exactlyError = coreI18n.requiredField;
    } else if (displayStrings.length < parseInt(data.exactly, 10)) {
      exactlyError = i18n.listTooShort;
    }
  } else {
    if (!data.betweenLow) {
      betweenLowError = coreI18n.requiredField;
    } else if (displayStrings.length < parseInt(data.betweenLow, 10)) {
      betweenLowError = i18n.listTooShort;
    }
    if (!data.betweenHigh) {
      betweenHighError = coreI18n.requiredField;
    } else if (displayStrings.length < parseInt(data.betweenHigh, 10)) {
      betweenHighError = i18n.listTooShort;
    }
  }

  const onChangeList = (newValues: string[]): void => {
    onUpdate({
      ...data,
      values: getWeightedListItems(newValues)
    });
  };

  const updateAllowDuplicates = (e: any): void => {
    onUpdate({
      ...data,
      allowDuplicates: e.target.checked
    });
  };

  return (
    <Dialog onClose={onClose} open={visible}>
      <div style={{ width: 500 }}>
        <DialogTitle onClose={onClose}>{i18n.weightedListSettings}</DialogTitle>
        <DialogContent dividers>
          <div className={classNames.row}>
            <div className={classNames.colLabel}>
              {i18n.numItemsLabel}
              <Tooltip title={i18n.numItemsLabelDesc} arrow>
                <InfoIcon />
              </Tooltip>
            </div>
            <div className={classNames.content}>
              <ul>
                <li>
                  <input
                    type="radio"
                    id={`listType1-${id}`}
                    value={WeightedListTypeEnum.exactly}
                    checked={data.listType === WeightedListTypeEnum.exactly}
                    onChange={(): void => {
                      onChange('listType', WeightedListTypeEnum.exactly);
                      exactlyField.current.focus();
                    }}
                  />
                  <label htmlFor={`listType1-${id}`}>{i18n.exactly}</label>
                  <TextField
                    error={exactlyError}
                    ref={exactlyField}
                    type="intOnly"
                    min={1}
                    id={`dtListExactly_${id}`}
                    value={data.exactly}
                    style={{ margin: '0 6px 0 4px', width: 50 }}
                    onChange={(e: any): void => {
                      onUpdate({
                        ...data,
                        exactly: e.target.value,
                        listType: WeightedListTypeEnum.exactly
                      });
                    }}
                  />
                </li>
                <li>
                  <input
                    type="radio"
                    id={`listType2-${id}`}
                    value={WeightedListTypeEnum.between}
                    checked={data.listType !== WeightedListTypeEnum.exactly}
                    onChange={(): void => {
                      onChange('listType', WeightedListTypeEnum.between);
                      dtListBetweenLow.current.focus();
                    }}
                  />
                  <label htmlFor={`listType2-${id}`}>{i18n.between}</label>
                  <TextField
                    ref={dtListBetweenLow}
                    error={betweenLowError}
                    type="intOnly"
                    min={0}
                    placeholder="-"
                    id={`dtListBetweenLow${id}`}
                    value={data.betweenLow}
                    style={{ margin: '0 6px 0 4px', width: 50 }}
                    onChange={(e: any): void => {
                      onUpdate({
                        ...data,
                        betweenLow: e.target.value,
                        listType: WeightedListTypeEnum.between
                      });
                    }}
                  />
                  {i18n.and}
                  <TextField
                    type="intOnly"
                    error={betweenHighError}
                    min={0}
                    placeholder="-"
                    id={`dtListBetweenHigh_${id}`}
                    value={data.betweenHigh}
                    style={{ margin: '0 6px 0 4px', width: 50 }}
                    onChange={(e: any): void => {
                      onUpdate({
                        ...data,
                        betweenHigh: e.target.value,
                        listType: WeightedListTypeEnum.between
                      });
                    }}
                  />
                  {i18n.items}
                </li>
              </ul>
            </div>
          </div>
          <div className={classNames.row}>
            <div className={classNames.colLabel}>
              {i18n.allowDuplicates}
              <Tooltip title={i18n.allowDuplicatesDesc} arrow>
                <InfoIcon />
              </Tooltip>
            </div>
            <div className={classNames.content}>
              <input
                type="checkbox"
                checked={data.allowDuplicates}
                onChange={updateAllowDuplicates}
                className={classNames.allowDuplicatesCheckbox}
              />
            </div>
          </div>
          <div className={classNames.row}>
            <div className={classNames.colLabel}>
              {i18n.delimChars}
              <Tooltip title={i18n.delimCharsDesc} arrow>
                <InfoIcon />
              </Tooltip>
            </div>
            <div className={classNames.content}>
              <input type="text" style={{ width: 40 }} value={data.delimiter} onChange={updateDelimiter} />
            </div>
          </div>
          <div className={classNames.row}>
            <div className={classNames.colLabel}>{i18n.itemsTitle}</div>
            <div className={classNames.content}>
              <form onSubmit={(e): void => e.preventDefault()}>
                <div className={classNames.addValueRow}>
                  <div>
                    <label>{i18n.value}</label>
                    <TextField
                      value={value}
                      throttle={false}
                      style={{ width: 150 }}
                      error={showErrors ? coreI18n.requiredField : ''}
                      onChange={onChangeValue}
                    />
                  </div>
                  <div>
                    <label>{i18n.weight}</label>
                    <TextField
                      type="number"
                      value={weight}
                      min={1}
                      throttle={false}
                      style={{ width: 80 }}
                      error={showErrors ? coreI18n.requiredField : ''}
                      onChange={onChangeWeight}
                    />
                  </div>
                  <div>
                    <label />
                    <Button type="submit" onClick={onAdd} variant="outlined" color="primary" size="small">
                      <span dangerouslySetInnerHTML={{ __html: i18n.addBtnLabel }} />
                    </Button>
                  </div>
                </div>
              </form>
              <div>
                {displayStrings.length ? (
                  <CreatablePillField onChange={onChangeList} value={displayStrings} />
                ) : (
                  <p>{i18n.pleaseAddItems}</p>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary" variant="outlined">
            {coreI18n.close}
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export const Options = ({ coreI18n, i18n, data, id, onUpdate }: DTOptionsProps) => {
  const [dialogVisible, setDialogVisibility] = React.useState(false);

  const safeData = {
    ...data
  };

  if (safeData.atMost) {
    safeData.betweenHigh = safeData.atMost;
    delete safeData.atMost;
  }

  if (!safeData.betweenLow) {
    safeData.betweenLow = '';
  }
  if (!safeData.betweenHigh) {
    safeData.betweenHigh = '';
  }

  let label;
  if (safeData.listType === WeightedListTypeEnum.exactly) {
    if (safeData.exactly === '1') {
      label = langUtils.getI18nString(i18n.exactly1Item, ['<b>1</b>']);
    } else {
      label = langUtils.getI18nString(i18n.exactlyNItems, [`<b>${safeData.exactly}</b>`]);
    }
  } else if (!safeData.betweenLow && !safeData.betweenHigh) {
    label = i18n.noRangeEntered;
  } else if (safeData.betweenLow && safeData.betweenHigh) {
    label = langUtils.getI18nString(i18n.betweenNumItems, [`<b>${safeData.betweenLow}</b>`, `<b>${safeData.betweenHigh}</b>`]);
  } else if (safeData.betweenLow) {
    if (safeData.betweenLow === '1') {
      label = langUtils.getI18nString(i18n.atLeast1Item, ['<b>1</b>']);
    } else {
      label = langUtils.getI18nString(i18n.atLeastNItems, [`<b>${safeData.betweenLow}</b>`]);
    }
  } else {
    if (safeData.betweenHigh === '1') {
      label = langUtils.getI18nString(i18n.atMost1Item, ['<b>1</b>']);
    } else {
      label = langUtils.getI18nString(i18n.atMostNItems, [`<b>${safeData.betweenHigh}</b>`]);
    }
  }

  return (
    <>
      <div style={{ margin: 4 }}>
        <span dangerouslySetInnerHTML={{ __html: label }} />
        <Button onClick={(): void => setDialogVisibility(true)} variant="outlined" color="primary" size="small" style={{ marginLeft: 6 }}>
          {i18n.customize}
        </Button>
      </div>
      <WeightedListDialog
        visible={dialogVisible}
        data={safeData}
        id={id}
        coreI18n={coreI18n}
        i18n={i18n}
        onUpdate={onUpdate}
        onClose={(): void => setDialogVisibility(false)}
      />
    </>
  );
};

export const Help = ({ i18n }: DTHelpProps) => (
  <>
    <p dangerouslySetInnerHTML={{ __html: i18n.helpIntro }} />

    <ul>
      <li>
        <b>{i18n.helpValueWeight}</b>
      </li>
      <li>{i18n.helpBrainSurgeon}</li>
      <li>{i18n.helpAstronaut}</li>
      <li>{i18n.helpBanker}</li>
      <li>{i18n.helpSoftwareDeveloper}</li>
      <li>{i18n.helpEtc}</li>
    </ul>
    <p>{i18n.helpOtherOptions}</p>
    <ul>
      <li>{i18n.helpOption1}</li>
      <li>{i18n.helpOption2}</li>
      <li>{i18n.helpOption3}</li>
    </ul>
  </>
);

export const getMetadata = (): DTMetadata => ({
  general: {
    dataType: 'infer'
  },
  sql: {
    field: 'varchar(255) default NULL',
    field_Oracle: 'varchar2(255) default NULL',
    field_MSSQL: 'VARCHAR(255) NULL'
  }
});

export const rowStateReducer = ({
  delimiter,
  listType,
  exactly,
  betweenLow = '',
  betweenHigh = '',
  values,
  allowDuplicates
}: WeightedListState): GenerationOptionsType => {
  let cleanExactly: any = '';
  let cleanBetweenLow: any = '';
  let cleanBetweenHigh: any = '';

  if (listType === WeightedListTypeEnum.exactly) {
    if (exactly.trim() !== '') {
      cleanExactly = parseInt(exactly.trim(), 10);
    }
  } else {
    if (betweenLow.trim() !== '') {
      cleanBetweenLow = parseInt(betweenLow.trim(), 10);
    }
    if (betweenHigh.trim() !== '') {
      cleanBetweenHigh = parseInt(betweenHigh.trim(), 10);
    }

    // ensure that the number are sorted low to high - makes the generation code have to do less work on every
    // iteration
    if (cleanBetweenLow !== '' && cleanBetweenHigh !== '') {
      if (cleanBetweenLow > cleanBetweenHigh) {
        const oldLow = cleanBetweenLow;
        cleanBetweenLow = cleanBetweenHigh;
        cleanBetweenHigh = oldLow;
      }
    }
  }

  return {
    listType,
    exactly: cleanExactly,
    betweenLow: cleanBetweenLow,
    betweenHigh: cleanBetweenHigh,
    values: convertListItemsToObj(values),
    delimiter: delimiter ? delimiter : ', ',
    allowDuplicates
  };
};
