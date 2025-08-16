import { useEffect, useRef } from 'react';

const useDidUpdate = (callback: any, deps: any[]): void => {
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
