import {
    globalVar,
    getToken,
    baseStart,
    unsetHidden
} from '../script/base/base'

import { themeStart } from '../script/loggedOut/theme'

import { mobileDesktopSizeHandler, mobileDesktopStart } from '../script/base/mobileDesktop'

import { windowOnResize } from '../script/loggedOut/window.onresize'

import $ from 'jquery'
import he from 'he'
import '../style/base.css'
import '../style/baseOut.css'

window.$ = $
window.he = he

unsetHidden()
baseStart()
themeStart()
mobileDesktopStart()
windowOnResize(mobileDesktopSizeHandler)