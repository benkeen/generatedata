import * as React from 'react';
import Grid from '../grid/Grid.container';
import Preview from '../previewPanel/PreviewPanel.container';
import SplitPane from 'react-split-pane';
// import ResultsPanel from '../resultsPanel/ResultsPanel.container';
import ControlRow from './ControlRow.component';
import './Builder.scss';

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
            <SplitPane split="vertical" minSize={50} defaultSize="50%">
                <Grid />
                <Preview />
            </SplitPane>
        </div>
	);
};
export default Builder;
