import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '~components/dialogs';
import GearIcon from '@material-ui/icons/Settings';
import ListIcon from '@material-ui/icons/FormatListBulleted';
import PreviewIcon from '@material-ui/icons/Visibility';
import PersonIcon from '@material-ui/icons/Person';
import styles from './Tour.scss';

export type TourDialogProps = {
	visible: boolean;
	onClose: () => void;
	i18n: any;
	tourBundleLoaded: boolean;
	loadTourBundle: () => void;
};

const TourDialog = ({ visible, onClose, tourBundleLoaded, loadTourBundle, i18n }: TourDialogProps): JSX.Element => {
	useEffect(() => {
		if (visible && !tourBundleLoaded) {
			loadTourBundle();
		}
	}, [visible, tourBundleLoaded]);

	// const Tour = getTourComponent();
	// return (
	// 	<Tour
	// 		i18n={i18n}
	// 		isOpen={showTour}
	// 		onClose={toggleTour}
	// 	/>
	// );

	return (
		<Dialog onClose={onClose} open={visible}>
			<div style={{ width: 540 }}>
				<DialogTitle onClose={onClose}>Tours</DialogTitle>
				<DialogContent dividers>
					<div className={styles.cols}>
						<div className={styles.col}>
							Alright! Let's make sense of this thing. Click on one of the links to the
							right to see a tour of that feature.
						</div>
						<div className={styles.separator} />
						<div className={styles.col}>
							<Button color="primary" variant="outlined">
								<GearIcon />
								Intro to the generator
							</Button>
							<Button color="primary" variant="outlined">
								<ListIcon />
								The Grid Panel
							</Button>
							<Button color="primary" variant="outlined">
								<PreviewIcon />
								The Preview Panel
							</Button>
							<Button color="primary" variant="outlined" disabled={true}>
								<PersonIcon />
								Your User Account
							</Button>
						</div>
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose} color="primary" variant="outlined">{i18n.close}</Button>
				</DialogActions>
			</div>
		</Dialog>
	);
};


export default TourDialog;
