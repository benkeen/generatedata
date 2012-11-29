// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview A script for advanced Link object.
 * @author orga.chem.job@gmail.com (Orga Chem)
 */



/**
 * TODO: switch to URI module such as goog.Uri.
 * @constructor
 */
Uri = function(uri) {
  this.piece_ = uri.replace(Uri.anchorRegExp_, '');
  this.fragment_ = uri.match(Uri.anchorRegExp_) || '';
};


/** @private */
Uri.anchorRegExp_ = /#.*/;


Uri.prototype.setFragment = function(frag) {
  this.fragment_ = frag;
  return this;
};


Uri.prototype.getFragment = function() {
  return this.fragment_;
};


Uri.prototype.toString = function() {
  return this.piece_ + (this.fragment_ ? '#' + this.fragment_ : '');
};



/** @private */
Uri.anchorRegExp_ = /#.*/;
/**
 * @constructor
 */
AttributesMap = function() {
  this.attributesMap_ = {};
};


/**
 * @param {string} key Attribute name.
 * @return {*} The attribute value.
 */
AttributesMap.prototype.get = function(key) {
  return this.attributesMap_[key];
};


/**
 * @param {string|Object} key Attribute name or attibute name/value pair Object.
 * @param {*} val Attribute value. Remove the attribute if given null.
 * @return {AttributesMap} This object.
 */
AttributesMap.prototype.set = function(key, val) {
  if (arguments.length === 1) {
    for (var i in key) {
      if (key.hasOwnProperty(i)) this.call(i, key[i]);
    }
  } else if (val === null) {
    this.remove(key);
  } else {
    this.attributesMap_[key] = val;
  }
  return this;
};


/**
 * @return {AttributesMap} This object.
 */
AttributesMap.prototype.clear = function() {
  this.attributesMap_ = {};
  return this;
};


/**
 * @param {string} key Attribute name.
 * @return {AttributesMap} This object.
 */
AttributesMap.prototype.remove = function(key) {
  delete this.attributesMap_[key];
  return this;
};


/**
 * @param {string} key Attribute name.
 * @return {boolean} Whether the attributes has the attribute name.
 */
AttributesMap.prototype.has = function(key) {
  return this.attributesMap_.hasOwnProperty(key);
};


/**
 * Calls a function for each element in an object/map/hash.
 *
 * @param {Function} f The function to call for every element. This function
 *     takes 3 arguments (the element, the index and the object)
 *     and the return value is irrelevant.
 * @param {Object=} opt_obj This is used as the 'this' object within f.
 */
AttributesMap.prototype.forEach = function(f, opt_obj) {
  var map = this.attributesMap_;
  for (var key in map) {
    f.call(opt_obj, map[key], key, map);
  }
};


/**
 * @return {string} The 'key1="val1" key2="val2"' style string.
 */
AttributesMap.prototype.toString = function() {
  var result = [];
  this.forEach(function(val, key) {
    result.push(key + '="' + val + '"');
  });
  return result.join(' ');
};



/**
 * @constructor
 */
AnchorElement = function() {
  this.content = '';
  this.attributesMap = new AttributesMap();
};


AnchorElement.prototype.toString = function() {
  return '<a ' + this.attributesMap + '>' + this.content + '</a>';
};



/**
 *  Link object.
 * Original Link object handle the creation of HTML links to documented symbols.
 * @constructor
 */
Link = function() {
  this.anchorElement = new AnchorElement();
};


/** prefixed for hashes */
Link.hashPrefix = "";


/** Appended to the front of relative link paths. */
Link.base = "";


Link.symbolSet = null;
Link.filemap = null;


/**
 * @param {JSDOC.Symbol} symbol
 * @return {string}
 */
Link.symbolNameToLinkName = function(symbol) {
  var linker = "",
      ns = "";
  
  if (symbol.isStatic) linker = ".";
  else if (symbol.isInner) linker = "-";
  
  if (symbol.isEvent && !/^event:/.test(symbol.name)) {
    ns = "event:";
  }
  return Link.hashPrefix + linker + ns + symbol.name;
}


/**
 * @param {string} alias
 * @return {?JSDOC.Symbol}
 */
Link.getSymbol= function(alias) {
  var symbol = Link.symbolSet.getSymbol(alias);
  
  if (symbol) return symbol;
  if ('#' !== alias.toString().charAt(0) || !Link.currentSymbol) return null;
  return null;
};


Link.prototype.target = function(targetName) {
  this.setAttribute('target', targetName);
  return this;
};


Link.prototype.inner = function(fragment) {
  this.inner = fragment || '';
  return this;
};


Link.prototype.toSymbol = function(alias) {
  this.alias = alias || '';
  return this;
};


Link.prototype.toSrc = function(fileName) {
  this.src = fileName || '';
  return this;
};


Link.prototype.toFile = function(file) {
  this.file = file || '';
  return this;
};


Link.prototype.toClass = function(alias) {
  return this.toSymbol(alias);
};


Link.prototype.withText = function(text) {
  this.anchorElement.content = text || '';
  return this;
};


Link.prototype.setAttribute = function(key, value) {
  this.anchorElement.attributesMap.set(key, value);
  return this;
};


Link.prototype.setAttributes = function(obj) {
  this.anchorElement.attributesMap.set(obj);
  return this;
};


Link.prototype.getAttribute = function(key) {
  return this.anchorElement.attributesMap.get(key);
};


/** @private */
Link.prototype.makeSymbolLink_ = function(alias) {
  var linkBase = Link.base + publish.conf.symbolsDir;
  var linkTo = Link.getSymbol(alias);
  var linkPathUri;
  this.anchorElement.content = this.anchorElement.content || alias;
  var linkText = this.anchorElement.content;

  if (linkTo) { // it's a symbol in another file
    if (!linkTo.is("CONSTRUCTOR") && !linkTo.isNamespace) { // it's a method or property
      var linkPath;
      if (Link.filemap) {
        linkPath = Link.filemap[linkTo.memberOf];
      } else {
        linkPath = escape(linkTo.memberOf) || "_global_";
      }
      linkPath += publish.conf.ext;
      linkPathUri = new Uri(linkBase + linkPath);
      linkPathUri.setFragment(Link.symbolNameToLinkName(linkTo));
    }
    else {
      var linkPath = (Link.filemap) ? Link.filemap[linkTo.alias] : escape(linkTo.alias);
      linkPath += publish.conf.ext;
      linkPathUri = new Uri(linkBase + linkPath);
    }
  } else { // if there is no symbol by that name just return the name unaltered
    return linkText;
  }
  this.setAttribute('href', linkPathUri);
  var inner = linkPathUri.getFragment();
  var link = {linkPath: linkPathUri.toString(), linkText: linkText, linkInner: (inner ? '#' + inner : '')};

  if (typeof JSDOC.PluginManager != "undefined") {
    JSDOC.PluginManager.run("onSymbolLink", link);
  }
  return this.anchorElement;
};


/** @private */
Link.prototype.makeSrcLink_ = function(srcFilePath) {
  // transform filepath into a filename
  var srcFile = srcFilePath.replace(/\.\.?[\\\/]/g, "").replace(/[:\\\/]/g, "_");
  var outFilePath = Link.base + publish.conf.srcDir + srcFile + publish.conf.ext;
  var outFilePathUri = new Uri(outFilePath).setFragment(this.inner);
  this.anchorElement.attributesMap.set('href', outFilePathUri);

  this.anchorElement.content = this.anchorElement.content || srcFilePath;
  return this.anchorElement;
};


/** @private */
Link.prototype.makeFileLink_ = function(filePath) {
  // transform filepath into a filename
  var outFilePath =  Link.base + filePath;
  var outFilePathUri = new Uri(outFilePath).setFragment(this.inner);
  this.setAttribute('href', outFilePathUri);
  this.anchorElement.content = this.anchorElement.content || filePath;
  return this.anchorElement;
};


Link.prototype.toString = function() {
  if (this.alias) {
    return this.makeSymbolLink_(this.alias).toString();
  } else if (this.src) {
    return this.makeSrcLink_(this.src).toString();
  } else if (this.file) {
    return this.makeFileLink_(this.file).toString();
  } else {
    return '';
  }
};
