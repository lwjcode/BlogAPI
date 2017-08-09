var Schema = require('mongoose').Schema;

var userSchema = new Schema({
	name: String,
	password: String,
	icon: String,
	sex: String,
	tel: String,
	qq: String,
	weixin: String,
	weibo: String,
	email: String,
	code: String,  //激活码，格式自己定义
	date: Number, //过期日期，过期后不能激活
	islive: Boolean //判断是否激活
});

module.exports = userSchema;