module.exports = {
	title : "DEV-DeleteAPI",
	desc : "API功能描述",
	type : 'POST',
	url : '/v1/dev/apps/:appId/advs',
	request : {
		advName : "",
		advType : ""
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
