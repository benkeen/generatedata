import * as React from 'react';
import Button from '@material-ui/core/Button';
import * as styles from './Footer.scss';
import Dropdown from '../dropdown/Dropdown';
import LanguageIcon from '@material-ui/icons/Language';
import { Github } from '../icons';
import { GDLocale } from '../../../types/general';

export type FooterProps = {
	locale: GDLocale,
	i18n: any,
	onChangeLocale: (a: any) => void
};

const Footer = ({ locale, onChangeLocale }: FooterProps): JSX.Element => {
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
						<Github />
					</li>
					<li>
						<LanguageIcon fontSize="large" />
					</li>
					<li>
						<Dropdown
							className={styles.selectLocale}
							onChange={(item: any): void => onChangeLocale(item.value)}
							value={locale}
							options={options}
						/>
					</li>
					<li>4.0.0</li>
				</ul>

				<div>
					<Button onClick={(): void => { }} variant="outlined" color="primary" disableElevation style={{ marginRight: 6 }}>Countries (30)</Button>
					<Button onClick={(): void => { }} variant="outlined" color="primary" disableElevation style={{ marginRight: 6 }}>JSON</Button>
					<span style={{ padding: '6px 12px 0 6px', color: '#dddddd' }}>|</span>
					<Button onClick={(): void => { }} variant="contained" color="primary" disableElevation>Generate &raquo;</Button>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
