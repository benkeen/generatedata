import React from 'react';
import MuiTooltip, { TooltipProps } from '@mui/material/Tooltip';

export type { TooltipProps };

export const HtmlTooltip = ({ children, ...props }: TooltipProps) => (
  <MuiTooltip
    {...props}
    slotProps={{
      tooltip: {
        sx: {
          backgroundColor: '#ffffff !important',
          color: 'rgba(0, 0, 0, 0.87)',
          fontSize: 12,
          padding: 0,
          boxShadow: '3px 3px 6px #999999'
        }
      },
      arrow: {
        sx: {
          color: '#ffffff'
        }
      }
    }}
  >
    {children}
  </MuiTooltip>
);

export const Tooltip = ({ children, ...props }: TooltipProps) => (
  <MuiTooltip
    {...props}
    slotProps={{
      tooltip: {
        sx: {
          backgroundColor: '#333333 !important',
          maxWidth: 220,
          color: '#dddddd',
          lineHeight: '16px',
          fontSize: 11,
          padding: '10px'
        }
      },
      arrow: {
        sx: {
          color: '#333333'
        }
      }
    }}
  >
    {children}
  </MuiTooltip>
);

export const ErrorTooltip = ({ children, ...props }: TooltipProps) => (
  <MuiTooltip
    {...props}
    slotProps={{
      tooltip: {
        sx: {
          backgroundColor: '#D80000 !important',
          maxWidth: 220,
          color: '#ffffff',
          lineHeight: '16px',
          fontSize: 11,
          padding: '10px'
        }
      },
      arrow: {
        sx: {
          color: '#D80000'
        }
      }
    }}
  >
    {children}
  </MuiTooltip>
);
