import * as React from 'react'

import style from './404.module.scss'
import Logo from '../../img/NotFound.webp'

export default function Page404() {
    return (
        <div className={style.holder}>
            <div>
                <img src={Logo} className={style.image} />
                <p className={style.info}>
                    THE REQUESTED RESOURCE {'\u00a0'}
                    {location.pathname.toUpperCase()}
                    {'\u00a0'} COULD NOT BE FOUND
                </p>
            </div>
        </div>
    )
}
