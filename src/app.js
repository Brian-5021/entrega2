const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
require('./helpers');

const directoriopublico = path.join(__dirname, '../public');
const directoriopartials = path.join(__dirname, '../partials');
const directoriobootstrapcss = path.join(__dirname, '../node_modules/bootstrap/dist/css');
const directoriojquery = path.join(__dirname, '../node_modules/jquery/dist');
const directoriopopper = path.join(__dirname, '../node_modules/popper.js/dist');
const directoriobootstrapjs = path.join(__dirname, '../node_modules/bootstrap/dist/js');

app.use(express.static(directoriopublico));
app.use(bodyParser.urlencoded({ extended: false }));
hbs.registerPartials(directoriopartials);
//console.log(__dirname);
app.set('view engine', 'hbs');
app.use('/css', express.static(directoriobootstrapcss));
app.use('/js', express.static(directoriojquery));
app.use('/js', express.static(directoriopopper));
app.use('/js', express.static(directoriobootstrapjs));
app.use(function(req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next()
});

app.get('/', (req, res) => {
    res.render('index', {
        titulo: 'Inicio',
    });
});

app.get('/crearCurso', (req, res) => {
    res.render('crear_curso', {
        titulo: 'Crear Curso',
    });
});

app.listen(3000, () => {
    console.log("reproduciendo en el puerto 3000");

})