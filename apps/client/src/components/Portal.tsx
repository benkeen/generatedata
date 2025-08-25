import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import usePortal from '../hooks/usePortal';

const Portal = ({ id, children }: { id: string; children: ReactNode }) => {
	const target = usePortal(id);

	return createPortal(children, target, null);
};

export default Portal;
