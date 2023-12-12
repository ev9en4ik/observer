import React from 'react'
import { useSelector } from 'react-redux'
import ScrollContainer from '../../../components/scrollContainer/ScrollContainer'
import MovieList from '../../../components/scrollContainer/content/movie/MovieList'
import style from './../style.module.scss'

const UpcomingMovies = () => {
    const upcomingMovies = useSelector(state => state.movie.upcoming)
    return (
        <div>
            <h2 className={style.text}>Сoming soon</h2>
            <span className={style.legend}>
                Movies that will be released soon
            </span>
            <ScrollContainer>
                <MovieList list={upcomingMovies} />
            </ScrollContainer>
        </div>
    )
}

export default UpcomingMovies
