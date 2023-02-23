'use strict';
const fs = require('fs');
const packageJSON = require('../package.json');
const upath = require('upath');

module.exports = function renderHtml() {

    const sourcePathHtml = upath.resolve(upath.dirname(__filename), '../src/index.html');
    const destPathHtml = upath.resolve(upath.dirname(__filename), '../dist/index.html');

    const scriptsJS = fs.readFileSync(sourcePathHtml);
    fs.writeFileSync(destPathHtml, scriptsJS);
};
