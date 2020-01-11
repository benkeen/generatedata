import * as React from 'react';
import Dropdown from '../dropdown/Dropdown';
import CloseIcon from '@material-ui/icons/Close';
import SwapHoriz from '@material-ui/icons/SwapHoriz';
import SwapVert from '@material-ui/icons/SwapVert';
import IconButton from '@material-ui/core/IconButton';
import { getArrayOfSize } from '../../utils/arrayUtils';
import * as styles from './PreviewPanel.scss';
import { BuilderLayout } from '../builder/Builder.component';

// TODO
import ExportTypePreview from '../../plugins/exportTypes/JSON/Preview.container';
import { GenerationTemplate } from '../../../types/general';

export type PreviewPanelProps = {
    numPreviewRows: number;
    builderLayout: BuilderLayout;
    togglePreview: () => void;
    toggleLayout: () => void;
    updateNumPreviewRows: (numRows: number) => void;
    generationTemplate: GenerationTemplate
};

const options = getArrayOfSize(10).map((i, index) => ({ value: index + 1, label: index + 1}));

const PreviewPanel = ({ builderLayout, togglePreview, toggleLayout, numPreviewRows, updateNumPreviewRows, generationTemplate }: PreviewPanelProps) => {
    const ToggleDirectionIcon = builderLayout === 'horizontal' ? SwapHoriz : SwapVert;
    return (
        <div className={styles.previewPanel}>
            <div className={styles.topRow}>
                <span style={{ display: 'flex', flexDirection: 'row' }}>
                    <span onClick={toggleLayout}>
                        <IconButton size="small" aria-label="Toggle layout">
                            <ToggleDirectionIcon fontSize="large" />
                        </IconButton>
                    </span>
                    <span>
                        Num rows:
                        <Dropdown
                            value={numPreviewRows}
                            onChange={(item: any) => updateNumPreviewRows(item.value)}
                            options={options}
                        />
                    </span>
                </span>
                <span className={styles.closePanel} onClick={togglePreview}><CloseIcon fontSize="large" /></span>
            </div>

            <ExportTypePreview
                numPreviewRows={numPreviewRows}
                builderLayout={builderLayout}
                generationTemplate={generationTemplate}
            />
        </div>
    );
};

export default PreviewPanel;






















