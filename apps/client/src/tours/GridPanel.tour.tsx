import React from 'react';
import Reactour, { ReactourStepPosition } from 'reactour';
import { getStrings } from '~utils/langUtils';
import store from '~core/store';
import * as actions from '~store/generator/generator.actions';
import * as selectors from '~store/generator/generator.selectors';
import { TourCompleteStep } from './Components.tour';
import { TourProps } from '~types/general';
import { GeneratorLayout } from '~core/generator/Generator.component';
import { DataTypeFolder, ExportTypeFolder } from '../../_plugins';

const Step1 = (): JSX.Element => {
	const { core: i18n } = getStrings();

	return (
		<>
			<h2>{i18n.theGridPanel}</h2>
			<p>
				{i18n.gridPanelTourIntroDesc1}
			</p>
			<p>
				{i18n.gridPanelTourIntroDesc2}
			</p>
		</>
	);
};

const Step2 = (): JSX.Element => {
	const { core: i18n } = getStrings();

	return (
		<>
			<h2>{i18n.columns}</h2>

			<p>
				{i18n.columnsDesc}
			</p>
		</>
	);
};

const Step3 = (): JSX.Element => {
	const { core: i18n } = getStrings();

	return (
		<>
			<h2>{i18n.rowNumber}</h2>
			<p>
				{i18n.rowNumDesc1}
			</p>
			<p>
				{i18n.rowNumDesc2}
			</p>
		</>
	);
};

const Step4 = (): JSX.Element => {
	const { core: i18n } = getStrings();

	return (
		<>
			<h2>{i18n.dataType}</h2>
			<p>
				{i18n.dataTypeDesc}
			</p>
		</>
	);
};

const Step5 = (): JSX.Element => {
	const { core: i18n } = getStrings();

	return (
		<>
			<h2>{i18n.helpIcon}</h2>
			<p>
				{i18n.helpIconDesc}
			</p>
		</>
	);
};

const Step6 = (): JSX.Element => {
	const { core: i18n } = getStrings();

	return (
		<>
			<h2>{i18n.nameColumn}</h2>
			<p>
				{i18n.nameColumnDesc}
			</p>
		</>
	);
};

const Step7 = (): JSX.Element => {
	const { core: i18n } = getStrings();

	return (
		<>
			<h2>{i18n.exampleColumn}</h2>
			<p>
				{i18n.exampleColumnDesc}
			</p>
		</>
	);
};

const Step8 = (): JSX.Element => {
	const { core: i18n } = getStrings();

	return (
		<>
			<h2>{i18n.optionsColumn}</h2>
			<p>
				{i18n.optionsColumnDesc1}
			</p>
			<p>
				{i18n.optionsColumnDesc2}
			</p>
		</>
	);
};

const Step9 = (): JSX.Element => {
	const { core: i18n } = getStrings();

	return (
		<>
			<h2>{i18n.deleteRow}</h2>
			<p>
				{i18n.deleteRowDesc}
			</p>
		</>
	);
};

const Step10 = (): JSX.Element => {
	const { core: i18n } = getStrings();

	return (
		<>
			<h2>{i18n.addRows}</h2>
			<p>
				{i18n.addRowsDesc}
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
				store.dispatch(actions.addRows(10));

				const state = store.getState();
				const rows = selectors.getSortedRowsArray(state);

				if (!selectors.isGridVisible(state)) {
					store.dispatch(actions.toggleGrid());
				}
				if (selectors.isPreviewVisible(state)) {
					store.dispatch(actions.togglePreview());
				}

				const layout = selectors.getGeneratorLayout(state);
				if (layout === GeneratorLayout.vertical) {
					store.dispatch(actions.toggleLayout());
				}

				const ids = rows.map(({ id }) => id);

				const pluginsToLoad: any = {
					Names: false,
					Phone: false,
					Email: false,
					StreetAddress: false,
					City: false,
					Region: false,
					Country: false,
					LatLng: false,
					Alphanumeric: false,
					Boolean: false,
				};

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
				store.dispatch(actions.onSelectDataType('Region', {
					gridRowId: ids[5], shouldRefreshPreviewPanel, onLoadComplete
				}));
				store.dispatch(actions.onSelectDataType('Country', {
					gridRowId: ids[6], shouldRefreshPreviewPanel, onLoadComplete
				}));
				store.dispatch(actions.onSelectDataType('LatLng', {
					gridRowId: ids[7], shouldRefreshPreviewPanel, onLoadComplete
				}));
				store.dispatch(actions.onSelectDataType('Alphanumeric', {
					gridRowId: ids[8], shouldRefreshPreviewPanel, onLoadComplete
				}));
				store.dispatch(actions.onSelectDataType('Boolean', {
					gridRowId: ids[8], shouldRefreshPreviewPanel, onLoadComplete
				}));

				document.querySelector('.tour-scrollableGridRows')!.scrollTop = 0;
			}, 10);
		}
	},
	{
		content: Step2,
		selector: '.tour-gridHeader',
		style: {
			...commonStyles
		},
		position: 'bottom' as ReactourStepPosition
	},
	{
		content: Step3,
		selector: '.tour-gridRow div:nth-child(1)',
		style: {
			...commonStyles
		},
		position: 'bottom' as ReactourStepPosition
	},
	{
		content: Step4,
		selector: '.tour-gridRow>div:nth-child(2)>div:nth-child(1) div',
		style: {
			...commonStyles
		},
		position: 'bottom' as ReactourStepPosition
	},
	{
		content: Step5,
		selector: '.tour-gridRow>div:nth-child(2)>div:nth-child(2) svg',
		style: {
			...commonStyles
		},
		position: 'bottom' as ReactourStepPosition
	},
	{
		content: Step6,
		selector: '.tour-gridRow div:nth-child(3) input',
		style: {
			...commonStyles
		},
		position: 'bottom' as ReactourStepPosition
	},
	{
		content: Step7,
		selector: '.tour-gridRow div:nth-child(4)>*',
		style: {
			...commonStyles
		},
		position: 'bottom' as ReactourStepPosition
	},
	{
		content: Step8,
		selector: '.tour-gridRow div:nth-child(5)>*',
		style: {
			...commonStyles
		},
		position: 'bottom' as ReactourStepPosition
	},
	{
		content: Step9,
		selector: '.tour-gridRow div:nth-child(7) svg',
		style: {
			...commonStyles
		},
		position: 'bottom' as ReactourStepPosition
	},
	{
		content: Step10,
		selector: '.tour-addRows',
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
		disableFocusLock={true}
	/>
);

export default Tour;
