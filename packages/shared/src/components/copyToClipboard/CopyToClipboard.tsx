import * as React from 'react';
import { enqueueSnackbar } from 'notistack';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { CopyToClipboard as Copy } from 'react-copy-to-clipboard';
import { useClasses, useStaticStyles } from './CopyToClipboard.styles';

export const CopyToClipboard = ({ message, tooltip, content }: any) => {
  const classNames = useClasses();
  useStaticStyles();

  const onCopy = (): void => {
    enqueueSnackbar(message, { variant: 'info' });
  };

  return (
    <Copy text={content} onCopy={onCopy}>
      <FileCopyIcon fontSize="small" className={classNames.copyIcon} titleAccess={tooltip} />
    </Copy>
  );
};
