import { CopyToClipboard } from '@generatedata/shared';
import { useClasses } from './Email.styles';
import { useEmailContainer } from './hooks/useEmailContainer';

export type EmailProps = {
  email: string;
  text?: string;
};

const Email = ({ email, text = '' }: EmailProps) => {
  const classNames = useClasses();
  const { i18n } = useEmailContainer();
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
