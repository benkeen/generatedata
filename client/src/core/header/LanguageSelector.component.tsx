import React, { useCallback } from 'react';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LanguageIcon from '@material-ui/icons/Language';
import { Dialog, DialogContent, DialogTitle } from '~components/dialogs';
import { Tooltip } from '~components/tooltips';
import { DialogLoadingSpinner } from '~components/loaders/loaders';
import { GDLocale } from '~types/general';
import env from '../../../_env';
import * as styles from '~core/header/Header.scss';


const allLocaleOptions = Object.keys(env.allSupportedLocales).map((shortCode) => ({
	value: shortCode,
	label: env.allSupportedLocales[shortCode as GDLocale]
}));

export type SelectorDialogProps = {
	visible: boolean;
	currentLocale: GDLocale;
	onSelect: (locale: GDLocale) => void;
	onClose: () => void;
	loading: boolean;
	onExited: () => void;
	i18n: any;
}

const SelectorDialog = ({ visible, currentLocale, onSelect, onClose, onExited, loading, i18n }: SelectorDialogProps): JSX.Element => {
	return (
		<Dialog onClose={onClose} open={visible} TransitionProps={{ onExited }}>
			<div style={{ width: 400 }}>
				<DialogTitle onClose={onClose} className={styles.title}>
					{i18n.selectLanguage}
					<span className={styles.flags} />
				</DialogTitle>
				<DialogContent dividers>
					<List disablePadding>
						{allLocaleOptions.map((currLocale: any): JSX.Element => (
							<ListItem
								button
								key={currLocale.value}
								className={currentLocale === currLocale.value ? styles.selectedLocale : ''}
								onClick={(): void => onSelect(currLocale.value)}>
								<ListItemText primary={currLocale.label} />
							</ListItem>
						))}
					</List>
				</DialogContent>
			</div>
			<DialogLoadingSpinner visible={loading} />
		</Dialog>
	);
};

export type LanguageSelectorProps = {
	i18n: any;
	locale: GDLocale;
	availableLocales: GDLocale[];
	onChangeLocale: (locale: GDLocale) => void;
	isLocaleFileLoading: boolean;
}

const LanguageSelector = ({ locale, availableLocales, onChangeLocale, isLocaleFileLoading, i18n }: LanguageSelectorProps): JSX.Element | null => {
	const [dialogVisible, setSelectorDialogVisible] = React.useState(false);
	const [lastI18n, setLastI18n] = React.useState(i18n);

	const onShowSelector = useCallback(() => setSelectorDialogVisible(true), []);
	const onHideSelector = useCallback(() => setSelectorDialogVisible(false), []);
	const updateLastI18n = useCallback(() => setLastI18n(i18n), []);

	if (availableLocales.length < 1) {
		return null;
	}

	// note: this actually runs on render as well, but it makes no difference
	React.useEffect(() => {
		if (!isLocaleFileLoading) {
			onHideSelector();
		}
	}, [isLocaleFileLoading]);

	return (
		<li className={styles.localeSelector} key="languageSelector">
			<Tooltip title={i18n.selectLanguage} placement="bottom" arrow>
				<span>
					<IconButton aria-label="close" size="small" onClick={onShowSelector}>
						<LanguageIcon fontSize="inherit" />
					</IconButton>
				</span>
			</Tooltip>
			<SelectorDialog
				visible={dialogVisible}
				currentLocale={locale}
				onSelect={onChangeLocale}
				onClose={onHideSelector}
				i18n={lastI18n}
				loading={isLocaleFileLoading}
				onExited={updateLastI18n}
			/>
		</li>
	);
};


export default LanguageSelector;
