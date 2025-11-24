import React, { useCallback } from 'react';
import { IconButton, List, ListItemButton, ListItemText, MenuItem } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { Dialog, DialogContent, DialogTitle } from '~components/dialogs';
import { Tooltip } from '~components/tooltips';
import { DialogLoadingSpinner } from '~components/loaders/loaders';
import { GDLocale } from '~types/general';
import * as styles from '~core/header/Header.scss';
import { useNavigate } from 'react-router';
import clientConfig from '@generatedata/config/clientConfig';

const allLocaleOptions = Object.keys(clientConfig.appSettings.GD_LOCALES).map((shortCode) => ({
	value: shortCode,
	label: clientConfig.appSettings.GD_LOCALES[shortCode as GDLocale]
}));

export type SelectorDialogProps = {
	visible: boolean;
	currentLocale: GDLocale;
	onSelect: (locale: GDLocale, navigate: any) => void;
	onClose: () => void;
	loading: boolean;
	onExited: () => void;
	i18n: any;
};

const SelectorDialog = ({ visible, currentLocale, onSelect, onClose, onExited, loading, i18n }: SelectorDialogProps) => {
	const navigate = useNavigate();

	return (
		<Dialog onClose={onClose} open={visible} TransitionProps={{ onExited }}>
			<div style={{ width: 400 }}>
				<DialogTitle onClose={onClose} className={styles.title}>
					{i18n.selectLanguage}
					<span className={styles.flags} />
				</DialogTitle>
				<DialogContent dividers>
					<List disablePadding>
						{allLocaleOptions.map((currLocale: any) => (
							<ListItemButton
								key={currLocale.value}
								className={currentLocale === currLocale.value ? styles.selectedLocale : ''}
								onClick={(): void => onSelect(currLocale.value, navigate)}
							>
								<ListItemText primary={currLocale.label} />
							</ListItemButton>
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
	onChangeLocale: (locale: GDLocale, history: any) => void;
	isLocaleFileLoading: boolean;
	isMobile?: boolean;
};

const LanguageSelector = ({
	locale,
	availableLocales,
	onChangeLocale,
	isLocaleFileLoading,
	i18n,
	isMobile = false
}: LanguageSelectorProps) => {
	const [dialogVisible, setSelectorDialogVisible] = React.useState(false);
	const [lastI18n, setLastI18n] = React.useState(i18n);

	const onShowSelector = useCallback(() => setSelectorDialogVisible(true), []);
	const onHideSelector = useCallback(() => setSelectorDialogVisible(false), []);
	const updateLastI18n = (): void => setLastI18n(i18n);

	if (availableLocales.length < 1) {
		return null;
	}

	// note: this actually runs on render as well, but it makes no difference
	React.useEffect(() => {
		if (!isLocaleFileLoading) {
			onHideSelector();
		}
	}, [isLocaleFileLoading]);

	const trigger = isMobile ? (
		<MenuItem onClick={onShowSelector}>{lastI18n.selectLanguage}</MenuItem>
	) : (
		<li className={styles.localeSelector} key="languageSelector">
			<Tooltip title={lastI18n.selectLanguage} placement="bottom" arrow>
				<span>
					<IconButton aria-label="close" size="small" onClick={onShowSelector}>
						<LanguageIcon fontSize="inherit" />
					</IconButton>
				</span>
			</Tooltip>
		</li>
	);

	return (
		<>
			{trigger}
			<SelectorDialog
				visible={dialogVisible}
				currentLocale={locale}
				onSelect={onChangeLocale}
				onClose={onHideSelector}
				i18n={lastI18n}
				loading={isLocaleFileLoading}
				onExited={updateLastI18n}
			/>
		</>
	);
};

export default LanguageSelector;
