import React from 'react';
import Button from '@material-ui/core/Button';

// @ts-ignore-line
import Reactour from 'reactour';


const TakeTour = () => (
	<>
		<h2>Take a tour!</h2>

		<p>
			Pick one of the tours on th.
		</p>

		<Button variant="contained" size="small">Continue &raquo;</Button>
	</>
);

const steps = [
	{
		content: TakeTour,
		style: {
			borderRadius: 5
		}
	},
	{
		content: 'Grid panel',
		selector: '.gdGridPanel>div:first-child',
		maskSpace: 0
	},
	{
		content: 'Preview panel',
		selector: '.gdGridPanel>div:nth-child(3)',
		maskSpace: 0
	}
];

export type MainTourProps = {
	isOpen: boolean;
	onClose: () => void;
};

const MainTour = ({ isOpen, onClose }: MainTourProps) => {
	return (
		<Reactour
			steps={steps}
			isOpen={isOpen}
			onRequestClose={onClose} />
	);
};

export default MainTour;

