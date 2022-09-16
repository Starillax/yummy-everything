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
        const { email, nome } = req.body;

        const checaUsuario = await Usuario.findOne({
            where: {
                email: req.body.email
            }
        });

        if(!checaUsuario) {
        // PROCESSAMENTO
        const usuarioBody = req.body;
        const senha = await bcrypt.hash(usuarioBody.senha, 10);
        console.log(senha)
        const user =  {
            nome: usuarioBody.nome,
            email: usuarioBody.email,
            senha     
        }  
        const userToDB = await Usuario.create(user);

        // RESPOSTA
        return res.redirect('/login-usuario');
    } else {
        const msg = {};
        msg.titulo = "E-mail em uso!";
        msg.mensagem = "Esse e-mail já está cadastrado no sistema";
        return res.render('cadastro-usuario', {msg});
    }
}

    async renderCreate(req, res) {
        return res.render('cadastro-usuario');
    }

    async auth(req, res) {
        const { email, senha } = req.body;

        const user = await Usuario.findOne({
            where: {
                email
            }
        });

        if (!user) {
            const msg = {};
            msg.titulo = "E-mail ou senha inválidos";
            msg.mensagem = "E-mail ou senha inválidos";
            return res.render('login-usuario', {msg});
        }
        console.log(user);

        const checa = await bcrypt.compare(senha, user.senha);

        if(checa) {
        const meuJwt = jwt.sign(user.dataValues, 'SECRET NAO PODERIA ESTAR HARDCODED')
        return res.json(meuJwt);
        } else {
            const msg = {};
            msg.titulo = "E-mail ou senha inválidos";
            msg.mensagem = "E-mail ou senha inválidos";
            return res.render('login-usuario', {msg});
        }
    }

    async renderAuth(req, res) {
        return res.render('login-usuario');
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