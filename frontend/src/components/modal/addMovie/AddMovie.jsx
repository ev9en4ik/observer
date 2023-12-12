import React, { useState } from 'react'
import MainInfo from './mainInfo/MainInfo'
import ReleaseDetails from './releaseDetails/ReleaseDetails'
import AdditionalInformation from './additionalInformation/AdditionalInformation'
import SocialNetwork from './socialNetwork/SocialNetwork'
import Different from './different/Different'
import style from '../style.module.scss'
import { useMultistepForm } from './useMultistepForm'
import Actor from './actors/Actor'
import { ReactComponent as Next } from '../../../assets/icons/arrow-right.svg'
import { ReactComponent as Prev } from '../../../assets/icons/arrow-left.svg'
import { addActor } from '../../../store/reducers/actorSlice'
import { addMovie } from '../../../store/reducers/movieSlice'
import { useDispatch } from 'react-redux'
const AddMovie = ({}) => {
    const dispatch = useDispatch()
    const [poster, setPoster] = useState(null)
    const [images, setImages] = useState([])
    const [movieData, setMovieData] = useState({
        title: '',
        type: '',
        seasons: null,
        episodes: null,
        trailer: '',
        released: false,
        releaseDate: new Date(),
        country: '',
        director: '',
        genres: [],
        duration: null,
        mpaa: '',
        actors: [],
        storyline: '',
        facebook: '',
        instagram: '',
        twitter: '',
        imdb: '',
        keywords: [],
        videos: [],
        comments: [],
    })
    // step 1 Main info [title, type, seasons, episodes, image, trailer]
    // step 2 release details [realised, dateReleased, country, director]
    // step 3 additional Information [genre, duration, mpaa, actors, storyline]
    // step 4 social network [facebook, instagram, twitter, imdb]
    // step 5 different [keywords, videos, images]
    // step 6 actors [actors]
    const handleChange = (value, field) => {
        setMovieData({
            ...movieData,
            [field]: value,
        })
    }
    const handleSelectChange = (value, action) => {
        setMovieData({ ...movieData, [action.name]: value.value })
    }
    const handleMultiChange = (value, action) => {
        console.log(value, action.name)
        setMovieData({
            ...movieData,
            [action.name]: value.map(item => item.value),
        })
    }
    const uploadMoviePoster = e => {
        const file = e.target.files[0]
        setPoster(file)
    }
    const uploadImages = e => {
        const files = e.target.files
        setImages([...images, ...files])
    }
    const removeImage = image => {
        setImages(images.filter(item => item !== image))
    }
    const addToArray = (value, field) => {
        setMovieData({
            ...movieData,
            [field]: [...movieData[field], value],
        })
    }
    const removeFromArray = (value, field) => {
        if (field !== 'actors') {
            setMovieData({
                ...movieData,
                [field]: movieData[field].filter(item => item !== value),
            })
        } else {
            setMovieData({
                ...movieData,
                [field]: movieData[field].filter(item => item.id !== value),
            })
        }
    }
    const {
        steps,
        step,
        currentStep,
        next,
        prev,
        goTo,
        isFirstStep,
        isLastStep,
    } = useMultistepForm([
        {
            name: 'Main info',
            form: (
                <MainInfo
                    movieData={movieData}
                    handleChange={handleChange}
                    handleSelectChange={handleSelectChange}
                    poster={poster}
                    uploadMoviePoster={uploadMoviePoster}
                />
            ),
        },
        {
            name: 'Release details',
            form: (
                <ReleaseDetails
                    movieData={movieData}
                    handleChange={handleChange}
                    handleSelectChange={handleSelectChange}
                />
            ),
        },
        {
            name: 'Additional Information',
            form: (
                <AdditionalInformation
                    movieData={movieData}
                    handleChange={handleChange}
                    handleSelectChange={handleSelectChange}
                    handleMultiChange={handleMultiChange}
                />
            ),
        },
        {
            name: 'Social network',
            form: (
                <SocialNetwork
                    movieData={movieData}
                    handleChange={handleChange}
                />
            ),
        },
        {
            name: 'Different',
            form: (
                <Different
                    movieData={movieData}
                    handleChange={handleChange}
                    addToArray={addToArray}
                    removeFromArray={removeFromArray}
                    images={images}
                    uploadImages={uploadImages}
                    removeImage={removeImage}
                />
            ),
        },
        {
            name: 'Actors',
            form: (
                <Actor
                    movieData={movieData}
                    addToArray={addToArray}
                    removeFromArray={removeFromArray}
                />
            ),
        },
    ])

    const submit = e => {
        e.preventDefault()
        dispatch(addMovie({ movieData, poster, images }))
        setMovieData({
            title: '',
            type: '',
            seasons: null,
            episodes: null,
            trailer: '',
            released: false,
            releaseDate: new Date(),
            country: '',
            director: '',
            genres: [],
            duration: null,
            mpaa: '',
            actors: [],
            storyline: '',
            facebook: '',
            instagram: '',
            twitter: '',
            imdb: '',
            keywords: [],
            videos: [],
            comments: [],
        })
        setPoster(null)
        setImages([])
    }
    return (
        <div className={style.addMovie}>
            <h1>Add Movie</h1>
            <form onSubmit={submit}>
                {step.form}
                <div className={style.buttons}>
                    <div>
                        {!isFirstStep && (
                            <button
                                className={`${style.actionButton} ${style.prevButton}`}
                                type="button"
                                onClick={prev}>
                                <Prev />
                            </button>
                        )}
                        {!isLastStep && (
                            <button
                                className={`${style.actionButton} ${style.nextButton}`}
                                type="button"
                                onClick={next}>
                                <Next />
                            </button>
                        )}
                    </div>
                    <button className={style.submitButton} type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddMovie
