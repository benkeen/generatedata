import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dropdown,
  PrimaryButton,
  RadioPill,
  RadioPillRow,
  type DropdownOption
} from '@generatedata/shared';
import { removeItem } from '@generatedata/utils/array';
import { getI18nString } from '@generatedata/utils/lang';
import * as React from 'react';
import { countryList, DTHelpProps, DTMetadata, DTOptionsProps } from '../../';
import { RegionFormat, RegionSource } from './Region.state';
import { useClasses } from './Region.styles';

const RegionDialog = ({ visible, data, id, onClose, onSetFormats, countryI18n, coreI18n, i18n, onUpdate, countryRows }: any) => {
  const countryPluginRows = countryRows.map(({ index, id, title }: any) => ({ value: id, label: `${i18n.row} #${index + 1}: ${title}` }));

  const countryPluginRowsExist = countryPluginRows.length > 0;

  const onUpdateSource = (source: RegionSource): void => {
    const newValues = {
      ...data,
      source
    };

    // always autoselect the first Country row when switching to `Country Row` as the source
    if (source === 'countryRow') {
      newValues.targetRowId = countryPluginRows[0].value;
    }
    onUpdate(newValues);
  };

  const onChangeTargetRow = (row: DropdownOption): void => {
    onUpdate({
      ...data,
      targetRowId: row.value
    });
  };

  const onSelectCountries = (countries: any): void => {
    onUpdate({
      ...data,
      selectedCountries: countries ? countries.map(({ value }: DropdownOption) => value) : []
    });
  };

  const getCountryRow = (): React.ReactNode => {
    if (data.source !== 'countryRow') {
      return null;
    }

    return <Dropdown value={data.targetRowId} onChange={onChangeTargetRow} options={countryPluginRows} />;
  };

  const getCountryPluginsList = (): React.ReactNode => {
    if (data.source !== 'countries') {
      return null;
    }
    const countryPluginOptions = countryList.map((countryName) => ({
      value: countryName,
      label: countryI18n[countryName].countryName
    }));

    return (
      <Dropdown
        isMulti
        closeMenuOnSelect={false}
        isClearable={true}
        value={data.selectedCountries}
        onChange={onSelectCountries}
        options={countryPluginOptions}
      />
    );
  };

  return (
    <Dialog onClose={onClose} open={visible}>
      <div style={{ maxWidth: 500 }}>
        <DialogTitle onClose={onClose}>{i18n.selectRegions}</DialogTitle>
        <DialogContent dividers>
          <div>{i18n.explanation}</div>

          <h3>{i18n.source}</h3>

          <RadioPillRow>
            <RadioPill
              label={i18n.anyRegion}
              onClick={(): void => onUpdateSource('anyRegion')}
              name={`${id}-source`}
              checked={data.source === 'anyRegion'}
              tooltip={i18n.anyDesc}
            />
            <RadioPill
              label={i18n.countries}
              onClick={(): void => onUpdateSource('countries')}
              name={`${id}-source`}
              checked={data.source === 'countries'}
              tooltip={i18n.countriesDesc}
            />
            <RadioPill
              label={i18n.countryRow}
              onClick={(): void => onUpdateSource('countryRow')}
              name={`${id}-source`}
              checked={data.source === 'countryRow'}
              tooltip={i18n.rowDesc}
              disabled={!countryPluginRowsExist}
            />
          </RadioPillRow>

          {getCountryRow()}
          {getCountryPluginsList()}

          <h3>{i18n.format}</h3>

          <p>
            <input
              type="checkbox"
              value="full"
              id={`${id}-full`}
              checked={data.formats.indexOf('full') !== -1}
              onChange={(e): void => onSetFormats('full', e.target.checked)}
            />
            <label htmlFor={`${id}-full`}>{i18n.full}</label>
            <input
              type="checkbox"
              value="short"
              id={`${id}-short`}
              checked={data.formats.indexOf('short') !== -1}
              onChange={(e): void => onSetFormats('short', e.target.checked)}
            />
            <label htmlFor={`${id}-short`}>{i18n.short}</label>
          </p>
        </DialogContent>
        <DialogActions>
          <PrimaryButton onClick={onClose}>{coreI18n.close}</PrimaryButton>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export const Options = ({ id, data, coreI18n, i18n, countryI18n, onUpdate, countryRows }: DTOptionsProps) => {
  const [dialogVisible, setDialogVisibility] = React.useState(false);
  const classNames = useClasses();
  const numSelected = data.selectedCountries.length;

  const onSetFormats = (field: RegionFormat, checked: boolean): void => {
    let formats = [...data.formats];

    if (checked) {
      formats.push(field);
    } else {
      formats = removeItem(formats, field);
    }

    onUpdate({
      ...data,
      formats
    });
  };

  let label = '';
  if (data.source === 'anyRegion') {
    label = i18n.anyRegion;
  } else if (data.source === 'countries') {
    if (numSelected === 1) {
      label = i18n.anyRegionFromCountry;
    } else {
      label = getI18nString(i18n.anyRegionFromCountries, [numSelected]);
    }
  } else if (data.source === 'countryRow') {
    const row = countryRows.find((row: any) => row.id === data.targetRowId);
    const rowNum = row.index + 1;
    label = `${i18n.countryRow} #${rowNum}`;
  }

  return (
    <div className={classNames.buttonLabel}>
      <PrimaryButton onClick={(): void => setDialogVisibility(true)} size="small">
        <span dangerouslySetInnerHTML={{ __html: label }} />
      </PrimaryButton>
      <RegionDialog
        visible={dialogVisible}
        data={data}
        countryRows={countryRows}
        id={id}
        coreI18n={coreI18n}
        i18n={i18n}
        countryI18n={countryI18n}
        onUpdate={onUpdate}
        onSetFormats={onSetFormats}
        onClose={(): void => setDialogVisibility(false)}
      />
    </div>
  );
};

export const Help = ({ i18n }: DTHelpProps) => (
  <p>
    {i18n.DESC} <span dangerouslySetInnerHTML={{ __html: i18n.help_text }} />
  </p>
);

export const getMetadata = (): DTMetadata => ({
  sql: {
    field: 'varchar(50) default NULL',
    field_Oracle: 'varchar2(50) default NULL',
    field_MSSQL: 'VARCHAR(50) NULL'
  }
});
