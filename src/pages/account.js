import {
    getToken,
    baseStart,
    unsetHidden
} from '../script/base/base'

import { themeStart } from '../script/acc/theme'

import { mobileDesktopSizeHandler } from '../script/acc/mobileDesktop'

import { getAccountInfo } from '../script/acc/getInfo'

import $ from 'jquery'
import he from 'he'
import '../style/base.css'
import '../style/acc/account.css'

window.$ = $
window.he = he

unsetHidden()
baseStart()
themeStart()
mobileDesktopSizeHandler()
getAccountInfo(getToken)