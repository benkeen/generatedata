import * as React from 'react';
export declare const useIsomorphicEffect: typeof React.useEffect;
declare type KeyHandlers = Record<KeyboardEvent['key'], () => void>;
export declare function runKeyHandler(e: KeyboardEvent, keyHandlers: KeyHandlers): void;
export declare function useKeyDown(active: boolean, keyHandlers: KeyHandlers): void;
export {};
