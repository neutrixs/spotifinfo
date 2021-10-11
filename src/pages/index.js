import {
    globalVar,
    sleep,
    getToken,
    getProfile,
    logOut,
    baseStart
} from '../script/base/base'

import { themeStart } from '../script/loggedIn/theme'

import $ from 'jquery'
import he from 'he'
import '../style/base.css'

window.$ = $
window.he = he

baseStart()
themeStart()