import React from 'react'
import { useSelector } from 'react-redux'
import ScrollContainer from '../../../components/scrollContainer/ScrollContainer'
import MovieList from '../../../components/scrollContainer/content/movie/MovieList'
import style from './../style.module.scss'

const LastMovies = () => {
    const lastMovies = useSelector(state => state.movie.last)
    return (
        <div>
            <h2 className={style.text}>Last added</h2>
            <span className={style.legend}>
                The last added movies and serials
            </span>
            <ScrollContainer>
                <MovieList list={lastMovies} />
            </ScrollContainer>
        </div>
    )
}

export default LastMovies
