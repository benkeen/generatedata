import { CopyToClipboard } from '@generatedata/shared';
import { useClasses } from './Email.styles';

export type EmailProps = {
  email: string;
  i18n: any;
  text?: string;
};

const Email = ({ email, text = '', i18n }: EmailProps) => {
  const classNames = useClasses();
  const textString = text || email;

  return (
    <>
      <a href={`mailto:${email}`} target="_blank" rel="noreferrer">
        {textString}
      </a>
      <CopyToClipboard className={classNames.copy} content={email} message={i18n.emailCopiedToClipboard} tooltip={i18n.copiedToClipboard} />
    </>
  );
};

export default Email;
