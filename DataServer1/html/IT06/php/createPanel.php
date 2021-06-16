<?php

/**
 * Copyright (c) 2020
 *
 * This file contains all of the necessary functionality for adding new panel in database
 *
 * @author: Ryan Draper <ryandraper26@outlook.com>
 * @author: Stanley Ser <stanleyfluke@gmail.com>
 *
 * Last modified  : 06/2020
 */

 //get data
$json = file_get_contents("php://input");

//decode data
$data = json_decode($json, true);

$username = $data['username'];
$panelname = $data['panelname'];
$streams = $data['streams'];

require_once "./databaseConnect.php";

//check if panelname exists for user
$conn = newconn();
$sql = "SELECT count(*) as num FROM panels NATURAL JOIN userPanels WHERE panel_name = '$panelname' AND username = '$username';";
$res = mysqli_query($conn, $sql);
if (!$res) {
    echo "An error occured. Panel not added!";
    exit();
} else {
    $row = mysqli_fetch_assoc($res);
    $count = $row['num'];

    if ($count > 0) {
        echo "Panel not added! Panel name already exists";
        exit();
    }
}
mysqli_close($conn);

//insert panel
$conn = newconn();
$sql = "INSERT INTO panels (panel_name, owner) VALUES ('$panelname', '$username');";
if (!mysqli_query($conn, $sql)) {
    echo "An error occured. Panel not added!";
    exit();
}
//get the id of inserted panel
$last_id = mysqli_insert_id($conn);
mysqli_close($conn);

//insert userPanels
$conn = newconn();
$sql = "INSERT INTO userPanels (panel_id, username) VALUES ('$last_id', '$username');";
if (!mysqli_query($conn, $sql)) {
    echo "Panel not added! An error occured.";
    exit();
}
mysqli_close($conn);

//for each object in streams array
foreach ($streams as $val) {
    $dn = $val['dataname'];
    $dt = $val['datatype'];

    if (isset($val['function'])) { //numeric
        $function = $val['function'];

        if ($function == 'sin') { //sin stream
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
                echo "Sin stream not added! An error occured";
                exit();
            }
            mysqli_close($conn);
        } elseif ($function == 'sinCombo') { //sinCombo stream
            $e = $val['e']; //first function paramter values
            $f= $val['f'];
            $g = $val['g'];
            $h = $val['h'];
            $j = $val['j'];
            $k = $val['k'];
            $l = $val['l'];
            $m = $val['m']; 
            $n = $val['n'];
            $o = $val['o'];
            $second_nominal_min = $val['second_nominal_min'];
            $second_nominal_max = $val['second_nominal_max'];
            $conn = newconn();
            $sql = "INSERT INTO sinComboPanels (panel_id, dataname, datatype, e, f, g, h, j,
                    k, l, m, n, o, second_nominal_min, second_nominal_max) 
                    VALUES ('$last_id', '$dn', '$dt', '$e', '$f', '$g', '$h', '$j',
                            '$k', '$l', '$m', '$n', '$o', '$second_nominal_min', '$second_nominal_max');";
            if (!mysqli_query($conn, $sql)) {
                echo "combo sin stream not added! An error occured";
                exit();
            }
            mysqli_close($conn);
        } else { //random stream
            $min = $val['min'];
            $max = $val['max'];
            $nominal_min = $val['nominal_min'];
            $nominal_max = $val['nominal_max'];

            //insert random panel
            $conn = newconn();
            $sql = "INSERT INTO randomPanels (panel_id, dataname, datatype, min, max, nominal_min, nominal_max) 
                                VALUES ('$last_id', '$dn', '$dt', '$min', '$max', '$nominal_min', '$nominal_max');";
            if (!mysqli_query($conn, $sql)) {
                echo "Random stream not added! An error occured";
                exit();
            }
            mysqli_close($conn);
        }
    } else if (isset($val['value'])) { //text stream
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
    } else { //file stream
        $directory = $val['directory'];
        $filename = $val['filename'];

        if ($dt == 'string') { //text file stream
            //insert textFile panel
            $conn = newconn();
            $sql = "INSERT INTO textFilePanels (panel_id, dataname, datatype, directory, filename) 
                        VALUES ('$last_id', '$dn', '$dt', '$directory', '$filename');";
            if (!mysqli_query($conn, $sql)) {
                echo "Text file stream not added! An error occured";
                exit();
            }
            mysqli_close($conn);
        } else if ($dt == 'float') { //numeric file stream
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
}
echo 'panel created successfully';
