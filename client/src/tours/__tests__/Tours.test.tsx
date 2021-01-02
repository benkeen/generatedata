import React from 'react';
import sinon from 'sinon';
import { render } from '@testing-library/react';
import { TourCompleteStep } from '../Components.tour';
import GridPanelTour from '../GridPanel.tour';
import IntroToGenerator from '../IntroToGenerator.tour';
import PreviewPanel from '../PreviewPanel.tour';
import * as langUtils from '~utils/langUtils';

const i18n = require('../../i18n/en.json');

describe('TourCompleteStep', () => {
	afterEach(function () {
		sinon.restore();
	});

	it('renders', () => {
		sinon.stub(langUtils, 'getStrings').returns({
			core: i18n,
			dataTypes: {}
		});

		const { container } = render(
			<TourCompleteStep
				close={() => {}}
			/>
		);

		// there should be two buttons
		expect(container.querySelectorAll('button').length).toEqual(2);
	});
});

const tourProps = {
	isOpen: true,
	onClose: () => {},
	maskClassName: 'test',
	closeWithMask: true,
	disableInteraction: true,
	accentColor: '#444400',
	className: 'classname'
};

describe('GriaPanel tour', () => {
	afterEach(function () {
		sinon.restore();
	});

	it('renders', () => {
		sinon.stub(langUtils, 'getStrings').returns({
			core: i18n,
			dataTypes: {}
		});

		const { baseElement } = render(
			<GridPanelTour
				{...tourProps}
			/>
		);

		expect(baseElement.querySelector('svg')).toBeTruthy();
	});
});

describe('IntroToGenerator tour', () => {
	afterEach(function () {
		sinon.restore();
	});

	it('renders', () => {
		sinon.stub(langUtils, 'getStrings').returns({
			core: i18n,
			dataTypes: {}
		});

		const { baseElement } = render(
			<IntroToGenerator
				{...tourProps}
			/>
		);

		expect(baseElement.querySelector('svg')).toBeTruthy();
	});
});

describe('PreviewPanel tour', () => {
	afterEach(function () {
		sinon.restore();
	});

	it('renders', () => {
		sinon.stub(langUtils, 'getStrings').returns({
			core: i18n,
			dataTypes: {}
		});

		const { baseElement } = render(
			<PreviewPanel
				{...tourProps}
			/>
		);

		expect(baseElement.querySelector('svg')).toBeTruthy();
	});
});
