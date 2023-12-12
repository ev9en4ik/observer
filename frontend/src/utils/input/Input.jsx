import React from 'react'
import style from './style.module.scss'

const Input = ({ id, name, type, placeholder, value, onChange }) => {
    return (
        <input
            id={id}
            className={style.textInput}
            type={type || 'text'}
            placeholder={placeholder || ''}
            value={value}
            onChange={e => onChange(e.target.value, name)}
        />
    )
}

export default Input
