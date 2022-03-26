import * as React from 'react'
import { useState, useEffect } from 'react'

import detectWEBPSupport from '../../scripts/detectWEBPSupport'
import { mdHandler, mdHandlerBoolean } from '../../scripts/mdHandler'
import useDimension from '../../hooks/useDimension'

import style from './mainPageOut.module.scss'

import turtle from '../../img/kinghd.png'
import turtleWEBP from '../../img/kinghd.webp'

export default function MainPageOut() {
    const supportWEBP = detectWEBPSupport()
    const [isMobile, setIsMobile] = useState<boolean>(mdHandlerBoolean())

    const { width } = useDimension()

    useEffect(() => {
        mdHandler(setIsMobile)
    }, [width])

    return (
        <div className={style.mainPageOut + ' ' + (isMobile ? style.mobile : '')}>
            <div className={style.content}>
                <img src={supportWEBP ? turtleWEBP : turtle} />
                <div>
                    <p style={{ fontSize: '2em', fontWeight: 600 }}>Spotifinfo</p>
                    <p style={{ fontSize: '2em' }}>What you can do with this:</p>

                    <ul style={{ fontSize: '2em' }}>
                        <li>See your now playing</li>
                        <li>See your listening history</li>
                        <li>See your top tracks and artists</li>
                        <li>Info about your Spotify account</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
