import React, { useState } from 'react'
import Input from '../../../../utils/input/Input'
import style from '../../style.module.scss'
const Keywords = ({ movieData, addToArray, removeFromArray }) => {
    const [keyword, setKeyword] = useState('')
    const addKeyword = e => {
        e.preventDefault()
        addToArray(keyword, 'keywords')
        setKeyword('')
    }
    return (
        <div className={style.wrapper}>
            <div className={style.form}>
                <Input
                    name="keywords"
                    type="text"
                    placeholder="Keyword"
                    value={keyword}
                    onChange={setKeyword}
                />
                <button className={style.button} onClick={e => addKeyword(e)}>
                    Add
                </button>
            </div>
            <div className={style.container}>
                {movieData.keywords.map((keyword, i) => (
                    <div key={i} className={style.card}>
                        <span>{keyword}</span>
                        <button
                            className={style.removeButton}
                            onClick={() =>
                                removeFromArray(keyword, 'keywords')
                            }>
                            &#10006;
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Keywords
