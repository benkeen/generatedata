import { Dialog, DialogActions, DialogContent, DialogLoadingSpinner, DialogTitle, PrimaryButton } from '@generatedata/core';
import { getTourComponents } from '@generatedata/utils/general';
import { useEffect, useState } from 'react';
import { useWindowSize } from 'react-hooks-window-size';
import { useClasses } from './TourIntro.styles';

// TODO enum
type Tour = 'intro' | 'gridPanel' | 'previewPanel' | 'yourAccount';

export type TourDialogProps = {
  tourIntroDialogVisible: boolean;
  showTourIntroDialog: () => void;
  onClose: () => void;
  tourBundleLoaded: boolean;
  loadTourBundle: () => void;
  saveGeneratorState: () => void;
  restoreGeneratorState: () => void;
  i18n: any;
};

const TourDialog = ({
  tourIntroDialogVisible,
  showTourIntroDialog,
  onClose,
  tourBundleLoaded,
  loadTourBundle,
  restoreGeneratorState,
  saveGeneratorState,
  i18n
}: TourDialogProps) => {
  const windowSize = useWindowSize();
  const classNames = useClasses();

  const [loadingBundle, setLoadingBundle] = useState(false);
  const [currentTour, setCurrentTour] = useState<Tour | null>(null);

  useEffect(() => {
    if (tourBundleLoaded && currentTour !== null) {
      onClose();
    }
  }, [tourBundleLoaded, currentTour]);

  useEffect(() => {
    if (tourIntroDialogVisible) {
      setLoadingBundle(false);

      // unreadable logic, but this fires when the tour dialog was just hidden and there's a tour slated to be shown.
      // It saves the current generator state before the tour messes around with it
    } else if (currentTour !== null) {
      saveGeneratorState();
    }
  }, [tourIntroDialogVisible]);

  // hide the tour if the screen gets too small
  useEffect(() => {
    if (windowSize.width < 900) {
      if (tourIntroDialogVisible || currentTour !== null) {
        closeIntroDialog();
      }
    }
  }, [windowSize.width]);

  const closeIntroDialog = (): void => {
    setCurrentTour(null);
    onClose();
  };

  const selectTour = (tour: Tour): void => {
    // load the tour bundle and show a loading spinner until it's ready. At that point, we backup the current
    // generator settings, close this intro dialog and open the selected tour
    setLoadingBundle(true);
    setCurrentTour(tour);

    if (!tourBundleLoaded) {
      loadTourBundle();
    } else {
      onClose();
    }
  };

  // when a user exits a tour they're taken back to the intro panel again
  const onExit = (completelyExit: boolean): void => {
    restoreGeneratorState();
    setCurrentTour(null);

    if (completelyExit !== true) {
      showTourIntroDialog();
    }
  };

  const getCurrentTour = () => {
    if (tourIntroDialogVisible || !currentTour || !tourBundleLoaded) {
      return null;
    }

    const tours = getTourComponents();
    const Tour = tours[currentTour].component;

    return (
      <Tour
        isOpen={true}
        onClose={onExit}
        i18n={i18n}
        maskClassName={classNames.tourMask}
        closeWithMask={false}
        disableInteraction={true}
        className={classNames.tourPage}
        accentColor="#275eb5"
      />
    );
  };

  return (
    <>
      <Dialog onClose={closeIntroDialog} open={tourIntroDialogVisible}>
        <div style={{ width: 600 }}>
          <DialogTitle onClose={onClose}>{i18n.help}</DialogTitle>
          <DialogContent dividers className={classNames.introDialog}>
            <div className={classNames.cols}>
              <div className={classNames.col}>
                <h3>{i18n.welcomeToTheGenerator}</h3>

                <p>{i18n.tourIntroPara1}</p>

                <p>{i18n.tourIntroPara2}</p>
              </div>

              <div className={classNames.separator} />

              <div className={`${classNames.col} ${classNames.buttonCol}`}>
                <div>
                  <PrimaryButton onClick={(): void => selectTour('intro')}>1. {i18n.introToGenerator}</PrimaryButton>
                </div>
                <div>
                  <PrimaryButton onClick={(): void => selectTour('gridPanel')}>2. {i18n.theGridPanel}</PrimaryButton>
                </div>
                <div>
                  <PrimaryButton onClick={(): void => selectTour('previewPanel')}>3. {i18n.thePreviewPanel}</PrimaryButton>
                </div>
                <div>
                  <PrimaryButton disabled={true} onClick={(): void => selectTour('yourAccount')}>
                    4. {i18n.yourUserAccount}
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <PrimaryButton onClick={closeIntroDialog} color="primary">
              {i18n.close}
            </PrimaryButton>
          </DialogActions>
        </div>
        <DialogLoadingSpinner visible={loadingBundle} />
      </Dialog>
      {getCurrentTour()}
    </>
  );
};

export default TourDialog;
