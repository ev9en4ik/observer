const Router = require('express')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('config')
const authMiddleware = require('./../middleware/auth.middleware')

const router = new Router()

router.post(
    '/sign-up',
    [
        check('email', 'Uncorrect email').isEmail().normalizeEmail(),
        check('password', 'Uncorrect should be longer then 6 symbols').isLength(
            {
                min: 6,
            }
        ),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: 'email or password is incorrect',
                    errors: errors.array(),
                })
            }

            const { name, lastname, email, password } = req.body
            const candidate = await User.findOne({ email })
            if (candidate) {
                return res
                    .status(400)
                    .json({ message: email + ' is already registered' })
            }
            const hashedPassword = await bcrypt.hash(password, 15)
            const user = new User({
                'name.first': name,
                'name.last': lastname,
                email: email,
                password: hashedPassword,
            })
            await user.save()
            return res.status(201).json({ message: 'User was created' })
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Server Error' })
        }
    }
)

router.post(
    '/sign-in',
    [
        check('email', 'Uncorrect email').isEmail().normalizeEmail(),
        check('password', 'Uncorrect should be longer then 6 symbols').isLength(
            {
                min: 6,
            }
        ),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: 'email or password is incorrect',
                    errors: errors.array(),
                })
            }
            const { email, password } = req.body

            const user = await User.findOne({ email })
            if (!user) {
                return res
                    .status(404)
                    .json({ message: email + ' user not found' })
            }

            const isPasswordValid = bcrypt.compareSync(password, user.password)
            if (!isPasswordValid) {
                return res.status(400).json({
                    message: email + ' email or password is incorrect',
                })
            }
            const token = jwt.sign({ id: user.id }, config.get('jwtSecret'), {
                expiresIn: '1h',
            })

            return res.json({
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    lastname: user.lastname,
                    email: user.email,
                    ratedMovies: user.ratedMovies,
                    watchlist: user.watchlist,
                },
            })
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Server Error' })
        }
    }
)

router.get('/auth', authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id })
        const token = jwt.sign({ id: user.id }, config.get('jwtSecret'), {
            expiresIn: '1h',
        })

        return res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                ratedMovies: user.ratedMovies,
                watchlist: user.watchlist,
            },
        })
    } catch (e) {
        res.status(500).json({ message: 'Server Error' })
    }
})

module.exports = router
