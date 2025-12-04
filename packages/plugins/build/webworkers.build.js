  // looks through the plugins and finds the plugins that have a generator web worker file
  const dataTypeWebWorkerMap = (() => {
    const baseFolder = path.join(__dirname, 'node_modules/@generatedata/plugins/dist/dataTypes');
    const folders = fs.readdirSync(baseFolder);

    const map = {};
    folders.forEach((folder) => {
      const webworkerFile = path.join(`${baseFolder}/${folder}/${folder}.worker.ts`);
      if (!fs.existsSync(webworkerFile)) {
        return;
      }
      // map[`dist/workers/DT-${folder}.worker.js`] = [`src/plugins/dataTypes/${folder}/${folder}.worker.ts`];
      map[`dist/workers/DT-${folder}.worker.js`] = [`${baseFolder}/${folder}/${folder}.worker.ts`];
    });

    return map;
  })();

  console.log(dataTypeWebWorkerMap);

  // const exportTypeWebWorkerMap = (() => {
  // 	const baseFolder = path.join(__dirname, '/src/plugins/exportTypes');
  // 	const folders = fs.readdirSync(baseFolder);

  // 	const map = {};
  // 	folders.forEach((folder) => {
  // 		const webworkerFile = path.join(__dirname, `/src/plugins/exportTypes/${folder}/${folder}.worker.ts`);
  // 		if (!fs.existsSync(webworkerFile)) {
  // 			return;
  // 		}
  // 		map[`dist/workers/ET-${folder}.worker.js`] = [`src/plugins/exportTypes/${folder}/${folder}.worker.ts`];
  // 	});

  // 	return map;
  // })();

  const webWorkerFileListWithType = [
    { file: 'src/core/generator/generation.worker.ts', type: 'core' },
    { file: 'src/utils/workerUtils.ts', type: 'core' }
  ];
  // Object.values(dataTypeWebWorkerMap).forEach((dt) => {
  // 	webWorkerFileListWithType.push({ file: dt[0], type: 'dataType' });
  // });
  // Object.values(exportTypeWebWorkerMap).forEach((et) => {
  // 	webWorkerFileListWithType.push({ file: et[0], type: 'exportType' });
  // });

  // const webWorkerFileList = webWorkerFileListWithType.map((i) => i.file);

  const generateWorkerMapFile = () => {
    fs.writeFileSync('./_pluginWebWorkers.ts', `/* eslint quotes:0 */\nexport default ${JSON.stringify(webWorkerMap, null, '\t')};`);
  };

  const getWebWorkerShellCommands = (omitFiles = {}) => {
    const commands = {};

    webWorkerFileListWithType.forEach(({ file, type }, index) => {
      if (omitFiles[file]) {
        return;
      }

      const filename = path.basename(file, path.extname(file));
      let target = `dist/workers/${filename}.js`;

      if (['dataType', 'exportType'].indexOf(type) !== -1) {
        // 'country'
        const filename = helpers.getScopedWorkerFilename(file, type);
        target = `dist/workers/${filename}`;
      }

      // TODO detect when the command is run and look for the generated __hash-[filename] content, then update
      commands[`buildWebWorker${index}`] = {
        command: `npx rollup -c --config-src=${file} --config-target=${target}`
      };
    });

    return commands;
  };

  // generating every web worker bundle takes time. To get around that, rollup generates a file in the dist/workers
  // file for each bundle, with the filename of form:
  //      Plugins (e.g.):
  //          __hash-DT-Alphanumeric.generator
  //          __hash-ET-JSON.generator
  //
  //      Core workers:
  //          __hash-core.worker
  //          __hash-generation.worker
  //          __hash-workerUtils
  // we then use that information here to check to see if we need to regenerate or not
  const getWebWorkerBuildCommandNames = () => {
    const omitFiles = {};
    webWorkerFileListWithType.forEach(({ file, type }) => {
      const filename = helpers.getScopedWorkerFilename(file, type);
      const filenameHash = helpers.getHashFilename(filename);

      if (!helpers.hasWorkerFileChanged(`${workersFolder}/${filename}`, `${workersFolder}/${filenameHash}`)) {
        omitFiles[file] = true;
      }
    });

    return Object.keys(getWebWorkerShellCommands(omitFiles)).map((cmdName) => `shell:${cmdName}`);
  };

  // const webWorkerWatchers = (() => {
  // 	const tasks = {};

  // 	// this contains *ALL* web worker tasks. It ensures that everything is watched.
  // 	webWorkerFileList.forEach((workerPath, index) => {
  // 		tasks[`webWorkerWatcher${index}`] = {
  // 			files: [workerPath],
  // 			options: { spawn: false },
  // 			tasks: [`shell:buildWebWorker${index}`, `md5:webWorkerMd5Task${index}`, 'generateWorkerMapFile']
  // 		};
  // 	});

  // 	return tasks;
  // })();

  const processMd5Change = (fileChanges) => {
    const oldPath = fileChanges[0].oldPath;
    const oldFile = path.basename(oldPath);
    const newFilename = path.basename(fileChanges[0].newPath);

    if (oldPath === 'dist/workers/generation.worker.js') {
      webWorkerMap.generationWorker = newFilename;
    } else if (oldPath === 'dist/workers/workerUtils.js') {
      webWorkerMap.workerUtils = newFilename;
    } else {
      const [pluginFolder] = oldFile.split('.');
      const cleanPluginFolder = pluginFolder.replace(/^(DT-|ET-)/, '');

      if (/^DT-/.test(oldFile)) {
        webWorkerMap.dataTypes[cleanPluginFolder] = newFilename;
      } else if (/^ET-/.test(oldFile)) {
        webWorkerMap.exportTypes[cleanPluginFolder] = newFilename;
      }
    }
  };

  // these tasks execute individually AFTER the worker has already been generated in the dist/workers folder
  const webWorkerMd5Tasks = (() => {
    const tasks = {};
    webWorkerFileListWithType.forEach(({ file, type }, index) => {
      const fileName = helpers.getScopedWorkerFilename(file, type);
      const newFileLocation = `dist/workers/${fileName}`; // N.B. here it's now a JS file, not TS

      tasks[`webWorkerMd5Task${index}`] = {
        files: {
          [newFileLocation]: newFileLocation
        },
        options: {
          after: (fileChanges) => processMd5Change(fileChanges, webWorkerMap)
        }
      };
    });

    return tasks;
  })();

  const getWebWorkerMd5TaskNames = () => {
    return Object.keys(webWorkerMd5Tasks).map((cmdName) => `md5:${cmdName}`);
  };
