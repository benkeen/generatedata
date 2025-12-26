import { Dialog, DialogActions, DialogContent, DialogTitle, GithubIcon, PrimaryButton, Tooltip, vars } from '@generatedata/core';
import { Link } from '~components/Link.component';
import { useClasses } from './About.styles';

export type AboutProps = {
  visible: boolean;
  onClose: any;
  scriptVersion: string;
  i18n: any;
};

const AboutDialog = ({ visible, onClose, scriptVersion, i18n }: AboutProps) => {
  const classNames = useClasses();

  return (
    <Dialog onClose={onClose} open={visible} className={classNames.aboutDialog}>
      <div style={{ width: 460 }}>
        <DialogTitle onClose={onClose}>{i18n.about}</DialogTitle>
        <DialogContent dividers sx={{ lineHeight: '20px' }}>
          <div>
            <h4>
              generatedata.com &#8212;
              <Tooltip title={i18n.viewChangelog}>
                <span>
                  <Link url="https://github.com/benkeen/generatedata/blob/master/CHANGELOG.md" offSite={true}>
                    v{scriptVersion}
                  </Link>
                </span>
              </Tooltip>
            </h4>
          </div>
          <p>{i18n.aboutInfoPara1}</p>
          <p>{i18n.aboutInfoPara2}</p>
        </DialogContent>
        <DialogActions className={classNames.actions}>
          <PrimaryButton onClick={onClose} color="primary">
            {i18n.close}
          </PrimaryButton>
          <PrimaryButton
            onClick={(): void => {
              window.open('https://github.com/benkeen/generatedata', '_blank');
            }}
            sx={{
              '& svg': {
                fill: vars.primaryColor
              }
            }}
          >
            <GithubIcon />
            {i18n.viewOnGithub}
          </PrimaryButton>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default AboutDialog;
