<?php

/**
 * Copyright (c) 2020
 *
 * This file contains all of the necessary functionality for changing a users role in the database
 *
 * @author: Ryan Draper <ryandraper26@outlook.com>
 * @author: Xingze Wang <wangxingze31@gmail.com>
 *
 * Last modified  : 06/2020
 */

 //get data and decode
$data = json_decode(file_get_contents('php://input'), true);

if (!empty($data)) {
    require_once "./databaseConnect.php";

    $conn = newconn();

    $name = $data['name'];
    $role = $data['role'];

    //select query
    $sql = "UPDATE users SET role='$role' WHERE username='$name';";

    $result = mysqli_query($conn, $sql);

    $arr = (object)array();
    if ($result) { //if success
        $arr->message = 'successfully changed role for ' . $name;
    } else { //if error
        $arr->message = 'An error occured. Role not changed';
    }
    echo json_encode($arr, JSON_PRETTY_PRINT) . PHP_EOL;
} else { //if missing data
    $arr = (object)array();
    $arr->message = 'An error occured. Role not changed';
    echo json_encode($arr, JSON_PRETTY_PRINT) . PHP_EOL;
}
