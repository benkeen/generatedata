import * as React from 'react';
import * as styles from './Header.scss';
import { GDLocale } from '../../../types/general';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CheckBox from '@material-ui/icons/Checkbox';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';
import SwapHoriz from '@material-ui/icons/SwapHoriz';
import SwapVert from '@material-ui/icons/SwapVert';
import { BuilderLayout } from '../builder/Builder.component';

export type HeaderProps = {
	toggleGrid: () => void;
	togglePreview: () => void;
	toggleLayout: () => void;
	isLoggedIn: boolean;
	onChangeLocale: Function;
	isGridVisible: boolean;
	isPreviewVisible: boolean;
	locale: GDLocale;
	builderLayout: BuilderLayout;
	i18n: any;
}

const Header = ({
	isGridVisible, isPreviewVisible, toggleGrid, togglePreview, toggleLayout, i18n, builderLayout
}: HeaderProps): JSX.Element => {
	const GridIcon = isGridVisible ? CheckBox : CheckBoxOutlineBlank;
	const PreviewIcon = isPreviewVisible ? CheckBox : CheckBoxOutlineBlank;
	const ToggleDirectionIcon = builderLayout === 'horizontal' ? SwapHoriz : SwapVert;

	return (
		<header className={styles.header}>
			<div>
				<h1>
					<img src="./images/logo.png" width={256} height={32} />
				</h1>
				<nav>
					<ul>
						<li><a href="#">Login</a></li>
					</ul>
					<ButtonGroup aria-label="" size="small" style={{ margin: '0 6px 0 12px' }}>
						<Button className={isGridVisible ? styles.btnSelected : ''} onClick={toggleGrid} startIcon={<GridIcon fontSize="small" />}>{i18n.grid}</Button>
						<Button className={isPreviewVisible ? styles.btnSelected : ''} onClick={togglePreview} startIcon={<PreviewIcon />}>{i18n.preview}</Button>
						<Button onClick={toggleLayout}>
							<ToggleDirectionIcon />
						</Button>
					</ButtonGroup>
				</nav>
			</div>
		</header>
	);
};

export default Header;
