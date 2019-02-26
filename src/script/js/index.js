define(['config'], function() {
	require(['jquery'], function() {
		  //二级导航
		    //轮播图
		    var $main=$('#main');
			var $box=$('#box');
			var $btn=$('#box ol li');
			var $oLi=$('#box ul li');
			var timer=null;
			var $num=0;
			var arr=['#ff0000','#fff','#92CDDC','#E5E9E7'];
			$box.hover(function(){
				clearInterval(timer);
			},function(){
			      timer=setInterval(function(){
			 	$num++;
				if($num>$btn.length-1){
					$num=0;
				}
				fn();
			 },3000)
			})
			
			
			$btn.on('click',function(){
				$num=$(this).index();
				fn();	
			})
			
			 timer=setInterval(function(){
			 	$num++;
				if($num>$btn.length-1){
					$num=0;
				}
				fn();
			 },3000)
			 
			 
			function fn(){
				$btn.eq($num).addClass('active').siblings('li').removeClass('active');
				$oLi.eq($num).animate({'opacity':1}).siblings('li').animate({'opacity':0});
				$main.css({background:arr[$num]});
			}
			
		//倒计时
		var $bg1=$('.section1-top .bg1');
		var $bg2=$('.section1-top .bg2');
		var $bg3=$('.section1-top .bg3');	
	  	function double(n){
			return n<10?'0'+n:n;
		}
		function timesec(){
			var futureTime=new Date('2019-3-15 16:00:00');
			var nowTime=new Date();
			var sec=parseInt((futureTime-nowTime)/1000);
			var sec=sec%60;
			return double(sec);
		}
		function timemin(){
			var futureTime=new Date('2020-3-15 16:00:00');
			var nowTime=new Date();
			var sec=parseInt((futureTime-nowTime)/1000);
			var min=parseInt(sec%3600/60);
			return double(min);
		}
		function timehour(){
			var futureTime=new Date('2020-3-15 16:00:00');
			var nowTime=new Date();
			var sec=parseInt((futureTime-nowTime)/1000);
			var hour=parseInt(sec%86400/3600);
			return double(hour);
		}
		 setInterval(function(){
		 	 $bg1.html(timehour());
		 	 $bg2.html(timemin());
		     $bg3.html(timesec());
		},1000);
		
			
			//1F-10F的tab切换
			var $btn1=$('.floor_1-top ul li a');
			var $item1=$('.floor_1-bottom-right .item');
			$btn1.on('mouseover',function(){
			 $(this).addClass('active1').parent().siblings('.floor_1-top ul li').children().removeClass('active1');
			 $item1.eq($(this).parent().index()).addClass('show').siblings().removeClass('show');
			})
			
			var $btn2=$('.floor_2-top ul li a');
			var $item2=$('.floor_2-bottom-right .item');
			$btn2.on('mouseover',function(){
			 $(this).addClass('active2').parent().siblings('.floor_2-top ul li').children().removeClass('active2');
			 $item2.eq($(this).parent().index()).addClass('show').siblings().removeClass('show');
			});
			
			
	     var $btn=$('.r_barleft .dl');
	      $btn.on('click',function(){
	      		that.scrollTop('0');
	      });
	      

	$.ajax({
		url:'http://10.31.162.190/HTML5-1810/projectname/php/index.php',
		dataType:'json',
	}).done(function(data){
		console.log(data);
		var $html='<ul>';
		$.each(data,function(index,value){
			$html+=
			`<li><p><a href="http://10.31.162.190/HTML5-1810/projectname/src/details.html?sid=${value.sid}"><img class="lazy" src="${value.url}" alt=""/></a></p>
		 	     <p><a href="#" class="title">${value.title}</a></p>
		 	     <p class="price"><i>¥</i>${value.price}</p></li>`;
		});
		$html+='</ul>';
		$('.section1-bottom-right').html($html);
 });	      
	      
	      
	      //懒加载
	      require(['jqlazy'], function() {
	      	$(function() {
				$("img.lazy").lazyload({
					effect: "fadeIn"
				});
			});
	      });
	

	});
});