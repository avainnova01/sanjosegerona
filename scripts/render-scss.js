'use strict';
const autoprefixer = require('autoprefixer');
const fs = require('fs');
const packageJSON = require('../package.json');
const upath = require('upath');
const postcss = require('postcss');
const sass = require('sass');
const sh = require('shelljs');

// OJO: ajustamos rutas bien resueltas
const stylesPath = upath.resolve(upath.dirname(__filename), '../src/scss/styles.scss');
// Si quieres que salga styles.min.css, usa este destPath:
const destPath = upath.resolve(upath.dirname(__filename), '../dist/css/styles.min.css');

const entryPoint = `/*!
* Start Bootstrap - ${packageJSON.title} v${packageJSON.version} (${packageJSON.homepage})
* Copyright 2013-${new Date().getFullYear()} ${packageJSON.author}
* Licensed under ${packageJSON.license} (https://github.com/StartBootstrap/${packageJSON.name}/blob/master/LICENSE)
*/
@import "${stylesPath.replace(/\\/g, '/')}";`;

module.exports = function renderSCSS() {

    console.log('Compilando SCSS…');

    const results = sass.renderSync({
        data: entryPoint,
        // 🔹 AQUÍ está la clave para que funcione:
        includePaths: [upath.resolve(upath.dirname(__filename), '../node_modules')],
        outputStyle: 'compressed' // genera CSS ya minificado
    });

    const css = results.css.toString();

    postcss([autoprefixer])
        .process(css, { from: undefined })
        .then(result => {
            result.warnings().forEach(warn => {
                console.warn(warn.toString());
            });

            // Nos aseguramos de que la carpeta exista
            sh.mkdir('-p', upath.dirname(destPath));

            fs.writeFileSync(destPath, result.css.toString());
            console.log('CSS generado en:', destPath);
        })
        .catch(err => {
            console.error(err);
        });
};
