import * as React from 'react';

type Function = () => void;

interface CallbackProps {
  onEnd?: (providedFn: {
    pauseResume: Function;
    reset: Function;
    start: Function;
    update: Function;
  }) => void;
  onStart?: (providedFn: {
    pauseResume: Function;
    reset: Function;
    start: Function;
    update: Function;
  }) => void;
  onPauseResume?: (providedFn: {
    reset: Function;
    start: Function;
    update: Function;
  }) => void;
  onReset?: (providedFn: {
    pauseResume: Function;
    start: Function;
    update: Function;
  }) => void;
  onUpdate?: (providedFn: {
    pauseResume: Function;
    reset: Function;
    start: Function;
  }) => void;
}

export interface RenderCounterProps {
  countUpRef: React.RefObject<any>;
  start?: Function;
  pauseResume?: Function;
  reset?: Function;
  update?: (newEnd?: number) => void;
}

type EasingFn = (t: number, b: number, c: number, d: number) => number;

interface CommonProps {
  decimal?: string;
  decimals?: number;
  duration?: number;
  easingFn?: EasingFn;
  end: number;
  formattingFn?: (n: number) => string;
  prefix?: string;
  separator?: string;
  start?: number;
  suffix?: string;
  useEasing?: boolean;
}

export interface CountUpProps extends CommonProps, CallbackProps {
  className?: string;
  delay?: number;
  redraw?: boolean;
  preserveValue?: boolean;
  children?: (props: RenderCounterProps) => JSX.Element;
}

declare class CountUp extends React.Component<CountUpProps, any> {}

export interface useCountUpProps extends CommonProps, CallbackProps {
  startOnMount?: boolean;
  delay?: number;
}

type countUpHook = (
  arg: useCountUpProps,
) => {
  countUp: number | string;
  start: Function;
  pauseResume: Function;
  reset: Function;
  update: (newEnd?: number) => void;
};

export const useCountUp: countUpHook;

export default CountUp;
