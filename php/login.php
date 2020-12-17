<?php
//1.连接数据库
include "conn.php";
header('Access-Control-Allow-Origin:*');  //允许任意的域名访问
header('Access-Control-Allow-Method:POST,GET'); //允许请求方式是get和post
if(isset($_POST['user']) && isset($_POST['pass'])){
    $user = $_POST['user'];
    $pass = sha1($_POST['pass']);//加密和加密进行匹配
    $result=$conn->query("select * from registry where username='$user' and password='$pass'");
    if($result->fetch_assoc()){
        echo true;//用户名和密码匹配成功
    }else{
        echo false;//用户名和密码匹配失败
    }
}