import * as React from 'react'

import detectWEBPSupport from '../other/detectWEBPSupport'

import './mainPageOut.scss'

import * as turtle from '../../img/kinghd.png'
import * as turtleWEBP from '../../img/kinghd.webp'

export default function MainPageOut() {
    const supportWEBP = detectWEBPSupport()

    return (
        <div id="mainPageOut">
            <div className="content">
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
