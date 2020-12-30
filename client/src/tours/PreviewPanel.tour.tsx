import React from 'react';
import Reactour, { ReactourStepPosition } from 'reactour';
import { getStrings } from '~utils/langUtils';
import store from '~core/store';
import * as actions from '~store/generator/generator.actions';
import * as selectors from '~store/generator/generator.selectors';
import { TourCompleteStep } from './Components.tour';
import { TourProps } from '~types/general';

const Step1 = (): JSX.Element => {
	const { core: i18n } = getStrings();

	return (
		<>
			<h2>{i18n.thePreviewPanel}</h2>
			<p>
				The purpose of the preview panel is to give you a live, visual representation of exactly what data
				you're generating so you don't waste any time. This tour does a quick introduction to how the preview
				panel works.
			</p>
		</>
	);
};

const Step2 = (): JSX.Element => {
	const { core: i18n } = getStrings();

	return (
		<>
			<h2></h2>
			<p>

			</p>
		</>
	);
};

const Step3 = (): JSX.Element => {
	const { core: i18n } = getStrings();

	return (
		<>
			<h2></h2>
			<p>

			</p>
		</>
	);
};

const Step4 = (): JSX.Element => {
	const { core: i18n } = getStrings();

	return (
		<>
			<h2></h2>
			<p>

			</p>
		</>
	);
};

const Step5 = (): JSX.Element => {
	const { core: i18n } = getStrings();

	return (
		<>
			<h2></h2>
			<p>

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

				if (!selectors.isGridVisible(state)) {
					store.dispatch(actions.toggleGrid());
				}
				if (!selectors.isPreviewVisible(state)) {
					store.dispatch(actions.togglePreview());
				}

				store.dispatch(actions.onSelectDataType('Country', rows[0].id));
				store.dispatch(actions.onSelectDataType('Region', rows[1].id));
				store.dispatch(actions.onSelectDataType('City', rows[2].id));
				store.dispatch(actions.onSelectDataType('StreetAddress', rows[3].id));
				store.dispatch(actions.onSelectDataType('PostalZip', rows[4].id));
			}, 10);
		}
	},
	{
		content: Step2,
		style: {
			...commonStyles
		}
	},
	{
		content: Step3,
		style: {
			...commonStyles
		}
	},
	{
		content: Step4,
		style: {
			...commonStyles
		}
	},
	{
		content: Step5,
		style: {
			...commonStyles
		}
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
