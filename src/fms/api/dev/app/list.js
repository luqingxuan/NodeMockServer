var faker = require('faker');

module.exports = {
	title : "查看所有APP",
	desc : "API功能描述",
	type : 'GET',
	url : '/v1/dev/apps',
	request : {

	},
	res : {
		ok : (function() {

			var results = [];

			for (var i = 0; i < 15; i++) {
				results
						.push({
							id : faker.phone.phoneNumber(),
							name : faker.name.firstName() + "-"
									+ faker.name.lastName(),
							sex : "0"
						});
			}

			return {
				ret : 1,
				result : results
			};

		})(),
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
