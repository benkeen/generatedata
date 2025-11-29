import { Dialog, DialogActions, DialogContent, DialogTitle, Dropdown, type DropdownOption } from '@generatedata/core';
import Button from '@mui/material/Button';
import * as React from 'react';
import RadioPill, { RadioPillRow } from '~components/pills/RadioPill';
import { getI18nString } from '~utils/langUtils';
import { DTHelpProps, DTMetadata, DTOptionsProps } from '../../';
import { countryList } from '../../../../_plugins';
import styles from './City.scss';
import { RegionSource, RegionSourceEnum } from './City.state';

const CityDialog = ({ visible, data, id, onClose, countryI18n, coreI18n, i18n, onUpdate, regionRows }: any) => {
  const regionPluginRows = regionRows.map(({ index, id, title }: any) => ({
    value: id,
    label: `${i18n.row} #${index + 1}: ${title}`
  }));

  const regionPluginRowsExist = regionPluginRows.length > 0;

  const onUpdateSource = (source: RegionSource): void => {
    const newValues = {
      ...data,
      source
    };
    if (source === RegionSourceEnum.regionRow) {
      newValues.targetRowId = regionPluginRows[0].value;
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

  const getRegionRow = (): React.ReactNode => {
    if (data.source !== RegionSourceEnum.regionRow) {
      return null;
    }

    return <Dropdown value={data.targetRowId} onChange={onChangeTargetRow} options={regionPluginRows} />;
  };

  const getCountryPluginsList = (): React.ReactNode => {
    if (data.source !== RegionSourceEnum.countries) {
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
        <DialogTitle onClose={onClose}>{i18n.selectCities}</DialogTitle>
        <DialogContent dividers>
          <div>{i18n.explanation}</div>

          <h3>{i18n.source}</h3>

          <RadioPillRow>
            <RadioPill
              label={i18n.anyCity}
              onClick={(): void => onUpdateSource(RegionSourceEnum.any)}
              name={`${id}-source`}
              checked={data.source === RegionSourceEnum.any}
              tooltip={i18n.anyDesc}
            />
            <RadioPill
              label={i18n.countries}
              onClick={(): void => onUpdateSource(RegionSourceEnum.countries)}
              name={`${id}-source`}
              checked={data.source === RegionSourceEnum.countries}
              tooltip={i18n.countriesDesc}
            />
            <RadioPill
              label={i18n.regionRow}
              onClick={(): void => onUpdateSource(RegionSourceEnum.regionRow)}
              name={`${id}-source`}
              checked={data.source === RegionSourceEnum.regionRow}
              tooltip={i18n.rowDesc}
              disabled={!regionPluginRowsExist}
            />
          </RadioPillRow>

          {getRegionRow()}
          {getCountryPluginsList()}
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

export const Options = ({ id, data, coreI18n, i18n, countryI18n, onUpdate, regionRows }: DTOptionsProps) => {
  const [dialogVisible, setDialogVisibility] = React.useState(false);
  const numSelected = data.selectedCountries.length;

  let label = '';
  if (data.source === RegionSourceEnum.any) {
    label = i18n.anyCity;
  } else if (data.source === RegionSourceEnum.countries) {
    if (numSelected === 1) {
      label = i18n.anyCityFrom1Country;
    } else {
      label = getI18nString(i18n.anyCityFromNCountries, [`<b>${numSelected}</b>`]);
    }
  } else if (data.source === RegionSourceEnum.regionRow) {
    const row = regionRows.find((row: any) => row.id === data.targetRowId);
    const rowNum = row.index + 1;
    label = `${i18n.regionRow} #${rowNum}`;
  }

  return (
    <div className={styles.buttonLabel}>
      <Button onClick={(): void => setDialogVisibility(true)} variant="outlined" color="primary" size="small">
        <span dangerouslySetInnerHTML={{ __html: label }} />
      </Button>
      <CityDialog
        visible={dialogVisible}
        data={data}
        regionRows={regionRows}
        id={id}
        coreI18n={coreI18n}
        i18n={i18n}
        countryI18n={countryI18n}
        onUpdate={onUpdate}
        onClose={(): void => setDialogVisibility(false)}
      />
    </div>
  );
};

export const Help = ({ i18n }: DTHelpProps) => <p>{i18n.DESC}</p>;

export const getMetadata = (): DTMetadata => ({
  sql: {
    field: 'varchar(255)',
    field_Oracle: 'varchar2(255)',
    field_MSSQL: 'VARCHAR(255) NULL'
  }
});
