import { ReactNode, type ReactPortal } from 'react';
import { createPortal } from 'react-dom';
import usePortal from '../../hooks/usePortal';

export const Portal = ({ id, children }: { id: string; children: ReactNode }): ReactPortal => {
  const target = usePortal(id);

  // @ts-ignore
  return createPortal(children, target, null);
};
