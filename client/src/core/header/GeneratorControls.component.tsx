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
import { useMutation } from '@apollo/client';
import DeleteDataSetDialog from '~core/dialogs/deleteDataSet/DeleteDataSetDialog.component';
import * as queries from '~core/queries';

export type GeneratorControlsProps = {
	i18n: any;
	dataSetId: number | null;
	dataSetName: string;
	isLoggedIn: boolean;
	onUpdate: (newDataSetName: string) => void;
	onSaveDataSet: () => void;
	onClearGrid: () => void;
};

const GeneratorControls = ({
	i18n, isLoggedIn, dataSetId, dataSetName, onUpdate, onSaveDataSet, onClearGrid
}: GeneratorControlsProps): JSX.Element => {
	const popoverRef = useRef(null);
	const inputFieldRef = useRef(null);

	const [dialogVisible, setDeleteDialogVisibility] = useState(false);
	const [dimensions, setDimensions] = useState<any>({ height: 0, width: 0 });
	const [newDataSetName, setNewDataSetName] = useState(dataSetName);
	const [dataSetMenuVisible, setMenuVisibility] = useState(false);

	useOnClickOutside(popoverRef, () => {
		setMenuVisibility(false);
	});

	useEffect(() => {
		setNewDataSetName(dataSetName);
	}, [dataSetName]);

	const [deleteDataSet] = useMutation(queries.DELETE_DATA_SET, {
		refetchQueries: [
			{ query: queries.GET_DATA_SETS }
		],
		onCompleted: () => {
			setDeleteDialogVisibility(false);
			onClearGrid();
		}
	});

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
		if (!isLoggedIn || dataSetId === null) {
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
									<ListItemText primary={i18n.history} />
								</ListItem>
								<ListItem
									button
									key="delete"
									onClick={(): any => {
										setMenuVisibility(false);
										setDeleteDialogVisibility(true);
									}}>
									<ListItemText primary={i18n.delete} />
								</ListItem>
							</List>
						</div>
					}
				>
					<span>
						<IconButton size="small" aria-label={i18n.dataSetOptions}>
							<ArrowDropDownIcon fontSize="large" onClick={(): void => setMenuVisibility(true)} />
						</IconButton>
					</span>
				</HtmlTooltip>
			</span>
		);
	};

	const onFocus = (e: any) => {
		e.preventDefault();

		if (!isLoggedIn || dataSetId === null) {
			onSaveDataSet();
			// @ts-ignore-line
			inputFieldRef.current!.blur();
		}
	};

	const maxInputFieldWidth = dimensions.width - 30;

	return (
		<>
			<Measure
				bounds
				onResize={(contentRect: any): void => setDimensions(contentRect.bounds)}
			>
				{({ measureRef }): any => (
					<div ref={measureRef} style={{ display: 'flex' }}>
						<AutoSizer
							ref={inputFieldRef}
							inputStyle={{ fontSize: 18, maxWidth: maxInputFieldWidth }}
							placeholder={i18n.newDataSet}
							onFocus={onFocus}
							onChange={onChange}
							onKeyUp={onKeyUp}
							value={newDataSetName}
						/>
						{getMenu()}
					</div>
				)}
			</Measure>

			<DeleteDataSetDialog
				visible={dialogVisible}
				onClose={(): void => setDeleteDialogVisibility(false)}
				onDelete={(): any => deleteDataSet({
					variables: {
						dataSetId
					}
				})}
				i18n={i18n}
			/>
		</>
	);
};

export default GeneratorControls;
