import sinon from 'sinon';
import utils from '../../../workerUtils';
import { onmessage } from '../PIN.worker';

describe('onmessage', () => {
  const postMessage = jest.fn();
  const importScripts = jest.fn();
  beforeAll(() => {
    window.postMessage = postMessage;
    window.importScripts = importScripts;
  });

  it('generates random data', () => {
    sinon.stub(utils.randomUtils, 'getRandomNum').returns(444);

    const payload: any = {
      data: {
        workerUtilsUrl: ''
      }
    };

    onmessage(payload);
    expect(postMessage).toHaveBeenCalledWith({ display: 444 });
  });
});
