import React from 'react';
import Reactour from 'reactour';


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
			The grid panel is where you construct what data you want to generate. Here, you can customize the Data Types,
			their configurations and the order in which they appear. See the separate tour on the Grid Panel for more
			detailed information on this panel.
		</p>
	</>
);

const Step3 = (): JSX.Element => (
	<>
		<h2>The Preview Panel</h2>

		<p>
			This panel gives you a preview of the data you're generating, while you're building it. The button at the
			top-right shows the Export Type (the format of the data). When clicking it
		</p>
	</>
);

const Step4 = (): JSX.Element => (
	<>
		<h2>Panel controls</h2>

		<p>
			At the bottom of the page, you'll find the panel controls. These let you hide/show the Grid and Preview
			panels, which can be helpful when you are working with smaller screen dimensions. You can also toggle
			the direction of the two panels (left-right, top-bottom) if you wish.
		</p>

		<p>
			The last icon in the panel controls lets you clear the page so you can start afresh.
		</p>
	</>
);

const Step5 = (): JSX.Element => (
	<>
		<h2></h2>
	</>
);


const steps = [
	{
		content: Step1
	},
	{
		content: Step2,
		selector: '.gdGridPanel>div:first-child'
	},
	{
		content: Step3,
		selector: '.gdGridPanel>div:nth-child(3)'
	},
	{
		content: Step4,
		selector: '.tour-panelControls'
	},
	{
		content: Step5,
		selector: ''
	}
];

export type TourProps = {
	isOpen: boolean;
	onClose: () => void;
	maskClassName: string;
};

const Tour = ({ isOpen, onClose, maskClassName }: TourProps) => {
	return (
		<Reactour
			steps={steps}
			isOpen={isOpen}
			onRequestClose={onClose}
			maskClassName={maskClassName}
			maskSpace={0}
			rounded={6}
		/>
	);
};

export default Tour;
