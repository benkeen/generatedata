import i18n from '@generatedata/i18n';
import utils from '@generatedata/utils/worker';
import sinon from 'sinon';
import { getBlankDTGeneratorPayload } from '../../../tests/testHelpers';
import { initialState } from '../Alphanumeric.state';
import { onmessage } from '../Alphanumeric.worker';

describe('onmessage', () => {
  const postMessage = jest.fn();
  const importScripts = jest.fn();
  beforeAll(() => {
    window.postMessage = postMessage;
    window.importScripts = importScripts;
  });

  it('generates random data', () => {
    const payload: any = {
      data: {
        ...getBlankDTGeneratorPayload(),
        rowState: {
          value: initialState.value
        },
        i18n
      }
    };

    sinon.stub(utils.randomUtils, 'generateRandomAlphanumericStr').returns('*****');

    onmessage(payload);
    expect(postMessage).toHaveBeenCalledWith({ display: '*****' });
  });
});
