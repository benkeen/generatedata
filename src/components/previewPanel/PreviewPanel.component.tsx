import * as React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import * as styles from './PreviewPanel.scss';


const PreviewPanel = () => {
    return (
        <div className={styles.previewPanel}>
            <div className={styles.topRow}>
                <span>horizontal/vertical</span>
                <CloseIcon fontSize="large" />
            </div>
        </div>
    );
};

export default PreviewPanel;
