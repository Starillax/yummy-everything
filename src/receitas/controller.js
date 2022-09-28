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
        //const receita = req.query.receita.toUpperCase();
        const listagem = await this.repository.list();
        console.log(listagem);
        return res.json(listagem);
    }

    async detail(req, res) {
        const { id } = req.params;
        const receita = await this.repository.detail(id);
        if(!receita.rcp || !receita.ings) {
            return res.status(404).json({ msg: "Esse ID não existe."});
        }
        return res.json(receita);
    }

    async update(req, res) {

        const { id } = req.params;
        const query = await this.repository.detail(id);
        const antigaReceita = query.rcp; 

        if (!query) {
            return res.status(400).json({ msg: "ID inválido"});
        }

        const novaReceita = {
            nome: req.body.nome,
            descricao: req.body.descricao,
            modoDeFazer: req.body.modoDeFazer,
            imagem: req.body.imagem,
            usuarioEmail: req.user.email
        };

        await this.repository.save(rcp);
        
        return res.json({
            rcp, ings
        });
    }

    async delete(req, res) {
        const { id } = req.params;
        const receita = await this.repository.delete(id);
        console.log(receita);
        if (receita === false) {
            return res.status(404).json({ msg: "Esse ID não existe."});
        } else if (receita === true) {
            return res.status(200).json({ msg: "Receita deletada com sucesso"});
        }
    }
}


module.exports = ReceitasController;