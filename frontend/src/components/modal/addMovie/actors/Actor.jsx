import React, { useState } from 'react'
import AsyncSelect from 'react-select/async'
import Input from '../../../../utils/input/Input'
import { findActorById, searchActor } from '../../../../actions/actor'
import style from '../../style.module.scss'
import { logDOM } from '@testing-library/react'

const Actor = ({ addToArray, movieData, removeFromArray }) => {
    const [role, setRole] = useState('')
    const [actorData, setActorData] = useState({})
    const addActor = e => {
        e.preventDefault()
        addToArray(
            { id: actorData.id, role: role, name: actorData.name },
            'actors'
        )
        setActorData({})
        setRole('')
    }
    const handleSelectChange = value => {
        setActorData({ id: value.value, name: value.label })
    }
    const loadOptions = async (inputValue, callback) => {
        const actors = await searchActor(inputValue)
        const options = actors.map(actor => ({
            value: actor._id,
            label: actor.name.first + ' ' + actor.name.last,
        }))
        callback(options)
    }
    return (
        <div className={style.actor}>
            <div>
                <AsyncSelect
                    name="actor"
                    classNamePrefix="select"
                    placeholder="Search actor"
                    cacheOptions
                    loadOptions={loadOptions}
                    onChange={handleSelectChange}
                />
                <Input
                    placeholder="Role"
                    id="role"
                    name="role"
                    type="text"
                    value={role || ''}
                    onChange={setRole}
                />
                <button className={style.button} onClick={e => addActor(e)}>
                    Add
                </button>
            </div>
            <div className={style.container}>
                {movieData.actors.map((actor, i) => (
                    <div key={i} className={style.card}>
                        <span>{actor.name}</span>
                        <br />
                        <span>{actor.role}</span>
                        <button
                            className={style.removeButton}
                            onClick={() => removeFromArray(actor.id, 'actors')}>
                            &#10006;
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Actor
