import * as generation from '../Company.generate';
import * as sinon from 'sinon';
import * as randomUtils from '../../../../utils/randomUtils';

const companyTypes = ['Inc.', 'Co.'];
const words = ['one', 'two', 'three'];

describe('generateCompanyName', () => {
    afterEach(function () {
        sinon.restore();
    });

    it('generates a company name', () => {
        sinon.stub(randomUtils, 'getRandomNum')
            .onCall(0).returns(1) // number of words
            .onCall(1).returns(0) // company name words offset
            .onCall(2).returns(0); // company type

        expect(generation.generateCompanyName(words, companyTypes)).toEqual('One Inc.');
    });

    it('picks a random company word', () => {
        sinon.stub(randomUtils, 'getRandomNum')
            .onCall(0).returns(1) // number of words
            .onCall(1).returns(1) // company name words offset
            .onCall(2).returns(0); // company type

        expect(generation.generateCompanyName(words, companyTypes)).toEqual('Two Inc.');
    });

    it('picks multiple company words', () => {
        sinon.stub(randomUtils, 'getRandomNum')
            .onCall(0).returns(3) // number of words
            .onCall(1).returns(0) // company name words offset
            .onCall(2).returns(0); // company type

        expect(generation.generateCompanyName(words, companyTypes)).toEqual('One Two Three Inc.');
    });

    it('picks a random company type', () => {
        sinon.stub(randomUtils, 'getRandomNum')
            .onCall(0).returns(1) // number of words
            .onCall(1).returns(2) // company name words offset
            .onCall(2).returns(1); // company type

        expect(generation.generateCompanyName(words, companyTypes)).toEqual('Three Co.');
    });
});


























