<?php
header('Access-Control-Allow-Origin:*');  //允许任意的域名访问
header('Access-Control-Allow-Method:POST,GET'); //允许请求方式是get和post
//1.连接数据库
include "conn.php";
$conn->query('SET NAMES UTF8');
//2.获取前端出入的sid
if(isset($_GET['sid'])){
    $sid = $_GET['sid'];
    //查询这条数据返回给前端。
    $result=$conn->query("select * from taobaogoods where sid = $sid");//获取一条数据。
    echo json_encode($result->fetch_assoc());
}
$conn->query('SET NAMES UTF8');
