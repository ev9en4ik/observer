import React from 'react'
import style from './style.module.scss'
const TextArea = ({ name, placeholder, value, onChange }) => {
    return (
        <textarea
            className={style.textArea}
            value={value}
            onChange={e => onChange(e.target.value, name)}
            placeholder={placeholder}></textarea>
    )
}

export default TextArea
