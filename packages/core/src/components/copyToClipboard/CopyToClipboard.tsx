import * as React from 'react';
import { addToast } from '@generatedata/utils/general';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { CopyToClipboard as Copy } from 'react-copy-to-clipboard';
import { useClasses, useStaticStyles } from './CopyToClipboard.styles';

export const CopyToClipboard = ({ message, tooltip, content }: any) => {
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
    <Copy text={content} onCopy={onCopy}>
      <FileCopyIcon fontSize="small" className={classNames.copyIcon} titleAccess={tooltip} />
    </Copy>
  );
};
