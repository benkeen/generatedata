// TODO rename to dataTypePlugins.ts
import { DataTypeFolder } from '@generatedata/plugins';

export type DTBundle = {
  initialState?: any;

  // optional <Example /> React component to show something in the UI for the "Example" column
  Example?: any;

  // optional <Options /> React component. This shows up in the Options column in the UI
  Options?: any;

  // optional <Help /> React component
  Help?: any;

  rowStateReducer?: (state: any) => any;
  getMetadata?: (data: any) => DTMetadata;
  customProps?: DTCustomProps;
  actionInterceptors?: DTActionInterceptors;
};

export type DTActionInterceptors = {
  [action: string]: DTActionInterceptor;
};

export interface DTActionInterceptor {
  // TODO. generics? rowState and the `any` response here is the state type of the Data Type
  (rowId: string, rowState: any, actionPayload: any): any | null;
}

export type DTInterceptorSingleAction = {
  dataType: DataTypeFolder;
  interceptor: DTActionInterceptor;
};

export type DTWorkerGenerationData = DTGenerationData & {
  workerUtilsUrl: string; // this is the URL of the workerUtils worker file
};

interface DTWorkerOnMessage extends MessageEvent {
  data: DTWorkerGenerationData;
}

export type DTCustomProps = {
  // weird, but setting these to undefined prevents the Data Type from overriding the core prop names accidentally
  coreI18n?: undefined;
  countryI18n?: undefined;
  i18n?: undefined;
  data?: undefined;
  id?: undefined;
  gridPanelDimensions?: undefined;
  onUpdate?: undefined;
  [propName: string]: any;
};
