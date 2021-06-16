<?php

/**
 * Copyright (c) 2020
 *
 * This file contains all of the necessary functionality for adding streams to the database
 *
 * @author Ryan Draper <ryandraper26@outlook.com>
 *
 * Last modified  : 06/2020
 */

//get data
$json = file_get_contents("php://input");

//decode data
$data = json_decode($json, true);

$username = $data['username'];
$panelname = $data['panelname'];
$last_id = $data['panel_id'];
$streams = $data['streams'];

require_once "./databaseConnect.php";

if (isset($username) && isset($panelname) && isset($last_id) && isset($streams)) {
    $count = 0;

    //for each object in streams array
    foreach ($streams as $val) {
        $dn = $val['dataname'];
        $dt = $val['datatype'];

        //check for text streams
        $conn = newconn();
        $sql = "SELECT * FROM textPanels WHERE panel_id = '$last_id' AND dataname = '$dn'";
        $res = mysqli_query($conn, $sql);
        if ($res) {
            $count += mysqli_num_rows($res);
        }
        mysqli_close($conn);

        //check for sin streams
        $conn = newconn();
        $sql = "SELECT * FROM sinPanels WHERE panel_id = '$last_id' AND dataname = '$dn'";
        $res = mysqli_query($conn, $sql);
        if ($res) {
            $count += mysqli_num_rows($res);
        }
        mysqli_close($conn);

        //check for sinCombo streams
        $conn = newconn();
        $sql = "SELECT * FROM sinComboPanels WHERE panel_id = '$last_id' AND dataname = '$dn'";
        $res = mysqli_query($conn, $sql);
        if ($res) {
            $count += mysqli_num_rows($res);
        }
        mysqli_close($conn);

        //check for random streams
        $conn = newconn();
        $sql = "SELECT * FROM randomPanels WHERE panel_id = '$last_id' AND dataname = '$dn'";
        $res = mysqli_query($conn, $sql);
        if ($res) {
            $count += mysqli_num_rows($res);
        }
        mysqli_close($conn);

        //check for text file streams
        $conn = newconn();
        $sql = "SELECT * FROM textFilePanels WHERE panel_id = '$last_id' AND dataname = '$dn'";
        $res = mysqli_query($conn, $sql);
        if ($res) {
            $count += mysqli_num_rows($res);
        }
        mysqli_close($conn);

        //check for numeric file streams
        $conn = newconn();
        $sql = "SELECT * FROM numericCSVPanels WHERE panel_id = '$last_id' AND dataname = '$dn'";
        $res = mysqli_query($conn, $sql);
        if ($res) {
            $count += mysqli_num_rows($res);
        }
        mysqli_close($conn);

        //if there are streams
        if ($count == 0) {
            //if stream is numeric
            if (isset($val['function'])) {
                $function = $val['function'];

                //if sin stream
                if ($function == 'sin') {
                    $a = $val['a'];
                    $b = $val['b'];
                    $c = $val['c'];
                    $d = $val['d'];
                    $i = $val['i'];
                    $nominal_min = $val['nominal_min'];
                    $nominal_max = $val['nominal_max'];

                    //insert sin panel
                    $conn = newconn();
                    $sql = "INSERT INTO sinPanels (panel_id, dataname, datatype, a, b, c, d, i, nominal_min, nominal_max) 
                                VALUES ('$last_id', '$dn', '$dt', '$a', '$b', '$c', '$d', '$i', '$nominal_min', '$nominal_max');";
                    if (!mysqli_query($conn, $sql)) {
                        echo "Stream not added! Duplicate datatnames not allowed";
                        exit();
                    }
                    mysqli_close($conn);
                } else if ($function == 'sinCombo') { //if sinCombo stream
                    $e =  $val['e'];
                    $f =  $val['f'];
                    $g =  $val['g'];
                    $h =  $val['h'];
                    $j =  $val['j'];
                    $k =  $val['k'];
                    $l =  $val['l'];
                    $m =  $val['m'];
                    $n =  $val['n'];
                    $o =  $val['o'];
                    $nomMin = $val['second_nominal_min'];
                    $nomMax = $val['second_nominal_max'];

                    //insert sin panel
                    $conn = newconn();
                    $sql = "INSERT INTO sinComboPanels (panel_id, dataname, datatype, e, f, g, h, j,
                        k, l, m, n, o, second_nominal_min, second_nominal_max) 
                        VALUES ('$last_id', '$dn', '$dt', '$e', '$f', '$g', '$h', '$j',
                                '$k', '$l', '$m', '$n', '$o', '$nomMin', '$nomMax');";
                    if (!mysqli_query($conn, $sql)) {
                        echo "Stream not added! Duplicate datatnames not allowed";
                        exit();
                    }
                    mysqli_close($conn);
                } else { //if random stream
                    $min = $val['min'];
                    $max = $val['max'];
                    $nominal_min = $val['nominal_min'];
                    $nominal_max = $val['nominal_max'];

                    //insert random panel
                    $conn = newconn();
                    $sql = "INSERT INTO randomPanels (panel_id, dataname, datatype, min, max, nominal_min, nominal_max) 
                                            VALUES ('$last_id', '$dn', '$dt', '$min', '$max', '$nominal_min', '$nominal_max');";
                    if (!mysqli_query($conn, $sql)) {
                        echo "Stream not added! Duplicate datatnames not allowed";
                        exit();
                    }
                    mysqli_close($conn);
                }
            } else if (isset($val['value'])) { //if text stream
                $value = $val['value'];

                //insert text panel
                $conn = newconn();
                $sql = "INSERT INTO textPanels (panel_id, dataname, datatype, value) 
                            VALUES ('$last_id', '$dn', '$dt', '$value');";
                if (!mysqli_query($conn, $sql)) {
                    echo "Text stream not added! An error occured";
                    exit();
                }
                mysqli_close($conn);
            } else { //if file stream
                $directory = $val['directory'];
                $filename = $val['filename'];

                if ($dt == 'string') { //if text file stream
                    //insert textFile panel
                    $conn = newconn();
                    $sql = "INSERT INTO textFilePanels (panel_id, dataname, datatype, directory, filename) 
                                    VALUES ('$last_id', '$dn', '$dt', '$directory', '$filename');";
                    if (!mysqli_query($conn, $sql)) {
                        echo "Text file stream not added! An error occured";
                        exit();
                    }
                    mysqli_close($conn);
                } else if ($dt == 'float') { //if numeric file stream
                    //insert numericCSVPanels
                    $conn = newconn();
                    $sql = "INSERT INTO numericCSVPanels (panel_id, dataname, datatype, directory, filename) 
                                                VALUES ('$last_id', '$dn', '$dt', '$directory', '$filename');";
                    if (!mysqli_query($conn, $sql)) {
                        echo "Text file stream not added! An error occured";
                        exit();
                    }
                    mysqli_close($conn);
                }
            }
            echo 'stream added successfully';
        } else { //if error
            echo 'Stream not added! An error occured';
        }
    }
} else { //if required data not defined
    echo 'missing data';
}
