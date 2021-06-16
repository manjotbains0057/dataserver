<?php

/**
 * Copyright (c) 2020
 *
 * This file contains all of the necessary functionality for adding new user to database
 *
 * @author: Ryan Draper <ryandraper26@outlook.com>
 *
 * Last modified  : 06/2020
 */

 //check if username already exists
function checkUser($u)
{
    require_once "./databaseConnect.php";

    $conn = newconn();

    //select query
    $sql = "SELECT username FROM users WHERE username='$u'";
    $result = mysqli_query($conn, $sql);

    $count = mysqli_num_rows($result);

    return $count;
}

//add new user to database
function createUser($u, $p, $r)
{
    require_once "./databaseConnect.php";

    $conn = newconn();

    //insert query
    $sql = "INSERT INTO users (username, password, role) VALUES ('$u', '$p', '$r')";

    if (mysqli_query($conn, $sql)) {
        return true; //if successful
    } else {
        return false; //if error
    }
}

//get json data
$js = file_get_contents('php://input');

//decode json
$data = json_decode($js, true);

//get username and password and role
$username = $data['username'];
$password = $data['password'];
$role = $data['role'];

$count = checkUser($username);
if ($count == 0) { //if no username matches
    if (createUser($username, $password, $role)) {
        echo 'success';
    } else { //if error
        echo 'error';
    }
} else { //if username found
    echo 'usertaken';
}
