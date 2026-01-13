import { RadioPill, RadioPillRow, useETStyles } from '@generatedata/shared';
import type { ETDownloadPacket, ETDownloadPacketResponse, ETSettings } from '~typings/exportTypes';

export const Settings = ({ data, id, i18n, onUpdate }: ETSettings) => {
  const classNames = useETStyles();
  const onChange = (field: string, value: any): void => {
    onUpdate({
      ...data,
      [field]: value
    });
  };

  return (
    <div className={classNames.settingRow}>
      <label htmlFor={`${id}-simple`}>{i18n.dataStructureFormat}</label>

      <RadioPillRow>
        <RadioPill
          id={`${id}-simple`}
          label={i18n.simple}
          onClick={(): void => onChange('dataStructureFormat', 'simple')}
          name={`${id}-simple`}
          checked={data.dataStructureFormat === 'simple'}
        />
        <RadioPill
          label={i18n.complex}
          onClick={(): void => onChange('dataStructureFormat', 'complex')}
          name={`${id}-complex`}
          checked={data.dataStructureFormat === 'complex'}
        />
      </RadioPillRow>
    </div>
  );
};

export const getCodeMirrorMode = (): string => 'application/ld+json';

export const getDownloadFileInfo = ({ packetId }: ETDownloadPacket): ETDownloadPacketResponse => ({
  filename: `data-${packetId}.json`,
  fileType: 'application/json'
});
