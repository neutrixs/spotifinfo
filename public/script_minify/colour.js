!function(){let r="";const n=new ColorThief;let t=document.getElementById("mainPicture");t.crossOrigin="Anonymous",t.addEventListener("load",function(){var o=n.getColor(t).join(",");r=[o,o],l(r[0]),c(r[1]),e()});const e=function(){$("#nowPlaying").css("background-color",`rgb(${"false"==window.localStorage.dark?r[1]:r[0]})`)},l=function(o){let n=[...o=o.split(",")];if(128<o.sort((o,i)=>o-i)[2]){var t=o[2]/128;for(i=0;i<n.length;i++)n[i]=Math.floor(n[i]/t);r[0]=n.join(",")}else if(o.sort((o,i)=>o-i)[2]<32){var e=32/o[2];for(i=0;i<n.length;i++)n[i]=Math.floor(n[i]*e);r[0]=n.join(",")}},c=function(o){let n=[...o=o.split(",")];if(o.sort((o,i)=>o-i)[2]<255){var t=255/o[2];for(i=0;i<n.length;i++)n[i]=Math.floor(n[i]*t);r[1]=n.join(",")}};$("#theme").on("click",function(){setTimeout(e,10)})}();