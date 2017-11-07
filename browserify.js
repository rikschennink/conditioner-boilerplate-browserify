const fs = require('fs');
const path = require('path');
const browserify = require('browserify');
const stream = require('node-stream');
const escapeStringRegex = require('escape-string-regexp');


// base dir
const BASEDIR = 'src/';
const ABSOLUTE_PATH = __dirname;
const ENTRY = './main.js';


// setup entry point
const b = browserify({
    basedir: BASEDIR,
    entries: ENTRY,
    fullPaths: true
});


// add all other files
b.add('./ui/component.js');


// modify absolute paths so conditioner can find the modules by name
const relativePathRegExp = new RegExp('"(' + escapeStringRegex(ABSOLUTE_PATH) + '.+?)"', 'ig');
const baseDirRegExp = new RegExp('^' + BASEDIR);
const toRelativePaths = function(buffer) {

    // get the string value from the buffer so we can replace absolute paths
    let value = buffer.toString('utf-8');

    // make paths relative
    value = value.replace(relativePathRegExp, function(match, p1) {
        return '"./' + path.relative(ABSOLUTE_PATH, p1).replace(baseDirRegExp, '') + '"';
    });

    // return a new buffer
    return Buffer.from(value, 'utf-8');;
}



// save as bundle
b.bundle()
    .pipe( stream.map( toRelativePaths ) )
    .pipe( fs.createWriteStream('./dist/bundle.js') );