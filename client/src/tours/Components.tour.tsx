import React from 'react';
import { PrimaryButton, NullButton } from '~components/Buttons.component';
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
				<NullButton
					size="medium"
					onClick={onExit}>
					Exit
				</NullButton>
			</p>
		</>
	);
};
