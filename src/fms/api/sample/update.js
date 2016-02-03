module.exports = {
	title : "示例-PutAPI",
	desc : "API功能描述",
	type : 'PUT',
	url : '/v1/samples/:sampleId',
	request : {
		userName : "张三",
		userPass : "123456"
	},
	res : {
		ok : {
			ret : 1,
			result : {
				userId : "123"
			}
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};