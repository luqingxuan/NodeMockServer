module.exports = {
	title : "查看APP",
	desc : "API功能描述",
	type : 'GET',
	url : '/v1/dev/apps/:appId',
	request : {
		appId : "22"
	},
	res : {
		ok : {
			ret : 1,
			result : {
				id : "22",
				appName : "",
				appType : ""
			}
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
