import * as React from 'react';
import Switch from '@material-ui/core/Switch';
import Dropdown from '../dropdown/Dropdown';

export type PreviewPanelSettingsProps = {
	theme: string;
	showRowNumbers: boolean;
	onChangeTheme: Function;
	toggleRowNumbers: Function;
}

const themes = [
	{ value: 'ambiance', label: 'Ambience' },
	{ value: 'cobalt', label: 'Cobalt' },
	{ value: 'darcula', label: 'Darcula' },
	{ value: 'lucario', label: 'Lucario' }
];

export const PreviewPanelSettings = ({ theme, showRowNumbers, toggleRowNumbers }: PreviewPanelSettingsProps): React.ReactElement => {
	return (
		<div>
			<div>
				Theme: 
				<Dropdown
					value={theme}
					options={themes}
				/>
			</div>
			<div>
				Show row numbers
				<Switch
					checked={showRowNumbers}
					value="checked"
					color="default"
					onChange={(): void => toggleRowNumbers()}
				/>
			</div>
		</div>
	);
};
