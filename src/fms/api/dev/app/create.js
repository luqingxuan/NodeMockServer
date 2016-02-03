module.exports = {
	title : "创建APP",
	desc : "API功能描述",
	type : 'POST',
	url : '/v1/dev/apps',
	request : {
		appName : "",
		appType : "",
		appPlatform : "",
		appDesc : ""
	},
	res : {
		ok : {
			ret : 1,
			result : {
				id : "123"
			}
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
