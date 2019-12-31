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
                    JSON
                    <Button onClick={() => {}} variant="contained" color="primary" disableElevation>Generate &raquo;</Button>
                </div>
            </div>
		</footer>
	);
};

export default Footer;
