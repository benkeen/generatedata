import * as sinon from 'sinon';
import * as generation from '../Email.generator';
import utils from '../../../../utils';

const words = ['one', 'two', 'three', 'four', 'five', 'six'];
describe('getRandomEmail', () => {
    afterEach(function () {
        sinon.restore();
    });

    it('generates an email address with a single word prefix (word before the @)', () => {
        sinon.stub(utils.randomUtils, 'getRandomNum')
            .onCall(0).returns(1)  // number of prefixed words
            .onCall(1).returns(0); // prefix word offset

        expect(generation.getRandomEmail(words, ['domain'], ['co'])).toEqual('one@domain.co');
    });

    it('gets a specific single prefix word', () => {
        sinon.stub(utils.randomUtils, 'getRandomNum')
            .onCall(0).returns(1)  // number of prefixed words
            .onCall(1).returns(4); // prefix word offset

        expect(generation.getRandomEmail(words, ['domain'], ['co'])).toEqual('five@domain.co');
    });

    it('multiple prefix words are separated by dots #1', () => {
        sinon.stub(utils.randomUtils, 'getRandomNum')
            .onCall(0).returns(2)  // number of prefixed words
            .onCall(1).returns(3); // prefix word offset

        expect(generation.getRandomEmail(words, ['domain'], ['co'])).toEqual('four.five@domain.co');
    });

    it('multiple prefix words are separated by dots #3', () => {
        sinon.stub(utils.randomUtils, 'getRandomNum')
            .onCall(0).returns(3)  // number of prefixed words
            .onCall(1).returns(2); // prefix word offset

        expect(generation.getRandomEmail(words, ['domain'], ['co'])).toEqual('three.four.five@domain.co');
    });

    it('punctuation in words (.,;:) are removed', () => {
        sinon.stub(utils.randomUtils, 'getRandomNum')
            .onCall(0).returns(4)  // number of prefixed words
            .onCall(1).returns(0); // prefix word offset

        expect(generation.getRandomEmail(['one.', 'two:', 'th,ree', 'four;'], ['domain'], ['co'])).toEqual('one.two.three.four@domain.co');
    });

    it('picks a random suffix', () => {
        sinon.stub(utils.randomUtils, 'getRandomNum')
            .onCall(0).returns(1) // number of prefixed words
            .onCall(1).returns(0) // prefix word offset
            .onCall(2).returns(1) // number of domain words
			.onCall(3).returns(2); // domain word offset

        expect(generation.getRandomEmail(words, ['domain'], ['co', 'ca', 'com'])).toEqual('one@domain.ca');
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
    //     expect(generation.getRandomEmail(words, ['b'.repeat(150)], ['ca'])).toEqual(`${'a'.repeat(75)}@${'b'.repeat(75)}.ca`);
    // });
});


























