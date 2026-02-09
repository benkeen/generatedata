import React from 'react';
import { renderWithStoreAndRouter } from '../../../../tests/testHelpers';
import Account from '../Account.component';
import i18n from '@generatedata/i18n-core/en';

describe('Account component', () => {
  it('render', () => {
    const { container } = renderWithStoreAndRouter(<Account selectedTab="dataSets" onChangeTab={() => {}} i18n={i18n} />);

    const page = container.querySelector('[data-automation=account-page]');
    expect(page).toBeTruthy();
  });
});
