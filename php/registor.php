<?php
 require "conn.php";
 
 if(isset($_POST['username'])){
		$username=$_POST['username'];
		$query="select * from zhuce where username='$username'";
		$result=mysql_query($query);
		if(mysql_fetch_array($result)){
			echo 'false';//有重复
		}else{
			echo 'true';//没有重复
			
		}
	}
	
	if(isset($_POST['submit'])){
		$user=$_POST['username'];
		$pass=sha1($_POST['password']);
		$query="insert zhuce(username,password) values('$user','$pass')";
		mysql_query($query);
		header('location:http://10.31.162.190/HTML5-1810/projectname/src/login.html');
	}
?>