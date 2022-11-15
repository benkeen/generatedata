import React from 'react';
import { useWindowSize } from 'react-hooks-window-size';
import SplitPane from 'react-split-pane';
import Grid from './grid/Grid.container';
import Preview from './previewPanel/PreviewPanel.container';
import { GeneratorPanel } from '~types/general';
import ExportSettings from './exportSettings/ExportSettings.container';
import ActivityPanel from '../generationPanel/ActivityPanel.container';
import GenerationSettings from '../generationPanel/GenerationSettings.container';
import TourDialog from '~core/dialogs/tourIntro/TourIntro.container';
import DataSetHistory from './dataSetHistory/DataSetHistory.container';
import HelpDialog from '../dialogs/help/HelpDialog.container';
import ClearPageDialog from '../dialogs/clearPage/ClearPage.container';
import SchemaDialog from '../dialogs/schema/Schema.container';
import IncompatibleBrowser from './IncompatibleBrowser.component';
import * as generalUtils from '../../utils/generalUtils';
import C from '../constants';
import './Generator.scss';

export const enum GeneratorLayout {
	horizontal = 'horizontal',
	vertical = 'vertical'
}

export type GeneratorProps = {
	i18n: any;
	isGridVisible: boolean;
	isPreviewVisible: boolean;
	generatorLayout: GeneratorLayout;
	onResizePanels: (size: number) => void;
	lastLayoutWidth: number | null;
	lastLayoutHeight: number | null;
	smallScreenVisiblePanel: GeneratorPanel;
	showDataSetHistory: boolean;
}

const Builder = ({
	isGridVisible, isPreviewVisible, generatorLayout, onResizePanels, lastLayoutWidth, lastLayoutHeight,
	smallScreenVisiblePanel, showDataSetHistory, i18n
}: GeneratorProps): JSX.Element => {

	const windowSize = useWindowSize();
	const onResize = (size: number): void => onResizePanels(size);

	let minSize: number;
	let maxSize: number;
	let defaultSize: number | string = '50%';
	if (generatorLayout === GeneratorLayout.vertical) {
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
		if (generalUtils.isSafari) {
			return <IncompatibleBrowser i18n={i18n} />;
		}

		if (windowSize.width < C.SMALL_SCREEN_WIDTH) {
			return smallScreenVisiblePanel === 'grid' ? <Grid /> : <Preview />;
		}

		// data set history only available on desktop
		if (showDataSetHistory) {
			return <Preview />;
		}

		if (isGridVisible && isPreviewVisible) {
			return (
				/* @ts-ignore-line */
				<SplitPane
					className="gdGridPanel"
					split={generatorLayout}
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
		<>
			<div style={{ height: '100%' }}>
				<div style={{ height: '100%', position: 'relative' }}>
					{getContent()}
				</div>
				<ExportSettings />
				<DataSetHistory />
				<GenerationSettings />
				<ActivityPanel />
				<TourDialog />
				<ClearPageDialog />
				<HelpDialog />
				<SchemaDialog />
			</div>
		</>
	);
};
export default Builder;
