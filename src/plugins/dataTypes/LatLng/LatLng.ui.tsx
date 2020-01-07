import * as React from 'react';
import { HelpProps, OptionsProps } from '../../../../types/dataTypes';

export const state = {
	lat: true,
	lng: true
};

export const Options = ({ i18n, data, id, onUpdate }: OptionsProps) => {
    const onChange = (field: string, checked: boolean) => {
        onUpdate({
            ...data,
            [field]: checked
        });
    };

    return (
        <>
            <input type="checkbox" id={`${id}-lat`} checked={data.lat}
                onChange={(e) => onChange('lat', e.target.checked)} />
            <label htmlFor={`${id}-lat`}>{i18n.latitude}</label>
            <input type="checkbox" id={`${id}-lng`} checked={data.lng}
                onChange={(e) => onChange('lng', e.target.checked)} />
            <label htmlFor={`${id}-lng`}>{i18n.longitude}</label>
        </>
    );
};


export const Help = ({ i18n }: HelpProps) => (
	<p>{i18n.DATA_TYPE.DESC}</p>
);
