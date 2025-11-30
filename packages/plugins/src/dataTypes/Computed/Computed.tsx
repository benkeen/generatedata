import { CopyToClipboard, useSharedClasses } from '@generatedata/core';
import { DTExampleProps, DTHelpProps, DTMetadata, DTOptionsProps } from '../../';
import { useClasses } from './Computed.styles';

const Copy = ({ content, message, tooltip }: any) => {
  const classNames = useClasses();
  return (
    <span className={classNames.copy}>
      <CopyToClipboard tooltip={tooltip} content={content} message={message} />
    </span>
  );
};

export const Example = ({ coreI18n }: DTExampleProps) => {
  const classNames = useSharedClasses();
  return <div className={classNames.emptyCol}>{coreI18n.seeHelpDialog}</div>;
};

export const Options = ({ data, onUpdate }: DTOptionsProps) => (
  <textarea onChange={(e): void => onUpdate({ value: e.target.value })} value={data.value} style={{ width: '100%' }} />
);

export const Help = ({ coreI18n, i18n }: DTHelpProps) => {
  const classNames = useClasses();

  return (
    <>
      <p>{i18n.DESC}</p>

      <div className={classNames.row}>
        <div className={classNames.col1}>
          <label>
            {'{{ROW1}}'}, {'{{ROW2}}'}, ...
          </label>
        </div>
        <div className={classNames.copyCol}>
          <Copy content="{{ROW1}}" message={coreI18n.copiedToClipboard} tooltip={coreI18n.copyToClipboard} />
        </div>
        <div className={classNames.col2}>{i18n.rowPlaceholder}</div>
      </div>
      <div className={classNames.row}>
        <div className={classNames.col1}>
          <label>{'{{ROWNUM}}'}</label>
        </div>
        <div className={classNames.copyCol}>
          <Copy content="{{ROWNUM}}" message={coreI18n.copiedToClipboard} tooltip={coreI18n.copyToClipboard} />
        </div>
        <div className={classNames.col2}>{i18n.rowNumPlaceholder}</div>
      </div>
      <div className={classNames.row}>
        <div className={classNames.col1}>
          <label>{'{{ROWDATA1}}'}, ...</label>
        </div>
        <div className={classNames.copyCol}>
          <Copy content="{{ROWDATA1}}" message={coreI18n.copiedToClipboard} tooltip={coreI18n.copyToClipboard} />
        </div>
        <div className={classNames.col2}>
          {i18n.additionalInfo}
          <ul>
            <li>
              <label>{'{{ROWDATA1.colIndex}}'}</label> - {i18n.colIndex}
            </li>
            <li>
              <label>{'{{ROWDATA1.id}}'}</label> - {i18n.randomUniqueId}
            </li>
            <li>
              <label>{'{{ROWDATA1.dataType}}'}</label> - {i18n.dataType}
            </li>
            <li>
              <label>{'{{ROWDATA1.data}}'}</label> - {i18n.generateDataObj}
            </li>
          </ul>

          {i18n.objExpl}
          <label>{'{{JSON.stringify(ROWDATA1)}}'}</label>
          <Copy content="{{JSON.stringify(ROWDATA1)}}" message={coreI18n.copiedToClipboard} tooltip={coreI18n.copyToClipboard} />
        </div>
      </div>

      <p dangerouslySetInnerHTML={{ __html: i18n.compositeHelp3 }} />

      <ul>
        <li dangerouslySetInnerHTML={{ __html: i18n.compositeHelp4 }} />
        <li>
          {i18n.compositeHelp5}
          <ul>
            <li>
              <b>{'{{ROW2-ROW1}}'}</b> - {i18n.compositeSubtraction}
            </li>
            <li>
              <b>{'{{ROW2*ROW1}}'}</b> - {i18n.compositeMultiplication}
            </li>
            <li>
              <b>{'{{ROW2/ROW1}}'}</b> - {i18n.compositeDivision}
            </li>
          </ul>
        </li>
        <li>
          {i18n.compositeHelp6}
          <b>{'{{ROW1 % 2 ? "even" : ROW2}}'}</b>
        </li>
      </ul>
    </>
  );
};

export const getMetadata = (): DTMetadata => ({
  sql: {
    field: 'TEXT default NULL',
    field_Oracle: 'BLOB default NULL',
    field_MSSQL: 'VARCHAR(MAX) NULL'
  }
});
