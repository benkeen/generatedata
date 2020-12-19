import React, { useEffect, useRef, useState } from 'react';
import Measure from 'react-measure';
import AutoSizer from 'react-input-autosize';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { HtmlTooltip } from '~components/tooltips';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import useOnClickOutside from 'use-onclickoutside';

export type GeneratorControlsProps = {
	i18n: any;
	dataSetName: string;
	isLoggedIn: boolean;
	onUpdate: (newDataSetName: string) => void;
	onSaveDataSet: () => void;
};

const GeneratorControls = ({ isLoggedIn, dataSetName, onUpdate, onSaveDataSet }: GeneratorControlsProps): JSX.Element => {
	const popoverRef = useRef(null);
	const inputFieldRef = useRef(null);

	const [dimensions, setDimensions] = useState<any>({ height: 0, width: 0 });
	const [newDataSetName, setNewDataSetName] = useState(dataSetName);
	const [dataSetMenuVisible, setMenuVisibility] = useState(false);

	useOnClickOutside(popoverRef, () => {
		setMenuVisibility(false);
	});

	useEffect(() => {
		setNewDataSetName(dataSetName);
	}, [dataSetName]);

	const onChange = (e: any): void => {
		setNewDataSetName(e.target.value);
	};

	const onKeyUp = (e: any): void => {
		if (e.key === 'Escape') {
			setNewDataSetName(dataSetName);
		} else if (e.key === 'Enter') {
			onUpdate(newDataSetName);
		}
	};

	const getMenu = (): JSX.Element | null => {
		if (!isLoggedIn) {
			return null;
		}

		return (
			<span style={{ display: 'flex', alignItems: 'center' }}>
				<HtmlTooltip
					arrow
					open={dataSetMenuVisible}
					placement="top"
					disableFocusListener
					disableHoverListener
					disableTouchListener
					interactive
					PopperProps={{
						popperOptions: {
							modifiers: {
								offset: {
									offset: '0px, -6px'
								}
							}
						}
					}}
					title={
						<div ref={popoverRef}>
							<List disablePadding>
								<ListItem
									button
									key="history"
									onClick={(): void => {}}>
									<ListItemText primary="History" />
								</ListItem>
								<ListItem
									button
									key="delete"
									onClick={(): void => {}}>
									<ListItemText primary="Delete" />
								</ListItem>
							</List>
						</div>
					}
				>
					<span>
						<IconButton size="small" aria-label="Data Set Options">
							<ArrowDropDownIcon fontSize="large" onClick={(): void => setMenuVisibility(true)} />
						</IconButton>
					</span>
				</HtmlTooltip>
			</span>
		);
	};

	const onFocus = (e: any) => {
		e.preventDefault();

		if (!isLoggedIn) {
			onSaveDataSet();
			// @ts-ignore-line
			inputFieldRef.current!.blur();
		}
	};

	const maxInputFieldWidth = dimensions.width - 30;

	return (
		<Measure
			bounds
			onResize={(contentRect: any): void => setDimensions(contentRect.bounds)}
		>
			{({ measureRef }): any => (
				<div ref={measureRef} style={{ display: 'flex' }}>
					<AutoSizer
						ref={inputFieldRef}
						inputStyle={{ fontSize: 18, maxWidth: maxInputFieldWidth }}
						placeholder="Enter Data Set Name here..."
						onFocus={onFocus}
						onChange={onChange}
						onKeyUp={onKeyUp}
						value={newDataSetName}
					/>
					{getMenu()}
				</div>
			)}
		</Measure>
	);
};

export default GeneratorControls;
