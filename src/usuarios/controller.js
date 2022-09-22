const { Usuario } = require('./model');
const { Resposta } = require('../receitas/ingredientes-model');
//const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UsuariosController {

    constructor() {
        
    }

    async create(req, res) {
        // INPUT
        const { nome, email, senha } = req.body;

        if(nome !== '' && email !== '' && senha !== '') {

        const checaUsuario = await Usuario.findOne({
            where: {
                email
            }
        });

        if(!checaUsuario) {
        // PROCESSAMENTO
            const usuarioBody = req.body;
            const senha = await bcrypt.hash(usuarioBody.senha, 10);
            const user =  {
                nome: usuarioBody.nome,
                email: usuarioBody.email,
                senha     
            }  
            const userToDB = await Usuario.create(user);
            return res.status(201).json(userToDB);
        } else {
            return res.status(400).json({ msg: "Esse e-mail já está cadastrado no sistema"});
        }

    } else {
        return res.status(400).json({ msg: "Algum campo está em branco."});
    }
}

    async auth(req, res) {
        const { email, senha } = req.body;

        const user = await Usuario.findOne({
            where: {
                email
            }
        });

        if (!user) {
            return res.status(400).json({ msg: "E-mail ou senha inválidos"});
        }
      

        const checa = await bcrypt.compare(senha, user.senha);

        if(checa) {
        const meuJwt = jwt.sign(user.dataValues, 'SECRET NAO PODERIA ESTAR HARDCODED');
        console.log(req.user)
        return res.json(meuJwt);
        } else {
            return res.status(400).json({ msg: "E-mail ou senha inválidos"});
        }
    }

    async list(req, res) {
        const users = await Usuario.findAndCountAll();
        res.json(users);
    }

    async profile(req, res) {
        res.json({ user: req.user});
    }
}


module.exports = UsuariosController;