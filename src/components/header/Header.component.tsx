import * as React from 'react';
import * as styles from './Header.scss';
import { GDLocale } from '../../../types/general';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CheckBox from '@material-ui/icons/Checkbox';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';

export type HeaderProps = {
	toggleGrid: () => void;
	togglePreview: () => void;
	isLoggedIn: boolean;
	onChangeLocale: Function;
	isGridVisible: boolean;
	isPreviewVisible: boolean;
	locale: GDLocale;
	i18n: any;
}

const Header = ({ isGridVisible, isPreviewVisible, toggleGrid, togglePreview, i18n }: HeaderProps): JSX.Element => {
	const GridIcon = isGridVisible ? CheckBox : CheckBoxOutlineBlank;
	const PreviewIcon = isPreviewVisible ? CheckBox : CheckBoxOutlineBlank;

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
						<Button className={isGridVisible ? styles.btnSelected : ''} onClick={toggleGrid} startIcon={<GridIcon fontSize="small" />}>{i18n.grid}</Button>
						<Button className={isPreviewVisible ? styles.btnSelected : ''} onClick={togglePreview} startIcon={<PreviewIcon />}>{i18n.preview}</Button>
					</ButtonGroup>
				</nav>
			</div>
		</header>
	);
};

export default Header;
