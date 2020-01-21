import * as React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ListItemText from '@material-ui/core/ListItemText';
import LanguageIcon from '@material-ui/icons/Language';
import HtmlTooltip from '../tooltip/HtmlTooltip';
import * as styles from './Footer.scss';
import { Github } from '../icons';
import { GDLocale } from '../../../types/general';
import C from '../../core/constants';

export type FooterProps = {
	locale: GDLocale,
	i18n: any,
	onChangeLocale: (a: any) => void
};

const options = [
	{ value: 'de', label: 'Deutsch' },
	{ value: 'en', label: 'English' },
	{ value: 'es', label: 'Español' },
	{ value: 'fr', label: 'Français' },
	{ value: 'nl', label: 'Nederlands' },
	{ value: 'zh', label: '中文' }
];

const useListStyles = makeStyles(() =>
	createStyles({
		root: {
			width: '100%',
			maxWidth: 360
		}
	})
);

const Footer = ({ locale, onChangeLocale }: FooterProps): JSX.Element => {
	const [localeTooltipVisible, setLocaleTooltipVisibility] = React.useState(false);
	const listClasses = useListStyles();

	return (
		<footer className={styles.footer}>
			<div>
				<ul>
					<li>
						<a href={C.GITHUB_URL} target="_blank" rel="noopener noreferrer">
							<Github />
						</a>
					</li>
					<li>
						<ClickAwayListener onClickAway={(): void => setLocaleTooltipVisibility(false)}>
							<HtmlTooltip
								arrow
								open={localeTooltipVisible}
								placement="top"
								disableFocusListener
								disableTouchListener
								interactive
								onClose={(): void => setLocaleTooltipVisibility(false)}
								title={
									<div className={listClasses.root}>
										<List>
											{options.map((currLocale: any): JSX.Element => (
												<ListItem
													button
													key={currLocale.value}
													className={locale === currLocale.value ? styles.selectedLocale : ''}
													onClick={(): void => onChangeLocale(currLocale.value)}>
													<ListItemText primary={currLocale.label} />
												</ListItem>
											))}
										</List>
									</div>
								}
							>
								<LanguageIcon fontSize="large" onClick={(): void=> setLocaleTooltipVisibility(true)} />
							</HtmlTooltip>
						</ClickAwayListener>
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
