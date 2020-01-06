import * as React from 'react';
import Button from '@material-ui/core/Button';
import * as styles from './Footer.scss';
import Dropdown from '../dropdown/Dropdown';
import { GDLocale } from '../../../types/general';

type FooterProps = {
    locale: GDLocale,
    onChangeLocale: (a: any) => void;
}

const Footer = ({ locale, onChangeLocale }: FooterProps) => {
    const options = [
        { value: 'de', label: 'Deutsch' },
        { value: 'en', label: 'English' },
        { value: 'es', label: 'Español' },
        { value: 'fr', label: 'Français' },
        { value: 'nl', label: 'Nederlands' },
        { value: 'zh', label: '中文' }
    ];

	return (
		<footer className={styles.footer}>
            <div>
                <ul>
                    <li>
                        <Dropdown
                            className={styles.selectLocale}
                            onChange={(item: any) => onChangeLocale(item.value)}
                            value={locale}
                            options={options}
                        />
                    </li>
                    <li>4.0.0</li>
                </ul>

                <div>
                    <Button onClick={() => {}} variant="outlined" color="primary" disableElevation style={{ marginRight: 6 }}>Countries (30)</Button>
                    <Button onClick={() => {}} variant="outlined" color="primary" disableElevation style={{ marginRight: 6 }}>JSON</Button>
                    <span style={{ padding: '6px 12px 0 6px', color: '#dddddd' }}>|</span>
                    <Button onClick={() => {}} variant="contained" color="primary" disableElevation>Generate &raquo;</Button>
                </div>
            </div>
		</footer>
	);
};

export default Footer;
