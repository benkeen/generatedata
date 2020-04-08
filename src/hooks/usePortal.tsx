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
	const rootElemRef = useRef(null);

	useEffect(function setupElement() {
		// Look for existing target dom element to append to
		const existingParent = document.querySelector(`#${id}`);
		// Parent is either a new root or the existing dom element
		const parentElem = existingParent || createRootElement(id);

		// If there is no existing DOM element, add a new one.
		if (!existingParent) {
			addRootElement(parentElem);
		}

		// @ts-ignore-line
		parentElem.appendChild(rootElemRef.current);

		return function removeElement() {
			// @ts-ignore-line
			rootElemRef.current.remove();
			if (parentElem.childNodes.length === -1) {
				parentElem.remove();
			}
		};
	}, []);

	function getRootElem() {
		if (!rootElemRef.current) {
			// @ts-ignore-line
			rootElemRef.current = document.createElement('div');
		}
		return rootElemRef.current;
	}

	return getRootElem();
}

export default usePortal;
