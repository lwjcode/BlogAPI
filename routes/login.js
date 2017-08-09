var User = require('../models/user');

exports.checkLogin = function (req, res){
	var username = req.body.username;
	var userpass = req.body.userpass;
	
	User.findOne({name: username}, function (err, user){
		if (user == null){
			User.findOne({email: username}, function (err, user){
				if (user == null || !user.islive){
						res.render('login', {
						title: '登录',
						error: '用户名不存在！'
					});
				}else{
					if (user.password != userpass){
						res.render('login', {
						title: '登录',
						error: '密码错误！'
					});
					}else{
						req.session.user = user;
						// res.redirect('/bloglist');
						res.send({'result': 'ok'});
					}
				}
			});
		}else{
			if (user.password != userpass){
				res.render('login', {
				title: '登录',
				error: '密码错误！'
			});
			}else{
				req.session.user = user;
				// res.redirect('/bloglist');
				res.send({'result': 'ok'});
			}
		}
	});
};

exports.checkCode = function (req, res){
	var username = req.query.name;
	var code = req.query.code;
	var outdate = req.query.outdate;
	User.findOne({name: username}, function (err, user){
		if (user.code === code && (user.date - Date.now()) > 0){
			User.update({name: username}, {islive: true}, function (err){
				if (err){
					res.render('login', {
						title: '登录',
						error: '验证失败！'
					});
				}else{
					res.render('login', {
						title: '登录',
						error: '验证成功请登录！'
					});
				}
			});
		}
	});
}