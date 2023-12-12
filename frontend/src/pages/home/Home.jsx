import React, { useEffect } from 'react'
import {
    fetchLastMovies,
    fetchRecommendation,
    fetchTopMovies,
    fetchUpcomingMovies,
} from '../../store/reducers/movieSlice'
import { useDispatch, useSelector } from 'react-redux'
import LastMovies from './lastMovies/LastMovies'
import RecommendationMovies from './recommendationMovies/RecommendationMovies'
import UpcomingMovies from './upcomingMovies/UpcomingMovies'
import TopMovies from './topMovies/TopMovies'

const Home = () => {
    const { user, isAuth } = useSelector(state => state.user)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchLastMovies())
        dispatch(fetchUpcomingMovies())
        dispatch(fetchTopMovies())
        if (isAuth && user.ratedMovies && !user.ratedMovies.isEmpty)
            dispatch(fetchRecommendation())
    }, [dispatch, user.ratedMovies, isAuth])

    return (
        <main>
            <div className="container">
                <TopMovies />
                <LastMovies />
                <UpcomingMovies />
                {user.ratedMovies && <RecommendationMovies />}
            </div>
        </main>
    )
}

export default Home
