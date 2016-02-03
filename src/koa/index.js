var koa = require('koa');

var Path=require('path');

var URL = require('url');

var QueryString = require('querystring');

var glob = require('glob');

var htmlDocs = [];

// 读取所有API文件
var apiFiles = glob.sync(Path.resolve(__dirname, './api')+'/**/*.js', {
	nodir : true
});

// 输出所有api文件
console.log(apiFiles);

// 所有的映射规则数据对象
var rules=[];
// url和具体api定义文件的映射
var fileMap={};

var normalizeUrl=function(url){
	
	// 开头必须是/
	if(!/^\//.test(url))
		url='/'+url;
	
	// 结尾不能是/
	url=url.replace(/\/$/,'');
	
	return url;
};

// 从URL占位符中提取参数:/a/b/:user/:test/c->[user,test]
var extractUrlKeys=function(url){
	
	var keys= url.match(/\:\w+/g) || [];
	for(var i=0,l=keys.length;i<l;i++)
		keys[i]=keys[i].replace(/^:/,'');
	
	return keys;
}; 

// 从URL占位符中提取参数值:/a/b/:x/:y & /a/b/1/2->[1,2]
var extractUrlValues=function(url,path){
	
	var regex=url.replace(/\:\w+/g,"([a-zA-Z0-9]+)")
	
	var values=path.match(new RegExp(regex)) || [];
	
	return values && values.length ? values.splice(1) : [];
};

for (var i = 0, l = apiFiles.length; i < l; i++) {

	var config=require(apiFiles[i]);
	
	// 地址
	var url=config.url=normalizeUrl(config.url);

	// 方法
	var method=config.type.toUpperCase();
	
	rules.push({
		url:url,
		method:method,
		params:{},// 提取的参数
		prority:0// 权重
	});
	
	fileMap[url]=apiFiles[i];
}

var app = koa();

app.use(function *(next) {
	
	var method=null;
	
    var rawMethod = this.req.method.toUpperCase();

    // http delete方法模拟
    if(rawMethod=='POST')
        method=this.request.header['x-http-method-override'];

    method= (method || rawMethod).toUpperCase();

    var path = this.req.url;

    var query=QueryString.parse(URL.parse(this.request.url).query) || {};
 
    this.set('Access-Control-Allow-Origin', '*')
    
    this.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Key')
    
    this.set('Access-Control-Allow-Methods', this.req.headers['access-control-request-method'])
    
    this.set('Content-Type', 'application/json')

    if (method === 'OPTIONS') 
        this.body = '';
     else if (path.indexOf('favicon.ico') > 0) 
        this.body = '';
    else if (/^\/v1/.test(path)) {

        console.log('mock for:', method, path);

    	var right=[];
    	
    	for(var i=0,l=rules.length;i<l;i++){
    		
    		var rule=rules[i];
    		
    		rule.prority=0;
    		
    		rule.params={};
    		
    		// 方法不匹配
    		if(rule.method!=method)
    			continue;
    		
    		var url=rule.url;
    		
    		// 路径本来就该相等嘛
    		if(url==path){
   
    			right=[rule];
    			
    			break;
    		}
    		
    		var regex=url;
    		
    		// 提取:appId占位符
    		var keys=extractUrlKeys(url);

    		// 路径测试不通过
    		if(!new RegExp(keys.length ? url.replace(/\:\w+/g,"([a-zA-Z0-9]+)") : url).test(path))
    			continue;
    		
    		// restful API提取:appId占位符对应参数值
    		var values=extractUrlValues(url,path);

    		var params={};
    		for(var m=0,n=Math.min(keys.length,values.length);m<n;m++){
    			
    			var key=keys[m];
    			
    			var value=values[m];
    			
    			// 尝试转化为浮点数
    			if(/^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/.test(value))
    				value=parseFloat(value);
    			
    			params[key]=value;
    		}
    		
    		rule.params=params;
    		
    		// 权重,简单计算，按照长度
    		rule.prority=url.split("/").length;
    			
    		right.push(rule);
    		
    	}
  
    	var result={ret:0,message:"找不到匹配的路径"};

    	if(right.length){
    		
    		// 根据优先级计算
    		var rule=right[0];
    		for(var i=1,l=right.length;i<l;i++)
    			if(right[i].prority > rule.prority)
    				rule=right[i];
 
	    	console.log('api file:',fileMap[rule.url]);
	    	
	    	var data=require(fileMap[rule.url]).res;
	    	
	    	// 参数error设置，意味着调试Error
	    	result=query.error ? data.err : data.fn || data.ok;

	    	for(var key in rule.params)
	    		query[key]=params[key];
	    	
	    	if(result && typeof result =='function')
	    		result=result.call(this,this.req,this.res,query);
	
    	}
   	
        this.body = JSON.stringify(result);
        
    } else 
    	this.body = '{}';
    
});

app.listen(3000);

console.log('mock server start at 3000');