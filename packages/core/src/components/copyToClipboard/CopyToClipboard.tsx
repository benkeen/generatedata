import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { addToast } from '@generatedata/utils/general';
import { useClasses, useStaticStyles } from './CopyToClipboard.styles';

export const Copy = ({ message, tooltip, content }: any) => {
  const classNames = useClasses();
  useStaticStyles();

  const onCopy = (): void => {
    addToast({
      type: 'success',
      message,
      verticalPosition: 'top'
    });
  };

  return (
    <CopyToClipboard text={content} onCopy={onCopy}>
      <FileCopyIcon fontSize="small" className={classNames.copyIcon} titleAccess={tooltip} />
    </CopyToClipboard>
  );
};
