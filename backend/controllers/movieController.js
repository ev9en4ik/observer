const config = require('config')
const firebaseService = require('../services/firebaseService')
const Movie = require('../models/Movie')
const User = require('../models/User')
const Actor = require('../models/Actor')
const Genre = require('../models/Genre')
const getRecommendations = require("../services/recomendationByOtherUser");
const displaySimilarMoviesByGenres = require("../services/similarMoviesByGenres");
class MovieController {
    addMovie = async (req, res) => {
        try {
            const data = JSON.parse(req.body.data)
            const files = req.files
            
            const filePath = await firebaseService.uploadFile(
                config.get('moviesFolder'),
                files[0]
            )
            let urls = []
            files.shift()
            for (let i = 1; i < files.length; i++) {
                const url = await firebaseService.uploadFile(
                    config.get('moviesFolder'),
                    files[i]
                )
                urls.push(url)
            }
            const movie = Movie({
                title: data.title,
                type: data.type,
                episodes: {
                    seasons: data.seasons,
                    episodes: data.episodes,
                },
                image: filePath,
                trailer: data.trailer,
                rating: {
                    count: data.count,
                    rating: data.rating,
                },
                date: {
                    released: data.released,
                    date: data.releaseDate,
                },
                director: data.director,
                country: data.country,
                genre: data.genres,
                duration: data.duration,
                mpaa: data.mpaa,
                actors: data.actors,
                storyline: data.storyline,
                socialNetwork: {
                    facebook: data.facebook,
                    instagram: data.instagram,
                    twitter: data.twitter,
                    imdb: data.imdb,
                },
                keywords: data.keywords,
                videos: data.videos,
                images: urls,
                comments: [],
            })
            console.log(movie)
            await movie.save()
            return res.status(201).json(movie)
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Server Error' })
        }
    }
    getLastMovies = async (req, res) => {
        try {
            const movies = await Movie.find().sort({ _id: -1 }).limit(20)
            return res.json(movies)
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Server Error' })
        }
    }
    rateMovie = async (req, res) => {
        try {
            const { id, evaluate } = req.body
            const movie = await Movie.findById(id)

            const user = await User.findById(req.user.id)
            if (user.ratedMovies.some((elem) => String(elem.id) === id)) {
                user.ratedMovies = user.ratedMovies.map((elem) => {
                    if (String(elem.id) === id) {
                        return { ...elem, rating: evaluate }
                    }
                    return elem
                })
            } else {
                user.ratedMovies.push({ id: movie._id, rating: evaluate })
            }
            await user.save()

            movie.rating.rating = (movie.rating.rating*movie.rating.count + evaluate) / (movie.rating.count + 1)
            movie.rating.count = movie.rating.count + 1
            await movie.save()

            return res.json(user)
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Server Error' })
        }
    }
    getMovieById = async (req, res) => {
        try {
            const id = req.params.id
            let movie = await Movie.findById(id)
            
            let movies = await Movie.find({ _id: { $ne: id }})
            const similarMovies = displaySimilarMoviesByGenres(movie, movies)
            
            movie.genre = await Promise.all(movie.genre.map(async (genreId) => {
                const genre = await Genre.findById(genreId)
                return genre
            }));
            
            const actors = await Promise.all(movie.actors.map(async (actor) => {
                const actorData = await Actor.findById(actor.id);
                return { ...actorData.toObject(), role: actor.role };
            }));
            
            movie.director = await Actor.findById(movie.director)
            
            return res.json({movie, actors, similarMovies})
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Server Error' })
        }
    }
    getRecommendation = async (req, res) => {
        try {
            const currentUser = await User.findById(req.user.id);
            const users = await User.find().limit(100);
            const user1Recommendations = getRecommendations(currentUser, users);
            
            const movies = await Promise.all(user1Recommendations.map(async (movie) => {
                const movieData = await Movie.findById(movie)
                return movieData;
            }));
            
            return res.json(movies.slice(0, 40))
        }catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Server Error' })
        }
    }
    getTopMovies = async (req, res) => {
        try {
            const movies = await Movie.find().sort({ 'rating.rating': -1 }).limit(40)
            return res.json(movies)
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Server Error' })
        }
    }
    getUpcomingMovies = async (req, res) => {
        try {
            const movies = await Movie.find({ 'date.released': false }).sort({ 'date.date': -1 }).limit(40)
            return res.json(movies)
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Server Error' })
        }
    }
    actionWithWatchlist = async (req, res) => {
        try {
            const id = req.params.id
            const user = await User.findById(req.user.id)
            if (user.watchlist.includes(id)) {
                user.watchlist = user.watchlist.filter((movie) => String(movie) !== id)
            } else {
                user.watchlist.push(id)
            }
            await user.save()
            return res.json(user)
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Server Error' })
        }
    }
    getWatchlist = async (req, res) => {
        try {
            const user = await User.findById(req.user.id)
            let movies = await Promise.all(user.watchlist.map(async (movieId) => {
                const movie = await Movie.findById(movieId)
                return movie
            }))
            movies = await Promise.all(movies.map(async (movie) => {
                movie.director = await Actor.findById(movie.director)
                movie.genre = await Promise.all(movie.genre.map(async (genreId) => {
                    const genre = await Genre.findById(genreId)
                    return genre
                }));
                return movie
            }));
            return res.json(movies)
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Server Error' })
        }
    }
}

module.exports = new MovieController()
