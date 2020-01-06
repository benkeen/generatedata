import * as React from 'react';
import Dropdown from '../dropdown/Dropdown';
import * as styles from './Header.scss';
import { GDLocale } from "../../../types/general";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

type HeaderProps = {
    isLoggedIn: boolean;
    onChangeLocale: Function;
    locale: GDLocale;
    i18n: any;
}

const Header = ({ isLoggedIn, onChangeLocale, locale, i18n }: HeaderProps) => {
	let navOptions;

	if (isLoggedIn) {
		navOptions = (
			<>
				<li id="gdUserAccount"><a href="#">{i18n.your_account}</a></li>
				<li id="gdLogout"><a href="#">{i18n.logout}</a></li>
			</>
		);
	} else {
		navOptions = <li id="gdLogin"><a href="#">{i18n.login}</a></li>;
	}

	const options = [
		{ value: 'de', label: 'Deutsch' },
		{ value: 'en', label: 'English' },
		{ value: 'es', label: 'Español' },
		{ value: 'fr', label: 'Français' },
		{ value: 'nl', label: 'Nederlands' },
		{ value: 'zh', label: '中文' }
	];

	return (
		<header className={styles.header}>
			<div>
				<h1>generatedata.com</h1>

				<nav>
					<ul>
						{navOptions}
					</ul>

                    <ButtonGroup aria-label="" style={{ marginRight: 6 }}>
                        <Button>Grid</Button>
                        <Button>Preview</Button>
                    </ButtonGroup>

                    <Dropdown
						className={styles.selectLocale}
						onChange={(item: any) => onChangeLocale(item.value)}
						value={locale}
						options={options}
					/>
				</nav>
			</div>
		</header>
	);
};

export default Header;
