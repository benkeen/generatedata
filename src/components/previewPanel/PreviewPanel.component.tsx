import * as React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import * as styles from './PreviewPanel.scss';


export type PreviewPanelProps = {
    togglePreview: () => void;
    toggleLayout: () => void;
};


const PreviewPanel = ({ togglePreview, toggleLayout }: PreviewPanelProps) => {
    return (
        <div className={styles.previewPanel}>
            <div className={styles.topRow}>
                <span onClick={toggleLayout}>horizontal/vertical</span>
                <span className={styles.closePanel} onClick={togglePreview}><CloseIcon fontSize="large" /></span>
            </div>
        </div>
    );
};

export default PreviewPanel;
