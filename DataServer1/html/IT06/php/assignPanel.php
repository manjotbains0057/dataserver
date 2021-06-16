<?php
/**
 * Copyright (c) 2020
 *
 * This file contains all of the necessary functionality for assigning existing panels to users in the database
 *
 * @author: Ryan Draper <ryandraper26@outlook.com>
 * @author: Xingze Wang <wangxingze31@gmail.com>
 *
 * Last modified  : 06/2020
 */

 //get data
$data = json_decode(file_get_contents('php://input'),true);

if(!empty($data)){
    require_once "./databaseConnect.php";

    $conn = newconn();

    $name = $data['name'];
    $pid = $data['pid'];

    //select query
    $sql = "INSERT INTO userPanels(panel_id,username) VALUES('$pid','$name');";

    $result = mysqli_query($conn, $sql);

    //get query result and create json object
    $arr = (Object)array();
    if($result){ //if successfull
        $arr->message = 'successfully assigned to '.$name;
    }
    else{ //if error
        $arr->message = 'An error occured. Panel not assigned to '.$name;
    }
    echo json_encode($arr, JSON_PRETTY_PRINT).PHP_EOL;
}
else{ //if required data not defined
    $arr = (Object)array();
    $arr->message = 'An error occured. Panel not assigned';
    echo json_encode($arr, JSON_PRETTY_PRINT).PHP_EOL;
}