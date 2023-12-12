import React from 'react'
import ScrollContainer from '../../../components/scrollContainer/ScrollContainer'
import MovieList from '../../../components/scrollContainer/content/movie/MovieList'
import { useSelector } from 'react-redux'
import style from './../style.module.scss'

const RecommendationMovies = () => {
    const recommendationMovies = useSelector(
        state => state.movie.recommendation
    )
    return (
        <div>
            <h2 className={style.text}>Recommendation</h2>
            <span className={style.legend}>
                TV shows and movies just for you
            </span>
            <ScrollContainer>
                <MovieList list={recommendationMovies} />
            </ScrollContainer>
        </div>
    )
}

export default RecommendationMovies
