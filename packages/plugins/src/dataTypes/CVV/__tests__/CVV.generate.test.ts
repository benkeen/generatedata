import i18n from '../i18n/en.json';
import utils from '@generatedata/utils/worker';
import sinon from 'sinon';
import { getBlankDTGeneratorPayload } from '../../../tests/testHelpers';
import { onmessage } from '../CVV.worker';

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
        i18n
      }
    };

    sinon.stub(utils.randomUtils, 'getRandomNum').onCall(0).returns(123);

    onmessage(payload);
    expect(postMessage).toHaveBeenCalledWith({ display: 123 });
  });
});
