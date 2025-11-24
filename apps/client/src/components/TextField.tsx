import React, { useState } from 'react';
import { ErrorTooltip } from '~components/tooltips';
import sharedStyles from '../styles/shared.scss';
import { useThrottle } from '../hooks/useThrottle';

type TextFieldProps = {
	value: string;
	onChange: (e: any) => void;
	throttle?: boolean;
	error?: string;
	ref?: React.MutableRefObject<HTMLInputElement | undefined>;
	placeholder?: string;
	autoFocus?: boolean;
	className?: string;
	tooltipPlacement?: string;
	name?: string;
	style?: React.CSSProperties;
	disabled?: boolean;
	type?: string;
	onFocus?: (e: any) => void;
	onBlur?: (e: any) => void;
	onPaste?: (e: any) => void;
	onKeyDown?: (e: any) => void;
	autoComplete?: string | boolean;
};

const TextField = ({ throttle, error, value, onChange, tooltipPlacement, className, ref, ...props }: TextFieldProps) => {
	let classes = className ? className : '';
	if (error) {
		classes += ' ' + sharedStyles.errorField;
	}

	const [innerValue, setInnerValue] = useState(value || '');
	const [lastEvent, setChangeEvent] = useThrottle(null, 2); // second param is frames per second...

	const cleanProps = { ...props };
	if (props.type === 'intOnly') {
		cleanProps.type = 'number';
		cleanProps.onKeyDown = (e: any): void => {
			if (e.key === '.') {
				e.preventDefault();
			}
		};
	}

	React.useEffect(() => {
		if (lastEvent === null || !throttle) {
			return;
		}
		onChange(lastEvent);
	}, [lastEvent]);

	React.useEffect(() => {
		setInnerValue(value);
	}, [value]);

	const controlledOnChange = (e: any): void => {
		if (throttle) {
			e.persist();
			setChangeEvent(e);
			setInnerValue(e.target.value);
		} else {
			onChange(e);
		}
	};

	return (
		<ErrorTooltip title={error} arrow disableHoverListener={!error} disableFocusListener={!error} placement={tooltipPlacement}>
			<input {...cleanProps} value={throttle ? innerValue : value} onChange={controlledOnChange} className={classes} ref={ref} />
		</ErrorTooltip>
	);
};
TextField.displayName = 'TextField';

TextField.defaultProps = {
	throttle: true,
	type: 'text',
	error: '',
	tooltipPlacement: 'bottom'
};

export default TextField;
