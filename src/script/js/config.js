require.config({
	baseUrl:'https://cdnjs.cloudflare.com/',
	paths:{//引入模块的地址，文件不能添加扩展名
		'jquery':'ajax/libs/jquery/1.12.4/jquery',
		'jqcookie':'ajax/libs/jquery-cookie/1.4.1/jquery.cookie',
		'jqlazy':'ajax/libs/jquery.lazyload/1.9.1/jquery.lazyload.min'
	},
	shim:{//非AMD规范的JS文件,就需要使用Require中的shim.
		exports:'',//exports 表示输出的对象名
		dep:['jquery']//deps 为数组,表示其依赖的库,
	}
});