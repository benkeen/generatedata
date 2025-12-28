import { Dialog, DialogActions, DialogContent, DialogTitle, Dropdown, PrimaryButton, TextField } from '@generatedata/core';
import ArrowRightAlt from '@mui/icons-material/ArrowRightAlt';
import * as React from 'react';
import { DTHelpProps, DTMetadata, DTOptionsProps } from '../../';
import { PrefixLocationEnum } from './Currency.state';
import { useClasses } from './Currency.styles';

export const Example = ({ i18n, data, onUpdate }: any) => {
  const onChange = (i: any): void => {
    const [from, to, currencySymbol, currencySymbolLocation, includeCents, thousandsSeparator, centsSeparator] = i.value.split('|');

    onUpdate({
      example: i.value,
      from,
      to,
      currencySymbol,
      currencySymbolLocation,
      includeCents: includeCents === 'true',
      thousandsSeparator,
      centsSeparator
    });
  };

  const examples = [
    {
      label: 'US/Canada',
      options: [
        { value: '0.00|100.00|$|prefix|true|,|.', label: '$0.00 -> $100.00' },
        { value: '5000|10000|$|prefix||,|.', label: `$5,000 -> $10,000 (${i18n.noCents})` },
        { value: '1000.00|10000.00|$|prefix|true||.', label: `$1000.00 -> $10000.00 (${i18n.noThousandDelimiters})` },
        { value: '-100000.00|100000.00|$|prefix|true|,|.', label: '-$100,000.00 -> $100,000.00' },
        { value: '0.01|1.00||prefix|true|,|.', label: `0.01 -> 1.00 (${i18n.noDollarSign})` },
        { value: '100.00|1000.00| $|suffix|true|.|,', label: '100,00 $ -> 1.000,00 $ (French Canadian)' },
        { value: '10|100000||prefix|| |.', label: '10 -> 100 000' }
      ]
    },
    {
      label: 'UK',
      options: [
        { value: '0.00|100.00|£|prefix|true|,|.', label: '£0.00 -> £100.00' },
        { value: '-100000.00|100000.00|£|prefix|true|,|.', label: '-£100.000.00 -> £100,000.00' }
      ]
    },
    {
      label: 'Euro',
      options: [{ value: '100000|200000|€|prefix||,|', label: '€100,000 -> €200,000' }]
    }
  ];

  return <Dropdown isGrouped={true} value={data.example} onChange={onChange} options={examples} />;
};

const CurrencySettingsDialog = ({ id, visible, data, onUpdate, onClose, coreI18n, i18n }: any) => {
  const classNames = useClasses();
  const onChange = (field: string, value: any): void => {
    onUpdate({
      ...data,
      [field]: value
    });
  };

  return (
    <Dialog onClose={onClose} open={visible}>
      <div style={{ width: 500 }}>
        <DialogTitle onClose={onClose}>Currency Settings</DialogTitle>
        <DialogContent dividers>
          <div style={{ marginBottom: 20 }}>
            <h3>{coreI18n.example}</h3>
            <Example i18n={i18n} data={data} onUpdate={onUpdate} />
          </div>

          <h3>{coreI18n.settings}</h3>

          <div className={classNames.row}>
            <div className={classNames.col1}>{i18n.currencySymbol}</div>
            <div className={`${classNames.col2} ${classNames.currencyLine}`}>
              <TextField
                value={data.currencySymbol}
                style={{ width: 30 }}
                onChange={(e: any): void => onChange('currencySymbol', e.target.value)}
              />
              <input
                type="radio"
                checked={data.currencySymbolLocation === PrefixLocationEnum.prefix}
                name={`${id}-currencySymbolLocation`}
                id={`${id}-currencySymbolLocation1`}
                onChange={(): void => onChange('currencySymbolLocation', PrefixLocationEnum.prefix)}
              />
              <label htmlFor={`${id}-currencySymbolLocation1`}>Prefix</label>
              <input
                type="radio"
                checked={data.currencySymbolLocation === PrefixLocationEnum.suffix}
                name={`${id}-currencySymbolLocation`}
                id={`${id}-currencySymbolLocation2`}
                onChange={(): void => onChange('currencySymbolLocation', PrefixLocationEnum.suffix)}
              />
              <label htmlFor={`${id}-currencySymbolLocation2`}>Suffix</label>
            </div>
          </div>
          <div className={classNames.row}>
            <div className={classNames.col1}>Separators</div>
            <div className={`${classNames.col2} ${classNames.separatorLine}`}>
              {i18n.thousands}
              <TextField
                value={data.thousandsSeparator}
                onChange={(e: any): void => onChange('thousandsSeparator', e.target.value)}
                style={{ width: 30, marginRight: 20 }}
              />

              {i18n.cents}
              <TextField
                value={data.centsSeparator}
                onChange={(e: any): void => onChange('centsSeparator', e.target.value)}
                style={{ width: 30 }}
              />
            </div>
          </div>
          <div className={classNames.row}>
            <div className={classNames.col1}>
              <input
                type="checkbox"
                id={`${id}-includeCents`}
                checked={data.includeCents}
                onChange={(e: any): void => onChange('includeCents', e.target.checked)}
              />
              <label htmlFor={`${id}-includeCents`}>{i18n.includeCents}</label>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <PrimaryButton onClick={onClose}>{coreI18n.close}</PrimaryButton>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export const Options = ({ i18n, coreI18n, id, data, onUpdate }: DTOptionsProps) => {
  const [dialogVisible, setDialogVisibility] = React.useState(false);

  const onChange = (field: string, value: any): void => {
    onUpdate({
      ...data,
      [field]: value
    });
  };

  const step = data.includeCents ? 0.01 : 1;

  return (
    <>
      <TextField
        type="number"
        value={data.from}
        style={{ width: 80 }}
        step={step}
        onChange={(e: any): void => onChange('from', parseFloat(e.target.value).toFixed(2))}
      />
      <ArrowRightAlt style={{ marginBottom: -4 }} />
      <TextField
        type="number"
        value={data.to}
        style={{ width: 80, marginRight: 2 }}
        step={step}
        onChange={(e: any): void => onChange('to', parseFloat(e.target.value).toFixed(2))}
      />
      <PrimaryButton onClick={(): void => setDialogVisibility(true)} size="small">
        {coreI18n.settings}
      </PrimaryButton>

      <CurrencySettingsDialog
        visible={dialogVisible}
        data={data}
        id={id}
        onUpdate={onUpdate}
        i18n={i18n}
        coreI18n={coreI18n}
        onClose={(): void => setDialogVisibility(false)}
      />
    </>
  );
};

export const Help = ({ i18n }: DTHelpProps) => {
  const classNames = useClasses();

  return (
    <div className={classNames.helpDialog}>
      <p>{i18n.helpIntro}</p>

      <div className={classNames.row}>
        <div className={classNames.col1}>
          <label>{i18n.rangeFrom}</label>
        </div>
        <div className={classNames.col2}>{i18n.rangeFromDesc}</div>
      </div>
      <div className={classNames.row}>
        <div className={classNames.col1}>
          <label>{i18n.rangeTo}</label>
        </div>
        <div className={classNames.col2}>{i18n.rangeToDesc}</div>
      </div>
      <div className={classNames.row}>
        <div className={classNames.col1}>
          <label>{i18n.currencySymbol}</label>
        </div>
        <div className={classNames.col2} dangerouslySetInnerHTML={{ __html: i18n.currencySymbolDesc }} />
      </div>
      <div className={classNames.row}>
        <div className={classNames.col1}>
          <label>{i18n.prefixSuffix}</label>
        </div>
        <div className={classNames.col2}>{i18n.prefixSuffixDesc}</div>
      </div>
      <div className={classNames.row}>
        <div className={classNames.col1}>
          <label>{i18n.separators}</label>
        </div>
        <div className={classNames.col2}>{i18n.separatorsDesc}</div>
      </div>
    </div>
  );
};

export const getMetadata = (): DTMetadata => ({
  sql: {
    field: 'varchar(100) default NULL',
    field_Oracle: 'varchar2(100) default NULL',
    field_MSSQL: 'VARCHAR(100) NULL'
  }
});
