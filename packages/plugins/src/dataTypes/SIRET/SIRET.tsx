import * as React from 'react';
import { DTHelpProps, DTOptionsProps } from '../../';
import { useClasses } from './SIRET.styles';

export const Options = ({ id, data, onUpdate }: DTOptionsProps) => {
  const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    // @ts-ignore
    const value = e.target.value;
    onUpdate({
      ...data,
      option: value
    });
  };

  return (
    <>
      <input type="radio" id={`${id}-siret`} value="SIRET" checked={data.option === 'SIRET'} onChange={onChange} />
      <label htmlFor={`${id}-siret`}>SIRET</label>
      <input type="radio" id={`${id}-siren`} value="SIREN" checked={data.option === 'SIREN'} onChange={onChange} />
      <label htmlFor={`${id}-siren`}>SIREN</label>
    </>
  );
};

export const Help = ({ i18n }: DTHelpProps) => {
  const classNames = useClasses();

  return (
    <>
      <p>{i18n.DESC}</p>

      <div className={classNames.row}>
        <div className={classNames.col1}>{i18n.SIRET}</div>
        <div className={classNames.col2}>{i18n.typeSIRET}</div>
      </div>
      <div className={classNames.row}>
        <div className={classNames.col1}>{i18n.SIREN}</div>
        <div className={classNames.col2}>{i18n.typeSIREN}</div>
      </div>

      <p>
        {i18n.moreInfo}{' '}
        <a
          href="http://fr.wikipedia.org/wiki/Syst%C3%A8me_d%27identification_du_r%C3%A9pertoire_des_%C3%A9tablissements"
          target="_blank"
          rel="noopener noreferrer"
        >
          Wikipedia - SIRET
        </a>
      </p>
    </>
  );
};
