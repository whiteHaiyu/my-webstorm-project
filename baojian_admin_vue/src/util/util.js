export default {
  sortData: function(obj){
    let keys=[];
    for(let tmp in obj){
      if(tmp!='remove')
        keys.push(tmp)
    }
    keys.sort()
    let str=""
    for(let tmp in keys){
      if(tmp!='remove')
        str=str+keys[tmp]+obj[keys[tmp]]
    }
    str=str+"qwfhasio4568/asd12iids"
    return str
  },

  getString: function (obj) {
    let str = JSON.stringify(obj).replace(/:/g,'=').replace(/,/g,'&').replace(/"/g,'').substr(1)
    let finalStr = str.substr(0,str.length-1)
    return finalStr
  }
}
