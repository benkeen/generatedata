import * as React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '../components/grid/Grid.container';
import Preview from '../components/previewPanel/PreviewPanel.container';
import ResultsPanel from '../components/resultsPanel/ResultsPanel.container';

type SubPage = 'grid' | 'results';

const GeneratePage = () => {
    const [subPage, setSubpage] = React.useState<SubPage>('grid');

    let content;
    if (subPage === 'grid') {
        content = (
            <>
                <div style={{ margin: '6px 0' }}>
                    <ButtonGroup size="small" aria-label="">
                        <Button>Grid</Button>
                        <Button>Preview</Button>
                    </ButtonGroup>
                </div>

                <Grid />
                <Preview />
            </>
        );
    } else {
        content = (
            <>
                <span onClick={() => setSubpage('grid')}>&laquo; back</span>
                <ResultsPanel />
            </>
        );
    }

	return (
		<>
            {content}
		</>
	);
};
export default GeneratePage;
