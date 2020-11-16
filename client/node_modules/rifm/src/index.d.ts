import * as React from 'react';

interface RifmRenderArgs<E> {
  value: string;
  onChange: React.ChangeEventHandler<E>;
}

interface RifmProps<E> {
  value: string;
  onChange: (str: string) => void;
  format: (str: string) => string;
  replace?: (str: string) => boolean;
  refuse?: RegExp;
  children: (args: RifmRenderArgs<E>) => React.ReactNode;
}

declare class Rifm<E = HTMLInputElement> extends React.Component<
  RifmProps<E>
> {}

export { Rifm };
