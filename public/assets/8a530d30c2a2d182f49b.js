(self.webpackChunkspotifinfo=self.webpackChunkspotifinfo||[]).push([[888],{214:(n,t,r)=>{n.exports=r.p+"assets/4bf2020197294d706a8dd09fd4e0d738.md"},888:(n,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});var e,i=r(294),o=r(559),c=r(214),u=(e=function(n,t){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])},e(n,t)},function(n,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function r(){this.constructor=n}e(n,t),n.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),f=function(n,t,r,e){return new(r||(r=Promise))((function(i,o){function c(n){try{f(e.next(n))}catch(n){o(n)}}function u(n){try{f(e.throw(n))}catch(n){o(n)}}function f(n){var t;n.done?i(n.value):(t=n.value,t instanceof r?t:new r((function(n){n(t)}))).then(c,u)}f((e=e.apply(n,t||[])).next())}))},a=function(n,t){var r,e,i,o,c={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function u(o){return function(u){return function(o){if(r)throw new TypeError("Generator is already executing.");for(;c;)try{if(r=1,e&&(i=2&o[0]?e.return:o[0]?e.throw||((i=e.return)&&i.call(e),0):e.next)&&!(i=i.call(e,o[1])).done)return i;switch(e=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return c.label++,{value:o[1],done:!1};case 5:c.label++,e=o[1],o=[0];continue;case 7:o=c.ops.pop(),c.trys.pop();continue;default:if(!(i=c.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){c=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){c.label=o[1];break}if(6===o[0]&&c.label<i[1]){c.label=i[1],i=o;break}if(i&&c.label<i[2]){c.label=i[2],c.ops.push(o);break}i[2]&&c.ops.pop(),c.trys.pop();continue}o=t.call(n,c)}catch(n){o=[6,n],e=0}finally{r=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,u])}}};const s=function(n){function t(t){var r=n.call(this,t)||this;return r.state={textData:"# Privacy Policy"},r}return u(t,n),t.prototype.componentDidMount=function(){return f(this,void 0,void 0,(function(){var n;return a(this,(function(t){switch(t.label){case 0:return[4,fetch(c)];case 1:return[4,t.sent().text()];case 2:return n=t.sent(),this.setState({textData:n}),[2]}}))}))},t.prototype.render=function(){return i.createElement("div",{id:"privacyHolder",className:this.props.isDark?"":"light "},i.createElement(o.Z,null,this.state.textData))},t}(i.Component)}}]);