import C from '@generatedata/config/constants';
import {
  CopyToClipboard,
  Dropdown,
  ErrorTooltip,
  LocalizedDatePicker,
  LocalizedDatePickerProvider,
  TextField,
  useSharedClasses
} from '@generatedata/core';
import { isValidDateFormat } from '@generatedata/utils/date';
import ArrowRightAlt from '@mui/icons-material/ArrowRightAlt';
import Event from '@mui/icons-material/Event';
import Button from '@mui/material/Button';
import { format, fromUnixTime } from 'date-fns';
import * as React from 'react';
import { DTExampleProps, DTHelpProps, DTMetadata, DTOptionsProps } from '../../';
import { DateState, GenerationOptionsType } from './Date.state';
import { useClasses } from './Date.styles';

export const rowStateReducer = ({ fromDate, toDate, format }: DateState): GenerationOptionsType => ({
  fromDate,
  toDate,
  format
});

export const getMetadata = (): DTMetadata => ({
  general: {
    dataType: 'date'
  },
  sql: {
    field: 'varchar(255)',
    field_Oracle: 'varchar2(255)',
    field_MSSQL: 'VARCHAR(255) NULL'
  }
});

export const getOptions = (): any[] => {
  const now = new Date();

  const options: any = [];
  const formats = [
    'MMM d, y', // Jan 1, 2020
    'MMMM do, y', // January 1st, 2020
    'EEE, MMM dd', // Wed, Jan 01
    'EEE, MMM do, y', // Wed, Jan 1st, 2012
    'LL.dd.yy', // 03.25.20
    'LL-dd-yy', // 03-25-06
    'LL/dd/yy', // 03/25/06,
    'LL/dd/y', // 03/25/2012
    'dd.LL.yy', // 25.03.2020
    'dd-LL-yy', // 25-03-06
    'dd/LL/y' // 25/03/2012
  ];
  formats.forEach((currFormat) => {
    options.push({
      label: format(new Date(now.getFullYear(), now.getMonth(), now.getDate()), currFormat),
      value: currFormat
    });
  });

  return options.concat([
    { label: 'MySQL datetime', value: 'y-LL-dd HH:mm:ss' },
    { label: 'Unix timestamp (secs)', value: 't' },
    { label: 'Unix timestamp (millisecs)', value: 'T' }
  ]);
};

export const Example = ({ i18n, data, onUpdate }: DTExampleProps) => {
  const onChange = ({ value }: { value: string }): void => {
    onUpdate({
      ...data,
      example: value,
      format: value
    });
  };

  return <Dropdown placeholder={i18n.dateFormat} value={data.example} options={getOptions()} onChange={onChange} />;
};

// N.B. The DatePicker component is out of date now. There appears to be a bug where even though setting the right date
// it doesn't show it properly. This happens all the time when clicking on the "to" field (the second one). That shows
// the first date. Soon as you click out of the dialog, you can see it set itself to right value. Clicking again shows
// the right value. I couldn't find any doc about this issue & I don't recall it occurring with earlier versions of this
// code. Upgrading is probably the best option but that's a lot of work, so for now there are two pickers, one for From and
// To each. Klutzy, but functional.
export const Options = ({ data, onUpdate, i18n, coreI18n }: DTOptionsProps) => {
  const [fromDatePickerOpen, setFromDatePickerOpen] = React.useState(false);
  const [toDatePickerOpen, setToDatePickerOpen] = React.useState(false);
  const [selectedDatePicker, setDatePicker] = React.useState('fromDate');
  const classNames = useClasses();
  const sharedStyles = useSharedClasses();

  const onChange = (field: string, value: any): void => {
    onUpdate({
      ...data,
      [field]: value
    });
  };

  const onBtnClick = (btn: string): void => {
    setDatePicker(btn);
    if (btn === 'fromDate') {
      setFromDatePickerOpen(true);
    } else {
      setToDatePickerOpen(true);
    }
  };

  const onSelectDate = (btn: string, value: any): void => {
    onChange(btn, parseInt(value, 10));
    setFromDatePickerOpen(false);
    setToDatePickerOpen(false);
  };

  let toDateClass = classNames.dateBtn;
  let toDateError = '';
  if (data.fromDate > data.toDate) {
    toDateClass += ` ${sharedStyles.errorField}`;
    toDateError = i18n.endDateEarlierThanStartDate;
  }

  let formatError = coreI18n.requiredField;
  if (data.format) {
    formatError = '';

    if (!isValidDateFormat(data.format)) {
      formatError = i18n.invalidDateFormat;
    }
  }

  return (
    <LocalizedDatePickerProvider>
      <div>
        <div className={classNames.dateRow}>
          <Button onClick={(): void => onBtnClick('fromDate')} variant="outlined" disableElevation className={classNames.dateBtn}>
            <span style={{ marginRight: 3 }}>{format(fromUnixTime(data.fromDate), C.DATE_FORMAT)}</span>
            <Event />
          </Button>
          <ArrowRightAlt />
          <ErrorTooltip title={toDateError} arrow disableHoverListener={!toDateError} disableFocusListener={!toDateError}>
            <Button onClick={(): void => onBtnClick('toDate')} variant="outlined" disableElevation className={toDateClass}>
              <span style={{ marginRight: 3 }}>{format(fromUnixTime(data.toDate), C.DATE_FORMAT)}</span>
              <Event />
            </Button>
          </ErrorTooltip>
        </div>
        <div>
          <span className={classNames.formatCodeLabel}>{i18n.formatCode}</span>
          <TextField
            error={formatError}
            value={data.format}
            style={{ width: 140 }}
            onChange={(e: any): void => onChange('format', e.target.value)}
          />
        </div>
        <div style={{ display: 'none' }}>
          <LocalizedDatePicker
            autoOk
            open={fromDatePickerOpen}
            className={classNames.dateField}
            value={fromUnixTime(data.fromDate)}
            onChange={(val: any): void => onSelectDate(selectedDatePicker, format(val, 't'))}
            onClose={(): void => setFromDatePickerOpen(false)}
          />
          <LocalizedDatePicker
            autoOk
            open={toDatePickerOpen}
            className={classNames.dateField}
            value={fromUnixTime(data.toDate)}
            onChange={(val: any): void => onSelectDate(selectedDatePicker, format(val, 't'))}
            onClose={(): void => setToDatePickerOpen(false)}
          />
        </div>
      </div>
    </LocalizedDatePickerProvider>
  );
};

const Copy = ({ content, tooltip, message }: any) => {
  const classNames = useClasses();
  return (
    <span className={classNames.copy}>
      <CopyToClipboard content={content} message={message} tooltip={tooltip} />
    </span>
  );
};

const generateRows = (letters: string[], i18n: any, coreI18n: any) => {
  const classNames = useClasses();
  const sharedStyles = useSharedClasses();

  return letters.map((letter: string) => (
    <div className={classNames.row} key={letter}>
      <div className={classNames.col1}>
        <label>{letter}</label>
      </div>
      <div className={sharedStyles.copyCol}>
        <Copy content={letter} message={coreI18n.copiedToClipboard} tooltip={coreI18n.copyToClipboard} />
      </div>
      <div className={classNames.col2}>{i18n[`${letter}Format`]}</div>
      <div className={classNames.col3}>{i18n[`${letter}FormatExample`]}</div>
    </div>
  ));
};

export const Help = ({ coreI18n, i18n }: DTHelpProps) => (
  <>
    <p dangerouslySetInnerHTML={{ __html: i18n.helpIntro }} />

    <h3>{i18n.day}</h3>
    {generateRows(['d', 'do', 'E', 'EEEE', 'EEEEE', 'EEEEEE', 'D'], i18n, coreI18n)}

    <h3>{i18n.week}</h3>
    {generateRows(['l'], i18n, coreI18n)}

    <h3>{i18n.month}</h3>
    {generateRows(['M', 'Mo', 'MMM', 'MMMM'], i18n, coreI18n)}

    <h3>{i18n.year}</h3>
    {generateRows(['Y'], i18n, coreI18n)}
  </>
);
