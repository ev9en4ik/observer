const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const authRouter = require('./routes/auth.routes')
const actorRouter = require('./routes/actor.routes')
const genreRouter = require('./routes/genre.routes')
const movieRouter = require('./routes/movie.routes')
const cors = require('cors')
const app = express()
const PORT = config.get('serverPort')

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/actor', actorRouter)
app.use('/api/genre', genreRouter)
app.use('/api/movie', movieRouter)
const start = async () => {
    try {
        await mongoose.connect(config.get('dbUrl'))

        app.listen(PORT, () => {
            console.log('Server started on PORT: ' + PORT)
        })
    } catch (e) {
        console.log(e.message)
    }
}

start()
