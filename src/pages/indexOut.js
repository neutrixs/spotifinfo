import {
    globalVar,
    baseStart,
    unsetHidden
} from '../script/base/base'

import { themeStart } from '../script/loggedOut/theme'

import { mobileDesktopSizeHandler, mobileDesktopStart } from '../script/base/mobileDesktop'

import { windowOnResize } from '../script/loggedOut/window.onresize'

import { encodeQueryString } from '../script/base/querystring'

import { outStart } from '../script/loggedOut/out'

import { loginHandler } from '../script/loggedOut/login'

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

let loginParam = globalVar.loginParam = {}
outStart(loginParam)
loginHandler(loginParam,encodeQueryString)