import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useClasses } from './loaders.styles';

export const SmallSpinner = (props: any): any => (
  <CircularProgress disableShrink size={20} style={{ color: '#999999', margin: 5 }} {...props} />
);

export const MediumSpinner = (props: any): any => (
  <CircularProgress disableShrink size={40} style={{ color: '#999999', margin: 5 }} {...props} />
);

export const DefaultSpinner = () => <CircularProgress />;

export type DialogLoadingSpinnerProps = {
  visible: boolean;
};

export const DialogLoadingSpinner = ({ visible }: DialogLoadingSpinnerProps) => {
  const classNames = useClasses();
  if (!visible) {
    return null;
  }

  return (
    <div className={classNames.dialogLoadingSpinner}>
      <MediumSpinner style={{ color: '#444444' }} />
    </div>
  );
};

export const CenteredSpinner = ({ children }: any) => (
  <div
    style={{
      display: 'flex',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 'auto'
    }}
  >
    {children}
  </div>
);

export const FullPageLoadingSpinner = () => (
  <>
    <div
      style={{
        position: 'absolute',
        top: 0,
        zIndex: 6002,
        height: '100%',
        width: '100%'
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <DefaultSpinner />
      </div>
    </div>

    <div
      style={{
        position: 'absolute',
        zIndex: 6000,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: '#000000',
        opacity: 0.5
      }}
    />

    <div
      style={{
        padding: 20,
        width: 80,
        height: 80,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        display: 'inline-block',
        opacity: 0.5,
        zIndex: 6001,
        position: 'absolute',
        margin: 'auto',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }}
    />
  </>
);
