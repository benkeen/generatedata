import { coreConfig } from '../core';


export const getScriptVersion = (): string => coreConfig.version;

// @ts-ignore
export const isNumeric = (n: any): boolean => !isNaN(parseFloat(n)) && isFinite(n);

export const isBoolean = (n: any): boolean => typeof n === 'boolean';