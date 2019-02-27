define(['config'], function() {
	require(['jquery','validate'], function() {
		$('input').on('focus',function(){
		     	$('input').prop('placeholder','');
		     })
			$('#form1').validate({
				 rules:{//验证规则
				 	username: {
				 		required:true,
				 		minlength:6,
				 		maxlength:11,
//				 		remote:{
//							type:'post',
//							url:'http://10.31.162.190/HTML5-1810/projectname/php/registor.php'
//						}
				 	},
				 	//远程地址只能输出 "true" 或 "false"，不能有其它输出
				 	password:{
				 		required:true,
				 		minlength:6,
				 		maxlength:18
				 	},
				 	confirm_password:{
				 		equalTo:'#password'
				 	},
				 	yzm1:{
				 		required:true,
				 		maxlength:4
				 	}
				 	
				 },
				 messages:{//报错信息
				 	username: {
				 		required:"该字段不能为空",
				 		minlength:"长度不能小于6",
				 		maxlength:"长度不能大于11",
				 		//remote:"用户名不存在"
				 	},
				 	password:{
				 		required:"该字段不能为空",
				 		minlength:"长度不能小于6",
				 		maxlength:"长度不能大于18"
				 	},
				 	confirm_password:{
				 		equalTo:'两次密码输入不一致'
				 	},
				 	yzm1:{
				 		required:"该字段不能为空",
				 		maxlength:"长度不能大于4",
				 	}
				 }
			});
		//点击切换验证码
		var $btnspan=$('.yzm span');
		$btnspan.on('click',function(){
			$('.yzm a').html('<img src="http://www.lingshi.com/captcha.php?1768430104"/>');
		})
	})
})