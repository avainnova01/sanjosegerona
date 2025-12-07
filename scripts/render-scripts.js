'use strict';

const path = require('path');
const fs = require('fs');
const { minify } = require('terser');

function renderScripts() {
  const srcPath = path.resolve('src', 'js', 'scripts.js');
  const outDir = path.resolve('dist', 'js');
  const outFile = path.join(outDir, 'scripts.min.js');

  // Asegurar que exista el directorio destino
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // Leer JS fuente
  const code = fs.readFileSync(srcPath, 'utf8');

  // Minificar con Terser
  return minify(code, {
    compress: true,
    mangle: true,
  })
    .then((result) => {
      if (result.error) {
        throw result.error;
      }
      fs.writeFileSync(outFile, result.code, 'utf8');
      console.log('JS minificado en:', outFile);
    })
    .catch((err) => {
      console.error('Error al minificar scripts:', err);
      process.exit(1);
    });
}

module.exports = renderScripts;

// Permite ejecutar este archivo directamente si quieres
if (require.main === module) {
  renderScripts();
}
