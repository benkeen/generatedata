import { ETSettings } from '~types/exportTypes';

export const defaultETSettings: ETSettings = {
  onUpdate: () => {},
  data: null,
  coreI18n: {},
  i18n: {},
  id: 'id',
  layout: 'horizontal'
};

// requires the DT test to supply i18n and rowState (if pertinent)
export const getBlankDTGeneratorPayload = () => ({
  rowNum: 1,
  rowState: null,
  countryI18n: {},
  existingRowData: [],
  countryData: {},
  workerUtilsUrl: ''
});
