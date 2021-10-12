import {
    globalVar,
    getToken,
    baseStart,
    unsetHidden
} from '../script/base/base'

import { themeStart } from '../script/loggedOut/theme'

import $ from 'jquery'
import he from 'he'
import '../style/base.css'
import '../style/baseOut.css'

window.$ = $
window.he = he

unsetHidden()
baseStart()
themeStart()