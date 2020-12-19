import React, { useState } from 'react';
import Measure from 'react-measure';
import AutoSizer from 'react-input-autosize';

export type GeneratorControlsProps = {
	i18n: any;
	dataSetName: string;
	isLoggedIn: boolean;
	onUpdate: (newDataSetName: string) => void;
};

const GeneratorControls = ({ isLoggedIn, dataSetName, onUpdate }: GeneratorControlsProps): JSX.Element => {
	const [dimensions, setDimensions] = useState<any>({ height: 0, width: 0 });
	const [newDataSetName, setNewDataSetName] = useState(dataSetName);

	const onChange = (e: any): void => {
		setNewDataSetName(e.target.value);
	};

	const onKeyUp = (e: any): void => {
		if (e.key === 'Escape') {
			setNewDataSetName(dataSetName);
		} else if (e.key === 'Enter') {
			console.log("<enter>");
			onUpdate(newDataSetName);
		}
	};

	const getMenu = () => {
		if (!isLoggedIn) {
			return null;
		}

		return (
			<span>
				^
			</span>
		);
	};

	const maxInputFieldWidth = dimensions.width - 50;

	return (
		<Measure
			bounds
			onResize={(contentRect: any): void => setDimensions(contentRect.bounds)}
		>
			{({ measureRef }): any => (
				<div ref={measureRef}>
					<AutoSizer
						inputStyle={{ fontSize: 18, maxWidth: maxInputFieldWidth }}
						placeholder="Enter Data Set Name here..."
						onChange={onChange}
						onKeyUp={onKeyUp}
						value={newDataSetName}
					/>
					{getMenu()}
				</div>
			)}
		</Measure>
	);
};

export default GeneratorControls;
