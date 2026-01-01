/* eslint max-len:0 */
// @ts-ignore-line
import { template as uTemplate, templateSettings } from 'underscore';
import type { AlertProps } from '@mui/material/Alert';
import type { SnackbarOrigin } from '@mui/material';

templateSettings.interpolate = /\{\{(.+?)\}\}/g;

export const isBoolean = (n: any): boolean => typeof n === 'boolean';

export const cloneObj = <T>(obj: object): T => JSON.parse(JSON.stringify(obj));

export const template = (str: string, params: object): string => {
  const compiled = uTemplate(str);
  return compiled(params);
};

export const isValidEmail = (email: string): boolean =>
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
    email
  );

let toastRef: any;
export const initToast = (ref: any): void => {
  toastRef = ref;
};

export type ToastType = {
  message: string;
  type: AlertProps['severity'];
  verticalPosition?: SnackbarOrigin['vertical'];
  horizontalPosition?: SnackbarOrigin['horizontal'];
  autoHideDuration?: number;
};

export const addToast = (toast: ToastType): void => {
  toastRef.add(toast);
};

let tourComponents: any;
export const setTourComponents = (tour: any): void => {
  tourComponents = tour;
};

export const getTourComponents = (): any => tourComponents;
