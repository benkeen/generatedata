import React from 'react';
import { PrimaryButton } from '~components/Buttons.component';
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
				<PrimaryButton
					size="medium"
					style={{ marginRight: 6 }}
					onClick={close}>
					{i18n.tryDifferentTour}
				</PrimaryButton>
				<PrimaryButton
					size="medium"
					color="default"
					onClick={onExit}>
					Exit
				</PrimaryButton>
			</p>
		</>
	);
};
