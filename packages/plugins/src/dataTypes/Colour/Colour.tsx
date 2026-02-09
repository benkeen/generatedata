import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dropdown,
  PrimaryButton,
  RadioPill,
  RadioPillRow,
  Tooltip,
  type DropdownOption
} from '@generatedata/shared';
import Slider from '@mui/material/Slider';
import rc from 'randomcolor';
import * as React from 'react';
import { DTExampleProps, DTHelpProps, DTMetadata, DTOptionsProps } from '../../';
import { ColourState, GenerationOptionsType } from './Colour.state';
import { useClasses } from './Colour.styles';

const getModalOptions = ({ i18n }: any): DropdownOption[] => [
  { value: 'any', label: i18n.anyColour },
  { value: 'blue', label: i18n.blues },
  { value: 'green', label: i18n.greens },
  { value: 'red', label: i18n.reds },
  { value: 'orange', label: i18n.oranges },
  { value: 'yellow', label: i18n.yellows },
  { value: 'purple', label: i18n.purples },
  { value: 'pink', label: i18n.pinks },
  { value: 'monochrome', label: i18n.monochromes }
];

export const Example = ({ i18n, data, onUpdate }: DTExampleProps) => {
  const onChange = (value: any): void => {
    onUpdate({
      example: value,
      value: value
    });
  };

  return <Dropdown value={data.example} onChange={(i: any): void => onChange(i.value)} options={getModalOptions({ i18n })} />;
};

const ColourDialog = ({ visible, data, id, onClose, coreI18n, onUpdate, i18n }: any) => {
  const [randomDemoColours, setRandomDemoColours] = React.useState<string[]>([]);
  const [counter, setCounter] = React.useState(0);
  const classNames = useClasses();

  React.useEffect(() => {
    setRandomDemoColours(
      rc({
        count: 30,
        hue: data.value,
        luminosity: data.luminosity,
        format: data.format,
        alpha: data.format === 'rgba' ? data.alpha : 1
      })
    );
  }, [data, counter]);

  const onChange = (prop: string, value: any): void => {
    onUpdate({
      ...data,
      [prop]: value
    });
  };

  return (
    <Dialog onClose={onClose} open={visible}>
      <div style={{ width: 500 }}>
        <DialogTitle onClose={onClose}>{i18n.configureColours}</DialogTitle>
        <DialogContent dividers>
          <table className={classNames.settings}>
            <tbody>
              <tr>
                <td className={classNames.labelCol}>{i18n.colour}</td>
                <td>
                  <Dropdown
                    value={data.value}
                    onChange={(i: any): void => onChange('value', i.value)}
                    options={getModalOptions({ i18n })}
                  />
                </td>
              </tr>
              <tr>
                <td className={classNames.labelCol}>{i18n.luminosity}</td>
                <td>
                  <RadioPillRow>
                    <RadioPill
                      label={i18n.any}
                      onClick={(): void => onChange('luminosity', 'any')}
                      name={`luminosity-${id}`}
                      checked={data.luminosity === 'any'}
                      style={{ marginRight: 6 }}
                    />
                    <RadioPill
                      label={i18n.bright}
                      onClick={(): void => onChange('luminosity', 'bright')}
                      name={`luminosity-${id}`}
                      checked={data.luminosity === 'bright'}
                      style={{ marginRight: 6 }}
                    />
                    <RadioPill
                      label={i18n.light}
                      onClick={(): void => onChange('luminosity', 'light')}
                      name={`luminosity-${id}`}
                      checked={data.luminosity === 'light'}
                      style={{ marginRight: 6 }}
                    />
                    <RadioPill
                      label={i18n.dark}
                      onClick={(): void => onChange('luminosity', 'dark')}
                      name={`luminosity-${id}`}
                      checked={data.luminosity === 'dark'}
                    />
                  </RadioPillRow>
                </td>
              </tr>
              <tr>
                <td className={classNames.labelCol}>{i18n.format}</td>
                <td>
                  <RadioPillRow>
                    <RadioPill
                      label="Hex"
                      onClick={(): void => onChange('format', 'hex')}
                      name={`format-${id}`}
                      checked={data.format === 'hex'}
                      style={{ marginRight: 6 }}
                    />
                    <RadioPill
                      label="rgb"
                      onClick={(): void => onChange('format', 'rgb')}
                      name={`format-${id}`}
                      checked={data.format === 'rgb'}
                      style={{ marginRight: 6 }}
                    />
                    <RadioPill
                      label="rbga"
                      onClick={(): void => onChange('format', 'rgba')}
                      name={`format-${id}`}
                      checked={data.format === 'rgba'}
                    />
                  </RadioPillRow>
                </td>
              </tr>
              <tr>
                <td className={classNames.labelCol}>{i18n.alpha}</td>
                <td>
                  <Slider
                    value={data.alpha}
                    onChange={(e: any, value): void => onChange('alpha', value)}
                    step={0.001}
                    min={0}
                    max={1}
                    valueLabelDisplay="auto"
                    disabled={data.format !== 'rgba'}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <ul className={classNames.demoColours}>
            {randomDemoColours.map((colour: string, index: number) => (
              <li key={`${colour}-${index}`}>
                <Tooltip title={colour}>
                  <span style={{ backgroundColor: colour }} />
                </Tooltip>
              </li>
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          <PrimaryButton onClick={(): void => setCounter(counter + 1)}>{i18n.refresh}</PrimaryButton>
          <PrimaryButton onClick={onClose}>{coreI18n.close}</PrimaryButton>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export const Options = ({ id, i18n, coreI18n, data, onUpdate }: DTOptionsProps) => {
  const [dialogVisible, setDialogVisibility] = React.useState(false);
  const classNames = useClasses();

  const options = getModalOptions({ i18n });
  let buttonLabel = '';

  options.forEach(({ value, label }) => {
    if (data.value === value) {
      buttonLabel = label;
    }
  });

  return (
    <div className={classNames.buttonLabel}>
      <PrimaryButton onClick={(): void => setDialogVisibility(true)} size="small">
        <span dangerouslySetInnerHTML={{ __html: buttonLabel }} />
      </PrimaryButton>
      <ColourDialog
        visible={dialogVisible}
        data={data}
        id={id}
        coreI18n={coreI18n}
        i18n={i18n}
        onClose={(): void => setDialogVisibility(false)}
        onUpdate={onUpdate}
      />
    </div>
  );
};

export const Help = ({ i18n }: DTHelpProps) => (
  <>
    <p>{i18n.helpDesc1}</p>
    <p>{i18n.helpDesc2}</p>
  </>
);

export const getMetadata = (): DTMetadata => ({
  general: {
    dataType: 'string'
  },
  sql: {
    field: 'string(12) default NULL',
    field_Oracle: 'varchar2(12) default NULL',
    field_MSSQL: 'VARCHAR(12) NULL'
  }
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const rowStateReducer = ({ example, ...other }: ColourState): GenerationOptionsType => other;
