define(['config'], function() {
	require(['jquery','jqcookie'], function() {
		var $use=$('#username');
		var $pass=$('#password');
		var $dl=$('#delu');
		$dl.on('click',function(){
			$.ajax({
				type:'post',
				url:'http://10.31.162.190/HTML5-1810/projectname/php/login.php',
			    data:{
			    	username:$use.val(),
			    	password:$pass.val()
			    }
			}).done(function(data){
				if(!data){
						$pass.val('');
						}else{
							$.cookie('name',$use.val(),{expires:30,path:'/'});
							location.href="http://10.31.162.190/HTML5-1810/projectname/src/index.html";
                      }
			})
		})
		
		
		
		
	})
})