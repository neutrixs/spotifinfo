const themeChange=function(){if("false"==window.localStorage.dark){$("body")[0].classList.remove("bodyLight"),$("#nav").removeClass("navLight"),$("#dropdown_options").removeClass("dropdown_optionsLight"),$("#dropdown").html($("#dropdown").html().replace("black","white")),$("#theme_check").removeClass("none");let o=$("a");for(i=0;i<o.length;i++)o[i].classList.remove("aLight");window.localStorage.dark=!0}else{$("body")[0].classList.add("bodyLight"),$("#nav").addClass("navLight"),$("#dropdown_options").addClass("dropdown_optionsLight"),$("#dropdown").html($("#dropdown").html().replace("white","black")),$("#theme_check").addClass("none");let o=$("a");for(i=0;i<o.length;i++)o[i].classList.add("aLight");window.localStorage.dark=!1}},themeForce=function(){$("body")[0].classList.add("bodyLight"),$("#nav").addClass("navLight"),$("#dropdown_options").addClass("dropdown_optionsLight"),$("#dropdown").html($("#dropdown").html().replace("white","black")),$("#theme_check").addClass("none");let o=$("a");for(i=0;i<o.length;i++)o[i].classList.add("aLight")};"false"==window.localStorage.dark&&themeForce(),$("#theme").on("click",themeChange);