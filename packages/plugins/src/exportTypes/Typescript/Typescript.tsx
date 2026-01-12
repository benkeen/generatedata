import { TextField } from '@generatedata/core';
import type { ETDownloadPacket, ETDownloadPacketResponse, ETSettings } from '~typings/exportTypes';
import { TypescriptSettings } from './Typescript.state';
import { useClasses } from './Typescript.styles';

export const Settings = ({ i18n, data, id, coreI18n, onUpdate }: ETSettings) => {
  const classNames = useClasses();

  const onChange = (field: string, value: string): void => {
    const newValues = {
      ...data,
      [field]: value
    };

    const isValid = newValues.typeName.trim() !== '' && newValues.varName.trim() !== '';
    onUpdate({
      ...newValues,
      isValid
    });
  };

  return (
    <div className={classNames.settingsBlock}>
      <label htmlFor={`${id}-typeName`}>{i18n.typeName}</label>
      <TextField
        id={`${id}-typeName`}
        error={data.typeName !== '' ? '' : coreI18n.requiredField}
        value={data.typeName}
        style={{ width: '100%', marginBottom: 10 }}
        onChange={(e: any): void => onChange('typeName', e.target.value)}
      />

      <label htmlFor={`${id}-exportedVarName`}>{i18n.exportedVarName}</label>
      <TextField
        id={`${id}-exportedVarName`}
        error={data.varName !== '' ? '' : coreI18n.requiredField}
        value={data.varName}
        style={{ width: '100%' }}
        onChange={(e: any): void => onChange('varName', e.target.value)}
      />
    </div>
  );
};

export const getCodeMirrorMode = (): string => 'text/typescript';

export const getDownloadFileInfo = ({ packetId }: ETDownloadPacket): ETDownloadPacketResponse => ({
  filename: `data-${packetId}.ts`,
  fileType: 'application/x-typescript'
});

export const isValid = (settings: TypescriptSettings): boolean => {
  return settings.typeName.trim() !== '' && settings.varName.trim() !== '';
};
