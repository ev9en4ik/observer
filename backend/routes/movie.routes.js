const Router = require('express')
const config = require('config')
const authMiddleware = require('./../middleware/auth.middleware')
const movieController = require('../controllers/movieController')
const multer = require("multer");
const router = Router()

module.exports = router
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        
        cb(null, 'files')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + Date.now() + '_' + file.originalname)
    },
})
const upload = multer({
    storage: storage,
})

router.post('/addMovie', upload.array('files'), authMiddleware, movieController.addMovie)
router.post('/rate', authMiddleware, movieController.rateMovie)
router.get('/movieById/:id', movieController.getMovieById)
router.get('/last', movieController.getLastMovies)
router.get('/top', movieController.getTopMovies)
router.get('/upcoming', movieController.getUpcomingMovies)
router.get('/recommendation', authMiddleware, movieController.getRecommendation)
router.get('/actionWithWatchlist/:id', authMiddleware, movieController.actionWithWatchlist)
router.get('/watchlist', authMiddleware, movieController.getWatchlist)
// router.get('/film/:id', authMiddleware, movieController.getMovie)
// router.get('/serials', authMiddleware, movieController.getSerials)
// router.get('/serial/:id', authMiddleware, movieController.getSerial)
