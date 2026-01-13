import { RadioPill, RadioPillRow, useETStyles } from '@generatedata/shared';
import type { ETDownloadPacket, ETDownloadPacketResponse, ETSettings } from '~typings/exportTypes';

export const Settings = ({ i18n, id, data, onUpdate }: ETSettings) => {
  const classNames = useETStyles();
  const onChange = (prop: string, value: any): void => {
    onUpdate({
      ...data,
      [prop]: value
    });
  };

  return (
    <div className={classNames.settingRow}>
      <label>{i18n.format}</label>
      <RadioPillRow>
        <RadioPill
          label={i18n.variable}
          onClick={(): void => onChange('jsExportFormat', 'variable')}
          name={`${id}-js-export-format`}
          checked={data.jsExportFormat === 'variable'}
        />
        <RadioPill
          label={i18n.es6Format}
          onClick={(): void => onChange('jsExportFormat', 'es6')}
          name={`${id}-js-export-format`}
          checked={data.jsExportFormat === 'es6'}
        />
        <RadioPill
          label={i18n.commonJsFormat}
          onClick={(): void => onChange('jsExportFormat', 'commonJs')}
          name={`${id}-js-export-format`}
          checked={data.jsExportFormat === 'commonJs'}
        />
      </RadioPillRow>
    </div>
  );
};

export const getCodeMirrorMode = (): string => 'text/javascript';

export const getDownloadFileInfo = ({ packetId }: ETDownloadPacket): ETDownloadPacketResponse => {
  return {
    filename: `data-${packetId}.js}`,
    fileType: ''
  };
};
