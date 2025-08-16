/* eslint max-len:0 */
// @ts-ignore-line
import { template as uTemplate, templateSettings } from 'underscore';
templateSettings.interpolate = /\{\{(.+?)\}\}/g;
export const isBoolean = (n) => typeof n === 'boolean';
export const cloneObj = (obj) => JSON.parse(JSON.stringify(obj));
export const template = (str, params) => {
    const compiled = uTemplate(str);
    return compiled(params);
};
export const isValidEmail = (email) => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email);
let toastRef;
export const initToast = (ref) => {
    toastRef = ref;
};
export const addToast = (toast) => {
    toastRef.add(toast);
};
let tourComponents;
export const setTourComponents = (tour) => {
    tourComponents = tour;
};
export const getTourComponents = () => tourComponents;
//# sourceMappingURL=generalUtils.js.map