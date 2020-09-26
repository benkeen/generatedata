import * as React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ListItemText from '@material-ui/core/ListItemText';
import LanguageIcon from '@material-ui/icons/Language';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { HtmlTooltip } from '~components/tooltips';
import styles from './Footer.scss';
import { Github } from '~components/icons';
import Link from '~components/Link';
import { GDLocale } from '~types/general';
import C from '../constants';

export type FooterProps = {
	locale: GDLocale;
	i18n: any;
	scriptVersion: string;
	onChangeLocale: (a: any) => void;
	onGenerate: () => void;
	isEnabled: boolean;
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

const Footer = ({ i18n, locale, isEnabled, onChangeLocale, scriptVersion, onGenerate }: FooterProps): JSX.Element => {
	const [localeTooltipVisible, setLocaleTooltipVisibility] = React.useState(false);
	const listClasses = useListStyles();

	return (
		<footer className={styles.footer}>
			<div>
				<ul>
					<li>
						<Link url={C.GITHUB_URL} offSite={true}>
							<Github />
						</Link>
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
								<LanguageIcon fontSize="large" onClick={(): void => setLocaleTooltipVisibility(true)} />
							</HtmlTooltip>
						</ClickAwayListener>
					</li>
					<li>{scriptVersion}</li>
				</ul>

				<div>
					<Button onClick={onGenerate} variant="contained" color="primary" disableElevation disabled={!isEnabled}>
						<span dangerouslySetInnerHTML={{ __html: i18n.generate }} />
						<KeyboardArrowRightIcon />
					</Button>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
