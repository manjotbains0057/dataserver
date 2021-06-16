<?php

/**
 * Copyright (c) 2020
 *
 * This file contains all of the necessary functionality for retrieving panel information from database
 *
 * @author: Ryan Draper <ryandraper26@outlook.com>
 *
 * Last modified  : 06/2020
 */

require_once "./databaseConnect.php";

//get data and decode
$json = file_get_contents("php://input");
$dataIn = json_decode($json, true);

$username = $dataIn['username'];
$row = $dataIn['role'];

$conn = newconn();

//select query
$sql = "SELECT * FROM users Where username = '$username'";

$res = mysqli_query($conn, $sql);

if ($res) { //if valid query
    while ($row = mysqli_fetch_assoc($res)) {
        //if super admin
        if ($row['role'] == 1) {
            //select query
            //all panels
            $dataSql = "SELECT * FROM panels;";
            $dataList = mysqli_query($conn, $dataSql);
            $data = mysqli_fetch_all($dataList, MYSQLI_ASSOC);

            $json = [];
            foreach ($data as $v) {
                $arr = (object)array();
                $arr->panel_id = $v['panel_id'];
                $arr->panel_name = $v['panel_name'];
                array_push($json, $arr);
            }
        } else {
            //select query
            //only panels for user
            $dataSql = "SELECT * FROM panels WHERE owner = '$username';";
            $dataList = mysqli_query($conn, $dataSql);
            $data = mysqli_fetch_all($dataList, MYSQLI_ASSOC);

            //create object containing panel info
            $json = [];
            foreach ($data as $v) {
                $arr = (object)array();
                $arr->panel_id = $v['panel_id'];
                $arr->panel_name = $v['panel_name'];
                array_push($json, $arr);
            }
        }
    }
    $finalJson = json_encode($json, JSON_PRETTY_PRINT) . PHP_EOL;
    echo $finalJson;
}
