import React, { useRef, useEffect } from 'react';

/**
 * Creates DOM element to be used as React root.
 * @returns {HTMLElement}
 */
function createRootElement(id: string) {
	const rootContainer = document.createElement('div');
	rootContainer.setAttribute('id', id);
	return rootContainer;
}

/**
 * Appends element as last child of body.
 * @param {HTMLElement} rootElem
 */
function addRootElement(rootElem: any) {
	document.body.insertBefore(
		rootElem,
		// @ts-ignore-line
		document.body.lastElementChild.nextElementSibling,
	);
}

function usePortal(id: string) {
	const rootElemRef = useRef<any>(null);

	useEffect(() => {
		const existingParent = document.querySelector(`#${id}`);
		const parentEl = existingParent || createRootElement(id);
		if (!existingParent) {
			addRootElement(parentEl);
		}
		parentEl.appendChild(rootElemRef.current);

		return () => {
			rootElemRef.current.remove();
			parentEl.remove();
		};
	}, []);

	function getRootElem() {
		if (!rootElemRef.current) {
			rootElemRef.current = document.createElement('div');
		}
		return rootElemRef.current;
	}

	return getRootElem();
}

export default usePortal;
