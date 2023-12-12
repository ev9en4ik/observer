import React, { useEffect, useState } from 'react'
import { getWatchlist } from '../../actions/movie'
import style from './style.module.scss'
import { ReactComponent as Star } from '../../assets/icons/star.svg'
import Modal from '../../components/modal/Modal'
import Rate from '../../components/modal/rate/Rate'
const Watchlist = () => {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [watchlist, setWatchlist] = useState([])
    useEffect(() => {
        const fetchWatchlist = async () => {
            const list = await getWatchlist()
            setWatchlist(list)
        }
        fetchWatchlist()
    }, [])
    const toggleModal = () => {
        setIsOpenModal(!isOpenModal)
        if (isOpenModal) document.body.style.overflow = 'auto'
        else document.body.style.overflow = 'hidden'
    }
    return (
        <main className={style.main}>
            <div className={style.container}>
                <h1 className={style.title}>Watchlist</h1>
                <div className={style.wrapper}>
                    {watchlist.map((item, index) => (
                        <div className={style.card} key={index}>
                            <img
                                src={item.image}
                                alt={item.title}
                                className={style.image}
                            />
                            <div className={style.info}>
                                <h3 className={style.title}>{item.title}</h3>
                                <p className={style.different}>
                                    <span>
                                        {new Date(item.date.date).getFullYear()}
                                    </span>
                                    &#160;|&#160;
                                    <span>{item.duration}</span>
                                    &#160;|&#160;
                                    {item.genre.map((item, index) => (
                                        <span key={index}>
                                            {index !== 0 && ', '}
                                            {item.name}
                                        </span>
                                    ))}
                                </p>
                                <p className={style.rating}>
                                    <Star className={style.icon} />
                                    {Number.isInteger(item.rating.rating)
                                        ? item.rating.rating
                                        : item.rating.rating.toFixed(1)}
                                </p>
                                <p className={style.director}>
                                    Director:{' '}
                                    {item.director.name.first +
                                        ' ' +
                                        item.director.name.last}
                                </p>
                                <p className={style.storyline}>
                                    {item.storyline}lorem ipsum dolor sit amet
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}

export default Watchlist
