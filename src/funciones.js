const fs = require('fs');

const listarCursos = () => {
    listaCursos = [];
    try {
        listaCursos = require('./cursos.json');
    } catch (error) {
        console.log('error', error);
    }

    return listaCursos;
}

const listarInscritos = () => {
    listaInscritos = [];
    try {
        listaInscritos = require('./inscritos.json');
    } catch (error) {
        console.log('error', error);
    }

    return listaInscritos;
}

const crearCurso = (curso) => {
    listaCursos = listarCursos();

    let duplicado = listaCursos.find(nom => nom.id_curso == curso.id_curso);
    if (!duplicado) {
        curso.estado = 'disponible';
        listaCursos.push(curso);
        return guardarCursos(curso.id_curso, curso.nombre);
    } else {
        return "<div class='alert alert-danger' role='alert'>Ya existe un curso con el mismo id: " + curso.id_curso + "</div>";
    }
}

const guardarCursos = (id, nombre) => {
    let datos = JSON.stringify(listaCursos);
    fs.writeFile('src/cursos.json', datos, (err) => {
        if (err) throw (err);
    });
    return " <center><img src='http://assets.stickpng.com/images/5f3962a7ec24df0004beee28.png' class='img-fluid' style='width:5%' alt='good job bro'></center><br><div class='alert alert-success' role='alert'>El curso con identificación: <b>" + id + "</b><br> Con el nombre: <b>" + nombre + " </b><br>¡Se creó exitosamente!</div>";

}

const inscribirCurso = (estudiante) => {
    listaInscritos = listarInscritos();

    let duplicado = listaInscritos.find(est => est.doc == estudiante.doc && est.curso == estudiante.curso);
    if (!duplicado) {
        listaInscritos.push(estudiante);
        guardarInscritos(listaInscritos);
        return "<div class='alert alert-success' role='alert'>El usuario identificado con el número de documento: <b>" + estudiante.doc + "</b><br> Fue inscrito en el curso con ID: <b>" + estudiante.curso + " </b>de manera exitosa!</div>";

    } else {
        return "<div class='alert alert-warning' role='alert'>El estudiante " + estudiante.nombre + " ya esta inscrito en el curso " + estudiante.curso + "</div>";
    }
}

const guardarInscritos = (lista) => {
    let datos = JSON.stringify(lista);
    fs.writeFile('src/inscritos.json', datos, (err) => {
        if (err) throw (err);
    });

}

const eliminarInscrito = (documento) => {
    listaInscritos = listarInscritos();
    let nuevo = listaInscritos.filter(est => est.doc != documento);
    if (nuevo.length == listaInscritos.length) {
        return null;
    } else {
        guardarInscritos(nuevo);
        return nuevo;
    }
}

const listarEstInscritos = (listaEstInscritos) => {
    let texto = '';

    if (listaEstInscritos != null && Object.keys(listaEstInscritos).length != 0) {

        texto = texto + "<table class='table table-striped'>" +
            "<thead class='thead-dark'>" +
            "<th>Documento</th>" +
            "<th>Nombre</th>" +
            "<th>Correo</th>" +
            "<th>Telefono</th>" +
            "<th>Eliminar</th>" +
            "</thead>" +
            "<tbody>";

        listaEstInscritos.forEach(inscrito => {
            texto = texto +
                '<tr>' +
                '<td>' + inscrito.doc + '</td>' +
                '<td>' + inscrito.nombre + '</td>' +
                '<td>' + inscrito.correo + '</td>' +
                '<td>' + inscrito.telefono + '</td>' +
                "<td><a href='/eliminarInscrito?doc=" + inscrito.doc + "&curso=" + inscrito.curso + "' class='btn btn-danger' role='button' aria-pressed='true'>Eliminar</a></td>" +
                '</tr>';

        });
        texto = texto + "</tbody> </table>";
    } else {
        texto = "<div class='alert alert-warning' role='alert'>No hay inscritos</div>";
    }
    return texto;
};

const actualizarCurso = (cursoParam) => {
    listaCursos = listarCursos();
    let curso = listaCursos.find(c => c.id_curso == cursoParam);
    let nuevo = listaCursos.filter(c => c.id_curso != cursoParam);

    if (nuevo.length == listaCursos.length) {
        return "<div class='alert alert-danger' role='alert'>Ocurrio un problema al intentar actualizar el curso</div>";
    } else {
        curso.estado = 'cerrado';
        nuevo.push(curso);
        let datos = JSON.stringify(nuevo);
        fs.writeFile('src/cursos.json', datos, (err) => {
            if (err) throw (err);
        });
        return "<div class='alert alert-success' role='alert'>El curso " + cursoParam + " fue cerrado satisfactoriamente</div>";

    }
}

module.exports = {
    crearCurso,
    inscribirCurso,
    eliminarInscrito,
    listarEstInscritos,
    listarCursos,
    listarInscritos,
    actualizarCurso
}