import MuiTooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

export const HtmlTooltip = styled(MuiTooltip)<TooltipProps>(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#ffffff',
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 12,
    padding: 0,
    boxShadow: '3px 3px 6px #999999'
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: '#ffffff'
  }
}));

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

export const ErrorTooltip = styled(MuiTooltip)<TooltipProps>(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#D80000',
    maxWidth: 220,
    color: '#ffffff',
    lineHeight: '16px',
    fontSize: 11,
    padding: 10
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: '#D80000'
  }
}));
