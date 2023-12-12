import React from 'react'
import Input from '../../../../utils/input/Input'
import style from '../../style.module.scss'
const SocialNetwork = ({ movieData, handleChange }) => {
    return (
        <div className={style.socialNetworks}>
            <Input
                name="facebook"
                value={movieData.facebook}
                placeholder="Facebook url"
                onChange={handleChange}
                type="text"
            />
            <Input
                name="instagram"
                value={movieData.instagram}
                placeholder="Instagram url"
                onChange={handleChange}
                type="text"
            />
            <Input
                name="twitter"
                value={movieData.twitter}
                placeholder="Twitter url"
                onChange={handleChange}
                type="text"
            />
            <Input
                name="imdb"
                value={movieData.imdb}
                placeholder="Imdb url"
                onChange={handleChange}
                type="text"
            />
        </div>
    )
}

export default SocialNetwork
