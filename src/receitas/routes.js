const { Router } = require('express');
const router = Router();

const ExerciciosController = require('./controller');
const controller = new ExerciciosController();

router.post('/', (req, res) => controller.create(req, res));
router.get('/random', (req, res) => controller.random(req, res));
router.get('/list', (req, res) => controller.list(req, res));
router.get('/:id', (req, res) => controller.detail(req, res));

module.exports = router;