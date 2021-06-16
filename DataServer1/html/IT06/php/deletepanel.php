<?php

/**
 * Copyright (c) 2020
 *
 * This file contains all of the necessary functionality for deleting panels in database
 *
 * @author: Ryan Draper <ryandraper26@outlook.com>
 *
 * Last modified  : 06/2020
 */

require_once "./databaseConnect.php";

//get data and decode
$json = file_get_contents("php://input");
$data = json_decode($json, true);


$username = $data['username'];
$id = $data['panelid'];

if(isset($data['username']) && isset($data['panelid'])){
    $conn = newconn();
    //check that data returns result before deleting
    $sql = "SELECT * FROM userPanels natural join panels natural join users WHERE username = username and username='$username' AND panel_id = '$id'";
    $count = 0;
    $res = mysqli_query($conn, $sql);
    if($res){
        while ($row = mysqli_fetch_assoc($res)) {
            if($username == $row['owner']){ //if owner of panel
                $count = mysqli_num_rows($res);
            }
            else if($row['role'] == 1){ //if not owner but admin role is higher than owner
                $count = mysqli_num_rows($res);
            }
            else {
                $count = -1;
            }
        }
    }
    mysqli_close($conn);

    if($count > 0){
        //delete from database
        $conn = newconn();
        $sql = "DELETE FROM panels WHERE panel_id = '$id'";
        $res = mysqli_query($conn, $sql);
        if($res){ //if successfull
            echo 'deleted'.PHP_EOL;
        }
        else{ //if error
            echo 'an error occured. Panel not deleted'.PHP_EOL;
        }
        mysqli_close($conn);
    }
    else if($count == -1){ //not authorised to delete
        echo 'You are not authorised to delete this panel'.PHP_EOL;
    }
    else{ //inavlid data
        echo 'invalid username/panelid'.PHP_EOL;
    }
}
else{ //invalid data
    echo 'invalid username/panelid'.PHP_EOL;
}