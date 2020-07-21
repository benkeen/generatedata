/*
	const [mode, setMode] = React.useState('');
	const [code, setCode] = React.useState(''); // memoize

	React.useEffect(() => {
		let mode = '';
		let content = '';
		if (exportTypeSettings.language === 'JavaScript') {
			content = generateJS(data, exportTypeSettings);
		} else if (exportTypeSettings.language === 'CSharp') {
			content = generateCSharp(data);
		} else if (exportTypeSettings.language === 'Perl') {
			content = generatePerl(data);
		} else if (exportTypeSettings.language === 'PHP') {
			content = generatePhp(data);
		} else if (exportTypeSettings.language === 'Ruby') {
			content = generateRuby(data);
		}
		setMode(mode);
		setCode(content);
	}, [data, exportTypeSettings, setCode]);
*/

export const generate = (): any => {
	return {
		display: ''
	};
};
