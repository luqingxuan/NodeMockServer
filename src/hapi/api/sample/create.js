module.exports = {
	title : "示例-PostAPI",
	desc : "API功能描述",
	type : 'POST',
	url : '/v1/sample',
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