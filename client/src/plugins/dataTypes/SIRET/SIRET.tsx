import * as React from 'react';
import { DTHelpProps, DTOptionsProps } from '~types/dataTypes';
import styles from './SIRET.scss';

export const Options = ({ id, data, onUpdate }: DTOptionsProps): JSX.Element => {
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

export const Help = ({ i18n }: DTHelpProps): JSX.Element => (
	<>
		<p>
			{i18n.DESC}
		</p>

		<div className={styles.row}>
			<div className={styles.col1}>{i18n.SIRET}</div>
			<div className={styles.col2}>
				{i18n.typeSIRET}
			</div>
		</div>
		<div className={styles.row}>
			<div className={styles.col1}>{i18n.SIREN}</div>
			<div className={styles.col2}>
				{i18n.typeSIREN}
			</div>
		</div>

		<p>
			{i18n.moreInfo} <a href="http://fr.wikipedia.org/wiki/Syst%C3%A8me_d%27identification_du_r%C3%A9pertoire_des_%C3%A9tablissements" target="_blank" rel="noopener noreferrer">Wikipedia - SIRET</a>
		</p>
	</>
);
