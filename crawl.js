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
    normalizeURL
};