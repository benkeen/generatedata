import { getRowGenerationRatePerSecond, getPercentageLabel } from '../generation.helpers';

describe('getRowGenerationRatePerSecond', () => {
	it('if exactly 1 second has gone by, the generation rate should be the exact generation count', () => {
		expect(getRowGenerationRatePerSecond(0, 0, 1000, 123)).toEqual({ 1: 123 });
		expect(getRowGenerationRatePerSecond(0, 1000, 2000, 55)).toEqual({ 2: 55 });
	});

	it('base time should be factored in and still return data in seconds', () => {
		expect(getRowGenerationRatePerSecond(5000, 5000, 6000, 123)).toEqual({ 1: 123 });
		expect(getRowGenerationRatePerSecond(5000, 6000, 7000, 55)).toEqual({ 2: 55 });
	});

	it('base time should be factored in', () => {
		expect(getRowGenerationRatePerSecond(0, 5000, 6000, 10)).toEqual({ 6: 10 });
		expect(getRowGenerationRatePerSecond(0, 6000, 7000, 19)).toEqual({ 7: 19 });
	});

	it('if exactly 2 seconds have passed, the generation rate is half the numRows passed', () => {
		expect(getRowGenerationRatePerSecond(0, 0, 2000, 100)).toEqual({ 1: 50, 2: 50 });
		expect(getRowGenerationRatePerSecond(0, 0, 2000, 150)).toEqual({ 1: 75, 2: 75 });
		expect(getRowGenerationRatePerSecond(0, 0, 2000, 60)).toEqual({ 1: 30, 2: 30 });
	});

	it("end fractions of a second are factored in", () => {
		expect(getRowGenerationRatePerSecond(0, 0, 1500, 60)).toEqual({ 1: 40, 2: 20 });
	});

	it("start fractions of a second are factored in", () => {
		expect(getRowGenerationRatePerSecond(0, 500, 2000, 60)).toEqual({ 1: 20, 2: 40 });
	});
});

describe('getPercentageLabel', () => {
	it('returns appropriate decimal places based on num generated', () => {
		expect(getPercentageLabel(90, 1000)).toEqual('90');
		expect(getPercentageLabel(90, 10000)).toEqual('90.0');
		expect(getPercentageLabel(90, 100000)).toEqual('90.0');
		expect(getPercentageLabel(90, 1000000)).toEqual('90.00');
	});
});
