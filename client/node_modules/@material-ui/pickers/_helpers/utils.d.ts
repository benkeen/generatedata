/** Use it instead of .includes method for IE support */
export declare function arrayIncludes<T>(array: T[], itemOrItems: T | T[]): boolean;
export declare type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
