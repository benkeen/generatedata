import { RadioPill, RadioPillRow, useETStyles } from '@generatedata/shared';
import type { ETDownloadPacket, ETDownloadPacketResponse, ETSettings } from '~types/exportTypes';
import { ExportFormat } from './HTML.state';

export const Settings = ({ i18n, id, data, onUpdate }: ETSettings) => {
  const classNames = useETStyles();
  const onChange = (exportFormat: ExportFormat): void => {
    onUpdate({
      ...data,
      exportFormat
    });
  };

  return (
    <div className={classNames.settingRow}>
      <label>{i18n.dataFormat}</label>
      <RadioPillRow>
        <RadioPill
          label="table"
          onClick={(): void => onChange('table')}
          name={`${id}-dataFormat`}
          checked={data.exportFormat === 'table'}
        />
        <RadioPill label="ul" onClick={(): void => onChange('ul')} name={`${id}-dataFormat`} checked={data.exportFormat === 'ul'} />
        <RadioPill label="dl" onClick={(): void => onChange('dl')} name={`${id}-dataFormat`} checked={data.exportFormat === 'dl'} />
      </RadioPillRow>
    </div>
  );
};

export const getCodeMirrorMode = (): string => 'text/html';

export const getDownloadFileInfo = ({ packetId }: ETDownloadPacket): ETDownloadPacketResponse => ({
  filename: `data-${packetId}.html`,
  fileType: 'text/html'
});
