import React from 'react';
import { renderWithStoreAndRouter } from '../../../tests/testHelpers';
import ErrorBoundary from '../ErrorBoundary.component';

describe('ErrorBoundary', () => {
  it('renders', () => {
    const { baseElement } = renderWithStoreAndRouter(
      <ErrorBoundary>
        <span className="hello">Test</span>
      </ErrorBoundary>
    );

    expect(baseElement.querySelector('.hello')).toBeTruthy();
  });
});
