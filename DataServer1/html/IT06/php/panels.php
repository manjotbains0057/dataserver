<?php

/**
 * Copyright (c) 2020
 *
 * This file contains all of the necessary functionality for retrieving panel names for user
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

if (isset($data['username'])) {
    //get panels matching username
    $conn = newconn();
    $sql = "SELECT * FROM panels NATURAL JOIN userPanels WHERE username='$username'";

    $res = mysqli_query($conn, $sql);
    $rescount = mysqli_num_rows($res);

    $arr = array();
    if ($rescount != 0) {
        //create json object for panel info
        while ($row = mysqli_fetch_assoc($res)) {
            $obj = (object)array();
            $obj->owner = $row['owner'];
            $obj->panel_name = $row['panel_name'];
            $obj->panel_id = $row['panel_id'];
            array_push($arr, $obj);
        }

        $myObj = (object)array();
        $myObj->panels = $arr;

        $myJSON = json_encode($myObj, JSON_PRETTY_PRINT) . PHP_EOL;

        echo $myJSON; //return panel info
    } else { //if no panels for user
        $myObj = (object)array();
        $myObj->panels = 'No panels found';

        $myJSON = json_encode($myObj, JSON_PRETTY_PRINT) . PHP_EOL;

        echo $myJSON;
    }
} else { //if missing credentials
    echo 'username is required' . PHP_EOL;
}