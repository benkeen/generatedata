import * as React from 'react';

type ExportFormat = 'table' | 'ul' | 'dl';

export type HTMLSettings = {
	exportFormat: ExportFormat;
};

export const initialState: HTMLSettings = {
	exportFormat: 'table'
};

export const Settings = ({ i18n, id, data }: any): JSX.Element => {
	return (
		<>
			<table cellSpacing="0" cellPadding="0">
				<tr>
					<td>{i18n.data_format}</td>
					<td>
						<input type="radio" id={`${id}-table`} value="table" checked={data.exportFormat === 'table'}/>
						<label htmlFor={`${id}-table`}>&lt;table&gt;</label>
						<input type="radio" id={`${id}-ul`} value="ul" checked={data.exportFormat === 'ul'}/>
						<label htmlFor={`${id}-ul`}>&lt;ul&gt;</label>
						<input type="radio" id={`${id}-dl`} value="dl" checked={data.exportFormat === 'dl'}/>
						<label htmlFor={`${id}-dl`}>&lt;dl&gt;</label>
					</td>
					<td>
						<input type="checkbox" id="etHTMLUseCustomExportFormat"/>
						<label htmlFor="etHTMLUseCustomExportFormat">{i18n.use_custom_html_format}</label>
						<input type="button" id="etHTMLEditCustomFormat" value="edit" disabled/>
					</td>
				</tr>
			</table>
		</>
	);
};
