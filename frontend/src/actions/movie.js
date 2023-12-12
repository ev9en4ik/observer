import axios from 'axios'
export const getMovieById = async id => {
    try {
        const response = await axios.get(
            `http://localhost:5000/api/movie/movieById/${id}`
        )
        const movie = response.data.movie
        const actors = response.data.actors
        const similarMovies = response.data.similarMovies
        return { movie, actors, similarMovies }
    } catch (e) {
        return e.response
    }
}

export const getWatchlist = async () => {
    try {
        const response = await axios.get(
            `http://localhost:5000/api/movie/watchlist`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
        )
        const watchlist = response.data
        return watchlist
    } catch (e) {
        return e.response
    }
}
