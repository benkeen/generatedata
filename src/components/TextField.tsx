import React from 'react';
import { ErrorTooltip } from '~components/tooltips';
import sharedStyles from '../styles/shared.scss';

const TextField = ({ error, className, ...props }: any): JSX.Element => {
	let classes = className;
	if (error) {
		classes += ' ' + sharedStyles.errorField;
	}

	if (error) {
		return (
			<ErrorTooltip title={error} arrow disableHoverListener={!error} disableFocusListener={!error}>
				<input {...props} className={classes} />
			</ErrorTooltip>
		);
	}

	return <input {...props} className={classes} />;
};

TextField.defaultProps = {
	type: 'text'
};

export default TextField;
