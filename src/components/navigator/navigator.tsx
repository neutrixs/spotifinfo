import React, { createContext, useState } from 'react'
import NavigatorRoute from './navigatorRoute'
import style from './navigator.module.scss'

interface props {
    children: React.ReactNode
}

interface contextProps {
    initialized: boolean
    selectedID: string
    hoveredID: string
}

export const NavigatorContext = createContext<contextProps>({
    initialized: false,
    selectedID: '',
    hoveredID: '',
})

export default function Navigator({ children }: props) {
    const [selectedID, setSelectedID] = useState('')
    const [hoveredID, setHoveredID] = useState('')

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
        <NavigatorContext.Provider value={{ initialized: true, selectedID, hoveredID }}>
            <div className={style.navigator}>{children}</div>
        </NavigatorContext.Provider>
    )
}
