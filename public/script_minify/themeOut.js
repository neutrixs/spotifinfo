const themeChange=function(){if("false"==window.localStorage.dark){$("body")[0].classList.remove("bodyLight"),$("#nav").removeClass("navLight"),$("#dropdown_options").removeClass("dropdown_optionsLight"),$("#theme_check").removeClass("none");let b=$("a");for(i=0;i<b.length;i++)b[i].classList.remove("aLight");window.localStorage.dark=!0}else{$("body")[0].classList.add("bodyLight"),$("#nav").addClass("navLight"),$("#dropdown_options").addClass("dropdown_optionsLight"),$("#theme_check").addClass("none");let b=$("a");for(i=0;i<b.length;i++)b[i].classList.add("aLight");window.localStorage.dark=!1}},themeForce=function(){$("body")[0].classList.add("bodyLight"),$("#nav").addClass("navLight"),$("#dropdown_options").addClass("dropdown_optionsLight"),$("#theme_check").addClass("none");let b=$("a");for(i=0;i<b.length;i++)b[i].classList.add("aLight")};"false"==window.localStorage.dark&&themeForce(),$("#theme").off().on("click",themeChange);