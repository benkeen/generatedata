import React from 'react';
import AccountStatusPill from '../AccountStatusPill.component';
import { render } from '@testing-library/react';
import { AccountStatus } from '~types/account';

const i18n = require('../../../../i18n/en.json');

describe('AccountStatusPill', () => {
	it('renders live pill', () => {
		const { baseElement } = render(<AccountStatusPill status={AccountStatus.live} i18n={i18n} />);
		expect((baseElement.querySelector('span') as HTMLSpanElement).innerHTML).toEqual(i18n.live);
	});

	it('renders expired pill', () => {
		const { baseElement } = render(<AccountStatusPill status={AccountStatus.expired} i18n={i18n} />);
		expect((baseElement.querySelector('span') as HTMLSpanElement).innerHTML).toEqual(i18n.expired);
	});

	it('renders disabled pill', () => {
		const { baseElement } = render(<AccountStatusPill status={AccountStatus.disabled} i18n={i18n} />);
		expect((baseElement.querySelector('span') as HTMLSpanElement).innerHTML).toEqual(i18n.disabled);
	});
});
