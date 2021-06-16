<?php

/**
 * Copyright (c) 2020
 *
 * This file contains all of the necessary functionality for adding new users to the database
 *
 * @author: Ryan Draper <ryandraper26@outlook.com>
 * @author: Xingze Wang <wangxingze31@gmail.com>
 *
 * Last modified  : 06/2020
 */

//get data
$data = json_decode(file_get_contents('php://input'), true);

if (!empty($data)) { //if required data defined
    require_once "./databaseConnect.php";

    $conn = newconn();

    //User name password permission
    $name = $data['uname'];
    $pwd = $data['upwd'];
    $role = $data['rid'];

    //select query
    $sql = "INSERT INTO users(username,password,role) VALUES('{$name}','{$pwd}','{$role}');";

    $result = mysqli_query($conn, $sql);

    //get query response and save as json object
    $arr = (object)array();
    if ($result) { //if successful
        $arr->message = 'successfully added';
    } else { //if error
        $arr->message = 'An error occured. User not added';
    }
    echo json_encode($arr, JSON_PRETTY_PRINT) . PHP_EOL;
} else { //if required data not defined
    $arr = (object)array();
    $arr->message = 'An error occured. User not added';
    echo json_encode($arr, JSON_PRETTY_PRINT) . PHP_EOL;
}
