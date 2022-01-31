import * as React from 'react'

import './404.scss'

export default function Page404() {
    return (
        <div id="pageHolder404">
            <div>
                <p id="text">404</p>
                <p id="notFound">NOT FOUND</p>
                <p id="info">
                    THE REQUESTED RESOURCE {'\u00a0'}
                    {location.pathname.toUpperCase()}
                    {'\u00a0'} COULD NOT BE FOUND
                </p>
            </div>
        </div>
    )
}
