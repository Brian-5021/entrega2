const hbs = require('hbs');
const functions = require('./functions');

hbs.registerHelper('CrearCurso', (curso) => {
    return functions.CrearCurso(curso);
});