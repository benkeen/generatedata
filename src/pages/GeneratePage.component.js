import React from 'react';
import Grid from '../components/grid/Grid.container';
import Button from '@material-ui/core/Button';

const GeneratePage = ({ generate }) => {
	return (
		<div>
			<Grid />
			<br />
			<Button onClick={generate} variant="contained" color="primary" disableElevation>Generate</Button>
		</div>
	);
};

export default GeneratePage;
