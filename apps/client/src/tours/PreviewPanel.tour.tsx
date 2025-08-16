import React from 'react';
import Reactour, { ReactourStepPosition } from 'reactour';
import { getStrings } from '~utils/langUtils';
import store from '~core/store';
import * as actions from '~store/generator/generator.actions';
import * as selectors from '~store/generator/generator.selectors';
import { TourCompleteStep } from './Components.tour';
import { TourProps } from '~types/general';
import { DataTypeFolder, ExportTypeFolder } from '../../_plugins';

const Step1 = (): JSX.Element => {
	const { core: i18n } = getStrings();

	return (
		<>
			<h2>{i18n.thePreviewPanel}</h2>
			<p>
				{i18n.previewPanelTourDesc}
			</p>
		</>
	);
};

const Step2 = (): JSX.Element => {
	const { core: i18n } = getStrings();

	return (
		<>
			<h2>{i18n.panelContents}</h2>
			<p>
				{i18n.panelContentsDesc}
			</p>
		</>
	);
};

const Step3 = (): JSX.Element => {
	const { core: i18n } = getStrings();

	return (
		<>
			<h2>{i18n.panelControls}</h2>
			<p>
				{i18n.previewPanelControlsDesc}
			</p>
		</>
	);
};

const Step4 = (): JSX.Element => {
	const { core: i18n } = getStrings();

	return (
		<>
			<h2>{i18n.theExportTypeBtn}</h2>
			<p>
				{i18n.exportTypeBtnDesc}
			</p>
			<p>
				{i18n.clickExportTypeBtn}
			</p>
		</>
	);
};

const Step5 = (): JSX.Element => {
	const { core: i18n } = getStrings();

	return (
		<>
			<h2>{i18n.editingExportTypes}</h2>
			<p>
				{i18n.editExportTypePage}
			</p>
			<p>
				{i18n.editExportTypePageConfig}
			</p>
		</>
	);
};

const Step6 = (): JSX.Element => {
	const { core: i18n } = getStrings();

	return (
		<>
			<h2>{i18n.exportTypeSelection}</h2>
			<p>
				{i18n.exportTypeSelectionDesc}
			</p>
		</>
	);
};

const Step7 = (): JSX.Element => {
	const { core: i18n } = getStrings();

	return (
		<>
			<h2>{i18n.exportTypeOptionsTs}</h2>
			<p>
				{i18n.exportTypeOptionsTsDesc}
			</p>
			<p>
				{i18n.exportTypeOptionsTsDesc2}
			</p>
		</>
	);
};

const Step8 = (): JSX.Element => {
	const { core: i18n } = getStrings();

	return (
		<>
			<h2>{i18n.exportTypeOptionsSql}</h2>
			<p>
				{i18n.exportTypeOptionsSqlDesc}
			</p>
		</>
	);
};

const Step9 = (): JSX.Element => {
	const { core: i18n } = getStrings();

	return (
		<>
			<h2>{i18n.panelTabs}</h2>
			<p>
				{i18n.panelTabsDesc}
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
			setTimeout(() => {
				store.dispatch(actions.clearPage(false));
				store.dispatch(actions.addRows(5));

				const state = store.getState();
				const rows = selectors.getSortedRowsArray(state);

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

				const ids = rows.map(({ id }) => id);

				const pluginsToLoad: any = {
					Typescript: false,
					Country: false,
					Region: false,
					City: false,
					StreetAddress: false,
					PostalZip: false,
				};

				const onLoadComplete = (plugin: DataTypeFolder | ExportTypeFolder): void => {
					pluginsToLoad[plugin] = true;

					const allLoaded = Object.keys(pluginsToLoad).reduce((allLoaded, key) => allLoaded && pluginsToLoad[key], true);
					if (allLoaded) {
						store.dispatch(actions.refreshPreview(ids));
					}
				};

				const shouldRefreshPreviewPanel = false;
				store.dispatch(actions.onSelectDataType('Country', {
					gridRowId: ids[0], shouldRefreshPreviewPanel, onLoadComplete
				}));
				store.dispatch(actions.onSelectDataType('Region', {
					gridRowId: ids[1], shouldRefreshPreviewPanel, onLoadComplete
				}));
				store.dispatch(actions.onSelectDataType('City', {
					gridRowId: ids[2], shouldRefreshPreviewPanel, onLoadComplete
				}));
				store.dispatch(actions.onSelectDataType('StreetAddress', {
					gridRowId: ids[3], shouldRefreshPreviewPanel, onLoadComplete
				}));
				store.dispatch(actions.onSelectDataType('PostalZip', {
					gridRowId: ids[4], shouldRefreshPreviewPanel, onLoadComplete
				}));
				store.dispatch(actions.onSelectExportType('Typescript', { shouldRefreshPreviewPanel, onLoadComplete }));
			}, 10);
		}
	},
	{
		content: Step2,
		selector: '.gdGridPanel>div:nth-child(3)',
		style: {
			...commonStyles,
			marginLeft: -20
		}
	},

	{
		content: Step3,
		selector: '.tour-previewPanelControls',
		style: {
			...commonStyles
		},
		position: 'bottom' as ReactourStepPosition
	},
	{
		content: Step4,
		selector: '.tour-exportTypeBtn',
		style: {
			...commonStyles
		},
		position: 'bottom' as ReactourStepPosition
	},
	{
		content: Step5,
		style: {
			...commonStyles
		},
		action: (): void => {
			store.dispatch(actions.toggleExportSettings('previewPanel'));
		}
	},
	{
		content: Step6,
		selector: '.tour-exportTypeDropdown>div',
		style: {
			...commonStyles,
			marginLeft: 20
		},
		position: 'right' as ReactourStepPosition
	},
	{
		content: Step7,
		selector: '.tour-exportTypePanel',
		style: {
			...commonStyles,
			marginLeft: 20
		},
		position: 'right' as ReactourStepPosition
	},
	{
		content: Step8,
		selector: '.tour-exportTypePanel',
		style: {
			...commonStyles,
			marginLeft: 20
		},
		action: (): void => {
			store.dispatch(actions.onSelectExportType('SQL'));
		},
		position: 'right' as ReactourStepPosition
	},
	{
		content: Step9,
		selector: '.tour-exportTypePanelTabs',
		style: {
			...commonStyles,
			marginLeft: 20
		},
		position: 'left' as ReactourStepPosition
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
		disableFocusLock={true}
	/>
);

export default Tour;
