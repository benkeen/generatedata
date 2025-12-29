import { CopyToClipboard, TextField as CoreTextField, Dropdown, ErrorTooltip, useSharedClasses } from '@generatedata/core';
import ArrowRightAlt from '@mui/icons-material/ArrowRightAlt';
import TextField from '@mui/material/TextField';
import { format, fromUnixTime, parse } from 'date-fns';
import { DTExampleProps, DTHelpProps, DTMetadata, DTOptionsProps } from '../../';
import { DateState, GenerationOptionsType } from './Time.state';
import { useClasses } from './Time.styles';

const SECS_IN_DAY = 86400;
export const rowStateReducer = ({ fromTime, toTime, format }: DateState): GenerationOptionsType => ({
  fromTime,
  toTime: fromTime > toTime ? toTime + SECS_IN_DAY : toTime,
  format
});

export const getMetadata = (): DTMetadata => ({
  general: {
    dataType: 'string'
  },
  sql: {
    field: 'varchar(255)',
    field_Oracle: 'varchar2(255)',
    field_MSSQL: 'VARCHAR(255) NULL'
  }
});

export const getOptions = (): any[] => {
  const formats = [
    'h:mm aaa', // 3:35 pm
    'h:mm a', // 3:35 PM
    'h:mm aaaa', // 3:35 p.m.
    'h:mm:ss aaa', // 3:35:00 pm
    'h:mm:ss aa', // 3:35:00 PM
    'h:mm:ss aaaa', // 3:35:00 P.M.
    'H:mm', // 15:35
    'H:mm:ss' // 15:35:00
  ];

  return formats.map((currFormat) => ({
    label: format(new Date(), currFormat),
    value: currFormat
  }));
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

export const Options = ({ data, onUpdate, i18n, coreI18n }: DTOptionsProps) => {
  const classNames = useClasses();
  const onChange = (field: string, value: any): void => {
    onUpdate({
      ...data,
      [field]: value
    });
  };

  let toTimeError = '';
  if (data.fromTime > data.toTime) {
    toTimeError = i18n.endDateEarlierThanStartDate;
  }

  return (
    <div>
      <div className={classNames.dateRow}>
        <TextField
          type="time"
          defaultValue={format(fromUnixTime(data.fromTime), 'HH:mm')}
          className={classNames.field}
          variant="standard"
          InputLabelProps={{
            shrink: true
          }}
          slotProps={{
            htmlInput: {
              step: 60
            }
          }}
          onChange={(e: any): void => {
            const date = parse(e.target.value, 'HH:mm', new Date());
            onChange('fromTime', parseInt(format(date, 't'), 10));
          }}
        />
        <ArrowRightAlt />
        <ErrorTooltip title={toTimeError} arrow disableHoverListener={!toTimeError} disableFocusListener={!toTimeError}>
          <TextField
            type="time"
            defaultValue={format(fromUnixTime(data.toTime), 'H:mm')}
            className={classNames.field}
            variant="standard"
            InputLabelProps={{
              shrink: true
            }}
            slotProps={{
              htmlInput: {
                step: 60
              }
            }}
            onChange={(e: any): void => {
              const date = parse(e.target.value, 'HH:mm', new Date());
              onChange('toTime', parseInt(format(date, 't'), 10));
            }}
          />
        </ErrorTooltip>
      </div>
      <div>
        <span className={classNames.formatCodeLabel}>{i18n.formatCode}</span>
        <CoreTextField
          error={data.format ? '' : coreI18n.requiredField}
          value={data.format}
          style={{ width: 140 }}
          onChange={(e: any): void => onChange('format', e.target.value)}
          maxLength={255}
        />
      </div>
    </div>
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
  const sharedClasses = useSharedClasses();
  const classNames = useClasses();

  return letters.map((letter: string) => (
    <div className={classNames.row} key={letter}>
      <div className={classNames.col1}>
        <label>{letter}</label>
      </div>
      <div className={sharedClasses.copyCol}>
        <Copy content={letter} message={coreI18n.copiedToClipboard} tooltip={coreI18n.copyToClipboard} />
      </div>
      <div className={classNames.col2}>{i18n[`${letter}Format`]}</div>
      <div className={classNames.col3}>{i18n[`${letter}FormatExample`]}</div>
    </div>
  ));
};

export const Help = ({ i18n, coreI18n }: DTHelpProps) => {
  return (
    <>
      <p dangerouslySetInnerHTML={{ __html: i18n.helpIntro }} />

      {generateRows(['h', 'H', 'mm', 'ss', 'a', 'aaa', 'aaaa'], i18n, coreI18n)}
    </>
  );
};
