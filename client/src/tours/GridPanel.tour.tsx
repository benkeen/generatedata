import React from 'react';
import Reactour, { ReactourStepPosition } from 'reactour';
import { getStrings } from '~utils/langUtils';
import store from '~core/store';
import * as actions from '~store/generator/generator.actions';
import * as selectors from '~store/generator/generator.selectors';
import { TourCompleteStep } from './Components.tour';
import { TourProps } from '~types/general';
import { ClearType } from '~core/dialogs/clearGrid/ClearGrid.component';

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
				store.dispatch(actions.clearGrid(ClearType.dataOnly, false));
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
				if (layout === 'vertical') {
					store.dispatch(actions.toggleLayout());
				}

				const ids = rows.map(({ id }) => id);

				store.dispatch(actions.onSelectDataType('Names', ids[0]));
				store.dispatch(actions.onSelectDataType('Phone', ids[1]));
				store.dispatch(actions.onSelectDataType('Email', ids[2]));
				store.dispatch(actions.onSelectDataType('StreetAddress', ids[3]));
				store.dispatch(actions.onSelectDataType('City', ids[4]));
				store.dispatch(actions.onSelectDataType('Region', ids[5]));
				store.dispatch(actions.onSelectDataType('Country', ids[6]));
				store.dispatch(actions.onSelectDataType('LatLng', ids[7]));
				store.dispatch(actions.onSelectDataType('Alphanumeric', ids[8]));
				store.dispatch(actions.onSelectDataType('Boolean', ids[8]));

				store.dispatch(actions.refreshPreview(ids));

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
