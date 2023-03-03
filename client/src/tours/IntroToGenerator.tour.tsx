import React from 'react';
import Reactour, { ReactourStepPosition } from 'reactour';
import env from '../../_env';
import store from '~core/store';
import { getI18nString, getStrings } from '~utils/langUtils';
import * as selectors from '~store/generator/generator.selectors';
import * as actions from '~store/generator/generator.actions';
import { TourCompleteStep } from './Components.tour';
import { TourProps } from '~types/general';
import { DataTypeFolder, ExportTypeFolder } from '../../_plugins';


const Step1 = (): JSX.Element => {
	const { core: i18n } = getStrings();

	return (
		<>
			<h2>{i18n.introToGenerator}</h2>

			<p>
				{i18n.introToGeneratorDesc}
			</p>
		</>
	);
};

const Step2 = (): JSX.Element => {
	const { core: i18n } = getStrings();

	return (
		<>
			<h2>{i18n.theGridPanel}</h2>

			<p>
				{i18n.gridPanelTourDesc1}
			</p>
			<p>
				{i18n.gridPanelTourDesc2}
			</p>
		</>
	);
};

const Step3 = (): JSX.Element => {
	const { core: i18n } = getStrings();

	return (
		<>
			<h2>{i18n.thePreviewPanel}</h2>
			<p>
				{i18n.previewPanelDesc}
			</p>
			<p>
				{i18n.previewPanelMoreInfo}
			</p>
		</>
	);
};

const Step4 = (): JSX.Element => {
	const { core: i18n } = getStrings();

	return (
		<>
			<h2>{i18n.theDataSetName}</h2>

			<p>
				{i18n.dataSetNameDesc}
			</p>
		</>
	);
};

const Step5 = (): JSX.Element => {
	const { core: i18n } = getStrings();

	return (
		<>
			<h2>{i18n.panelControls}</h2>

			<p>
				{i18n.panelControlsDesc}
			</p>

			<p>
				{i18n.panelControlsClearIconDesc}
			</p>
		</>
	);
};

const Step6 = (): JSX.Element => {
	const { core: i18n } = getStrings();
	const saveBtnDesc = getI18nString(i18n.saveButtonDesc, [env.maxDataSetHistorySize]);

	return (
		<>
			<h2>{i18n.theSaveButton}</h2>

			<p>
				{saveBtnDesc}
			</p>
		</>
	);
};

const Step7 = (): JSX.Element => {
	const { core: i18n } = getStrings();

	return (
		<>
			<h2>{i18n.theGenerateButton}</h2>

			<p>
				{i18n.generateBtnDesc}
			</p>
		</>
	);
};

const commonStyles = {
	borderRadius: 6,
	margin: 12
};

const steps = [
	{
		content: Step1,
		style: {
			...commonStyles
		},
		position: 'center' as ReactourStepPosition,
		action: (): void => {
			const pluginsToLoad: any = {
				JSON: false,
				Names: false,
				Phone: false,
				Email: false,
				StreetAddress: false,
				City: false,
			};

			store.dispatch(actions.clearPage(false));
			store.dispatch(actions.addRows(5));

			const state = store.getState();
			const rows = selectors.getSortedRowsArray(state);
			const ids = rows.map(({ id }) => id);

			const onLoadComplete = (plugin: DataTypeFolder | ExportTypeFolder): void => {
				pluginsToLoad[plugin] = true;

				const allLoaded = Object.keys(pluginsToLoad).reduce((allLoaded, key) => allLoaded && pluginsToLoad[key], true);
				if (allLoaded) {
					store.dispatch(actions.refreshPreview(ids));
				}
			};

			const shouldRefreshPreviewPanel = false;
			store.dispatch(actions.onSelectDataType('Names', {
				gridRowId: ids[0], shouldRefreshPreviewPanel, onLoadComplete
			}));
			store.dispatch(actions.onSelectDataType('Phone', {
				gridRowId: ids[1], shouldRefreshPreviewPanel, onLoadComplete
			}));
			store.dispatch(actions.onSelectDataType('Email', {
				gridRowId: ids[2], shouldRefreshPreviewPanel, onLoadComplete
			}));
			store.dispatch(actions.onSelectDataType('StreetAddress', {
				gridRowId: ids[3], shouldRefreshPreviewPanel, onLoadComplete
			}));
			store.dispatch(actions.onSelectDataType('City', {
				gridRowId: ids[4], shouldRefreshPreviewPanel, onLoadComplete
			}));
			store.dispatch(actions.onSelectExportType('JSON', {
				shouldRefreshPreviewPanel, onLoadComplete
			}));

			const layout = selectors.getGeneratorLayout(state);
			if (layout === 'horizontal') {
				store.dispatch(actions.toggleLayout());
			}
			if (!selectors.isGridVisible(state)) {
				store.dispatch(actions.toggleGrid());
			}
			if (!selectors.isPreviewVisible(state)) {
				store.dispatch(actions.togglePreview());
			}
		}
	},
	{
		content: Step2,
		selector: '.gdGridPanel>div:first-child',
		style: {
			...commonStyles
		}
	},
	{
		content: Step3,
		selector: '.gdGridPanel>div:nth-child(3)',
		style: {
			...commonStyles,
			marginLeft: -20
		}
	},
	{
		content: Step4,
		selector: '.tour-dataSetName',
		style: {
			...commonStyles,
			marginLeft: 10
		}
	},
	{
		content: Step5,
		selector: '.tour-panelControls',
		style: {
			...commonStyles,
			marginTop: -20
		},
		position: 'top' as ReactourStepPosition
	},
	{
		content: Step6,
		selector: '.tour-saveButton',
		style: {
			...commonStyles,
			marginTop: -20
		},
		position: 'top' as ReactourStepPosition
	},
	{
		content: Step7,
		selector: '.tour-generateButton',
		style: {
			...commonStyles,
			marginTop: -20
		},
		position: 'top' as ReactourStepPosition
	},
	{
		content: TourCompleteStep,
		style: {
			...commonStyles
		}
	}
];

const Tour = ({ isOpen, onClose, maskClassName, closeWithMask, disableInteraction, accentColor, className }: TourProps): JSX.Element => (
	<Reactour
		steps={steps}
		isOpen={isOpen}
		onRequestClose={onClose}
		maskClassName={maskClassName}
		maskSpace={0}
		closeWithMask={closeWithMask}
		disableInteraction={disableInteraction}
		accentColor={accentColor}
		className={className}
	/>
);

export default Tour;
