module.exports = {
	title : "DEV-DeleteAPI",
	desc : "API功能描述",
	type : 'GET',
	url : '/v1/dev/apps/:appId/advs',
	request : {
		appId : '123'
	},
	res : {
		ok : {
			ret : 1,
			result : {

			}
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
