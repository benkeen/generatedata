import * as React from 'react';
import { useWindowSize } from 'react-hooks-window-size';
import Grid from '../grid/Grid.container';
import Preview from '../previewPanel/PreviewPanel.container';
import SplitPane from 'react-split-pane';
import ExportSettings from '../exportSettings/ExportSettings.container';
import GenerationPanel from '../generationPanel/GenerationPanel.container';
import './Builder.scss';

export type BuilderLayout = 'horizontal' | 'vertical';
export type BuilderProps = {
	isGridVisible: boolean;
	isPreviewVisible: boolean;
	builderLayout: BuilderLayout;
	onResizePanels: (size: number) => void;
	lastVerticalWidth: number | null;
	lastHorizontalWidth: number | null;
}

const Builder = ({
	isGridVisible, isPreviewVisible, builderLayout, onResizePanels, lastVerticalWidth, lastHorizontalWidth
}: BuilderProps): JSX.Element => {
	const windowSize = useWindowSize();
	const onResize = (size: number) => onResizePanels(size);

	let minSize: number;
	let maxSize: number;
	let defaultSize: number | string = '50%';
	if (builderLayout === 'vertical') {
		minSize = 350;
		maxSize = windowSize.width - 350;
		if (lastVerticalWidth) {
			defaultSize = lastVerticalWidth < maxSize ? lastVerticalWidth : maxSize;
		}
	} else {
		minSize = 160;
		maxSize = windowSize.height / 2;
		if (lastHorizontalWidth) {
			defaultSize = lastHorizontalWidth < maxSize ? lastHorizontalWidth : maxSize;
		}
	}

	// TODO min browser dimension to show the full builder (both tabs) is 700x400

	const getContent = (): JSX.Element => {
		if (isGridVisible && isPreviewVisible) {
			return (
				<SplitPane
					split={builderLayout}
					minSize={minSize}
					maxSize={maxSize}
					defaultSize={defaultSize}
					onChange={onResize}>
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
			<GenerationPanel />
		</div>
	);
};
export default Builder;
