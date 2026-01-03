import { PrimaryButton, SecondaryButton } from '@generatedata/core';
import { getStrings } from '@generatedata/utils/lang';

export const TourCompleteStep = ({ close }: any) => {
  const { core: i18n } = getStrings();

  const onExit = (): void => {
    close(true);
  };

  return (
    <>
      <h2>{i18n.tourComplete}</h2>

      <p>{i18n.tourCompleteDesc}</p>

      <p>
        <PrimaryButton size="medium" style={{ marginRight: 6 }} onClick={close}>
          {i18n.tryDifferentTour}
        </PrimaryButton>
        <SecondaryButton size="medium" onClick={onExit}>
          Exit
        </SecondaryButton>
      </p>
    </>
  );
};
