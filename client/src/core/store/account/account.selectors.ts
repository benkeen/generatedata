import { Store } from '~types/general';

export const getFirstName = (state: Store): string => state.account.firstName;
export const getLastName = (state: Store): string => state.account.lastName;
export const getEmail = (state: Store): string => state.account.email;
export const getProfileImage = (state: Store): string | null => state.account.profileImage;
