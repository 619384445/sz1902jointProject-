<?php 
//后台接口文件，可以实现前端调用接口，实现数据的增删改查
mysql_connect('127.0.0.1','root','root');
mysql_query('use sz1902');
//1.接受post参数
$phone = $_POST['phone'];
$password = $_POST['repassword'];
//2.编写sql语句入库
   $sql="select * from article where iphone = '$phone' ";
	 $result= mysql_query($sql);
	 $num = mysql_affected_rows();
if($num>0){
	$response = ['code'=>'-1','message'=>'添加失败'];
}else{
		$sql = "insert into article(iphone,password) values('$phone','$password')";
		mysql_query($sql);
		$response = ['code'=>'200','message'=>'添加成功'];
}
echo json_encode($response);

?>