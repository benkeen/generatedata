import React from 'react';
import Button from '@material-ui/core/Button';
import { getStrings } from '~utils/langUtils';


export const TourCompleteStep = ({ close }: any): JSX.Element => {
	const { core: i18n } = getStrings();

	const onExit = (): void => {
		close(true);
	};

	return (
		<>
			<h2>{i18n.tourComplete}</h2>

			<p>
				{i18n.tourCompleteDesc}
			</p>

			<p>
				<Button
					size="medium"
					color="primary"
					variant="outlined"
					style={{ marginRight: 6 }}
					onClick={close}>{i18n.tryDifferentTour}</Button>
				<Button
					size="medium"
					color="default"
					variant="outlined"
					onClick={onExit}>{i18n.exit}</Button>
			</p>
		</>
	);
};
