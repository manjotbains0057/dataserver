<?php
/**
 * Copyright (c) 2020
 *
 * This file contains all of the necessary functionality for removing a panel from a specific user
 *
 * @author: Ryan Draper <ryandraper26@outlook.com>
 * @author: Xingze Wang <wangxingze31@gmail.com>
 *
 * Last modified  : 06/2020
 */

 //get data and decode
$data = json_decode(file_get_contents('php://input'),true);

if(!empty($data)){
    require_once "./databaseConnect.php";

    $conn = newconn();

    $name = $data['name'];
    $pid = $data['pid'];

    //select query
    $sql = "DELETE FROM userPanels where panel_id = '$pid' and username = '$name'";

    $result = mysqli_query($conn, $sql);

    $arr = (Object)array();
    if($result){ //add success message to json object 
        $arr->message = 'successfully removed from '.$name;
    }
    else{ //add error message to json object
        $arr->message = 'An error occured. Panel not removed';
    }
    echo json_encode($arr, JSON_PRETTY_PRINT).PHP_EOL;
}
else{
    $arr = (Object)array(); //add unknown error message to object
    $arr->message = 'An error occured. Panel not removed';
    echo json_encode($arr, JSON_PRETTY_PRINT).PHP_EOL;
}