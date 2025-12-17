// @ts-ignore
import React from 'react';
import type { Preview } from 'storybook-react-rsbuild';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
};

export default preview;
