import React, { useId, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { NavigatorContext } from './navigator'
import style from './navigatorRoute.module.scss'

interface props {
    children: React.ReactNode
    path: string
}

export default function NavigatorRoute({ children, path }: props) {
    const location = useLocation()
    const navigate = useNavigate()
    const id = useId()
    const navigatorData = useContext(NavigatorContext)

    if (process.env.NODE_ENV !== 'production') {
        if (!navigatorData.initialized) {
            throw '<NavigatorRoute> should only be placed as a child of <Navigator>'
        }
    }

    function onInteract(e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | React.KeyboardEvent<HTMLAnchorElement>) {
        e.preventDefault()
        navigate(path)
    }

    return (
        <a href={path} role="button" tabIndex={0} onClick={onInteract} onKeyDown={onInteract} className={style.route}>
            {children}
        </a>
    )
}
