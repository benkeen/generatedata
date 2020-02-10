import * as React from 'react';
import Grid from '../grid/Grid.container';
import Preview from '../previewPanel/PreviewPanel.container';
import SplitPane from 'react-split-pane';
import ExportSettings from '../exportSettings/ExportSettings.container';
import './Builder.scss';

export type BuilderLayout = 'horizontal' | 'vertical';
export type BuilderProps = {
	isGridVisible: boolean;
	isPreviewVisible: boolean;
	builderLayout: BuilderLayout;
}

const Builder = ({ isGridVisible, isPreviewVisible, builderLayout }: BuilderProps): JSX.Element => {
	const getContent = (): JSX.Element => {
		if (isGridVisible && isPreviewVisible) {
			return (
				<SplitPane split={builderLayout} minSize={50} defaultSize="50%">
					<Grid />
					<Preview />
				</SplitPane>
			);
		}
		if (isGridVisible) {
			return <Grid />;
		}
		return <Preview />;
	};

	return (
		<div style={{ height: '100%' }}>
			<div style={{ height: '100%', position: 'relative' }}>
				{getContent()}
			</div>
			<ExportSettings />
		</div>
	);
};
export default Builder;
