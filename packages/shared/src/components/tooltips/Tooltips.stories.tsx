import React from 'react';
import { Tooltip, HtmlTooltip, ErrorTooltip } from './Tooltips';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Tooltips',
  component: Tooltip
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const TooltipDemos: Story = {
  render: () => (
    <>
      <div>
        <Tooltip title="This is a tooltip">
          <span>Default tooltip</span>
        </Tooltip>
      </div>
      <br />
      <br />
      <div>
        <HtmlTooltip
          title={
            <div style={{ padding: 25, lineHeight: '25px' }}>
              <b>
                The HTML tooltip has some very plain styles. You can then supply whatever HTML content you want in the <u>tooltip</u>{' '}
                content itself.
              </b>
            </div>
          }
        >
          <span>HTML tooltip</span>
        </HtmlTooltip>
      </div>
      <br />
      <br />
      <div>
        <ErrorTooltip title="This is a tooltip">
          <span>Error tooltip</span>
        </ErrorTooltip>
      </div>
    </>
  )
};
