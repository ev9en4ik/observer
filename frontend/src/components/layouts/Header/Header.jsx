import React, { useState } from 'react'
import style from './style.module.scss'
import { ReactComponent as Logo } from '../../../assets/icons/Logo.svg'
import { ReactComponent as User } from '../../../assets/icons/user.svg'
import { ReactComponent as Search } from '../../../assets/icons/search.svg'
import { ReactComponent as Watchlist } from '../../../assets/icons/bookmark.svg'
import { Link, useNavigate } from 'react-router-dom'
import UserHover from './UserHover'
const Header = () => {
    const [isHovering, setIsHovering] = useState(false)
    const Navigate = useNavigate()
    const setHoverMenu = () => {
        if (isHovering) setIsHovering(false)
        else setIsHovering(true)
    }

    const goToWatchlist = () => {
        Navigate('/watchlist')
    }
    return (
        <header className={style.header}>
            <div className={style.container}>
                <div className={style.content}>
                    <div className={style.logo}>
                        <Link to="/">
                            <Logo /> observer
                        </Link>
                    </div>
                    <nav className={style.nav}>
                        <div className={style.item}>
                            <Link to="/">Home</Link>
                        </div>
                        <div className={style.item}>
                            <Link to="movies">Movies</Link>
                        </div>
                        <div className={style.item}>
                            <Link to="serials">Serials</Link>
                        </div>
                        <div className={style.item}>
                            <Link to="about">About</Link>
                        </div>
                    </nav>
                    <div className={style.icons}>
                        <button
                            className={style.actionsButton}
                            onClick={goToWatchlist}>
                            <Watchlist />
                        </button>
                        <button className={style.actionsButton}>
                            <Search />
                        </button>
                        <button
                            onClick={() => setHoverMenu()}
                            className={style.actionsButton}>
                            <User />
                        </button>
                        <UserHover
                            setHoverMenu={setHoverMenu}
                            isHovering={isHovering}
                        />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
