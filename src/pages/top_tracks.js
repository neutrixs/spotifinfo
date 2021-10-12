import {
    globalVar,
    baseStart,
    unsetHidden
} from '../script/base/base'

import { themeStart } from '../script/loggedOut/theme'

import { mobileDesktopSizeHandler } from '../script/top/mobileDesktop'

import $ from 'jquery'
import he from 'he'
import '../style/base.css'
import '../style/top/topTracks.css'

window.$ = $
window.he = he

unsetHidden()
baseStart()
themeStart()
mobileDesktopSizeHandler()