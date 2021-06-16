<?php

/**
 * Copyright (c) 2020
 *
 * This file contains all of the necessary functionality for updating stream values in the database
 *
 * @author: Ryan Draper <ryandraper26@outlook.com>
 *
 * Last modified  : 06/2020
 */

require_once "./databaseConnect.php";

//get data and decode
$json = file_get_contents("php://input");
$data = json_decode($json, true);

$panel_id = $data['panel_id'];
$oldDataname = $data['oldDataname'];
$dataname = $data['dataname'];
$datatype = $data['datatype'];

if (isset($data['value'])) { //update text streams
    $value = $data['value'];
    $conn = newconn();

    $sql = "UPDATE textPanels SET dataname = '$dataname', datatype = '$datatype', value = '$value' WHERE panel_id = '$panel_id' AND dataname = '$oldDataname'";

    $res = mysqli_query($conn, $sql);
    if ($res) {
        echo 'updated';
    } else {
        echo 'error - not updated';
    }
    mysqli_close($conn);
} else if (isset($data['a'])) { //update sin streams
    $a =  $data['a'];
    $b =  $data['b'];
    $c =  $data['c'];
    $d =  $data['d'];
    $i =  $data['i'];
    $nomMin = $data['nominal_min'];
    $nomMax = $data['nominal_max'];

    $conn = newconn();

    $sql = "UPDATE sinComboPanels SET dataname = '$dataname', datatype = '$datatype', a = '$a', b = '$b', c = '$c', d = '$d', i = '$i', nominal_min = '$nomMin', nominal_max = '$nomMax' WHERE panel_id = '$panel_id' AND dataname = '$oldDataname'";

    $res = mysqli_query($conn, $sql);
    if ($res) {
        echo 'updated';
    } else {
        echo 'error - not updated';
    }
    mysqli_close($conn);
}
else if (isset($data['e'])) { //update sinCombo streams
    $e = $data['e'];
    $f =  $data['f'];
    $g =  $data['g'];
    $h =  $data['h'];
    $j =  $data['j'];
    $k =  $data['k'];
    $l =  $data['l'];
    $m =  $data['m'];
    $n =  $data['n'];
    $o =  $data['o'];
    $nomMin = $data['second_nominal_min'];
    $nomMax = $data['second_nominal_max'];

    $conn = newconn();

    $sql = "UPDATE sinPanels SET dataname = '$dataname', datatype = '$datatype', e = '$e', f = '$f', g = '$g', h = '$h', j = '$j', k = '$k', l = '$l', m = '$m', n = '$n', o = '$o', second_nominal_min = '$nomMin', second_nominal_max = '$nomMax' WHERE panel_id = '$panel_id' AND dataname = '$oldDataname'";

    $res = mysqli_query($conn, $sql);
    if ($res) {
        echo 'updated';
    } else {
        echo 'error - not updated';
    }
    mysqli_close($conn);
} else if (isset($data['min'])) { //update random streams
    $min = $data['min'];
    $max =  $data['max'];
    $nomMin = $data['nominal_min'];
    $nomMax = $data['nominal_max'];

    $conn = newconn();

    $sql = "UPDATE randomPanels SET dataname = '$dataname', datatype = '$datatype', min = '$min', max = '$max', nominal_min = '$nomMin', nominal_max = '$nomMax' WHERE panel_id = '$panel_id' AND dataname = '$oldDataname'";

    $res = mysqli_query($conn, $sql);
    if ($res) {
        echo 'updated';
    } else {
        echo 'error - not updated';
    }
    mysqli_close($conn);
} else if (isset($data['filename'])) {
    $filename = $data['filename'];
    $conn = newconn();

    if ($datatype == 'string') { //update text file streams
        $sql = "UPDATE textFilePanels SET dataname = '$dataname', datatype = '$datatype', filename = '$filename' WHERE panel_id = '$panel_id' AND dataname = '$oldDataname'";

        $res = mysqli_query($conn, $sql);
    }

    if ($datatype == 'float') { //update numeric file streams
        $sql = "UPDATE numericCSVPanels SET dataname = '$dataname', datatype = '$datatype', filename = '$filename' WHERE panel_id = '$panel_id' AND dataname = '$oldDataname'";

        $res = mysqli_query($conn, $sql);
    }

    if ($res) {
        echo 'updated';
    } else {
        echo 'error - not updated';
    }
    mysqli_close($conn);
} else { //return error
    echo 'error - not updated';
}
