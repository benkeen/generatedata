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

type Tour = 'intro' | 'grid' | 'preview' | 'yourAccount';

export type TourDialogProps = {
	tourIntroDialogVisible: boolean;
	currentTour: Tour;
	onClose: () => void;
	i18n: any;
	tourBundleLoaded: boolean;
	loadTourBundle: () => void;
};

const TourDialog = ({ tourIntroDialogVisible, onClose, tourBundleLoaded, loadTourBundle, i18n }: TourDialogProps): JSX.Element => {
	const [loadingBundle, setLoadingBundle] = useState(false);
	const [currentTour, setCurrentTour] = useState<Tour | null>(null);

	useEffect(() => {
		if (tourBundleLoaded && currentTour !== null) {
			onClose();
		}
	}, [tourBundleLoaded, currentTour]);

	useEffect(() => {
		if (tourIntroDialogVisible && tourBundleLoaded) {
			setLoadingBundle(false);
		}
	}, [tourIntroDialogVisible]);

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

	const getCurrentTour = () => {
		if (tourIntroDialogVisible || !currentTour || !tourBundleLoaded) {
			return null;
		}

		const tours = getTourComponents();
		const Tour = tours.IntroToGenerator;

		return (
			<Tour
				isOpen={true}
				onClose={() => setCurrentTour(null)}
				i18n={i18n}
				maskClassName={styles.tourMask}
				closeWithMask={false}
			/>
		);
	};

	return (
		<>
			<Dialog onClose={closeIntroDialog} open={tourIntroDialogVisible}>
				<div style={{ width: 540 }}>
					<DialogTitle onClose={onClose}>Take a tour</DialogTitle>
					<DialogContent dividers>
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
							<div className={styles.col}>
								<Button color="primary" variant="outlined" onClick={() => selectTour('intro')}>
									<GearIcon />
									Intro to the generator
								</Button>
								<Button color="primary" variant="outlined" onClick={() => selectTour('grid')}>
									<ListIcon />
									The Grid Panel
								</Button>
								<Button color="primary" variant="outlined" onClick={() => selectTour('preview')}>
									<PreviewIcon />
									The Preview Panel
								</Button>
								<Button color="primary" variant="outlined" disabled={true} onClick={() => selectTour('yourAccount')}>
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
