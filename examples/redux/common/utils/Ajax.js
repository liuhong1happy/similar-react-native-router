const SERVER_URL = 'https://github.com/liuhong1happy/similar-react-native-router/examples/';

const Ajax = function(options){
	let formData = null;
    if(options.type.toUpperCase()=="GET"){
        if(typeof options.data=="object"){
			 if(options.url.indexOf("?")==-1){
				 options.url += "?";
			 }
			 var params = [];
			 for(var key in options.data){
				 params.push(key+"="+encodeURIComponent(options.data[key]))
			 }
			 options.url += params.join("&");
        }
    }else{
	   switch(typeof options.data){
		case "string":
			formData = options.data;
			break;
		case "object":
			if(options.data instanceof Array){
				formData = JSON.stringify(options.data);
			}
			else{
				formData = new FormData();
				for(var key in options.data){
					var value = options.data[key];
					if(value!=null && typeof value != "string"){
						value = JSON.stringify(value);
					}
					formData.append(key,value)
				}
			}
			break;
	   }
    }

    fetch(SERVER_URL+options.url,{
        method:options.type,
        body:formData,
    })
    .then((response)=> response.text())
    .then((responseText)=>{
        var res = JSON.parse(responseText);
		if(res.status=="success"){
			options.success(res);
		}else{
			options.error('error', res.msg);
		}
    })
    .catch((error)=>{
        options.error('warning',"服务器错误");
    })
}

module.exports = function(options){
	  options.url = options.url || "/api/url";
	  options.type = options.type || "get";
	  options.success = options.success || function(e){};
	  options.error = options.error || function(e, msg){};
	  Ajax(options);
}