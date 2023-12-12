import React, { useState } from 'react'
import style from '../../style.module.scss'
import Input from '../../../../utils/input/Input'
import InputFile from '../../../../utils/inputFile/InputFile'

const Images = ({ images, uploadImages, removeImage }) => {
    return (
        <div className={style.wrapper}>
            <div className={style.form}>
                <InputFile
                    name="images"
                    type="file"
                    placeholder="Keyword"
                    onChange={uploadImages}
                />
            </div>
            <div className={style.container}>
                {images.map((image, i) => (
                    <div key={i} className={style.card}>
                        <span>{image.name}</span>
                        <button
                            className={style.removeButton}
                            onClick={() => removeImage(image)}>
                            &#10006;
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Images
