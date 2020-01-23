import * as React from 'react';
import Switch from '@material-ui/core/Switch';
import Dropdown from '../dropdown/Dropdown';
import C from '../../core/constants';

export type PreviewPanelSettingsProps = {
	theme: string;
	showRowNumbers: boolean;
	previewTextSize: number;
	textSize: number;
	onChangeTheme: Function;
	toggleRowNumbers: Function;
	onChangePreviewTextSize: Function;
}

export const PreviewPanelSettings = ({
	theme, previewTextSize, onChangeTheme, showRowNumbers, toggleRowNumbers, onChangePreviewTextSize
}: PreviewPanelSettingsProps): React.ReactElement => {

	return (
		<div className="previewPanelSettings">
			<div>
				Theme:
				<Dropdown
					value={theme}
					options={C.THEMES}
					onChange={({ value }: any): void => onChangeTheme(value)}
				/>
			</div>
			<div>
				Show line numbers
				<Switch
					checked={showRowNumbers}
					value="checked"
					color="default"
					onChange={(): void => toggleRowNumbers()}
				/>
			</div>
			<div>
				Text size
				<input
					type="number"
					value={previewTextSize}
					style={{ width: 60 }}
					onChange={(e: any) => onChangePreviewTextSize(e.target.value)}
				/>
			</div>
		</div>
	);
};
