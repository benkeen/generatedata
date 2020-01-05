import * as React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';


const ControlRow = () => (
    <div>
        <Button onClick={() => {}} variant="outlined" color="primary" disableElevation style={{ marginRight: 6 }}>Countries (all)</Button>
        <div style={{ margin: '6px 0' }}>
            <ButtonGroup size="small" aria-label="">
                <Button>Grid</Button>
                <Button>Preview</Button>
            </ButtonGroup>
        </div>
    </div>
);

export default ControlRow;
