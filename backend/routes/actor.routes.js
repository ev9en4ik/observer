const Router = require('express')
const authMiddleware = require('./../middleware/auth.middleware')
const actorController = require('../controllers/actorController')
const router = Router()
const multer = require('multer')
const { check, validationResult } = require('express-validator')
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
module.exports = router

router.post(
    '/addActor',
    upload.single('file'),
    authMiddleware,
    actorController.addActor
)
router.post('/searchActor', authMiddleware, actorController.searchActor)
router.get('/findActorById/:id', authMiddleware, actorController.findActorById)
// router.post('/actorPhoto', authMiddleware, actorController.updateActorPhoto)
// router.get('/actors', authMiddleware, actorController.getActors)
// router.get('/actor/:id', authMiddleware, actorController.getActor)
