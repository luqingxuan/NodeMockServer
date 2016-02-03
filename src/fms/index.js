// 引入 node 的 fms 模块
var fms = require('fms');

var glob = require('glob');

var htmlDocs = [];

// 读取所有API文件
var apiFiles = glob.sync('./api/**/*.js', {
	nodir : true
});

for (var i = 0, l = apiFiles.length; i < l; i++) {

	var file = apiFiles[i];

	var html = file.replace(/^\.\/api/, './doc').replace(/\.js$/, '.html');

	htmlDocs.push(html);
}

fms.run({
	port : 3000,
	ajax : {
		type : 'get',
		timeout : 300,
		dataType : 'json'
	},
});

for (var i = 0, l = htmlDocs.length; i < l; i++) {

	// DOC
	fms.docFile(htmlDocs[i]);

	// API
	var ajax = require(apiFiles[i]);

	fms.ajax(ajax);
}