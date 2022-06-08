import React, { createContext, useEffect, useRef, useState } from 'react'
import NavigatorRoute from './navigatorRoute'
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
    const [selectedID, setSelectedID] = useState('')
    const [hoveredID, setHoveredID] = useState('')
    const childElements = useRef<{ [key: string]: HTMLAnchorElement }>({})

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

    return (
        <NavigatorContext.Provider
            value={{ initialized: true, selectedID, hoveredID, childElements, setSelectedID, setHoveredID }}
        >
            <div className={style.navigator}>{children}</div>
        </NavigatorContext.Provider>
    )
}
