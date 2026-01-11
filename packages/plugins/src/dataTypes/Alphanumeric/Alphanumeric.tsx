import { CopyToClipboard, Dropdown, TextField, useSharedClasses } from '@generatedata/core';
import { DTExampleProps, DTHelpProps, DTMetadata, DTOptionsProps } from '../../';
import { AlphanumericState, GenerationOptionsType } from './Alphanumeric.state';
import { useClasses } from './Alphanumeric.styles';

const Copy = ({ content, tooltip, message }: any) => {
  const classNames = useClasses();
  return (
    <span className={classNames.copy}>
      <CopyToClipboard content={content} message={message} tooltip={tooltip} />
    </span>
  );
};

export const Example = ({ i18n, data, onUpdate }: DTExampleProps) => {
  const onChange = (value: any): void => {
    onUpdate({
      example: value,
      value: value
    });
  };

  const options = [
    { value: 'LxL xLx', label: `V6M 4C1 ${i18n.exampleCanPostalCode}` },
    { value: 'xxxxx', label: `90210 ${i18n.exampleUSZipCode}` },
    { value: 'LLLxxLLLxLL', label: `eZg29gdF5K1 ${i18n.examplePassword}` }
  ];

  return <Dropdown value={data.example} onChange={(i: any): void => onChange(i.value)} options={options} />;
};

export const Options = ({ coreI18n, data, onUpdate, throttle = true }: DTOptionsProps) => {
  const titleColError = data.value.trim() === '' ? coreI18n.requiredField : '';

  return (
    <TextField
      error={titleColError}
      value={data.value}
      onChange={(e: any): void => onUpdate({ ...data, value: e.target.value })}
      style={{ width: '100%' }}
      throttle={throttle}
    />
  );
};

export const Help = ({ coreI18n, i18n }: DTHelpProps) => {
  const sharedClasses = useSharedClasses();
  const classNames = useClasses();

  return (
    <>
      <p>{i18n.helpIntro}</p>

      <div className={classNames.row}>
        <div className={classNames.col1}>
          <label className={sharedClasses.pill}>L</label>
        </div>
        <div className={sharedClasses.copyCol}>
          <Copy content="L" message={coreI18n.copiedToClipboard} tooltip={coreI18n.copyToClipboard} />
        </div>
        <div className={classNames.col2} dangerouslySetInnerHTML={{ __html: i18n.help1 }} />
        <div className={classNames.col3}>
          <label className={sharedClasses.pill}>V</label>
        </div>
        <div className={sharedClasses.copyCol}>
          <Copy content="V" message={coreI18n.copiedToClipboard} tooltip={coreI18n.copyToClipboard} />
        </div>
        <div className={classNames.col4} dangerouslySetInnerHTML={{ __html: i18n.help2 }} />
      </div>
      <div className={classNames.row}>
        <div className={classNames.col1}>
          <label className={sharedClasses.pill}>l</label>
        </div>
        <div className={sharedClasses.copyCol}>
          <Copy content="l" message={coreI18n.copiedToClipboard} tooltip={coreI18n.copyToClipboard} />
        </div>
        <div className={classNames.col2} dangerouslySetInnerHTML={{ __html: i18n.help3 }} />
        <div className={classNames.col3}>
          <label className={sharedClasses.pill}>v</label>
        </div>
        <div className={sharedClasses.copyCol}>
          <Copy content="v" message={coreI18n.copiedToClipboard} tooltip={coreI18n.copyToClipboard} />
        </div>
        <div className={classNames.col4} dangerouslySetInnerHTML={{ __html: i18n.help4 }} />
      </div>
      <div className={classNames.row}>
        <div className={classNames.col1}>
          <label className={sharedClasses.pill}>D</label>
        </div>
        <div className={sharedClasses.copyCol}>
          <Copy content="D" message={coreI18n.copiedToClipboard} tooltip={coreI18n.copyToClipboard} />
        </div>
        <div className={classNames.col2} dangerouslySetInnerHTML={{ __html: i18n.help5 }} />
        <div className={classNames.col3}>
          <label className={sharedClasses.pill}>F</label>
        </div>
        <div className={sharedClasses.copyCol}>
          <Copy content="F" message={coreI18n.copiedToClipboard} tooltip={coreI18n.copyToClipboard} />
        </div>
        <div className={classNames.col4} dangerouslySetInnerHTML={{ __html: i18n.help6 }} />
      </div>
      <div className={classNames.row}>
        <div className={classNames.col1}>
          <label className={sharedClasses.pill}>C</label>
        </div>
        <div className={sharedClasses.copyCol}>
          <Copy content="C" message={coreI18n.copiedToClipboard} tooltip={coreI18n.copyToClipboard} />
        </div>
        <div className={classNames.col2} dangerouslySetInnerHTML={{ __html: i18n.help7 }} />
        <div className={classNames.col3}>
          <label className={sharedClasses.pill}>x</label>
        </div>
        <div className={sharedClasses.copyCol}>
          <Copy content="x" message={coreI18n.copiedToClipboard} tooltip={coreI18n.copyToClipboard} />
        </div>
        <div className={classNames.col4} dangerouslySetInnerHTML={{ __html: i18n.help8 }} />
      </div>
      <div className={classNames.row}>
        <div className={classNames.col1}>
          <label className={sharedClasses.pill}>c</label>
        </div>
        <div className={sharedClasses.copyCol}>
          <Copy content="c" message={coreI18n.copiedToClipboard} tooltip={coreI18n.copyToClipboard} />
        </div>
        <div className={classNames.col2} dangerouslySetInnerHTML={{ __html: i18n.help9 }} />
        <div className={classNames.col3}>
          <label className={sharedClasses.pill}>X</label>
        </div>
        <div className={sharedClasses.copyCol}>
          <Copy content="X" message={coreI18n.copiedToClipboard} tooltip={coreI18n.copyToClipboard} />
        </div>
        <div className={classNames.col4} dangerouslySetInnerHTML={{ __html: i18n.help10 }} />
      </div>
      <div className={classNames.row}>
        <div className={classNames.col1}>
          <label className={sharedClasses.pill}>E</label>
        </div>
        <div className={sharedClasses.copyCol}>
          <Copy content="E" message={coreI18n.copiedToClipboard} tooltip={coreI18n.copyToClipboard} />
        </div>
        <div className={classNames.col2} dangerouslySetInnerHTML={{ __html: i18n.help11 }} />
        <div className={classNames.col3}>
          <label className={sharedClasses.pill}>H</label>
        </div>
        <div className={sharedClasses.copyCol}>
          <Copy content="H" message={coreI18n.copiedToClipboard} tooltip={coreI18n.copyToClipboard} />
        </div>
        <div className={classNames.col4} dangerouslySetInnerHTML={{ __html: i18n.help12 }} />
      </div>
    </>
  );
};

export const rowStateReducer = (state: AlphanumericState): GenerationOptionsType => ({ value: state.value });

export const getMetadata = (): DTMetadata => ({
  sql: {
    field: 'varchar(255)',
    field_Oracle: 'varchar2(255)',
    field_MSSQL: 'VARCHAR(255) NULL'
  },
  general: {
    dataType: 'infer'
  }
});
