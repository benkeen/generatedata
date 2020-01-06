import * as React from 'react';
import * as styles from './Header.scss';
import { GDLocale } from '../../../types/general';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

type HeaderProps = {
    toggleGrid: () => void;
    togglePreview: () => void;
    isLoggedIn: boolean;
    onChangeLocale: Function;
    locale: GDLocale;
    i18n: any;
}

const Header = ({ toggleGrid, togglePreview, isLoggedIn, i18n }: HeaderProps) => {
	return (
		<header className={styles.header}>
			<div>
				<h1>generatedata.com</h1>

				<nav>
					<ul>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Doc</a></li>
                        <li><a href="#">News</a></li>
                        <li><a href="#">Donate!</a></li>
                        <li><a href="#">Login</a></li>
					</ul>
                    <ButtonGroup aria-label="" size="small" style={{ margin: '0 6px 0 12px' }}>
                        <Button onClick={toggleGrid}>Grid</Button>
                        <Button onClick={togglePreview}>Preview</Button>
                    </ButtonGroup>
				</nav>
			</div>
		</header>
	);
};

export default Header;
