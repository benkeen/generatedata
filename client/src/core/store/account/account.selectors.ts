import { Store } from '~types/general';

export const getFirstName = (state: Store): string => state.account.firstName;
export const getProfileImage = (state: Store): string | null => state.account.profileImage;
