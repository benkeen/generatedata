import * as React from 'react';
import * as styles from './Header.scss';
import { GDLocale } from '../../../types/general';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

type HeaderProps = {
    isLoggedIn: boolean;
    onChangeLocale: Function;
    locale: GDLocale;
    i18n: any;
}

const Header = ({ isLoggedIn, i18n }: HeaderProps) => {
	let navOptions = [
        <li><a href="#">About</a></li>,
        <li><a href="#">Doc</a></li>,
        <li><a href="#">News</a></li>,
        <li><a href="#">Donate!</a></li>,
        <li><a href="#">Login</a></li>
    ];

	// if (isLoggedIn) {
	// 	navOptions = (
	// 		<>
	// 			<li id="gdUserAccount"><a href="#">{i18n.your_account}</a></li>
	// 			<li id="gdLogout"><a href="#">{i18n.logout}</a></li>
	// 		</>
	// 	);
	// } else {
	// 	navOptions = <li id="gdLogin"><a href="#">{i18n.login}</a></li>;
	// }

	return (
		<header className={styles.header}>
			<div>
				<h1>generatedata.com</h1>

				<nav>
					<ul>
						{navOptions}
					</ul>
                    <ButtonGroup aria-label="" size="small" style={{ margin: '0 6px 0 12px' }}>
                        <Button>Grid</Button>
                        <Button>Preview</Button>
                    </ButtonGroup>
				</nav>
			</div>
		</header>
	);
};

export default Header;
