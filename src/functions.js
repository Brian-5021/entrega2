const fs = require('fs');

const crearCurso = (curso) => {
    listaCursos = listarCursos();

    let duplicate = listaCursos.find(nom => nom.id_curso == curso.id_curso);
    if (!duplicate) {
        curso.estado = 'disponible';
        listaCursos.push(curso);
        return guardarCursos(curso.id_curso, curso.nombre);
    } else {
        return "<div class='alert alert-danger' role='alert'>Ya existe un curso con el mismo id: " + curso.id_curso + "</div>";
    }
}

module.exports = {
    crearCurso
}