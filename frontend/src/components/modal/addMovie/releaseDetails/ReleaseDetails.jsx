import React from 'react'
import Input from '../../../../utils/input/Input'
import DatePicker from 'react-date-picker'
import AsyncSelect from 'react-select/async'
import { searchActor } from '../../../../actions/actor'
import style from '../../style.module.scss'
import '../selectStyle.scss'

const ReleaseDetails = ({ movieData, handleChange, handleSelectChange }) => {
    // step 2 release details [realised, dateReleased, country, director]
    const loadOptions = async (inputValue, callback) => {
        const actors = await searchActor(inputValue)
        const options = actors.map(actor => ({
            value: actor._id,
            label: actor.name.first + ' ' + actor.name.last,
        }))
        callback(options)
    }
    const setReleased = e => {
        handleChange(e.target.checked, 'released')
    }
    const setReleaseData = (date, field) => {
        if (!date === null) {
            const timezoneOffset = date.getTimezoneOffset()
            date.setMinutes(date.getMinutes() - timezoneOffset)
        }
        console.log(date)
        handleChange(date, field)
    }
    return (
        <div className={style.releaseDetails}>
            <div className={style.released}>
                <input
                    id="released"
                    name="released"
                    type="checkbox"
                    checked={movieData.released}
                    onChange={e => setReleased(e)}
                />
                <label htmlFor="released" className={style.text}>
                    Already realised
                </label>
            </div>
            <div>
                <label htmlFor="broke">Released at</label>
                <DatePicker
                    id="born"
                    className={style.dateInput}
                    dayPlaceholder="dd"
                    monthPlaceholder="mm"
                    yearPlaceholder="yyyy"
                    value={movieData.releaseDate}
                    onChange={date => setReleaseData(date, 'releaseDate')}
                />
            </div>
            <Input
                name="country"
                type="text"
                placeholder="Country"
                value={movieData.country}
                onChange={handleChange}
            />
            <AsyncSelect
                name="director"
                classNamePrefix="select"
                placeholder="Search director"
                cacheOptions
                loadOptions={loadOptions}
                onChange={handleSelectChange}
            />
        </div>
    )
}

export default ReleaseDetails
