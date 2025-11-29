import { DTGenerateResult, DTGenerationData, WorkerUtils } from '../../';

export const generate = (data: DTGenerationData, utils: WorkerUtils): DTGenerateResult => {
  const {
    protocolEnabled,
    protocolOptions,
    hostnameEnabled,
    hostnameOptions,
    pathEnabled,
    pathOptions,
    queryParamsEnabled,
    queryParamsOptions
  } = data.rowState;

  let url = '';
  if (protocolEnabled) {
    url += utils.randomUtils.getRandomArrayValue(protocolOptions);
  }
  if (hostnameEnabled) {
    url += utils.randomUtils.getRandomArrayValue(hostnameOptions);
  }
  if (pathEnabled) {
    url += '/' + utils.randomUtils.getRandomArrayValue(pathOptions);
  }
  if (queryParamsEnabled) {
    url += '?' + utils.randomUtils.getRandomArrayValue(queryParamsOptions);
  }

  return {
    display: url
  };
};
