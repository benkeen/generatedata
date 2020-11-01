import React from 'react';
import * as sharedStyles from '../../styles/shared.scss';
import { SmallSpinner } from '~components/loaders';
import * as styles from './Grid.scss';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { HtmlTooltip } from '~components/tooltips';
import C from '../constants';


export const SmallScreenSettingsIcon = ({
	id, data, dataType, isDataTypeLoaded, Example, Options, i18n, countryI18n, gridPanelDimensions,
	selectedDataTypeI18n, onConfigureDataType, dtCustomProps
}: any): any => {
	const [open, setOpen] = React.useState(false);

	const handleTooltipClose = (): void => setOpen(false);
	const handleTooltipOpen = (): void => setOpen(true);

	if (!dataType || gridPanelDimensions.width >= C.GRID.MEDIUM_BREAKPOINT) {
		return null;
	}

	if (!isDataTypeLoaded) {
		return <SmallSpinner className={styles.smallScreenSpinner} />;
	}

	let example = null;
	let options = null;

	if (Example !== null) {
		example = (
			<>
				<h4>{i18n.example}</h4>
				<div>
					<Example
						coreI18n={i18n}
						countryI18n={countryI18n}
						i18n={selectedDataTypeI18n}
						id={id}
						data={data}
						onUpdate={(data: any): void => onConfigureDataType(id, data)}
						emptyColClass={sharedStyles.emptyCol}
						gridPanelDimensions={gridPanelDimensions}
					/>
				</div>
			</>
		);
	}

	if (Options !== null) {
		options = (
			<>
				<h4>{i18n.options}</h4>
				<Options
					coreI18n={i18n}
					countryI18n={countryI18n}
					i18n={selectedDataTypeI18n}
					id={id}
					data={data}
					onUpdate={(data: any): void => onConfigureDataType(id, data)}
					gridPanelDimensions={gridPanelDimensions}
					emptyColClass={sharedStyles.emptyCol}
					{...dtCustomProps}
				/>
			</>
		);
	}

	if (example === null && options === null) {
		return <SettingsIcon className={styles.disabledBtn} />;
	}

	return (
		<ClickAwayListener onClickAway={handleTooltipClose}>
			<HtmlTooltip
				placement="left"
				onClose={handleTooltipClose}
				open={open}
				disableFocusListener
				disableHoverListener
				title={
					<div>
						{example}
						{options}
					</div>
				}
				arrow
			>
				<SettingsIcon onClick={handleTooltipOpen} />
			</HtmlTooltip>
		</ClickAwayListener>
	);
};
