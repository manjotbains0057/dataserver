<?php

/**
 * Copyright (c) 2020
 *
 * This file contains all of the necessary functionality for changing user details in the database
 *
 * @author: Ryan Draper <ryandraper26@outlook.com>
 *
 * Last modified  : 06/2020
 */

 /**
  * Checks if a username already exists in the database
  * returns number of username matches
  */
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

/**
 * updates username and password in the database
 * returns boolean
 */
function updateUser($o, $u, $p)
{
    require_once "./databaseConnect.php";

    $conn = newconn();

    //update query
    $sql = "UPDATE users SET username = '$u', password = '$p' WHERE username = '$o'";

    if (mysqli_query($conn, $sql)) {
        return true;
    } else {
        return false;
    }
}

//get json data
$js = file_get_contents('php://input');

//decode json
$data = json_decode($js, true);

//get new username and password and old username
$oldUsername = $data['oldUsername'];
$username = $data['username'];
$password = $data['password'];

$count = checkUser($username);
if ($count == 0) { //if new username is not taken
    if (updateUser($oldUsername, $username, $password)) { //if successfull query
        echo 'success';
    } else { //if error
        echo 'error';
    }
} else { //if username taken
    echo 'usertaken';
}
