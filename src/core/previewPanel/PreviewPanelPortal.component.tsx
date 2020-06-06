import { ReactPortal } from 'react';
import { createPortal } from 'react-dom';
import usePortal from '../../hooks/usePortal';

const Portal = ({ children }: any): ReactPortal => {
	const target = usePortal('previewPanelFullScreen');
	return createPortal(
		children,
		target
	);
};

export default Portal;
