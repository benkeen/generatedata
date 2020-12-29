import React from 'react';
import Reactour, { ReactourStepPosition } from 'reactour';
import Button from '@material-ui/core/Button';
import env from '../../_env';
import { getI18nString, getStrings } from '~utils/langUtils';

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
				{i18n.gridPanelTourDesc}
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
		position: 'center' as ReactourStepPosition
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

export const initialTourState = {

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
