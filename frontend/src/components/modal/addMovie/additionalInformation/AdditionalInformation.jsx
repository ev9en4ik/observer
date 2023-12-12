import React from 'react'
import Input from '../../../../utils/input/Input'
import Select from 'react-select'
import TextArea from '../../../../utils/textArea/TextArea'
import AsyncSelect from 'react-select/async'
import { searchActor } from '../../../../actions/actor'
import style from '../../style.module.scss'
import '../selectStyle.scss'
import { useSelector } from 'react-redux'

const MPAAOptions = [
    { value: 'G', label: 'G' },
    { value: 'PG', label: 'PG' },
    { value: 'PG-13', label: 'PG-13' },
    { value: 'R', label: 'R' },
    { value: 'NC-17', label: 'NC-17' },
]

const AdditionalInformation = ({
    movieData,
    handleChange,
    handleSelectChange,
    handleMultiChange,
}) => {
    const genreOptions = useSelector(state => state.movie.genres)
    // step 3 additional Information [genre, duration, mpaa, actors, storyline]

    return (
        <div className={style.additionalInformation}>
            <Select
                isMulti
                name="genres"
                options={genreOptions.map(genre => ({
                    value: genre._id,
                    label: genre.name,
                }))}
                classNamePrefix="select"
                placeholder="Genre"
                onChange={handleMultiChange}
            />
            <Input
                placeholder="Duration"
                id="duration"
                name="duration"
                type="number"
                value={movieData.duration || ''}
                onChange={handleChange}
            />
            <Select
                name="mpaa"
                options={MPAAOptions}
                classNamePrefix="select"
                placeholder="MPAA"
                onChange={handleSelectChange}
            />
            <TextArea
                name="storyline"
                placeholder="Storyline"
                value={movieData.storyline}
                onChange={handleChange}
            />
        </div>
    )
}

export default AdditionalInformation
