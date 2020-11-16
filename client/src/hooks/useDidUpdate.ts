import { useEffect, useRef } from 'react';

const useDidUpdate = (callback: Function, deps: any[]): void => {
	const hasMount = useRef(false);

	useEffect(() => {
		if (hasMount.current) {
			callback();
		} else {
			hasMount.current = true;
		}
	}, deps);
};

export default useDidUpdate;
