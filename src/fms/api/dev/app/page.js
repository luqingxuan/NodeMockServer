var faker = require('faker');

module.exports = {
	title : "分页查看APP",
	desc : "API功能描述",
	type : 'GET',
	url : '/v1/dev/apps/:pageNo/:pageSize',
	request : {
		pageNo : 1,
		pageSize : 10
	},
	res : {
		fn : function(req) {
			return {}
		},
		ok : false,
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
