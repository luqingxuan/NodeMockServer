module.exports = {
	title : "DEV-DeleteAPI",
	desc : "API功能描述",
	type : 'GET',
	url : '/v1/dict/dev/apps/advs/type',
	request : {

	},
	res : {
		ok : {
			ret : 1,
			result : [ "Banner", "Top" ]
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
