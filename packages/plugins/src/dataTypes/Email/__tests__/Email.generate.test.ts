import * as sinon from 'sinon';
import * as generation from '../Email.generate';
import utils from '../../../../utils';

const words = ['one', 'two', 'three', 'four', 'five', 'six'];
describe('getRandomEmailPrefix', () => {
    beforeAll(() => {
        generation.setUtils(utils);
    });

    afterEach(function () {
        sinon.restore();
    });

    it('generates an email address with a single word prefix (word before the @)', () => {
        sinon.stub(utils.randomUtils, 'getRandomNum')
            .onCall(0).returns(1)  // number of prefixed words
            .onCall(1).returns(0); // prefix word offset

        expect(generation.getRandomEmailPrefix(words)).toEqual('one');
    });

    it('gets a specific single prefix word', () => {
        sinon.stub(utils.randomUtils, 'getRandomNum')
            .onCall(0).returns(1)  // number of prefixed words
            .onCall(1).returns(4); // prefix word offset

        expect(generation.getRandomEmailPrefix(words)).toEqual('five');
    });

    it('multiple prefix words are separated by dots #1', () => {
        sinon.stub(utils.randomUtils, 'getRandomNum')
            .onCall(0).returns(2)  // number of prefixed words
            .onCall(1).returns(3); // prefix word offset

        expect(generation.getRandomEmailPrefix(words)).toEqual('four.five');
    });

    it('multiple prefix words are separated by dots #3', () => {
        sinon.stub(utils.randomUtils, 'getRandomNum')
            .onCall(0).returns(3)  // number of prefixed words
            .onCall(1).returns(2); // prefix word offset

        expect(generation.getRandomEmailPrefix(words)).toEqual('three.four.five');
    });

    it('punctuation in words (.,;:) are removed', () => {
        sinon.stub(utils.randomUtils, 'getRandomNum')
            .onCall(0).returns(4)  // number of prefixed words
            .onCall(1).returns(0); // prefix word offset

        expect(generation.getRandomEmailPrefix(['one.', 'two:', 'th,ree', 'four;'])).toEqual('one.two.three.four');
    });

    it('picks a random suffix', () => {
        sinon.stub(utils.randomUtils, 'getRandomNum')
            .onCall(0).returns(1) // number of prefixed words
            .onCall(1).returns(0) // prefix word offset
            .onCall(2).returns(1) // number of domain words
			.onCall(3).returns(2); // domain word offset

        expect(generation.getRandomEmailPrefix(words)).toEqual('one');
    });

    // it('truncates the email if it is over 254 chars', () => {
    //     const words = ['a'.repeat(150), 'b'.repeat(150)];
    //     sinon.stub(utils.randomUtils, 'getRandomNum')
    //         .onCall(0).returns(1) // number of prefixed words
    //         .onCall(1).returns(0) // prefix word offset
    //         .onCall(2).returns(1) // number of domain words
    //         .onCall(3).returns(1); // domain word offset
	//
	// 	sinon.stub(utils.randomUtils, 'getRandomArrayValue').returns('ca'); // suffix
	//
    //     expect(generation.getRandomEmailPrefix(words, ['b'.repeat(150)], ['ca'])).toEqual(`${'a'.repeat(75)}@${'b'.repeat(75)}.ca`);
    // });
});
