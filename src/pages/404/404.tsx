import * as React from 'react'

import style from './404.module.scss'

export default function Page404() {
    return (
        <div className={style.holder}>
            <div>
                <p className={style.text}>404</p>
                <p className={style.notFound}>NOT FOUND</p>
                <p className={style.info}>
                    THE REQUESTED RESOURCE {'\u00a0'}
                    {location.pathname.toUpperCase()}
                    {'\u00a0'} COULD NOT BE FOUND
                </p>
            </div>
        </div>
    )
}
