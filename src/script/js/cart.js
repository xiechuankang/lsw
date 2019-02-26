define(['config'],function(){
	require(['jquery','jqcookie'],function(){
		function goodslist(id,count){
			$.ajax({
				url:"http://10.31.162.190/HTML5-1810/projectname/php/index.php",
				dataType:'json'
			}).done(function(data){
				console.log(data);
				$.each(data,function(index,value){
					if(id==value.sid){
						var $clonebox=$('.goods:hidden').clone(true,true);
						$clonebox.find('.goods_2').find('img').attr('src',value.url);
						$clonebox.find('.goods_2').find('img').attr('sid',value.sid);
						$clonebox.find('.goods_3').find('a').html(value.title);
						$clonebox.find('.goods_4').find('span').html(value.price);
						$clonebox.find('.goods_5').find('.input').find('input').val(count);
						$clonebox.find('.goods_6').find('span').html((value.price*count).toFixed(2));
						$clonebox.css('display','block');
						$('.content-main').append($clonebox);
						priceall();
					}
				});
			})
		}
		if($.cookie('cookiesid') && $.cookie('cookienum')){
		var s=$.cookie('cookiesid').split(',');//数组sid
		var n=$.cookie('cookienum').split(',');//数组num
		$.each(s,function(i,value){
			goodslist(s[i],n[i]);
		});
	   }
		
		function priceall(){
		var $sum=0;
		var $count=0;
		$('.goods:visible').each(function(index,element){
		  if($(element).find('.cart-checkbox input').prop('checked')){
		  	$sum+=parseInt($(element).find('.goods_5').find('.input').find('input').val());
			$count+=parseFloat($(element).find('.goods_6').find('span').html());
		  }
		});
		$('.sl').html($sum);
		$('.sum-price').html('￥'+$count.toFixed(2));
	}
		
		//全选
		$('.allclear').on('change',function(){
		$('.goods:visible').find(':checkbox').prop('checked',$(this).prop('checked'));
		$('.allclear').prop('checked',$(this).prop('checked'));
		priceall();//取消选项，重算总和。
	});
	
	var $inputs=$('.goods:visible').find(':checkbox');
	$('.content-main').on('change',$inputs,function(){//事件的委托的this指向被委托的元素
		if($('.goods:visible').find('input:checkbox').length==$('.goods:visible').find('input:checked').size()){
			$('.allclear').prop('checked',true);
		}else{
			$('.allclear').prop('checked',false);
		}
		priceall();//取消选项，重算总和。
	});
	  
		//数量+++
	   $('.add').on('click',function(){
	   	var $count=$(this).parents('.goods').find('.goods_5').find('.input').find('input').val();
	   	$count++;
	   	if($count>100){
	   		$count=100;
	   	}
	   	$(this).parents('.goods').find('.goods_5').find('.input').find('input').val($count);
	   	$(this).parents('.goods').find('.goods_6').find('span').html(singlegoodsprice($(this)));//改变后的价格
	    priceall();//重新计算总和。
	    setcookie($(this));
	   })
		//数量----
		$('.reduce').on('click',function(){
			var $count=$(this).parents('.goods').find('.goods_5').find('.input').find('input').val();
			$count--;
			if($count<=1){
				$count=1;
			}
			$(this).parents('.goods').find('.goods_5').find('.input').find('input').val($count);
			$(this).parents('.goods').find('.goods_6').find('span').html(singlegoodsprice($(this)));//改变后的价格
	        priceall();//重新计算总和。
	        setcookie($(this));
		})
		//输入改变数量
		$('.goods_5').find('.input').find('input').on('input', function() {
	    var $reg = /^\d+$/g; //只能输入数字
	    var $value = parseInt($(this).val());
	    if ($reg.test($value)) {//是数字
	        if ($value >=100) {//限定范围
	            $(this).val(100);
	        } else if ($value <= 0) {
	            $(this).val(1);
	        } else {
	            $(this).val($value);
	        }
	    } else {//不是数字
	        $(this).val(1);
	    }
	    $(this).parents('.goods').find('.goods_6').find('span').html(singlegoodsprice($(this)));//改变后的价格
	    priceall();
	    setcookie($(this));
	});
	
		
		//计算数量改变后单个商品的价格
		function singlegoodsprice(obj) { //obj:当前元素
	    var $dj = parseFloat(obj.parents('.goods').find('.goods_4').find('span').html());//单价
	    var $cnum = parseInt(obj.parents('.goods').find('.goods_5').find('.input').find('input').val());//数量
	    return ($dj * $cnum).toFixed(2);//结果
	}
		
		//将改变后的数量的值存放到cookie
	//点击按钮将商品的数量和id存放cookie中
		var arrsid=[];
		var arrnum=[];
		function cookiearray(){
			if($.cookie('cookiesid') && $.cookie('cookienum')){
				arrsid=$.cookie('cookiesid').split(',');
				arrnum=$.cookie('cookienum').split(',');
			}
		}
		function setcookie(obj) { //obj:当前操作的对象
		cookiearray();//得到数组
	    var $index = obj.parents('.goods').find('img').attr('sid');//通过id找数量的位置
	    arrnum[$.inArray($index,arrsid)] = obj.parents('.goods').find('.goods_5').find('.input').find('input').val();
	    $.cookie('cookienum', arrnum.toString(), 30);
	}
		//删除cookie
		function delgoods(sid,arrsid){
			var $index=-1;
			$.each(arrsid,function(index,value){
				if(sid==value){
					$index=index;
				}
			});
			arrsid.splice($index,1);
			arrnum.splice($index,1);
			$.cookie('cookiesid',arrsid.toString(),{expires:30});
			$.cookie('cookienum',arrnum.toString(),{expires:30});
		}
		
		//删除商品
		$('.content-main').on('click','.del',function(ev){
			cookiearray();
		    $(this).first().parents('.goods').remove();
		    delgoods($(this).first().parents('.goods').find('img').attr('sid'), arrsid);
		    priceall();
		});
		
		//全删
		$('.empty span').on('click',function(){
			cookiearray();
			$('.goods:visible').each(function(){
				if($(this).find('input:checkbox').is(':checked')){
					$(this).remove();
					delgoods($(this).find('img').attr('sid'),arrsid);
				}
			});
			priceall();
		});
	})
})
