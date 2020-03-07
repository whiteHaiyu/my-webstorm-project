export function encodeurl(data){
    if(typeof data != "object"){
        return
    }
    let url = ''
    Object.keys(data).forEach((key) => {
        let temp = key + '=' + data[key] + '&'
        url = url.concat(temp)
    });
    return url.slice(0,-1)
}