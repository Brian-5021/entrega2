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
    res.render('CrearCurso', {
        titulo: 'Crear Curso',
    });
});

app.post('/TransaccionCurso', (req, res) => {
    res.render('CrearResultado', {
        titulo: 'Inicio',
        curso: {
            id_curso: req.body.id_curso,
            nombre: req.body.nombre,
            valor: parseInt(req.body.valor),
            descripcion: req.body.descripcion,
            modalidad: req.body.modalidad,
            intensidad: req.body.intensidad
        }
    });
});

app.get('/listarCursos', (req, res) => {
    res.render('ListarCursos', {
        titulo: 'Listar Cursos'

    });
});

app.get('/inscribirUsuario', (req, res) => {
    res.render('inscribir_estudiantes', {
        titulo: 'Inscribir Curso'

    });
});

app.post('/TransaccionInscripcionEstudiante', (req, res) => {
    res.render('InscribirResultado', {
        titulo: 'Inscribir - Resultado',
        estudiante: {
            doc: req.body.doc,
            nombre: req.body.nombre,
            correo: req.body.correo,
            telefono: req.body.telefono,
            curso: req.body.curso
        }
    });
});

app.get('/listarInscritos', (req, res) => {

    res.render('ListarInscritos', {
        titulo: 'Ver Inscritos',
        curso: null
    });
});

app.get('/eliminarInscrito', (req, res) => {
    res.render('ListarInscritosCurso', {
        doc: req.query.doc,
        curso: req.query.curso,
    });
});


app.get('/actualizarCurso', (req, res) => {
    res.render('ListarInscritos', {
        titulo: 'Actualizar Curso',
        curso: req.query.curso
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        estudiante: 'error'
    });
});

app.listen(3000, () => {
    console.log("Reproduciendo en el puerto 3000, está listo para comenzar");

})