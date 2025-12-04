import CircularProgress from '@mui/material/CircularProgress';
import { useClasses } from './PreviewPanel.styles';

export const PreviewPanelLoader = () => {
  const classNames = useClasses();

  return (
    <div className={classNames.loading}>
      <div style={{ flex: 'none' }}>
        <CircularProgress
          size={50}
          style={{
            color: '#ffffff',
            margin: 5,
            opacity: 0.4
          }}
        />
      </div>
    </div>
  );
};
PreviewPanelLoader.displayName = 'PreviewPanelLoader';
