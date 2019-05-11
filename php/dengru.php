<?php
   header("Content-type:text/html;charset=utf8");
   mysql_connect('127.0.0.1','root','root');
   mysql_query('use sz1902');
   	$iphone = $_POST['iphone'];
	$password = $_POST['password'];
   	$sql="select * from article where iphone = '$iphone' and password='$password' ";
	$result= mysql_query($sql);
	$num = mysql_affected_rows();
if($num ==1 ){
  $res = ['code'=>'200','message'=>'添加成功'];
}else{
  $res = ['code'=>'-1','message'=>'添加失败'];
}
echo json_encode($res);
 
?>