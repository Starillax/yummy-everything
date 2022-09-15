const exercicios = [];

class ExerciciosRepository {
    constructor() {

    }

    save(ex) {
        exercicios.push(ex);
    }

    random() {
        let randomIdx = Math.floor( Math.random()*exercicios.length);
        return exercicios[randomIdx];
    }

    detail(id) {
        const ex = exercicios.find(e => e.id == id);
        return ex;
    }

    list(disciplina) {
        const lista = exercicios.filter(e => e.disciplina == disciplina);
        return lista;
    }
}

module.exports = ExerciciosRepository;