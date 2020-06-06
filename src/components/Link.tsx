import React from 'react';

export type LinkParams = {
	url: string;
	children?: any;
	offSite?: boolean;
};

const Link = ({ url, children = null, offSite = false }: LinkParams): JSX.Element => {
	const props: any = {
		href: url
	};
	if (offSite) {
		props.target = '_blank';
		props.rel = 'noopener noreferrer';
	}

	return (
		<a {...props}>{children ? children : url}</a>
	);
};

export default Link;
