import * as generation from '../Email.generate';
import * as sinon from 'sinon';
import * as randomUtils from '../../../../utils/randomUtils';

const words = ['one', 'two', 'three', 'four', 'five', 'six'];
describe('getRandomEmail', () => {
    afterEach(function () {
        sinon.restore();
    });

    it('generates an email address with a single word prefix (word before the @)', () => {
        sinon.stub(randomUtils, 'getRandomNum')
            .onCall(0).returns(1) // number of prefixed words
            .onCall(1).returns(0) // prefix word offset
            .onCall(2).returns(1) // number of domain words
			.onCall(3).returns(0); // domain word offset
		sinon.stub(randomUtils, 'getRandomArrayValue').returns('co'); // suffix

        expect(generation.getRandomEmail(words, ['co'])).toEqual('one@one.co');
    });

    it('gets a specific single prefix word', () => {
        sinon.stub(randomUtils, 'getRandomNum')
            .onCall(0).returns(1) // number of prefixed words
            .onCall(1).returns(4) // prefix word offset
            .onCall(2).returns(1) // number of domain words
            .onCall(3).returns(0); // domain word offset
		sinon.stub(randomUtils, 'getRandomArrayValue').returns('co'); // suffix

        expect(generation.getRandomEmail(words, ['co'])).toEqual('five@one.co');
    });

    it('multiple prefix words are separated by dots #1', () => {
        sinon.stub(randomUtils, 'getRandomNum')
            .onCall(0).returns(2) // number of prefixed words
            .onCall(1).returns(3) // prefix word offset
            .onCall(2).returns(1) // number of domain words
            .onCall(3).returns(0); // domain word offset

		sinon.stub(randomUtils, 'getRandomArrayValue').returns('co'); // suffix

        expect(generation.getRandomEmail(words, ['co'])).toEqual('four.five@one.co');
    });

    it('multiple prefix words are separated by dots #3', () => {
        sinon.stub(randomUtils, 'getRandomNum')
            .onCall(0).returns(3) // number of prefixed words
            .onCall(1).returns(2) // prefix word offset
            .onCall(2).returns(1) // number of domain words
            .onCall(3).returns(0); // domain word offset
		sinon.stub(randomUtils, 'getRandomArrayValue').returns('co'); // suffix

        expect(generation.getRandomEmail(words, ['co'])).toEqual('three.four.five@one.co');
    });

    it('punctuation in words (.,;:) are removed', () => {
        sinon.stub(randomUtils, 'getRandomNum')
            .onCall(0).returns(4) // number of prefixed words
            .onCall(1).returns(0) // prefix word offset
            .onCall(2).returns(1) // number of domain words
			.onCall(3).returns(0); // domain word offset
			
		sinon.stub(randomUtils, 'getRandomArrayValue').returns('co'); // suffix

        expect(generation.getRandomEmail(['one.', 'two:', 'th,ree', 'four;'], ['co'])).toEqual('one.two.three.four@one.co');
    });

    it('picks a random suffix', () => {
        sinon.stub(randomUtils, 'getRandomNum')
            .onCall(0).returns(1) // number of prefixed words
            .onCall(1).returns(0) // prefix word offset
            .onCall(2).returns(1) // number of domain words
			.onCall(3).returns(2); // domain word offset
			
		sinon.stub(randomUtils, 'getRandomArrayValue').returns('ca'); // suffix

        expect(generation.getRandomEmail(words, ['co', 'ca', 'com'])).toEqual('one@three.ca');
    });

    it('truncates the email if it is over 254 chars', () => {
        const words = ['a'.repeat(150), 'b'.repeat(150)];
        sinon.stub(randomUtils, 'getRandomNum')
            .onCall(0).returns(1) // number of prefixed words
            .onCall(1).returns(0) // prefix word offset
            .onCall(2).returns(1) // number of domain words
            .onCall(3).returns(1); // domain word offset

		sinon.stub(randomUtils, 'getRandomArrayValue').returns('ca'); // suffix

        expect(generation.getRandomEmail(words, ['ca'])).toEqual(`${'a'.repeat(75)}@${'b'.repeat(75)}.ca`);
    });

});
