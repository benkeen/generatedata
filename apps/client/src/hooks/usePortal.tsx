import { useRef, useEffect } from 'react';

const createRootElement = (id: string): HTMLDivElement => {
	const rootContainer = document.createElement('div');
	rootContainer.setAttribute('id', id);
	return rootContainer;
};

const addRootElement = (rootEl: any): void => {
	document.body.insertBefore(
		rootEl,
		// @ts-ignore-line
		document.body.lastElementChild.nextElementSibling
	);
};

const usePortal = (id: string): HTMLDivElement => {
	const rootElRef = useRef<any>(null);

	useEffect((): any => {
		const existingParent = document.querySelector(`#${id}`);
		const parentEl = existingParent || createRootElement(id);
		if (!existingParent) {
			addRootElement(parentEl);
		}
		parentEl.appendChild(rootElRef.current);

		return (): void => {
			rootElRef.current.remove();
			parentEl.remove();
		};
	}, []);

	const getRootElem = (): any => {
		if (!rootElRef.current) {
			rootElRef.current = document.createElement('div');
		}
		return rootElRef.current;
	};

	return getRootElem();
};

export default usePortal;
