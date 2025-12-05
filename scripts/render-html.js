'use strict';
const fs = require('fs');
const packageJSON = require('../package.json');
const upath = require('upath');

module.exports = function renderHtml() {

    // const sourcePathHtml = upath.resolve(upath.dirname(__filename), '../src/index.html');
    // const destPathHtml = upath.resolve(upath.dirname(__filename), '../dist/index.html');

    // const scriptsJS = fs.readFileSync(sourcePathHtml);
    // fs.writeFileSync(destPathHtml, scriptsJS);


    // const sourcePathHtmlPages = upath.resolve(upath.dirname(__filename), '../src/pages/institucional.html');
    // const destPathHtmlPages = upath.resolve(upath.dirname(__filename), '../dist/institucional.html');

    // const scriptsJSPages = fs.readFileSync(sourcePathHtmlPages);
    // fs.writeFileSync(destPathHtmlPages, scriptsJSPages);

    // Crear un array con información de origen y destino
    var links = [
        { origen: "../src/index.html", destino: "../dist/index.html" },
        { origen: "../src/pages/institucional.html", destino: "../dist/institucional.html" },
        { origen: "../src/pages/galeria.html", destino: "../dist/galeria.html" },
        { origen: "../src/pages/hogar.html", destino: "../dist/hogar.html" },
        { origen: "../src/pages/ideario.html", destino: "../dist/ideario.html" },
        { origen: "../src/pages/contacto.html", destino: "../dist/contacto.html" },
        { origen: "../src/pages/ptee.html", destino: "../dist/ptee.html" },
        { origen: "../src/pages/pse.html", destino: "../dist/pse.html" },
        { origen: "../src/pages/servicios.html", destino: "../dist/servicios.html" }
    ];

    // Recorrer el array y hacer algo con cada elemento
    for (var i = 0; i < links.length; i++) {

        let sourcePathHtmlPages = upath.resolve(upath.dirname(__filename), links[i].origen);
        let destPathHtmlPages = upath.resolve(upath.dirname(__filename), links[i].destino);

        let scriptsJSPages = fs.readFileSync(sourcePathHtmlPages);
        fs.writeFileSync(destPathHtmlPages, scriptsJSPages);
    }

};
