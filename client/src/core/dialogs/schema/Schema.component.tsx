import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Controlled as CodeMirror } from 'react-codemirror2';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { PrimaryButton } from '~components/Buttons.component';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '~components/dialogs';
import FeatureToggles from '../../featureToggles';
import styles from './Schema.scss';

export type SchemaDialogProps = {
	visible: boolean;
	onClose: any;
	schema: string;
	theme: string;
	i18n: any;
};

function a11yProps(index: number) {
	return {
		id: `vertical-tab-${index}`,
		'aria-controls': `vertical-tabpanel-${index}`,
	};
}

interface TabPanelProps {
	children?: React.ReactNode;
	index: any;
	value: any;
}

function TabPanel (props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}
		>
			{value === index && children}
		</div>
	);
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
		display: 'flex',
		height: 224,
	},
	tabPanel: {
		padding: '5px 15px 0'
	},
	tabs: {
	},
}));

const SchemaDialog = ({
	visible, onClose, schema, theme, i18n
}: SchemaDialogProps): JSX.Element | null => {
	const classes = useStyles();
	const [code, setCode] = React.useState(schema);
	const [value, setValue] = React.useState(0);

	if (!FeatureToggles.DATA_TEMPLATE_GENERATION_UI) {
		return null;
	}

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Dialog onClose={onClose} open={visible} className={styles.dataTemplateDialog}>
			<div className={styles.dataTemplateDialogInner}>
				<DialogTitle onClose={onClose}>Data Template</DialogTitle>
				<DialogContent dividers>
					<div className={classes.root}>
						<Tabs
							orientation="vertical"
							variant="scrollable"
							value={value}
							onChange={handleChange}
							aria-label="Vertical tabs example"
							className={classes.tabs}
						>
							<Tab label="About" {...a11yProps(0)} />
							<Tab label="Import" {...a11yProps(1)} />
							<Tab label="Export" {...a11yProps(2)} />
						</Tabs>
						<TabPanel value={value} index={0}>
							<div className={classes.tabPanel}>
								The data you create here in the UI can be downloaded as a template for use with the
								generatedata CLI, letting you generate data
							</div>
						</TabPanel>
						<TabPanel value={value} index={1}>
							<div className={classes.tabPanel}>
								<div className={`${styles.content} themeLucario`}>

									Javascript
									Typescript
									JSON template only


									<CodeMirror
										value={code}
										onBeforeChange={(editor, data, value): void => setCode(value)}
										options={{
											mode: 'application/ld+json',
											theme,
											lineNumbers: false,
											lineWrapping: false,
											readOnly: true
										}}
									/>
								</div>
							</div>
						</TabPanel>
						<TabPanel value={value} index={2}>
							<div className={classes.tabPanel}>
								Import.
							</div>
						</TabPanel>
					</div>
				</DialogContent>
				<DialogActions className={styles.actions}>
					<PrimaryButton onClick={onClose} color="default">
						{i18n.close}
					</PrimaryButton>
				</DialogActions>
			</div>
		</Dialog>
	);
};

export default SchemaDialog;
