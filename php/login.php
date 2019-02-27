<?php
	require "conn.php";
   if(isset($_POST['username']) && isset($_POST['password'])){
		$username=$_POST['username'];
		$pass=sha1($_POST['password']);
		$query="select * from zhuce where username='$username' and password='$pass'";
		$result=mysql_query($query);
		if(mysql_fetch_array($result,MYSQL_ASSOC)){
			echo true;
		}else{
			echo false;
		}
	}
	
//	if(isset($_POST['submit']) && $_POST['submit']=="登录"){
//		header('location:http://10.31.162.190/HTML5-1810/projectname/src/index.html');
//	}
?>