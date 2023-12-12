const Genre = require('../models/Genre')
class GenreController {
    getGenres = async (req, res) => {
        try {
            const genres = await Genre.find()
            return res.status(201).json(genres)
        } catch (e) {
            return res.status(500).json(e)
        }
    }
}

module.exports = new GenreController()
