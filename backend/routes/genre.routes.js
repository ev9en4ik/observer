const Router = require('express')
const config = require('config')
const authMiddleware = require('./../middleware/auth.middleware')
const genreController = require('../controllers/genreController')
const router = Router()

module.exports = router

router.get('/genres', genreController.getGenres)