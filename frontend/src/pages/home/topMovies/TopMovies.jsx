import React from 'react'
import { useSelector } from 'react-redux'
import ScrollContainer from '../../../components/scrollContainer/ScrollContainer'
import MovieList from '../../../components/scrollContainer/content/movie/MovieList'
import style from './../style.module.scss'

const TopMovies = () => {
    const topMovies = useSelector(state => state.movie.top)
    return (
        <div>
            <h2 className={style.text}>List of the best</h2>
            <span className={style.legend}>
                The best movies and serials of all time
            </span>
            <ScrollContainer>
                <MovieList list={topMovies} />
            </ScrollContainer>
        </div>
    )
}

export default TopMovies
