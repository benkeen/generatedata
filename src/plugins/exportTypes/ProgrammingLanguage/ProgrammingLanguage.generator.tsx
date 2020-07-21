/*
	const [mode, setMode] = React.useState('');
	const [code, setCode] = React.useState(''); // memoize

	React.useEffect(() => {
		let mode = '';
		let content = '';
		if (exportTypeSettings.language === 'JavaScript') {
			content = generateJS(data, exportTypeSettings);
			mode = 'text/javascript';
		} else if (exportTypeSettings.language === 'CSharp') {
			content = generateCSharp(data);
			mode = 'text/x-csharp';
		} else if (exportTypeSettings.language === 'Perl') {
			content = generatePerl(data);
			mode = 'text/x-perl';
		} else if (exportTypeSettings.language === 'PHP') {
			content = generatePhp(data);
			mode = 'text/x-php';
		} else if (exportTypeSettings.language === 'Ruby') {
			content = generateRuby(data);
			mode = 'text/x-ruby';
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
