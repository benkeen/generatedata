import * as React from 'react';
import Grid from '../grid/Grid.container';
import Preview from '../previewPanel/PreviewPanel.container';
// import ResultsPanel from '../resultsPanel/ResultsPanel.container';
import ControlRow from './ControlRow.component';

// type SubPage = 'grid' | 'results';

export type BuilderLayout = 'horizontal' | 'vertical';

export type BuilderProps = {
    isGridVisible: boolean;
    isPreviewVisible: boolean;
    builderLayout: BuilderLayout;
}

const Builder = ({ isGridVisible, isPreviewVisible }: BuilderProps) => {
    // const [subPage, setSubpage] = React.useState<SubPage>('grid');

    // let content;
    // if (subPage === 'grid') {
    //     content = (
    //     );
    // } else {
    //     content = (
    //         <>
    //             <span onClick={() => setSubpage('grid')}>&laquo; back</span>
    //             <ResultsPanel />
    //         </>
    //     );
    // }

	return (
        <div style={{ height: '100%' }}>
            <ControlRow />
            <Grid />
            <Preview />
        </div>
	);
};
export default Builder;
