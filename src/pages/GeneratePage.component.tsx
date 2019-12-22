import * as React from 'react';
import Grid from '../components/grid/Grid.container';
import Button from '@material-ui/core/Button';

type GeneratePageProps = {
    generate: () => void;
}

const GeneratePage = ({ generate }: GeneratePageProps) => {
	return (
		<>
			<Grid />
			<br />
			<Button onClick={generate} variant="contained" color="primary" disableElevation>Generate</Button>
		</>
	);
};

export default GeneratePage;
