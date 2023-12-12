import React from 'react'
import Keywords from './Keywords'
import Videos from './Videos'
import style from '../../style.module.scss'
import Images from './Images'

const Different = ({
    movieData,
    handleChange,
    addToArray,
    removeFromArray,
    images,
    uploadImages,
    removeImage,
}) => {
    // step 5 different [keywords, videos, images]
    return (
        <div className={style.different}>
            <Keywords
                movieData={movieData}
                addToArray={addToArray}
                removeFromArray={removeFromArray}
            />
            <Videos
                movieData={movieData}
                addToArray={addToArray}
                removeFromArray={removeFromArray}
            />
            <Images
                images={images}
                uploadImages={uploadImages}
                removeImage={removeImage}
            />
        </div>
    )
}

export default Different
