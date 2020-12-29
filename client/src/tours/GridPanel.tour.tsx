import React from 'react';
import Reactour, { ReactourStepPosition } from 'reactour';
import Button from '@material-ui/core/Button';
import env from '../../_env';
import { getI18nString, getStrings } from '~utils/langUtils';
import store from '~core/store';
import * as actions from '~store/generator/generator.actions';
import * as selectors from '~store/generator/generator.selectors';

const Step1 = (): JSX.Element => {
	const { core: i18n } = getStrings();

	return (
		<>
			<h2>{i18n.theGridPanel}</h2>

			<p>
				The grid panel is where you build the data you want to generate. For this tour, we've hidden
				the preview panel (see the unchecked "Preview" button at the bottom right of the page) to give us
				more space to work with. We've also added 10 rows of different data types, just for illustration
				purposes.
			</p>

			<p>
				Let's start with the table columns.
			</p>
		</>
	);
};

const Step2 = (): JSX.Element => {
	const { core: i18n } = getStrings();

	return (
		<>
			<h2>Columns</h2>

			<p>
				The grid will show as many of the columns as it can, depending on your screen real estate. When it's
				too small, it'll show a cog icon for each row that opens up an infotip with the hidden column content.
				The next few steps explain each of the columns, using the first Names row as a demonstration.
			</p>
		</>
	);
};

const Step3 = (): JSX.Element => {
	const { core: i18n } = getStrings();

	return (
		<>
			<h2>The row number</h2>

			<p>
				The first column in the grid contains the row number. To reorder the row, just click and drag
				this element up or down.
			</p>

			<p>
				The value in the header for this column shows the total number of rows in your grid. This can
				be handy when you have really large data sets and it goes offscreen.
			</p>
		</>
	);
};

const Step4 = (): JSX.Element => {
	const { core: i18n } = getStrings();

	return (
		<>
			<h2>Data Type</h2>
			<p>
				This contains a dropdown listing every available Data Type. When you select a value, it will load that
				Data Type into memory and update the remainder of the columns for that row. Each Data Type has its own
				unique settings.
			</p>
		</>
	);
};

const Step5 = (): JSX.Element => {
	const { core: i18n } = getStrings();

	return (
		<>
			<h2>Help Icon</h2>

			<p>
				When you select a Data Type in the previous column, an icon will appear here. Clicking it opens
				a help dialog containing information about that Data Type (see the next tour step for a demo).
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

const Step8 = ({ close }: any): JSX.Element => {
	const { core: i18n } = getStrings();

	return (
		<>
			<h2>{i18n.tourComplete}</h2>

			<p>
				{i18n.generatorTourCompleteDesc}
			</p>

			<p>
				<Button
					size="medium"
					color="primary"
					variant="outlined"
					onClick={close}>{i18n.tryDifferentTour}</Button>
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
				store.dispatch(actions.clearGrid('dataOnly', false));
				store.dispatch(actions.addRows(10));

				const state = store.getState();
				const rows = selectors.getSortedRowsArray(state);

				store.dispatch(actions.onSelectDataType('Names', rows[0].id));
				store.dispatch(actions.onSelectDataType('Phone', rows[1].id));
				store.dispatch(actions.onSelectDataType('Email', rows[2].id));
				store.dispatch(actions.onSelectDataType('StreetAddress', rows[3].id));
				store.dispatch(actions.onSelectDataType('City', rows[4].id));
				store.dispatch(actions.onSelectDataType('Region', rows[5].id));
				store.dispatch(actions.onSelectDataType('Country', rows[6].id));
				store.dispatch(actions.onSelectDataType('LatLng', rows[7].id));
				store.dispatch(actions.onSelectDataType('Alphanumeric', rows[8].id));
				store.dispatch(actions.onSelectDataType('Boolean', rows[9].id));

				if (!selectors.isGridVisible(state)) {
					store.dispatch(actions.toggleGrid());
				}
				if (selectors.isPreviewVisible(state)) {
					store.dispatch(actions.togglePreview());
				}
			}, 100);
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
		selector: '.tour-gridRow>div:nth-child(2)>div:nth-child(1)',
		style: {
			...commonStyles
		},
		position: 'bottom' as ReactourStepPosition
	},
	{
		content: Step5,
		selector: '.tour-gridRow>div:nth-child(2)>div:nth-child(2)',
		style: {
			...commonStyles
		},
		position: 'bottom' as ReactourStepPosition
	},
	{
		content: Step6,
		// selector: '.tour-helpDialog',
		style: {
			...commonStyles
		},
		action: (): void => {
			const els = document.querySelectorAll('.tour-gridRow>div:nth-child(2)>div:nth-child(2) svg');

			// @ts-ignore-line
			els[0].click();
		}
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
		content: Step8,
		style: {
			...commonStyles
		}
	}
];

export type TourProps = {
	isOpen: boolean;
	onClose: () => void;
	maskClassName: string;
	closeWithMask: boolean;
	disableInteraction: boolean;
	accentColor: string;
	className: string;
};

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
