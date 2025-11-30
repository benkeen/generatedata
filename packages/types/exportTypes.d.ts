import { GeneratorLayout } from './generator';

export type ETSettings = {
  onUpdate: Function; // from container
  data: any; // from store
  id: string;
  layout: GeneratorLayout;
  i18n: any;
  coreI18n: any;
};

export interface ETValidateTitleField {
  (title: string, i18n: any, settings?: any): string | null;
}

export type ETBundle = {
  getCodeMirrorMode: (settings: any) => string; // TODO generics - data is same type as initialState
  getDownloadFileInfo: (downloadPacket: ETDownloadPacket) => ETDownloadPacketResponse;
  initialState?: any; // TODO generics
  Settings?: any;
  getExportTypeLabel?: (data: any) => string; // TODO generics - data is same type as initialState
  validateTitleField?: ETValidateTitleField;
  isValid?: (data: any) => boolean;
};

export type ETBrowserBundle = Omit<ETBundle, 'generate'>;

// oddity, but this is used to let the main application know when the Export Type is in an invalid state. This prevents
// it from attempting to generate anything until it's resolved
// TODO rename. Maybe ETRequiredState / ETCoreState?
export interface ETState {
  isValid: boolean;
}

export type ETFieldGroup = 'core' | 'programmingLanguage';

export type ETDefinition = {
  fieldGroup: ETFieldGroup;
  codeMirrorModes: string[];
};

export type ETDownloadPacket = {
  packetId: string;
  settings: any;
};

export type ETDownloadPacketResponse = {
  filename: string;
  fileType: string;
};
