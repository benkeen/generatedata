import React from 'react';
import { styled } from '@mui/material/styles';
import { Controlled as CodeMirror } from 'react-codemirror2';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { PrimaryButton } from '@generatedata/core';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@generatedata/core';
import FeatureToggles from '../../featureToggles';
import { useClasses } from './Schema.styles';

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
    'aria-controls': `vertical-tabpanel-${index}`
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`vertical-tabpanel-${index}`} aria-labelledby={`vertical-tab-${index}`} {...other}>
      {value === index && children}
    </div>
  );
}

const Root = styled('div')(({ theme }) => ({
  flexGrow: 1,
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  height: 224
}));

const TabPanelContent = styled('div')(() => ({
  padding: '5px 15px 0'
}));

const SchemaDialog = ({ visible, onClose, schema, theme, i18n }: SchemaDialogProps) => {
  const [code, setCode] = React.useState(schema);
  const [value, setValue] = React.useState(0);
  const classNames = useClasses();

  if (!FeatureToggles.DATA_TEMPLATE_GENERATION_UI) {
    return null;
  }

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Dialog onClose={onClose} open={visible} className={classNames.dataTemplateDialog}>
      <div className={classNames.dataTemplateDialogInner}>
        <DialogTitle onClose={onClose}>Data Template</DialogTitle>
        <DialogContent dividers>
          <Root>
            <Tabs orientation="vertical" variant="scrollable" value={value} onChange={handleChange} aria-label="Vertical tabs example">
              <Tab label="About" {...a11yProps(0)} />
              <Tab label="Import" {...a11yProps(1)} />
              <Tab label="Export" {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={value} index={0}>
              <TabPanelContent>
                The data you create here in the UI can be downloaded as a template for use with the generatedata CLI, letting you generate
                data
              </TabPanelContent>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <TabPanelContent>
                <div className={`${classNames.content} themeLucario`}>
                  Javascript Typescript JSON template only
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
              </TabPanelContent>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <div>Import.</div>
            </TabPanel>
          </Root>
        </DialogContent>
        <DialogActions className={classNames.actions}>
          <PrimaryButton onClick={onClose}>{i18n.close}</PrimaryButton>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default SchemaDialog;
