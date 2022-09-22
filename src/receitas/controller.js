const ReceitasRepository = require('./repositorio-sql');
const IngredientesRepository = require('./ingredientes-sql');
const crypto = require('crypto');

class ReceitasController {

    constructor() {
        this.repository = new ReceitasRepository();
        this.ingredientesRepository = new IngredientesRepository();
    }

    async create(req, res) {
        console.log("CRIANDO UMA NOVA RECEITA");
        const rcp = {  
            id: crypto.randomUUID(),
            nome: req.body.rcp.nome,
            descricao: req.body.rcp.descricao,
            modoDeFazer: req.body.rcp.modoDeFazer,
            imagem: req.body.rcp.imagem,
            usuarioEmail: req.user.email
        };

        const ings = {  
            ingredientes: req.body.ing.ingredientes
        };

        await this.repository.save(rcp);

        for (let i = 0; i < ings.ingredientes.length; i++){

            let ing = {
                id_ingrediente: crypto.randomUUID(),
                texto: ings.ingredientes[i].texto,
                id_receita: rcp.id
            }

            await this.ingredientesRepository.save(ing);

        }
        
        return res.json({
            rcp, ings
        });
    }

    async list(req, res) {
        const disciplina = req.query.disciplina.toUpperCase();
        const listagem = await this.repository.list(disciplina);
        console.log(listagem);
        return res.json(listagem);
    }

    async detail(req, res) {
        const { id } = req.params;
        const exercicio = await this.repository.detail(id);
        return res.json(exercicio);
    }
}


module.exports = ReceitasController;