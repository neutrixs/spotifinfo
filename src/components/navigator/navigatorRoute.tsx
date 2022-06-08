import React, { useId } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import style from './navigatorRoute.module.scss'

interface props {
    children: React.ReactNode
    path: string
}

export default function NavigatorRoute({ children, path }: props) {
    const location = useLocation()
    const navigate = useNavigate()
    const id = useId()

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
