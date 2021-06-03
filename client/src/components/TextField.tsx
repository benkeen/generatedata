import React from 'react';
import { ErrorTooltip } from '~components/tooltips';
import sharedStyles from '../styles/shared.scss';
import { useThrottle } from '../hooks/useThrottle';

const TextField = React.forwardRef(({
	error, value, onChange, tooltipPlacement, className, ...props
}: any, ref: any): JSX.Element => {
	let classes = className ? className : '';
	if (error) {
		classes += ' ' + sharedStyles.errorField;
	}

	const [innerValue, setInnerValue] = React.useState(value || '');
	const [lastEvent, setChangeEvent] = useThrottle(null, 2); // second param is frames per second...

	React.useEffect(() => {
		if (lastEvent === null) {
			return;
		}
		onChange(lastEvent);
	}, [lastEvent]);

	React.useEffect(() => {
		setInnerValue(value);
	}, [value]);

	const controlledOnChange = (e: any): void => {
		e.persist();
		setChangeEvent(e);
		setInnerValue(e.target.value);
	};

	return (
		<ErrorTooltip
			title={error}
			arrow
			disableHoverListener={!error}
			disableFocusListener={!error}
			placement={tooltipPlacement}
		>
			<input
				{...props}
				value={innerValue}
				onChange={controlledOnChange}
				className={classes}
				ref={ref}
			/>
		</ErrorTooltip>
	);
});
TextField.displayName = 'TextField';

TextField.defaultProps = {
	type: 'text',
	error: '',
	tooltipPlacement: 'bottom'
};

export default TextField;
