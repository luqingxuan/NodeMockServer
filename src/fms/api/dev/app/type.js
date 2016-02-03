module.exports = {
	title : "DEV-DeleteAPI",
	desc : "API功能描述",
	type : 'GET',
	url : '/v1/dict/dev/apps/type',
	request : {

	},
	res : {
		ok : {
			ret : 1,
			result : [ "Book", "Dict" ]
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
