const getToken = async function(){
    if(window.currentFetch){
        for(;window.currentFetch;){
            await sleep(100)
        }
        return
    }
    window.currentFetch = true
}

const sleep = async function(ms:number){
    return new Promise((a,b)=>{
        setTimeout(a,ms)
    })
}

export { getToken }