module.exports = {
	title : "示例-GetAPI",
	desc : "API功能描述",
	type : 'GET',
	url : '/v1/sample/:sampleId',
	request : {
		sampleId : '123'
	},
	res : {
		ok : {
			ret : 1,
			result : {
				userId : "123",
				userName : "张三",
				userPass : "123456"
			}
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};