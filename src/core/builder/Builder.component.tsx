import * as React from 'react';
import { useWindowSize } from 'react-hooks-window-size';
import Grid from '../grid/Grid.container';
import Preview from '../previewPanel/PreviewPanel.container';
import SplitPane from 'react-split-pane';
import ExportSettings from '../exportSettings/ExportSettings.container';
import GenerationPanel from '../generationPanel/GenerationPanel.container';
import C from '../constants';
import './Builder.scss';
import { GeneratorPanel } from '../store/generator/generator.reducer';

export type BuilderLayout = 'horizontal' | 'vertical';
export type BuilderProps = {
	isGridVisible: boolean;
	isPreviewVisible: boolean;
	builderLayout: BuilderLayout;
	onResizePanels: (size: number) => void;
	lastLayoutWidth: number | null;
	lastLayoutHeight: number | null;
	smallScreenVisiblePanel: GeneratorPanel;
}

const Builder = ({
	isGridVisible, isPreviewVisible, builderLayout, onResizePanels, lastLayoutWidth, lastLayoutHeight,
	smallScreenVisiblePanel
}: BuilderProps): JSX.Element => {
	const windowSize = useWindowSize();
	const onResize = (size: number): void => onResizePanels(size);

	let minSize: number;
	let maxSize: number;
	let defaultSize: number | string = '50%';
	if (builderLayout === 'vertical') {
		minSize = 350;
		maxSize = windowSize.width - 350;
		if (lastLayoutWidth) {
			defaultSize = lastLayoutWidth < maxSize ? lastLayoutWidth : maxSize;
		}
	} else {
		minSize = 100;
		maxSize = (windowSize.height - (C.HEADER_HEIGHT + C.FOOTER_HEIGHT)) - 100;
		if (lastLayoutHeight) {
			defaultSize = lastLayoutHeight < maxSize ? lastLayoutHeight : maxSize;
		}
	}

	const getContent = (): JSX.Element => {
		if (windowSize.width < C.SMALL_SCREEN_WIDTH) {
			return smallScreenVisiblePanel === 'grid' ? <Grid /> : <Preview />;
		}

		if (isGridVisible && isPreviewVisible) {
			return (
				<SplitPane
					split={builderLayout}
					minSize={minSize}
					maxSize={maxSize}
					defaultSize={defaultSize}
					size={defaultSize}
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
