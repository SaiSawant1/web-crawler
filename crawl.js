 const {JSDOM}=require("jsdom")
 function getURLsFromHTML(htmlBody,baseURL){
    const urls=[]
    const dom=new JSDOM(htmlBody)
    const links=dom.window.document.querySelectorAll("a")
    for(const link of links){
        try {
           if(link.href.slice(0,1)==="/"){
                // relative path
                const urlOject=new URL(baseURL+link.href)
                urls.push(urlOject.href)
           }else{
                const urlObject=new URL(link.href)
                urls.push(urlObject.href)
           } 

        } catch (error) {
            console.log("invalid URL [ERROR]")        
        }    
    }
        
    return urls
 }
 function normalizeURL(urlString)
{
    const urlObject=new URL(urlString)
    let hostPath= `${urlObject.hostname}${urlObject.pathname}`
    if(hostPath.endsWith("/"))
    {
        hostPath=hostPath.slice(0,-1)
    }
    return hostPath 

}

module.exports={
    normalizeURL,
    getURLsFromHTML
};