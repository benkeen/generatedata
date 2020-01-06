import * as React from 'react';
import Button from '@material-ui/core/Button';
import * as styles from './Footer.scss';
import Dropdown from '../dropdown/Dropdown';
import LanguageIcon from '@material-ui/icons/Language';
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
                        <svg height="24" className="octicon octicon-mark-github" viewBox="0 0 16 16" version="1.1"
                             width="24" aria-hidden="true">
                            <path fill-rule="evenodd"
                                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                        </svg>
                    </li>
                    <li>
                        <LanguageIcon fontSize="large" />
                    </li>
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
