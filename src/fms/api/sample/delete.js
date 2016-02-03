module.exports = {
	title : "示例-DeleteAPI",
	desc : "API功能描述",
	type : 'delete',
	url : '/v1/samples/:sampleId',
	request : {
		sampleId : '123'
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