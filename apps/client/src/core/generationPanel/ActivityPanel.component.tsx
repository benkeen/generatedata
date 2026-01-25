import { AlertButton, Dialog, DialogActions, DialogContent, DialogTitle, PrimaryButton, Tooltip } from '@generatedata/shared';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Pause from '@mui/icons-material/Pause';
import PlayArrow from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import IconButton from '@mui/material/IconButton';
import Slider from '@mui/material/Slider';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';
import CountUp from 'react-countup';
import { Bar, BarChart, CartesianGrid, Cell, Label, Pie, PieChart, XAxis, YAxis } from 'recharts';
import { DataPacket } from '~store/packets/packets.reducer';
import { LoadTimeGraphDuration } from '~types/general';
import usePrevious from '../../hooks/usePrevious';
import * as coreUtils from '../../utils/coreUtils';
import { useClasses } from './ActivityPanel.styles';
import Engine from './Engine.container';
import { getPercentageLabel } from './generation.helpers';
import { styled } from '@mui/material/styles';

export type ActivityPanelProps = {
  visible: boolean;
  fullI18n: any;
  packet: DataPacket | null;
  onClose: () => void;
  onPause: () => void;
  onContinue: () => void;
  onAbort: () => void;
  onDownload: () => void;
  onChangeSpeed: (speed: number) => void;
  batchLoadTimes: object[];
  dataSize: string;
  estimatedSize: string;
  estimatedTime: string;
  estimatedTimeRemaining: string;
  loadTimeGraphDuration: LoadTimeGraphDuration;
  countUpSpeed: number;
};

const GradientSlider = styled(Slider)(() => ({
  padding: '15px 0',
  '& .MuiSlider-track': { border: 'none', background: 'linear-gradient(90deg, #cccccc, #275eb5)' }
}));

const valueLabelFormat = (value: number): string => `${value}%`;

// return an array of data that add up to 100. Each piece represents 10% of the pie chart. When the percentage is
// not a multiple of 10, the fraction should appear in the piece that represents the current percentage, as in the
// example data set above
const getPieChartData = (percentage: number) => {
  const data = [];
  const fullPieces = Math.floor(percentage / 10);
  const remainder = percentage % 10;

  for (let i = 0; i < 10; i++) {
    if (i < fullPieces) {
      data.push({ name: `${i + 1}`, value: 10, color: '#275eb5' });
    } else if (i === fullPieces) {
      if (remainder > 0) {
        data.push({ name: `${i + 1}`, value: remainder, color: '#275eb5' });
        data.push({ name: `${i + 1}-empty`, value: 10 - remainder, color: '#eeeeee' });
      } else {
        data.push({ name: `${i + 1}`, value: 10, color: '#eeeeee' });
      }
    } else if (i > fullPieces) {
      data.push({ name: `${i + 1}`, value: 10, color: '#eeeeee' });
    }
  }
  return data;
};

const ActivityPanel = ({
  visible,
  onClose,
  packet,
  onContinue,
  onPause,
  batchLoadTimes,
  onAbort,
  onDownload,
  onChangeSpeed,
  dataSize,
  estimatedSize,
  estimatedTime,
  countUpSpeed,
  estimatedTimeRemaining,
  fullI18n
}: ActivityPanelProps): any => {
  const classNames = useClasses();
  const fullScreen = useMediaQuery('(max-width:600px)');
  const prevGeneratedRows = usePrevious(packet?.numGeneratedRows ?? 0);

  if (packet === null || fullI18n === null) {
    return null;
  }

  const coreI18n = fullI18n.core;
  const { isPaused, config, generationWorkerId, numGeneratedRows, speed } = packet;
  const { numRowsToGenerate } = config;

  const generationWorker = coreUtils.getGenerationWorker(generationWorkerId);

  const abortPacket = (): void => {
    onAbort();
    generationWorker.postMessage({ action: 'Abort' });
    coreUtils.destroyGenerationWorker(generationWorkerId);
  };

  const percentage = (numGeneratedRows / numRowsToGenerate) * 100;
  const isComplete = percentage === 100;

  const pieChartData = getPieChartData(percentage);

  let pauseContinueIcon: any;
  let pauseContinueIconAction: any;
  if (isPaused) {
    pauseContinueIcon = <PlayArrow fontSize="large" />;
    pauseContinueIconAction = onContinue;
  } else {
    pauseContinueIcon = <Pause fontSize="large" />;
    pauseContinueIconAction = onPause;
  }

  const marks = [
    { value: 1, label: coreI18n.seriouslySlow },
    { value: 100, label: coreI18n.cpuMeltinglyFast }
  ];

  const getActionButtons = () => {
    if (isComplete) {
      return (
        <div>
          <AlertButton onClick={onAbort} style={{ marginRight: 10 }}>
            {coreI18n.clear}
          </AlertButton>
          <PrimaryButton onClick={onDownload} style={{ marginRight: 10 }}>
            {coreI18n.download}
          </PrimaryButton>
        </div>
      );
    }

    return null;
  };

  const getGenerationControls = (): React.ReactNode => {
    // TODO apply class to fade out instead
    if (isComplete) {
      return null;
    }

    const pausePlayBtnTooltip = isPaused ? coreI18n.continue : coreI18n.pause;

    return (
      <div style={{ flex: 1, display: 'flex', marginRight: 65 }}>
        <Tooltip title={pausePlayBtnTooltip} placement="top" arrow>
          <span>
            <IconButton size="medium" aria-label={pausePlayBtnTooltip} onClick={pauseContinueIconAction}>
              {pauseContinueIcon}
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title={coreI18n.abort} placement="top" arrow style={{ marginRight: 50 }}>
          <span>
            <IconButton size="medium" aria-label={coreI18n.abort} onClick={abortPacket}>
              <StopIcon fontSize="large" />
            </IconButton>
          </span>
        </Tooltip>
        <GradientSlider
          value={speed}
          aria-labelledby="discrete-slider-always"
          step={1}
          min={1}
          max={100}
          valueLabelDisplay="auto"
          valueLabelFormat={valueLabelFormat}
          marks={marks}
          onChange={(_e, value): void => onChangeSpeed(value as number)}
        />
      </div>
    );
  };

  const countUpDuration = countUpSpeed;

  return (
    <>
      <Dialog className={classNames.activityPanel} onClose={onClose} open={visible} fullScreen={fullScreen}>
        <div className={classNames.activityPanelSizer}>
          <DialogTitle onClose={onClose} customCloseIcon={ExpandMore}>
            {coreI18n.generatedC}
            <CountUp
              start={prevGeneratedRows}
              end={numGeneratedRows}
              separator=","
              useEasing={false}
              className={classNames.counter}
              duration={countUpDuration}
            />
            {coreI18n.rows}
          </DialogTitle>
          <DialogContent dividers style={{ padding: 0 }}>
            <div className={classNames.overlayWrapper}>
              <div className={classNames.panelWrapper}>
                <div className={classNames.panel1}>
                  <div className={classNames.pie}>
                    <div className={classNames.pieCenterText}>{`${getPercentageLabel(percentage, numRowsToGenerate)}%`}</div>

                    <PieChart style={{ width: '100%', height: '100%' }}>
                      <Pie
                        dataKey="value"
                        isAnimationActive={false}
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius="60%"
                        outerRadius="98%"
                        startAngle={90}
                        endAngle={-270}
                        strokeWidth={0.6}
                      >
                        {pieChartData.map((_entry, index) => (
                          <Cell key={index} fill={pieChartData[index].color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </div>

                  <div className={classNames.dataPanel}>
                    <div className={classNames.dataRow}>
                      <div className={classNames.dataRowLabel}>{coreI18n.estimatedTime}</div>
                      <div className={classNames.dataRowValue}>{estimatedTime}</div>
                    </div>
                    <div className={classNames.dataRow}>
                      <div className={classNames.dataRowLabel}>{coreI18n.remainingTime}</div>
                      <div className={classNames.dataRowValue}>{estimatedTimeRemaining}</div>
                    </div>
                    <div className={classNames.dataRow}>
                      <div className={classNames.dataRowLabel}>{coreI18n.estimatedSize}</div>
                      <div className={classNames.dataRowValue}>{estimatedSize}</div>
                    </div>
                    <div className={classNames.dataRow}>
                      <div className={classNames.dataRowLabel}>{coreI18n.size}</div>
                      <div className={classNames.dataRowValue}>{dataSize}</div>
                    </div>
                  </div>
                </div>

                <div className={classNames.panel2}>
                  <h4>{coreI18n.rowsGeneratedPerSecond}</h4>
                  <BarChart
                    style={{ width: '100%', height: '360px' }}
                    data={batchLoadTimes}
                    margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
                    responsive
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" interval="equidistantPreserveStart" tick={{ fontSize: '7px' }}>
                      <Label value={coreI18n.seconds} offset={0} position="insideBottom" />
                    </XAxis>
                    <YAxis dataKey="rowsPerSecond" />
                    <Bar dataKey="rowsPerSecond" stroke="#4981dc" fill="#4981dc" isAnimationActive={false} />
                  </BarChart>
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions className={classNames.actionsRow}>
            {getGenerationControls()}
            {getActionButtons()}
          </DialogActions>
        </div>
      </Dialog>
      {visible && <Engine />}
    </>
  );
};

export default ActivityPanel;
