import React from 'react';
import Reactour from 'reactour';
import Button from '@material-ui/core/Button';
import env from '../../_env';

const Step1 = (): JSX.Element => (
	<>
		<h2>Intro to the Generator</h2>

		<p>
			This tour gives you a high-level introduction to the main features of the Data Generator.
			Let's get started!
		</p>
	</>
);

const Step2 = (): JSX.Element => (
	<>
		<h2>The Grid Panel</h2>

		<p>
			The grid panel is where you construct what data you want to generate. Here you can choose the Data Types,
			how they're configured and the order in which they appear. See the separate tour on the Grid Panel for more
			detailed information on this panel.
		</p>
	</>
);

const Step3 = (): JSX.Element => (
	<>
		<h2>The Preview Panel</h2>

		<p>
			This panel gives you a preview of the data you're generating, while you're constructing it. Any changes you
			make in the grid panel will be automatically shown here. The button at the top-left shows the
			selected format of the data being generated (e.g. SQL, XML, CSV etc.). To change the format, just click on
			the button.
		</p>
		<p>
			For more info on this panel, check out the Preview Panel tour.
		</p>
	</>
);

const Step4 = (): JSX.Element => (
	<>
		<h2>The Data Set Name</h2>

		<p>
			This is where you go to name your data set. Please note that you'll need an account on the site and to be
			logged in in order to name your data sets. When you save your data sets, this name gives you a convenient
			label to track what data set is what.
		</p>
	</>
);

const Step5 = (): JSX.Element => (
	<>
		<h2>Panel controls</h2>

		<p>
			These are the panel controls. These let you hide/show the Grid and Preview panels, which can be helpful
			if you have limited screen real estate. You can also toggle the placement of the two panels (left-right,
			top-bottom) to adjust it to however you wish.
		</p>

		<p>
			The last icon in the panel controls lets you clear the page so you can start afresh.
		</p>
	</>
);

const Step6 = (): JSX.Element => (
	<>
		<h2>The Save Button</h2>

		<p>
			If you have a user account on the site, this button will save your data set. If you're not logged in, it will
			prompt you to login first. The system keeps a history of the last {env.maxDataSetHistorySize} changes to a
			Data Set, so you can always go back and view older versions.
		</p>
	</>
);

const Step7 = (): JSX.Element => (
	<>
		<h2>The Generate Button</h2>

		<p>
			And finally, once you've finished configuring your data set and confirmed that it looks how you want, it's time to
			generate some data in volume! Click this button to generate your data. Depending on the number of rows in
			the data grid and the number of rows you want to generate, this may take some time.
		</p>
	</>
);


const Step8 = ({ close }: any): JSX.Element => (
	<>
		<h2>Complete!</h2>

		<p>
			<Button
				size="medium"
				color="primary"
				variant="outlined"
				onClick={close}>Try a different tour</Button>
		</p>
	</>
);

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
		navDotAriaLabel: 'Intro'
	},
	{
		content: Step2,
		selector: '.gdGridPanel>div:first-child',
		style: {
			...commonStyles
		},
		navDotAriaLabel: 'Grid Panel'
	},
	{
		content: Step3,
		selector: '.gdGridPanel>div:nth-child(3)',
		style: {
			...commonStyles,
			margin: -10,
			marginLeft: 10
		}
	},
	{
		content: Step4,
		selector: '.tour-dataSetName',
		style: {
			...commonStyles
		}
	},
	{
		content: Step5,
		selector: '.tour-panelControls',
		style: {
			...commonStyles,
			marginLeft: -10
		}
	},
	{
		content: Step6,
		selector: '.tour-saveButton',
		style: {
			...commonStyles,
			marginRight: -20
		}
	},
	{
		content: Step7,
		selector: '.tour-generateButton',
		style: {
			...commonStyles,
			marginRight: -20
		}
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

const Tour = ({ isOpen, onClose, maskClassName, closeWithMask, disableInteraction, accentColor, className }: TourProps) => {
	return (
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
};

export default Tour;
