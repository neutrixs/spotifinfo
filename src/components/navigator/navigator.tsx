import React, { createContext, useEffect, useRef, useState } from 'react'
import NavigatorRoute from './navigatorRoute'
import useDimension from '../../hooks/useDimension'
import style from './navigator.module.scss'

interface props {
    children: React.ReactNode
}

interface contextProps {
    initialized: boolean
    selectedID: string
    hoveredID: string
    setSelectedID: React.Dispatch<React.SetStateAction<string>>
    setHoveredID: React.Dispatch<React.SetStateAction<string>>
    childElements: React.MutableRefObject<{ [key: string]: HTMLAnchorElement }> | null
}

export const NavigatorContext = createContext<contextProps>({
    initialized: false,
    selectedID: '',
    hoveredID: '',
    setSelectedID: () => {},
    setHoveredID: () => {},
    childElements: null,
})

export default function Navigator({ children }: props) {
    const { width } = useDimension()
    const [selectedID, setSelectedID] = useState('')
    const [hoveredID, setHoveredID] = useState('')
    const childElements = useRef<{ [key: string]: HTMLAnchorElement }>({})
    const navigatorElement = useRef<HTMLDivElement | null>(null)

    const [leftShadowActive, setLeftShadowActive] = useState(false)
    const [rightShadowActive, setRightShadowActive] = useState(false)
    const leftShadow = '0.8rem 0 0.4rem -0.4rem #00000060 inset'
    const rightShadow = '-0.8rem 0 0.4rem -0.4rem #00000060 inset'

    useEffect(() => {
        navigatorElement.current?.addEventListener('scroll', navigatorElementOnScroll)
    }, [])

    useEffect(() => {
        navigatorElementOnScroll()
    }, [width])

    if (process.env.NODE_ENV !== 'production') {
        // i have no idea why it's not an array
        ;(children as React.ReactElement[]).forEach(child => {
            if (child.type !== NavigatorRoute) {
                throw (
                    `<${typeof child.type == 'function' ? child.type.name : child.type}> ` +
                    `is not a valid child of Navigator. ` +
                    `Child of Navigator must be <${NavigatorRoute.name}>`
                )
            }
        })
    }

    function navigatorElementOnScroll() {
        if (!navigatorElement.current) return

        setLeftShadowActive(navigatorElement.current.scrollLeft > 0)
        setRightShadowActive(
            navigatorElement.current.scrollLeft + navigatorElement.current.clientWidth < navigatorElement.current.scrollWidth
        )
    }

    function getBoxShadowStyle() {
        return [leftShadowActive ? leftShadow : '', rightShadowActive ? rightShadow : ''].filter(Boolean).join(',')
    }

    return (
        <NavigatorContext.Provider
            value={{ initialized: true, selectedID, hoveredID, childElements, setSelectedID, setHoveredID }}
        >
            <div className={style.navigator} style={{ boxShadow: getBoxShadowStyle() }} ref={navigatorElement}>
                {children}
            </div>
        </NavigatorContext.Provider>
    )
}
