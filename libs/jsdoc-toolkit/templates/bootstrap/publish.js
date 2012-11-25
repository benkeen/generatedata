// This script licensed under the MIT.
// http://orgachem.mit-license.org
//
// Original script is licensed under the MIT.
// jsdoc-toolkit project:
// http://code.google.com/p/jsdoc-toolkit/

/**
 * @fileoverview Script for a document publication.
 * @author orga.chem.job@gmail.com (Orga Chem)
 */


/** Called automatically by JsDoc Toolkit. */
function publish(symbolSet) {
	publish.conf = {	// trailing slash expected for dirs
		name:				"neo-jsdoctpl-bootstrap",
		version:		 "0.0",
		ext:				 ".html",
		outDir:			JSDOC.opt.d || SYS.pwd+"../out/jsdoc/",
		templatesDir: JSDOC.opt.t || SYS.pwd+"../templates/jsdoc/",
		symbolsDir:	"symbols/",
		srcDir:			"symbols/src/"
	};
	
  // overwrite to a better Link module
  eval(include('extends/Link.js'));

	// is source output is suppressed, just display the links to the source file
	if (JSDOC.opt.s && defined(Link) && Link.prototype._makeSrcLink) {
		Link.prototype._makeSrcLink = function(srcFilePath) {
			return "&lt;"+srcFilePath+"&gt;";
		}
	}
	
	// create the folders and subfolders to hold the output
	IO.mkPath((publish.conf.outDir+"symbols/src").split("/"));
	IO.mkPath((publish.conf.outDir+"js").split("/"));
	IO.mkPath((publish.conf.outDir+"css").split("/"));
	IO.mkPath((publish.conf.outDir+"img").split("/"));
		
	// used to allow Link to check the details of things being linked to
	Link.symbolSet = symbolSet;

	// create the required templates
	try {
		var classTemplate = new JSDOC.JsPlate(publish.conf.templatesDir+"class.tmpl");
		var classesTemplate = new JSDOC.JsPlate(publish.conf.templatesDir+"allclasses.tmpl");
		var sourceTemplate =	new JSDOC.JsPlate(publish.conf.templatesDir+"source.tmpl");
	}
	catch(e) {
		print("Couldn't create the required templates: "+e);
		quit();
	}
	
	// some ustility filters
	function hasNoParent($) {return ($.memberOf == "")}
	function isaFile($) {return ($.is("FILE"))}
	function isaClass($) {return ($.is("CONSTRUCTOR") || $.isNamespace)}
	
	// get an array version of the symbolset, useful for filtering
	var symbols = symbolSet.toArray();
	
		
		// get a list of all the classes in the symbolset
		var classes = smartSort(symbols.filter(isaClass));
	
	// create a filemap in which outfiles must be to be named uniquely, ignoring case
	if (JSDOC.opt.u) {
		var filemapCounts = {};
		Link.filemap = {};
		for (var i = 0, l = classes.length; i < l; i++) {
			var lcAlias = classes[i].alias.toLowerCase();
			
			if (!filemapCounts[lcAlias]) filemapCounts[lcAlias] = 1;
			else filemapCounts[lcAlias]++;
			
			Link.filemap[classes[i].alias] = 
				(filemapCounts[lcAlias] > 1)?
				lcAlias+"_"+filemapCounts[lcAlias] : lcAlias;
		}
	}
	
	// create a class index, displayed in the left-hand column of every class page
	Link.base = "../";
		publish.classesIndex = classesTemplate.process(classes); // kept in memory
	
	// create each of the class pages
	for (var i = 0, l = classes.length; i < l; i++) {
		var symbol = classes[i];
		
		symbol.events = symbol.getEvents();	 // 1 order matters
		symbol.methods = symbol.getMethods(); // 2
		
		Link.currentSymbol= symbol;
		var output = "";
		output = classTemplate.process(symbol);
		
		IO.saveFile(publish.conf.outDir+"symbols/", ((JSDOC.opt.u)? Link.filemap[symbol.alias] : symbol.alias) + publish.conf.ext, output);
	}

	// create the source code files
	Link.base = "../../";
	publish.classesIndex = classesTemplate.process(classes); // kept in memory
	var files = JSDOC.opt.srcFiles;
		for (var i = 0, l = files.length; i < l; i++) {
			var file = files[i];
			var srcDir = publish.conf.outDir + "symbols/src/";
			var name = file.replace(/\.\.?[\\\/]/g, "").replace(/[\\\/]/g, "_");
			name = name.replace(/\:/g, "_");
			var output = "";
			output = sourceTemplate.process({ file: file, source: escapeHTML(IO.readFile(file)) });
			
			IO.saveFile(srcDir, name + publish.conf.ext, output);
		}
	
	// regenerate the index with different relative links, used in the index pages
	Link.base = "";
	publish.classesIndex = classesTemplate.process(classes);
	
	// create the class index page
	try {
		var classesindexTemplate = new JSDOC.JsPlate(publish.conf.templatesDir+"index.tmpl");
	}
	catch(e) { print(e.message); quit(); }
	
	var classesIndex = classesindexTemplate.process(classes);
	IO.saveFile(publish.conf.outDir, "index"+publish.conf.ext, classesIndex);
	classesindexTemplate = classesIndex = classes = null;
	
	// create the file index page
	try {
		var fileindexTemplate = new JSDOC.JsPlate(publish.conf.templatesDir+"allfiles.tmpl");
	}
	catch(e) { print(e.message); quit(); }
	
	var documentedFiles = symbols.filter(isaFile); // files that have file-level docs
	var allFiles = []; // not all files have file-level docs, but we need to list every one
	
	for (var i = 0; i < files.length; i++) {
		allFiles.push(new JSDOC.Symbol(files[i], [], "FILE", new JSDOC.DocComment("/** */")));
	}
	
	for (var i = 0; i < documentedFiles.length; i++) {
		var offset = files.indexOf(documentedFiles[i].alias);
		allFiles[offset] = documentedFiles[i];
	}
		
	allFiles = allFiles.sort(makeSortby("name"));

	// output the file index page
	var filesIndex = fileindexTemplate.process(allFiles);
	IO.saveFile(publish.conf.outDir, "files"+publish.conf.ext, filesIndex);
	fileindexTemplate = filesIndex = files = null;

	// Twitter Bootstrap
	var dstDir;

	var jsPaths = [
      'jquery-1.7.2.min.js',
      'accordion.js',
			'google-code-prettify/prettify.js'
		];
	var numOfJsPaths = jsPaths.length;
	var jsPath;

	dstDir = publish.conf.outDir + 'js/';
	for (var i = 0; i < numOfJsPaths; i++) {
		jsPath = jsPaths[i];
		IO.copyFile(publish.conf.templatesDir + 'static/' + jsPath, dstDir);
	}

	var cssPaths = [
			'common.css',
			'bootstrap/css/bootstrap.min.css',
			'google-code-prettify/prettify.css',
			'print.css'
		];
	var numOfCssPaths = cssPaths.length;
	var cssPath;
	
	dstDir = publish.conf.outDir + 'css/';
	for (var i = 0; i < numOfCssPaths; i++) {
		cssPath = cssPaths[i];
		IO.copyFile(publish.conf.templatesDir + 'static/' + cssPath, dstDir);
	}

	var imgPaths = [
			'bootstrap/img/glyphicons-halflings-white.png',
			'bootstrap/img/glyphicons-halflings.png',
			'img/classicons.png',
			'img/class.png',
			'img/interface.png',
			'img/namespace.png'
		];
	var numOfImgPaths = imgPaths.length;
	var imgPath;
	
	dstDir = publish.conf.outDir + 'img/';
	for (var i = 0; i < numOfImgPaths; i++) {
		imgPath = imgPaths[i];
		IO.copyFile(publish.conf.templatesDir + 'static/' + imgPath, dstDir);
	}
}


/** Just the first sentence (up to a full stop). Should not break on dotted variable names. */
function summarize(desc) {
	if (typeof desc != "undefined")
		return desc.match(/([\w\W]+?\.)[^a-z0-9_$]/i)? RegExp.$1 : desc;
}

/** Make a symbol sorter by some attribute. */
function makeSortby(attribute) {
	return function(a, b) {
		if (a[attribute] != undefined && b[attribute] != undefined) {
			a = a[attribute].toLowerCase();
			b = b[attribute].toLowerCase();
			if (a < b) return -1;
			if (a > b) return 1;
			return 0;
		}
	}
}

/** Pull in the contents of an external file at the given path. */
function include(path) {
	var path = publish.conf.templatesDir+path;
	return IO.readFile(path);
}

/**
 * Build output for displaying function parameters.
 * Output format is:
 * <pre>
 * ( Type1 param1, Type2 param2, [Type3 optionalParam])
 * </pre>
 * @param {JSDOC.DocTag[]} params Array has DocTag object of parameters.
 */
function makeSignature(params) {
	if (!params) return '( )';
	var signature = params.filter(function(docTag) {
				return docTag.name.indexOf('.') == -1; // don't show config params in signature
		}).map(function(docTag) {
        var result = createTypeLink(docTag.type) + ' ' + docTag.name;
        if (docTag.isOptional) result = '[' + result + ']';
        return result;
		}).join(', ');

	signature = '( ' + signature + ' )';
	return signature;
}

/** Find symbol {@link ...} strings in text and turn into html links */
function resolveLinks(str, from) {
	str = str.replace(/\{@link ([^} ]+) ?\}/gi,
		function(match, symbolName) {
			return new Link().toSymbol(symbolName);
		}
	);
	
	return str;
}

// extend methods ////////////////////////////////////////

/**
 * Get parent symbols.
 * @param {JSDOC.Symbol}
 * @return {Array[JSDOC.Symbol]}
 */
function getParentSymbols(symbol) {
	var newSym = symbol;
	var result = [];
	while (newSym) {
    newSym = JSDOC.Parser.symbols.getSymbol(newSym.augments);
    if (!newSym) break;
    result.unshift(newSym);
  }
	return result;
}

/**
 * Get parent symbols.
 * @param {JSDOC.Symbol}
 * @return {Array[JSDOC.Symbol]}
 */
function getParentNamespaces(symbol) {
  var namespaces = symbol.alias.split('.').slice(0, -1);
  var symbols = [];
  while (namespaces.length) {
    symbols.push(JSDOC.Parser.symbols.getSymbol(namespaces.join('.')));
    namespaces.pop();
  }
  return symbols;
}


/**
 * @param {Array[JSDOC.Symbol]} symbols A symbols array.
 * @return {Array[JSDOC.Symbol]} The sorted symbols array.
 */
var smartSort = function(symbols) {
	return symbols.sort(makeSortWithCaseSensitiveBy('alias'));
};


/** Make a symbol sorter by some attribute. */
function makeSortWithCaseSensitiveBy(attribute) {
	return function(a, b) {
		if (a[attribute] != undefined && b[attribute] != undefined) {
			a = a[attribute];
			b = b[attribute];
			if (a < b) return -1;
			if (a > b) return 1;
			return 0;
		}
	}
}


/**
 * @link tag replace to the Symbol Link.
 * @param {String} desc Description text.
 * @return {String} The replaced description.
 */
function convInlineCodes(desc) {
  var result = desc.replace(/<pre>/ig, '<pre class="prettyprint linenums">');
  result = result.replace(/\{@link ([^} ]+) ?\}/gi, "<code>$1</code>");
	return result;
}


/** Find symbol {@link ...} strings in text and turn into html links */
function createInlineCodes(str, from) {
	str = str.replace(/\{@link ([^} ]+) ?\}/gi,
		function(match, symbolName) {
			return new Link().toSymbol(symbolName);
		}
	);
	
	return str;
}


/**
 * Create formatted description.
 * @param {String} desc Description text.
 * @return {String} The replaced description.
 */
function createDescription(desc) {
  return convInlineCodes(resolveLinks(desc || 'No description.'));
}


/**
 * Create type definition from a complex type description.
 * @param {String} desc Description text.
 * @return {String} The replaced description.
 */
function createTypeLink(type) {
  var text = '';
  if (type) {
    var aliases = type.split('|');
    var result = [];
    aliases.forEach(function(alias) {
      result.push(new Link().toSymbol(alias).toString());
    });
    text = result.join('/');
  } else {
    text = 'unknown';
  }
  return '<span class="jsdoc-typedesc">' + text + '</span>';
}


function escapeHTML(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
