import { generate } from './OrganizationNumber.generate';

export const onmessage = () => {
	postMessage(generate());
};
