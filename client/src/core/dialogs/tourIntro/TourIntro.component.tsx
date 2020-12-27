import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '~components/dialogs';
import { DialogLoadingSpinner } from '~components/loaders/loaders';
import GearIcon from '@material-ui/icons/Settings';
import ListIcon from '@material-ui/icons/FormatListBulleted';
import PreviewIcon from '@material-ui/icons/Visibility';
import PersonIcon from '@material-ui/icons/Person';
import { getTourComponents } from '~utils/generalUtils';
import styles from './TourIntro.scss';
import { useWindowSize } from 'react-hooks-window-size';

type Tour = 'intro' | 'grid' | 'preview' | 'yourAccount';

export type TourDialogProps = {
	tourIntroDialogVisible: boolean;
	onCompleteTour: () => void;
	currentTour: Tour;
	onClose: () => void;
	i18n: any;
	tourBundleLoaded: boolean;
	loadTourBundle: () => void;
};

const TourDialog = ({ tourIntroDialogVisible, onCompleteTour, onClose, tourBundleLoaded, loadTourBundle, i18n }: TourDialogProps): JSX.Element => {
	const windowSize = useWindowSize();

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

	const closeIntroDialog = () => {
		setCurrentTour(null);
		onClose();
	};

	const selectTour = (tour: Tour) => {
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
	const onComplete = (): void => {
		setCurrentTour(null);
		onCompleteTour();
	};

	const getCurrentTour = () => {
		if (tourIntroDialogVisible || !currentTour || !tourBundleLoaded) {
			return null;
		}

		const tours = getTourComponents();
		const Tour = tours.IntroToGenerator;

		return (
			<Tour
				isOpen={true}
				onClose={onComplete}
				i18n={i18n}
				maskClassName={styles.tourMask}
				closeWithMask={false}
				disableInteraction={true}
				className={styles.tourPage}
				accentColor="#275eb5"
			/>
		);
	};

	return (
		<>
			<Dialog onClose={closeIntroDialog} open={tourIntroDialogVisible}>
				<div style={{ width: 600 }}>
					<DialogTitle onClose={onClose}>Take a tour</DialogTitle>
					<DialogContent dividers className={styles.introDialog}>
						<div className={styles.cols}>
							<div className={styles.col}>
								<h3>Welcome to the generator!</h3>

								<p>
									This tool provides a lot of functionality and it can be a little overwhelming at first.
									Click on one of the buttons to the right to take a tour about that particular feature.
								</p>

								<p>
									Note that when the tour starts, it'll temporarily overwrite the content of the generator
									to illustrate certain things about the interface. But don't worry - as soon as the tour
									is over, it'll return your data to its original state.
								</p>
							</div>

							<div className={styles.separator} />

							<div className={`${styles.col} ${styles.buttonCol}`}>
								<Button color="primary" variant="outlined" onClick={(): void => selectTour('intro')}>
									<GearIcon />
									Intro to the generator
								</Button>
								<Button color="primary" variant="outlined" onClick={(): void => selectTour('grid')}>
									<ListIcon />
									The Grid Panel
								</Button>
								<Button color="primary" variant="outlined" onClick={(): void => selectTour('preview')}>
									<PreviewIcon />
									The Preview Panel
								</Button>
								<Button color="primary" variant="outlined" disabled={true} onClick={(): void => selectTour('yourAccount')}>
									<PersonIcon />
									Your User Account
								</Button>
							</div>
						</div>
					</DialogContent>
					<DialogActions>
						<Button onClick={closeIntroDialog} color="primary" variant="outlined">{i18n.close}</Button>
					</DialogActions>
				</div>
				<DialogLoadingSpinner visible={loadingBundle} />
			</Dialog>
			{getCurrentTour()}
		</>
	);
};


export default TourDialog;
