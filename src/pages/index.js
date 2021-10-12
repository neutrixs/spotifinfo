import {
    globalVar,
    sleep,
    getToken,
    getProfile,
    logOut,
    baseStart
} from '../script/base/base'

import {
    indexMostSaturated,
    autoAdjustLightness,
} from '../script/loggedIn/colourModule'

import { themeStart } from '../script/loggedIn/theme'

import { mobileDesktopSizeHandler, mobileDesktopStart } from '../script/base/mobileDesktop'

import { setNPSideText } from '../script/loggedIn/nowPlayingSideText'

import { windowOnResize } from '../script/loggedIn/window.onresize'

import { getRecentlyPlayed } from '../script/loggedIn/recentlyPlayed'

import { nowPlayingStart } from '../script/loggedIn/nowPlaying'

import { colourStart } from '../script/loggedIn/colour'

import $ from 'jquery'
import he from 'he'
import '../style/base.css'
import '../style/nowPlaying.css'

window.$ = $
window.he = he

baseStart()
themeStart()
mobileDesktopStart()
windowOnResize(setNPSideText,mobileDesktopSizeHandler)
nowPlayingStart(globalVar,getRecentlyPlayed,getToken)
getRecentlyPlayed(globalVar,getToken)
colourStart(indexMostSaturated,autoAdjustLightness)