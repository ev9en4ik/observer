import React from 'react'
import Input from '../../../../utils/input/Input'
import InputFile from '../../../../utils/inputFile/InputFile'
import Select from 'react-select'
import style from '../../style.module.scss'
import '../selectStyle.scss'
const movieOptions = [
    { value: 'Film', label: 'Film' },
    { value: 'Serial', label: 'Serial' },
]
const MainInfo = ({
    movieData,
    handleChange,
    handleSelectChange,
    poster,
    uploadMoviePoster,
}) => {
    // step 1 Main info [title, type,seasons, episodes, image, trailer]
    return (
        <div className={style.mainInfo}>
            <Input
                name="title"
                type="text"
                placeholder="Title"
                value={movieData.title}
                onChange={handleChange}
            />
            <Select
                name="type"
                classNamePrefix="select"
                placeholder="Type"
                options={movieOptions}
                onChange={handleSelectChange}
            />
            {movieData.type === 'Serial' && (
                <div>
                    <Input
                        name="seasons"
                        type="number"
                        placeholder="Seasons"
                        value={movieData.seasons || ''}
                        onChange={handleChange}
                    />
                    <Input
                        name="episodes"
                        type="number"
                        placeholder="Episods"
                        value={movieData.episodes || ''}
                        onChange={handleChange}
                    />
                </div>
            )}
            <InputFile
                file={poster}
                accept="image/*"
                onChange={uploadMoviePoster}
            />
            <Input
                name="trailer"
                type="text"
                placeholder="Trailer link"
                value={movieData.trailer}
                onChange={handleChange}
            />
        </div>
    )
}

export default MainInfo
