import * as React from 'react';
import Button from '@material-ui/core/Button';
import * as styles from './Footer.scss';

const Footer = () => {
	return (
		<footer className={styles.footer}>
            <div>
                <ul>
                    <li>4.0.0</li>
                </ul>

                <div>
                    <Button onClick={() => {}} variant="outlined" color="primary" disableElevation style={{ marginRight: 6 }}>Countries (all)</Button>
                    <Button onClick={() => {}} variant="outlined" color="primary" disableElevation style={{ marginRight: 6 }}>JSON</Button>
                    <span style={{ padding: '6px 12px 0 6px', color: '#dddddd' }}>|</span>
                    <Button onClick={() => {}} variant="contained" color="primary" disableElevation>Generate &raquo;</Button>
                </div>
            </div>
		</footer>
	);
};

export default Footer;
