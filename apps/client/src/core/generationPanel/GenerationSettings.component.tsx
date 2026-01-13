import clientConfig from '@generatedata/config/clientConfig';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ErrorTooltip,
  MediumSpinner,
  PrimaryButton,
  useSharedClasses
} from '@generatedata/shared';
import { getI18nString, getLocale } from '@generatedata/utils/lang';
import { getFormattedNum } from '@generatedata/utils/number';
import CheckIcon from '@mui/icons-material/Check';
import Button from '@mui/material/Button';
import { NumericFormat } from 'react-number-format';
import { DataPacket } from '~store/packets/packets.reducer';
import * as coreUtils from '../../utils/coreUtils';
import { useClasses } from './ActivityPanel.styles';
import Engine from './Engine.container';

export type GenerationSettingsProps = {
  visible: boolean;
  packet: DataPacket | null;
  isLoggedIn: boolean;
  isGenerating: boolean;
  onChangeNumRowsToGenerate: (numRows: number) => void;
  onClose: () => void;
  onGenerate: () => void;
  onAbort: () => void;
  onDownload: () => void;
  numRowsToGenerate: number;
  i18n: any;
  stripWhitespace: boolean;
  onToggleStripWhitespace: () => void;
  workerResources: any;
};

const GenerationSettingsPanel = ({
  visible,
  isLoggedIn,
  onClose,
  i18n,
  stripWhitespace,
  numRowsToGenerate,
  onChangeNumRowsToGenerate,
  onToggleStripWhitespace,
  onGenerate,
  isGenerating,
  packet,
  onAbort,
  onDownload
}: GenerationSettingsProps) => {
  const sharedClasses = useSharedClasses();
  const classNames = useClasses();
  const locale = getLocale();

  let error = '';

  if (!numRowsToGenerate) {
    error = i18n.requiredField;
  } else if (!isLoggedIn && numRowsToGenerate > clientConfig.appSettings.GD_MAX_DEMO_MODE_ROWS) {
    error = getI18nString(i18n.overMaxAnonRows, [getFormattedNum(clientConfig.appSettings.GD_MAX_DEMO_MODE_ROWS, locale)]);
  }

  const getEngine = () => {
    if (!visible || !isGenerating) {
      return null;
    }

    return <Engine />;
  };

  const getGenerationOverlay = () => {
    if (!isGenerating || !packet) {
      return null;
    }

    const { numGeneratedRows } = packet;

    if (packet.numGeneratedRows === numRowsToGenerate) {
      return (
        <>
          <div className={classNames.generationOverlayBg} />
          <div className={classNames.generationComplete}>
            <CheckIcon fontSize="large" />
            {i18n.dataGenerated}
          </div>
        </>
      );
    }

    return (
      <>
        <div className={classNames.generationOverlayBg} />
        <div className={classNames.generationOverlay}>
          <MediumSpinner style={{ margin: 15 }} />
          <div className={classNames.generationLabel}>
            {i18n.generated} <b>{numGeneratedRows}</b> / <b>{numRowsToGenerate}</b>
          </div>
        </div>
      </>
    );
  };

  let buttonLabel = i18n.generate;
  let actionButtonClick = onGenerate;
  let actionButtonDisabled = !!error;

  if (packet) {
    if (packet.numGeneratedRows === numRowsToGenerate) {
      buttonLabel = i18n.download;
      actionButtonClick = onDownload;
      actionButtonDisabled = false;
    }
  }

  const closeModal = (): void => {
    if (packet) {
      const { generationWorkerId } = packet;
      const generationWorker = coreUtils.getGenerationWorker(generationWorkerId);

      onAbort();
      onClose();
      generationWorker.postMessage({
        action: 'Abort'
      });
      coreUtils.destroyGenerationWorker(generationWorkerId);
    } else {
      onClose();
    }
  };

  let cancelButton: any = (
    <Button onClick={closeModal} variant="text">
      {i18n.cancel}
    </Button>
  );
  if (packet && packet.numGeneratedRows === numRowsToGenerate) {
    cancelButton = null;
  }

  return (
    <>
      <Dialog onClose={onClose} open={visible}>
        <div style={{ width: 400 }}>
          <DialogTitle onClose={closeModal}>{i18n.generate}</DialogTitle>
          <DialogContent dividers className={classNames.generationSettingsContent}>
            {getGenerationOverlay()}
            <div className={`${classNames.row} ${classNames.generationRow}`}>
              {i18n.generate}
              <ErrorTooltip title={error} arrow disableHoverListener={!error} disableFocusListener={!error}>
                <span>
                  <NumericFormat
                    className={error ? sharedClasses.errorField : ''}
                    value={numRowsToGenerate}
                    displayType="input"
                    autoFocus
                    thousandSeparator={true}
                    onValueChange={({ value }): void => onChangeNumRowsToGenerate(parseInt(value, 10))}
                  />
                </span>
              </ErrorTooltip>
              {i18n.rows}
            </div>
            <div className={classNames.row} style={{ marginBottom: 16 }}>
              <input type="checkbox" id="stripWhitespace" checked={stripWhitespace} onChange={onToggleStripWhitespace} />
              <label htmlFor="stripWhitespace">{i18n.stripWhitespace}</label>
            </div>
          </DialogContent>
          <DialogActions sx={{ textAlign: 'right' }}>
            {cancelButton}
            <PrimaryButton
              type="submit"
              onClick={actionButtonClick}
              color="primary"
              disabled={actionButtonDisabled}
              disableElevation
              variant="contained"
              sx={{ color: 'white !important' }}
            >
              {buttonLabel}
            </PrimaryButton>
          </DialogActions>
        </div>
      </Dialog>
      {getEngine()}
    </>
  );
};

export default GenerationSettingsPanel;
