import * as React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import * as styles from './Builder.scss';


const ControlRow = () => (
    <div className={styles.controlRow}>
        <Button onClick={() => {}} variant="outlined" size="small" color="primary" disableElevation style={{ marginRight: 6 }}>Countries (all)</Button>
        <div style={{ margin: '6px 0' }}>
            <ButtonGroup size="small" aria-label="">
                <Button>Grid</Button>
                <Button>Preview</Button>
            </ButtonGroup>
        </div>
    </div>
);

export default ControlRow;
