import React, { useEffect, useRef, useState } from 'react';
import { useMutation } from '@apollo/client/react';
import Measure from 'react-measure';
import AutoSizer from 'react-input-autosize';
import { Divider, IconButton, List, ListItemButton, ListItemText } from '@mui/material';
import { HtmlTooltip } from '~components/tooltips';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import useOnClickOutside from 'use-onclickoutside';
import { addToast } from '@generatedata/utils/general';
import DeleteDataSetDialog from '~core/dialogs/deleteDataSet/DeleteDataSetDialog.component';
import * as queries from '~core/queries';
import { CurrentDataSet } from '~store/generator/generator.reducer';

export type GeneratorControlsProps = {
	i18n: any;
	dataSet: CurrentDataSet;
	isLoggedIn: boolean;
	onUpdate: (newDataSetName: string) => void;
	onSaveDataSet: () => void;
	onSaveAs: () => void;
	onShowHistory: () => void;
	onClearGrid: () => void;
	showClearPageDialog: () => void;
	disabled: boolean;
};

const GeneratorControls = ({
	i18n,
	isLoggedIn,
	dataSet,
	onUpdate,
	onSaveDataSet,
	onSaveAs,
	onClearGrid,
	onShowHistory,
	disabled,
	showClearPageDialog
}: GeneratorControlsProps) => {
	const popoverRef = useRef(null);
	const inputFieldRef = useRef(null);

	const { dataSetId, dataSetName } = dataSet;
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
		refetchQueries: [{ query: queries.GET_DATA_SETS }],
		onCompleted: () => {
			setDeleteDialogVisibility(false);
			onClearGrid();
		}
	});

	const onChange = (e: any): void => {
		setNewDataSetName(e.target.value);
	};

	const onBlur = (): void => {
		// we save the new name if they click outside - since there's no save button, we want to make it really simple
		if (newDataSetName !== dataSetName) {
			saveNewDataSet();
		}
	};

	const saveNewDataSet = (): void => {
		onUpdate(newDataSetName);

		// @ts-ignore-line
		inputFieldRef.current?.blur();

		addToast({
			message: i18n.dataSetNameUpdated,
			type: 'success'
		});
	};

	const onKeyUp = (e: any): void => {
		if (e.key === 'Escape') {
			setNewDataSetName(dataSetName);
			// @ts-ignore-line
			inputFieldRef.current?.blur();
		} else if (e.key === 'Enter') {
			saveNewDataSet();
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
								<ListItemButton
									key="saveAs"
									onClick={(): any => {
										setMenuVisibility(false);
										onSaveAs();
									}}
								>
									<ListItemText primary={i18n.saveAs} />
								</ListItemButton>
								<ListItemButton
									key="delete"
									onClick={(): any => {
										setMenuVisibility(false);
										setDeleteDialogVisibility(true);
									}}
								>
									<ListItemText primary={i18n.delete} />
								</ListItemButton>
								<ListItemButton
									key="history"
									onClick={(): void => {
										setMenuVisibility(false);
										onShowHistory();
									}}
								>
									<ListItemText primary={i18n.history} />
								</ListItemButton>
							</List>
							<Divider />
							<List disablePadding>
								<ListItemButton
									key="newDataSet"
									onClick={(): any => {
										setMenuVisibility(false);
										showClearPageDialog();
									}}
								>
									<ListItemText primary={i18n.newDataSet} />
								</ListItemButton>
							</List>
						</div>
					}
				>
					<span>
						<IconButton size="small" aria-label={i18n.dataSetOptions} disabled={disabled} onClick={(): void => setMenuVisibility(true)}>
							<ArrowDropDownIcon fontSize="large" />
						</IconButton>
					</span>
				</HtmlTooltip>
			</span>
		);
	};

	const onFocus = (e: any): void => {
		e.preventDefault();

		// this prompts the Save Data Set dialog, which contains a note about having to login/register
		if (!isLoggedIn || dataSetId === null) {
			onSaveDataSet();
			// @ts-ignore-line
			inputFieldRef.current!.blur();
		}
	};

	const maxInputFieldWidth = dimensions.width - 30;

	return (
		<>
			<Measure bounds onResize={(contentRect: any): void => setDimensions(contentRect.bounds)}>
				{({ measureRef }): any => (
					<div ref={measureRef} style={{ display: 'flex' }}>
						<AutoSizer
							className="tour-dataSetName"
							ref={inputFieldRef}
							inputStyle={{ fontSize: 18, maxWidth: maxInputFieldWidth }}
							placeholder={i18n.newDataSet}
							onFocus={onFocus}
							onChange={onChange}
							onKeyUp={onKeyUp}
							onBlur={onBlur}
							value={newDataSetName}
							disabled={disabled}
						/>
						{getMenu()}
					</div>
				)}
			</Measure>

			<DeleteDataSetDialog
				visible={dialogVisible}
				onClose={(): void => setDeleteDialogVisibility(false)}
				onDelete={(): any =>
					deleteDataSet({
						variables: {
							dataSetId
						}
					})
				}
				i18n={i18n}
			/>
		</>
	);
};

export default GeneratorControls;
