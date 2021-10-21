"use strict";(self.webpackChunkspotifinfo=self.webpackChunkspotifinfo||[]).push([[866],{692:(n,t,e)=>{e.d(t,{G:()=>a});var r,i=e(294),o=(r=function(n,t){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e])},r(n,t)},function(n,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function e(){this.constructor=n}r(n,t),n.prototype=null===t?Object.create(t):(e.prototype=t.prototype,new e)}),a=function(n){function t(t){return n.call(this,t)||this}return o(t,n),t.prototype.render=function(){return i.createElement("div",{id:"recaptchaBrandingHolder"},i.createElement("span",null,"This site is protected by reCAPTCHA and the Google "),i.createElement("a",{className:"recaptchaBrandingText",href:"https://policies.google.com/privacy",target:"_blank"},"Privacy Policy "),i.createElement("span",null,"and "),i.createElement("a",{className:"recaptchaBrandingText",href:"https://policies.google.com/terms",target:"_blank"},"Terms of Service "),i.createElement("span",null,"apply."))},t}(i.Component)},866:(n,t,e)=>{e.r(t),e.d(t,{default:()=>j});var r=e(294),i=e(263),o=function(n,t,e,r){return new(e||(e=Promise))((function(i,o){function a(n){try{c(r.next(n))}catch(n){o(n)}}function s(n){try{c(r.throw(n))}catch(n){o(n)}}function c(n){var t;n.done?i(n.value):(t=n.value,t instanceof e?t:new e((function(n){n(t)}))).then(a,s)}c((r=r.apply(n,t||[])).next())}))},a=function(n,t){var e,r,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(o){return function(s){return function(o){if(e)throw new TypeError("Generator is already executing.");for(;a;)try{if(e=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,r=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!(i=a.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){a=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1];break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o);break}i[2]&&a.ops.pop(),a.trys.pop();continue}o=t.call(n,a)}catch(n){o=[6,n],r=0}finally{e=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}};function s(){return o(this,void 0,void 0,(function(){var n,t,e,o,s,c=this;return a(this,(function(a){switch(a.label){case 0:return[4,fetch("https://api.spotify.com/v1/me/player/currently-playing",{method:"GET",headers:{authorization:window.localStorage.token}})];case 1:return 204==(n=a.sent()).status?(this.setState({classNone:!0}),[2]):400!=n.status&&401!=n.status?[3,3]:(clearInterval(this.state.nowPlayingInterval),[4,(0,i.LP)()]);case 2:return a.sent(),this.getNowPlaying(),this.setState({nowPlayingInterval:setInterval((function(){c.getNowPlaying()}),2e3)}),[2];case 3:return[4,n.json()];case 4:if(!(t=a.sent()).item)return this.setState({classNone:!0}),[2];for(t.is_playing?this.setState({isPlaying:!0}):this.setState({isPlaying:!1}),t.item.name!==this.state.nowPlayingTitle&&this.state.nowPlayingTitle&&this.props.getRecentlyPlayed(),e=[],o=0;o<t.item.artists.length;o++)s=t.item.artists[o],e.push(r.createElement("span",{key:s.id+"_hold"},r.createElement("a",{key:s.id,id:"nowPlayingArtists"+o.toString(),href:s.external_urls.spotify},s.name),o!==t.item.artists.length-1?r.createElement("span",{key:s.id+"_comma"},", "):null));return this.setState({nowPlayingTitle:t.item.name,nowPlayingTitleLink:t.item.external_urls.spotify,albumArtSrc:t.item.album.images[0].url,albumArtLinkSrc:t.item.album.external_urls.spotify,Artists:e,nowPlayingProgress:{currentMs:t.progress_ms,totalMs:t.item.duration_ms,isPlaying:t.is_playing}}),this.setState({classNone:!1}),[2]}}))}))}function c(){if(this.state.nowPlayingProgress.isPlaying&&(this.setState((function(n){return{nowPlayingProgress:{currentMs:n.nowPlayingProgress.currentMs+100,totalMs:n.nowPlayingProgress.totalMs,isPlaying:n.nowPlayingProgress.isPlaying}}})),!(this.state.nowPlayingProgress.currentMs>this.state.nowPlayingProgress.totalMs))){var n=this.state.nowPlayingProgress.currentMs,t=this.state.nowPlayingProgress.totalMs,e=Math.floor(n/6e4).toString(),r=Math.floor(n/1e3)%60;r=(r<10?"0":"")+r.toString();var i=Math.floor(t/6e4).toString(),o=Math.floor(t/1e3)%60,a=e+":"+r+" / "+i+":"+(o=(o<10?"0":"")+o.toString());this.setState({nowPlayingProgressStr:a})}}var u=function(){var n=parseFloat(window.getComputedStyle(document.body).getPropertyValue("font-size")),t=21.5*n/(window.innerWidth-(this.props.classNowPlayingMobile?3:23*n))<.5;this.setState({nowPlayingInfoHolderSide:!!t})},l=function(){return l=Object.assign||function(n){for(var t,e=1,r=arguments.length;e<r;e++)for(var i in t=arguments[e])Object.prototype.hasOwnProperty.call(t,i)&&(n[i]=t[i]);return n},l.apply(this,arguments)},f=function(n){var t,e,r,i,o,a,s,c,u,l,f,h;return t=n[0]/255,e=n[1]/255,r=n[2]/255,u=Math.max(t,e,r),f=function(n){return(u-n)/6/l+.5},h=function(n){return Math.round(100*n)/100},0==(l=u-Math.min(t,e,r))?s=c=0:(c=l/u,i=f(t),o=f(e),a=f(r),t===u?s=a-o:e===u?s=1/3+i-a:r===u&&(s=2/3+o-i),s<0?s+=1:s>1&&(s-=1)),{h:Math.round(360*s),s:h(100*c),v:h(100*u)}},h=function(n){var t=1/255*n[0],e=1/255*n[1],r=1/255*n[2];return Math.sqrt(.299*Math.pow(t,2)+.587*Math.pow(e,2)+.114*Math.pow(r,2))},y=function(n,t){var e=function(n){var t=n[0],e=n[1],r=n[2];t/=255,e/=255,r/=255;var i,o,a=Math.max(t,e,r),s=Math.min(t,e,r),c=(a+s)/2;if(a==s)i=o=0;else{var u=a-s;switch(o=c>.5?u/(2-a-s):u/(a+s),a){case t:i=(e-r)/u+(e<r?6:0);break;case e:i=(r-t)/u+2;break;case r:i=(t-e)/u+4}i/=6}return[i,o,c]}(n);return e[2]+=t/100,n=function(n){var t,e,r,i=n[0],o=n[1],a=n[2];if(0==o)t=e=r=a;else{var s=function(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+6*(t-n)*e:e<.5?t:e<2/3?n+(t-n)*(2/3-e)*6:n},c=a<.5?a*(1+o):a+o-a*o,u=2*a-c;t=s(u,c,i+1/3),e=s(u,c,i),r=s(u,c,i-1/3)}return[Math.round(255*t),Math.round(255*e),Math.round(255*r)]}(e),n},d=function(n,t,e,r){for(var i=0;i<100;i++){t=y(t,n?1:-1);var o=h(t);if(e<o&&o<r)break}return t},v=function(n,t,e){var r=h(n);r<t?n=d(!0,n,t,e):r>e&&(n=d(!1,n,t,e));for(var i=0;i<3;i++)n[i]=Math.round(n[i]);return n},w=function(n,t,e){if(e||2===arguments.length)for(var r,i=0,o=t.length;i<o;i++)!r&&i in t||(r||(r=Array.prototype.slice.call(t,0,i)),r[i]=t[i]);return n.concat(r||Array.prototype.slice.call(t))},g=new window.ColorThief;function P(){var n=document.getElementById("albumArt"),t=g.getPalette(n,5),e=t[function(n){for(var t=[],e=0;e<n.length;e++)t[e]=l({},f(n[e])),t[e].indexNo=e;return t.sort((function(n,t){return t.s-n.s})),t[0].indexNo}(w([],t,!0))],r=[e,e];r[0]=v(r[0],.35,.45),r[1]=v(r[1],.7,.8),this.setState({palette:r})}var p,m=(p=function(n,t){return p=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e])},p(n,t)},function(n,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function e(){this.constructor=n}p(n,t),n.prototype=null===t?Object.create(t):(e.prototype=t.prototype,new e)}),b=function(n,t,e,r){return new(e||(e=Promise))((function(i,o){function a(n){try{c(r.next(n))}catch(n){o(n)}}function s(n){try{c(r.throw(n))}catch(n){o(n)}}function c(n){var t;n.done?i(n.value):(t=n.value,t instanceof e?t:new e((function(n){n(t)}))).then(a,s)}c((r=r.apply(n,t||[])).next())}))},k=function(n,t){var e,r,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(o){return function(s){return function(o){if(e)throw new TypeError("Generator is already executing.");for(;a;)try{if(e=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,r=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!(i=a.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){a=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1];break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o);break}i[2]&&a.ops.pop(),a.trys.pop();continue}o=t.call(n,a)}catch(n){o=[6,n],r=0}finally{e=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}},M=function(n){function t(t){var e=n.call(this,t)||this;return e.t=u.bind(e),e.i=P.bind(e),e.state={nowPlayingInterval:void 0,nowPlayingProgressInterval:void 0,isPlaying:!1,albumArtSrc:"",albumArtLinkSrc:"",nowPlayingTitle:"",nowPlayingTitleLink:"",Artists:null,nowPlayingProgress:{currentMs:null,totalMs:null,isPlaying:!1},nowPlayingProgressStr:"",classNone:!0,nowPlayingInfoHolderSide:!0,palette:void 0},e}return m(t,n),t.prototype.componentDidMount=function(){var n=this;this.getNowPlaying(),this.setState({nowPlayingInterval:setInterval((function(){n.getNowPlaying()}),2e3)}),this.nowPlayingProgress(),this.setState({nowPlayingProgressInterval:setInterval((function(){n.nowPlayingProgress()}),100)}),window.addEventListener("resize",this.t),setTimeout(u.bind(this),10);var t=document.getElementById("albumArt");t.crossOrigin="anonymous",t.addEventListener("load",this.i)},t.prototype.componentWillUnmount=function(){clearInterval(this.state.nowPlayingInterval),clearInterval(this.state.nowPlayingProgressInterval),window.removeEventListener("resize",this.t),document.getElementById("albumArt").removeEventListener("load",this.i)},t.prototype.nowPlayingProgress=function(){c.bind(this)()},t.prototype.getNowPlaying=function(){return b(this,void 0,void 0,(function(){return k(this,(function(n){switch(n.label){case 0:return[4,s.bind(this)()];case 1:return n.sent(),[2]}}))}))},t.prototype.setPalette=function(){return this.state.palette?"rgb("+this.state.palette[0].join(",")+")":""},t.prototype.render=function(){return r.createElement("div",{id:"nowPlaying",className:"nowPlayingHolder "+(this.state.classNone?"none ":"")+(this.props.classNowPlayingMobile?"nowPlayingHolderMobile ":""),style:{backgroundColor:this.setPalette()}},r.createElement("p",{id:"nowPlayingStatus"},this.state.isPlaying?"Now Playing:":"Last Played Song:"),r.createElement("a",{id:"albumArtHolder",href:this.state.albumArtLinkSrc},r.createElement("img",{id:"albumArt",src:this.state.albumArtSrc})),r.createElement("div",{id:"nowPlayingInfoHolder",className:this.state.nowPlayingInfoHolderSide?"nowPlayingInfoHolderSide ":""},r.createElement("a",{id:"nowPlayingTitle",href:this.state.nowPlayingTitleLink},this.state.nowPlayingTitle),r.createElement("p",{id:"nowPlayingArtists"},this.state.Artists),r.createElement("p",{id:"nowPlayingProgress"},this.state.nowPlayingProgressStr)))},t}(r.Component),S=e(692),A=function(){var n=function(t,e){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e])},n(t,e)};return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}}(),N=function(n,t,e,r){return new(e||(e=Promise))((function(i,o){function a(n){try{c(r.next(n))}catch(n){o(n)}}function s(n){try{c(r.throw(n))}catch(n){o(n)}}function c(n){var t;n.done?i(n.value):(t=n.value,t instanceof e?t:new e((function(n){n(t)}))).then(a,s)}c((r=r.apply(n,t||[])).next())}))},_=function(n,t){var e,r,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(o){return function(s){return function(o){if(e)throw new TypeError("Generator is already executing.");for(;a;)try{if(e=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,r=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!(i=a.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){a=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1];break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o);break}i[2]&&a.ops.pop(),a.trys.pop();continue}o=t.call(n,a)}catch(n){o=[6,n],r=0}finally{e=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}},T=function(n){function t(t){var e=n.call(this,t)||this;return e.state={data:[],classNone:!0},e.getRecentlyPlayed=e.getRecentlyPlayed.bind(e),e.props.setGetRecentlyPlayedFunction(e.getRecentlyPlayed),e}return A(t,n),t.prototype.componentDidMount=function(){this.getRecentlyPlayed()},t.prototype.structureData=function(n){for(var t,e=[],i=0;i<(null===(t=n.items)||void 0===t?void 0:t.length);i++){var o=n.items[i].track,a=o.id+i.toString();e.push(r.createElement("div",{id:"recentlyPlayed"+i,className:"recentlyPlayedEach",key:a},r.createElement("a",{id:"recentlyPlayed"+i+"ArtHolder",className:"recentlyPlayedArtHolder",href:o.album.external_urls.spotify,key:a+"_1"},r.createElement("img",{className:"recentlyPlayedArt",src:o.album.images[1].url,key:a+"_2"})),r.createElement("a",{id:"recentlyPlayed"+i+"InfoHolder",className:"recentlyPlayedInfoHolder",href:o.external_urls.spotify,key:a+"_3"},r.createElement("p",{className:"recentlyPlayedSongName",key:a+"_4"},o.name),r.createElement("p",{className:"recentlyPlayedArtistsName",key:a+"_5"},o.artists.map((function(n){return n.name})).join(", ")))))}this.setState({data:e,classNone:!1})},t.prototype.getRecentlyPlayed=function(){return N(this,void 0,void 0,(function(){var n,t;return _(this,(function(e){switch(e.label){case 0:return"https://api.spotify.com/v1/me/player/recently-played?limit=50",[4,fetch("https://api.spotify.com/v1/me/player/recently-played?limit=50",{method:"GET",headers:{Authorization:window.localStorage.token}})];case 1:return 401!=(n=e.sent()).status&&400!=n.status?[3,4]:[4,(0,i.LP)()];case 2:return e.sent(),[4,this.getRecentlyPlayed()];case 3:return e.sent(),[2];case 4:return[4,n.json()];case 5:return t=e.sent(),this.structureData(t),[2]}}))}))},t.prototype.render=function(){return r.createElement("div",{id:"recentlyPlayed",className:this.state.classNone?"none ":""},r.createElement("p",{id:"titleRecentlyPlayed"},"Recently Played:"),r.createElement("div",{id:"recentlyPlayedListHolder"},this.state.data))},t}(r.Component),I=function(){var n=function(t,e){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e])},n(t,e)};return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}}();const j=function(n){function t(t){var e=n.call(this,t)||this;return e.state={additionalPageStyle:"",pageStyleTransition:"",classNowPlayingMobile:!1,pageClassNone:"none",getRecentlyPlayed:function(){}},e.setGetRecentlyPlayedFunction=e.setGetRecentlyPlayedFunction.bind(e),e.mobileListener=e.mobileListener.bind(e),e}return I(t,n),t.prototype.componentDidMount=function(){this.mobileListenerFirst()},t.prototype.componentWillUnmount=function(){window.removeEventListener("resize",this.mobileListener)},t.prototype.setGetRecentlyPlayedFunction=function(n){this.setState({getRecentlyPlayed:n})},t.prototype.mobileListener=function(){var n=parseFloat(window.getComputedStyle(document.body).getPropertyValue("font-size")),t=window.innerWidth/n<66;this.setState({additionalPageStyle:t?"pageMobile":"",classNowPlayingMobile:!!t})},t.prototype.mobileListenerFirst=function(){this.mobileListener(),this.setState({pageClassNone:"",pageStyleTransition:"transition300ms"}),window.addEventListener("resize",this.mobileListener)},t.prototype.render=function(){var n=this.state.classNowPlayingMobile;return r.createElement("div",{id:"page",className:this.state.pageStyleTransition+" "+this.state.additionalPageStyle+" "+this.state.pageClassNone},r.createElement(M,{getRecentlyPlayed:this.state.getRecentlyPlayed,classNowPlayingMobile:n}),r.createElement(T,{setGetRecentlyPlayedFunction:this.setGetRecentlyPlayedFunction}),r.createElement(S.G,null))},t}(r.Component)}}]);