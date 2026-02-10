import { Tooltip } from '../tooltips';
import { useClasses } from './BasePill.styles';
import { PrimaryButton } from '../buttons';

export const PillRow = ({ className, children }: any) => {
  const classNames = useClasses();
  let classes = classNames.row;
  if (className) {
    classes += ` ${className}`;
  }
  return <div className={classes}>{children}</div>;
};

export type PillType = 'radio' | 'checkbox';

type PillProps = {
  type: PillType;
  label: string;
  onClick: () => void;
  name: string;
  checked: boolean;
  disabled?: boolean;
  tooltip?: string;
  style?: any;
  id?: string;
};

const BasePill = ({ type, label, onClick, name, checked, disabled = false, tooltip, style = {}, id }: PillProps) => {
  const button = (
    <PrimaryButton onClick={onClick} size="small" style={style} disabled={disabled}>
      <input type={type} name={name} checked={checked} disabled={disabled} onChange={(): void => {}} id={id} />
      <span>{label}</span>
    </PrimaryButton>
  );

  if (tooltip) {
    return (
      <Tooltip
        title={<span dangerouslySetInnerHTML={{ __html: tooltip }} />}
        arrow
        disableHoverListener={disabled}
        disableFocusListener={disabled}
      >
        <span>{button}</span>
      </Tooltip>
    );
  }

  return button;
};

export default BasePill;
