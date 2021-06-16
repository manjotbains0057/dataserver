<?php

/**
 * Copyright (c) 2020
 *
 * This file contains all of the necessary functionality for deleting a user in the database
 *
 * @author: Xingze Wang <wangxingze31@gmail.com>
 *
 * Last modified  : 06/2020
 */

if (!empty($_GET)) {

    $id = $_GET['username'];

    try {
        require 'databaseConnect.php';

        //delete query
        $sql = "DELETE FROM users where username='{$id}';";

        $conn = newconn();

        $result = mysqli_query($conn, $sql);

        if ($result) { //successfull delete
            echo "<script>alert('delete successful！');window.location.replace('./user.php');</script>";
        } else { //unsuccessfull delete
            echo "<script>alert('delete failed！');window.location.replace('./user.php');</script>";
        }
    } catch (Exception $e) {
        echo "error:" . $e->getMessage();
    }
} else { //error
    echo "<script>alert(plz select the data u wanna delete！');window.location.replace('./user.php');</script>";
}
