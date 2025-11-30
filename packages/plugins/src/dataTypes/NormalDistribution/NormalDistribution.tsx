import { DTMetadata, DTOptionsProps } from '../../';
import { useClasses } from './NormalDistribution.styles';

export const Options = ({ i18n, id, data, onUpdate }: DTOptionsProps) => {
  const classNames = useClasses();
  const onChange = (field: string, value: string): void => {
    onUpdate({
      ...data,
      [field]: value ? parseInt(value, 10) : ''
    });
  };

  return (
    <div className={classNames.options}>
      <label htmlFor={`${id}-mean`}>{i18n.mean}</label>
      <input
        type="number"
        id={`${id}-mean`}
        style={{ width: 45 }}
        value={data.mean}
        onChange={(e: any): void => onChange('mean', e.target.value)}
      />
      <label htmlFor={`${id}-sigma`}>{i18n.standardDeviation}</label>
      <input
        type="number"
        id={`${id}-sigma`}
        style={{ width: 45 }}
        value={data.sigma}
        onChange={(e: any): void => onChange('sigma', e.target.value)}
      />
      <label htmlFor={`${id}-precision`} title="Number of decimal places.">
        {i18n.precision}
      </label>
      <input
        type="number"
        id={`${id}-precision`}
        style={{ width: 45 }}
        value={data.precision}
        onChange={(e: any): void => onChange('precision', e.target.value)}
      />
    </div>
  );
};

export const getMetadata = (): DTMetadata => ({
  sql: {
    field: 'varchar(100)'
  }
});
