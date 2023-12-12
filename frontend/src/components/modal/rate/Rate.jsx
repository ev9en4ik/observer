import React, { useState } from 'react'
import { ReactComponent as NotEvaluate } from '../../../assets/icons/star-regular.svg'
import { ReactComponent as Evaluate } from '../../../assets/icons/star.svg'
import style from './../style.module.scss'
import { rateMovie } from '../../../store/reducers/userSlice'
import { useDispatch } from 'react-redux'

const Rate = ({ movie, toggleModal }) => {
    const [evaluate, setEvaluate] = useState(0)
    const dispatch = useDispatch()
    const rate = () => {
        dispatch(rateMovie({ id: movie._id, evaluate: evaluate }))
        toggleModal()
    }

    return (
        <div className={style.rate}>
            <h1 className={style.title}>{movie.title}</h1>
            <div className={style.wrapper}>
                {[...Array(10)].map((star, index) => (
                    <button
                        className={style.button}
                        key={index}
                        onClick={() => setEvaluate(index + 1)}>
                        {index + 1 <= evaluate ? <Evaluate /> : <NotEvaluate />}
                    </button>
                ))}
            </div>
            <button onClick={rate} className={style.rate}>
                Rate
            </button>
        </div>
    )
}

export default Rate
