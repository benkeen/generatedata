import React from 'react';
import AccountStatusPill from '../AccountStatusPill.component';
import { render } from '@testing-library/react';
import { getTestI18n } from '../../../../../tests/testHelpers';

const i18n = getTestI18n();

describe('AccountStatusPill', () => {
  it('renders live pill', () => {
    const { baseElement } = render(<AccountStatusPill status="live" i18n={i18n} />);
    expect((baseElement.querySelector('span') as HTMLSpanElement).innerHTML).toEqual(i18n.core.live);
  });

  it('renders expired pill', () => {
    const { baseElement } = render(<AccountStatusPill status="expired" i18n={i18n} />);
    expect((baseElement.querySelector('span') as HTMLSpanElement).innerHTML).toEqual(i18n.core.expired);
  });

  it('renders disabled pill', () => {
    const { baseElement } = render(<AccountStatusPill status="disabled" i18n={i18n} />);
    expect((baseElement.querySelector('span') as HTMLSpanElement).innerHTML).toEqual(i18n.core.disabled);
  });
});
