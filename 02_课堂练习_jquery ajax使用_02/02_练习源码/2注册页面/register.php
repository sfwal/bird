<?php 
header("Access-Control-Allow-Origin: *");

	echo "欢迎你的加入, " . $_POST["name"] . "!<br />";
	echo "已经发了一个确认邮件到你的邮箱： " . $_POST["email"];
?>