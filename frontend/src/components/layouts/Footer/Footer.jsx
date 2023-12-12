import React from 'react'
import style from './style.module.scss'
import { ReactComponent as Logo } from '../../../assets/icons/Logo.svg'
import { ReactComponent as Facebook } from '../../../assets/icons/facebook.svg'
import { ReactComponent as Instagram } from '../../../assets/icons/instagram.svg'
import { ReactComponent as Twitter } from '../../../assets/icons/twitter.svg'
import { Link } from 'react-router-dom'
const Footer = () => {
    return (
        <footer className={style.footer}>
            <div className={style.title}>
                <h2>
                    <Logo /> observer
                </h2>
                <span className={style.bottomLine}></span>
            </div>
            <div className={style.contactInfo}>
                <span>Nebesnoi Sotni Street, Chernivtsi 58000</span>
                <span className={style.separation}>|</span>
                <span>+380-777-777-777</span>
                <span className={style.separation}>|</span>
                <span>observer@observer.com</span>
            </div>
            <nav className={style.nav}>
                <div className={style.item}>
                    <Link to="/">Home</Link>
                </div>
                <div className={style.item}>
                    <Link to="movie">Movie</Link>
                </div>
                <div className={style.item}>
                    <Link to="serials">Serials</Link>
                </div>
                <div className={style.item}>
                    <Link to="about">About</Link>
                </div>
            </nav>
            <div className={style.socialNetwork}>
                <div>
                    <a href="#">
                        <Facebook />
                    </a>
                </div>
                <div>
                    <a href="#">
                        <Instagram />
                    </a>
                </div>
                <div>
                    <a href="#">
                        <Twitter />
                    </a>
                </div>
            </div>
            <div className={style.copyrights}>
                <span>© Copyrights 2023 observer</span>
            </div>
        </footer>
    )
}

export default Footer
