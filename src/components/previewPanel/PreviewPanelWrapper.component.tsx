import React from 'react';
import { createPortal } from 'react-dom';
import usePortal from '../../hooks/usePortal';

export const Wrapper = ({ children }: any) => {
	const target = usePortal('preview-overlay');
	return createPortal(
		children,
		// @ts-ignore-line
		target
	);
};
