import {
    globalVar,
    baseStart,
    unsetHidden
} from '../script/base/base'

import { themeStart } from '../script/top/theme'

import { mobileDesktopSizeHandler } from '../script/top/mobileDesktop'

import { topScriptStart } from '../script/top/topScript'

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
topScriptStart()