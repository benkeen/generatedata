import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export const SmallSpinner = (): any => <CircularProgress size={20} style={{ color: '#999999', margin: 5 }} />;
export const MediumSpinner = (): any => <CircularProgress size={40} style={{ color: '#999999', margin: 5 }} />;
