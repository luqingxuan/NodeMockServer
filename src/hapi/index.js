var Path=require('path');

var Hapi = require('hapi');

// Create a server with a host and port
var server = new Hapi.Server();

server.connection({
	host : 'localhost',
	port : 3000
});

var glob = require('glob');

// 读取所有API文件
var apiFiles = glob.sync(Path.resolve(__dirname, './api')+'/**/*.js', {
	nodir : true
});

// 输出所有api文件
console.log(apiFiles);

for (var i = 0, l = apiFiles.length; i < l; i++) {

	var file = apiFiles[i];

	var config = require(apiFiles[i]);

	var url=config.url;

	var matchs=url.match(/\:(\w+)/g) || [];
	
	for(var m=0,n=matchs.length;m<n;m++)
		url=url.replace(matchs[m],"{"+matchs[m].replace(":","")+"}");
	
	server.route({
		method : config.type,
		path : url,
		handler : (function(config) {

			var result=config.res;
			
			var ok = result.ok || result.fn;

			var err = result.err;

			return function(request, reply) {

				console.log("mock url:",request.url.path);
				
				if (request.params.error)
					return reply(err);

				if (typeof ok == 'function')
					ok = ok(request, request.params);

				reply(ok);
			};

		})(config)
	});

}

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    
    console.log('Server running at:', server.info.uri);
});