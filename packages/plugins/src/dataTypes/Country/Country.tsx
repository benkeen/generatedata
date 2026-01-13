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
import * as React from 'react';
import { countryList, CountryType, DTHelpProps, DTMetadata, DTOptionsProps } from '../../';
import { CountrySource } from './Country.state';
import { useClasses } from './Country.styles';
import fullCountryList from './fullCountryList';

const fullCountryListOptions = fullCountryList.map((countryName) => ({
  value: countryName,
  label: countryName
}));

const CountryDialog = ({ visible, data, id, onClose, countryI18n, onUpdateSource, onUpdateSelectedCountries, coreI18n, i18n }: any) => {
  const countryPluginOptions = countryList.map((countryName: CountryType) => ({
    value: countryName,
    label: countryI18n[countryName]?.countryName // `?` is for testing right now
  }));

  const onSelectCountries = (countries: any): void => {
    onUpdateSelectedCountries(countries ? countries.map(({ value }: DropdownOption) => value) : []);
  };

  return (
    <Dialog onClose={onClose} open={visible}>
      <div style={{ width: 500 }}>
        <DialogTitle onClose={onClose}>{i18n.selectCountries}</DialogTitle>
        <DialogContent dividers>
          <div>{i18n.explanation}</div>

          <h3>{i18n.source}</h3>

          <RadioPillRow>
            <RadioPill
              label={`${i18n.countryPlugins} (${countryList.length})`}
              onClick={(): void => onUpdateSource('plugins')}
              name={`${id}-source`}
              checked={data.source === 'plugins'}
              tooltip={i18n.countryPluginsDesc}
            />
            <RadioPill
              label={`${i18n.allCountries} (${fullCountryList.length})`}
              onClick={(): void => onUpdateSource('all')}
              name={`${id}-source`}
              checked={data.source === 'all'}
            />
          </RadioPillRow>

          <h3>{i18n.filter}</h3>
          <p>{i18n.filterDesc}</p>

          <Dropdown
            isMulti
            closeMenuOnSelect={false}
            isClearable={true}
            value={data.selectedCountries}
            onChange={onSelectCountries}
            options={data.source === 'all' ? fullCountryListOptions : countryPluginOptions}
          />
        </DialogContent>
        <DialogActions>
          <PrimaryButton onClick={onClose}>{coreI18n.close}</PrimaryButton>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export const Options = ({ i18n, coreI18n, countryI18n, id, data, onUpdate }: DTOptionsProps) => {
  const [dialogVisible, setDialogVisibility] = React.useState(false);
  const numSelected = data.selectedCountries.length;
  const classNames = useClasses();

  const onUpdateSource = (source: CountrySource): void => {
    onUpdate({
      source,
      selectedCountries: []
    });
  };

  const onUpdateSelectedCountries = (selectedCountries: string[]): void => {
    onUpdate({
      ...data,
      selectedCountries
    });
  };

  let label = '';
  if (data.source === 'all') {
    if (data.selectedCountries.length) {
      label = `<b>${numSelected}</b> ` + (numSelected === 1 ? i18n.country : i18n.countries);
    } else {
      label = i18n.allCountries;
    }
  } else {
    if (data.selectedCountries.length) {
      label = `<b>${numSelected}</b> ` + (numSelected === 1 ? i18n.countryPlugin : i18n.countryPlugins);
    } else {
      label = i18n.allCountryPlugins;
    }
  }

  return (
    <div className={classNames.buttonLabel}>
      <PrimaryButton onClick={(): void => setDialogVisibility(true)} size="small">
        <span dangerouslySetInnerHTML={{ __html: label }} />
      </PrimaryButton>
      <CountryDialog
        visible={dialogVisible}
        data={data}
        id={id}
        coreI18n={coreI18n}
        i18n={i18n}
        countryI18n={countryI18n}
        onUpdateSource={onUpdateSource}
        onUpdateSelectedCountries={onUpdateSelectedCountries}
        onClose={(): void => setDialogVisibility(false)}
      />
    </div>
  );
};

export const Help = ({}: DTHelpProps) => <div />;

export const getMetadata = (): DTMetadata => ({
  general: {
    dataType: 'string'
  },
  sql: {
    field: 'varchar(100) default NULL',
    field_Oracle: 'varchar2(100) default NULL',
    field_MSSQL: 'VARCHAR(100) NULL'
  }
});
