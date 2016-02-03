module.exports = {
	title : "DEV-GetAPI",
	desc : "API功能描述",
	type : 'GET',
	url : '/v1/samples/:pageNo/:pageSize',
	request : {
		pageNo : 1,
		pageSize : 10
	},
	res : {
		ok : {
			ret : 1,
			result : {
				pageSize : 10,
				pageNo : 1,
				totalRecords : 200,
				results : [ {
					id : 1,
					name : "x",
					sex : 3
				}, {
					id : 1,
					name : "x",
					sex : 3
				}, {
					id : 1,
					name : "x",
					sex : 3
				} ]
			}
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
