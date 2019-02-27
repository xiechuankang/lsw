define(['config'], function() {
	require(['jquery'], function() {
		//1.获取sid
	var $picid = location.search.substring(1).split('=')[1];
	console.log($picid);
	//2.将当前的id传给后端获取对应的数据
	$.ajax({
		url: 'http://10.31.162.190/HTML5-1810/projectname/php/details.php',
		data: {
			sid: $picid
		},
		dataType: 'json'
	}).done(function(data) {//data:后端返回的和id对应的数据
		console.log(data);
		$('#smallpic').attr('src', data.url);
		$('#bpic').attr('src', data.url);
		$('#smallpic').attr('sid', data.sid);
		$('.title').html(data.title);
		$('.price').html('￥'+data.price);
		var arr = data.urls.split(',');
		console.log(arr);
		var str = '';
		$.each(arr, function(index, value) {
			str += '<li><img src="' + value + '"/></li>';
		});
		$('.list-img ul').html(str);
	  });	
	  
	  //放大镜
		$('#sf').width($('.small-pic').width()*$('#bf').width()/$('#bpic').width());
		$('#sf').height($('.small-pic').height()*$('#bf').height()/$('#bpic').height());
		var bili = $('#bpic').width() / $('.small-pic').width();
		$('.small-pic').hover(function(){
			$('#sf').css('visibility','visible');
			$('#bf').css('visibility','visible');
			$(this).on('mousemove',function(ev){
				var $left=ev.pageX-$('#content').offset().left-$('#sf').width()/2;
				var $top=ev.pageY-$('#content').offset().top-$('#sf').height()/2;
				if($left<0){
					$left=0;
				}else if($left>=$('.small-pic').width()-$('#sf').width()){
					$left=$('.small-pic').width()-$('#sf').width();
				}
				if($top<0){
					$top=0;
				}else if($top>=$('.small-pic').height()-$('#sf').height()){
					$top=$('.small-pic').height()-$('#sf').height();
				}
				$('#sf').css('left',$left);
				$('#sf').css('top',$top);
				$('#bpic').css('left',-$left*bili);
				$('#bpic').css('top',-$top*bili);
			});
		},function(){
			$('#sf').css('visibility','hidden');
			$('#bf').css('visibility','hidden');
		});
		
		//点击小图切换
		$('.list-img ul').on('click','li',function(){
			var $imgurl=$(this).find('img').attr('src');
			$('#smallpic').attr('src',$imgurl);
			$('#bpic').attr('src',$imgurl);
			});
			
        require(['jqcookie'],function(){
        	var arrsid=[];
        	var arrnum=[];
        	function cookiearray(){
        		if($.cookie('cookiesid') && $.cookie('cookienum')){
        			arrsid=$.cookie('cookiesid').split(',');
        			arrnum=$.cookie('cookienum').split(',');
        		}
        	};
        	$('.btn a').on('click',function(){
        		location.reload(true);
        		var $sid=$(this).parents('#content').find('#smallpic').attr('sid');
        		cookiearray();
        		if($.inArray($sid,arrsid)!=-1){
        			var num=parseInt(arrnum[$.inArray($sid,arrsid)])+parseInt($('#count').val());
        			arrnum[$.inArray($sid,arrsid)]=num;
        			$.cookie('cookienum',arrnum.toString(),{expires:30});
        		}else{
        			arrsid.push($sid);
        			$.cookie('cookiesid',arrsid.toString(),{expires:30});
        			arrnum.push($('#count').val());
        			$.cookie('cookienum',arrnum.toString(),{expires:30});
        		}
        	});
        })
	})
})
	