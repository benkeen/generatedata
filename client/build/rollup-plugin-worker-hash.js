const helpers = require('./build/helpers.js'); // ... yup.

// runs after each build. It generates a file in the dist folder containing the hash of the file just generated. This
// lets the grunt tasks only every regenerate the files that are necessary - because it's really slow
const WorkerHash = () => {
	return {
		name: 'WorkerHash',
		writeBundle (outputOptions, bundle) {
			const file = Object.keys(bundle)[0];
			helpers.generateWorkerHashfile(file, `dist/workers`);
		}
	};
};

export default WorkerHash;
