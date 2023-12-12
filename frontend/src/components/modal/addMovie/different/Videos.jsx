import React, { useState } from 'react'
import Input from '../../../../utils/input/Input'
import style from '../../style.module.scss'
const Videos = ({ movieData, addToArray, removeFromArray }) => {
    const [link, setLink] = useState('')
    const addVideo = e => {
        console.log(1)
        e.preventDefault()
        addToArray(link, 'videos')
        setLink('')
    }
    return (
        <div className={style.wrapper}>
            <div className={style.form}>
                <Input
                    name="videos"
                    type="text"
                    placeholder="Video link"
                    value={link}
                    onChange={setLink}
                />
                <button className={style.button} onClick={e => addVideo(e)}>
                    Add
                </button>
            </div>
            <div className={style.container}>
                {movieData.videos.map(video => (
                    <div className={style.card}>
                        <span>{video}</span>
                        <button
                            className={style.removeButton}
                            onClick={() => removeFromArray(video, 'videos')}>
                            &#10006;
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Videos
