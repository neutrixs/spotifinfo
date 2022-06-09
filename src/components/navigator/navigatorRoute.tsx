import React, { useId, useContext, useEffect, useRef } from 'react'
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
    const elementRef = useRef<HTMLAnchorElement | null>(null)

    useEffect(() => {
        if (!navigatorData.childElements) return
        if (!elementRef.current) return

        navigatorData.childElements.current[id] = elementRef.current
    }, [])

    useEffect(() => {
        if (!elementRef.current) return

        elementRef.current.addEventListener('mouseover', () => navigatorData.setHoveredID(id))
        elementRef.current.addEventListener('mouseout', () => navigatorData.setHoveredID(''))
    }, [])

    useEffect(() => {
        if (location.pathname == path) {
            navigatorData.setSelectedID(id)
        }
    }, [location])

    if (process.env.NODE_ENV !== 'production') {
        if (!navigatorData.initialized) {
            throw '<NavigatorRoute> should only be placed as a child of <Navigator>'
        }
    }

    function onClick(e: React.MouseEvent) {
        e.preventDefault()
        elementRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
        navigate(path)
    }

    function onKeyDown(e: React.KeyboardEvent) {
        if (e.key !== 'Enter') return
        elementRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
        navigate(path)
    }

    return (
        <a href={path} onClick={onClick} onKeyDown={onKeyDown} className={style.route} ref={elementRef}>
            {children}
        </a>
    )
}
