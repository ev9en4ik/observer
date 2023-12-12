import React from 'react'
import style from './style.module.scss'

const InputFile = ({ file, accept, onChange }) => {
    return (
        <div>
            <label
                className={style.files}
                htmlFor="files"
                onClick={() => (document.getElementById('files').value = null)}>
                {file ? file.name : 'Choose photo'}
            </label>
            <input
                multiple
                id="files"
                className={style.textInput}
                type="file"
                accept={accept}
                onChange={e => onChange(e)}
            />
        </div>
    )
}

export default InputFile
