// não está finalizado
const ExerciciosRepository = require('./repositorio-sql');
const crypto = require('crypto');

class ExerciciosController {

    constructor() {
        this.repository = new ExerciciosRepository();
    }

    async create(req, res) {
        console.log("CRIANDO UMA NOVA QUESTAO");
        const ex = {  
            id: crypto.randomUUID(),
            ...req.body,
            disciplina: req.body.disciplina.toUpperCase()
        };

        await this.repository.save(ex);
        
        return res.json({
            ex
        });
    }

    async random(req, res) {
        const disciplina = await this.repository.random();
        return res.json(disciplina);
    }

    async list(req, res) {
        const disciplina = req.query.disciplina.toUpperCase();
        const listagem = await this.repository.list(disciplina);
        console.log(listagem)
        return res.json(listagem);
    }

    async detail(req, res) {
        const { id } = req.params;
        const exercicio = await this.repository.detail(id);
        return res.json(exercicio);
    }
}


module.exports = ExerciciosController;