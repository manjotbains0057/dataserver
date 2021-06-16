<?php

/**
 * Copyright (c) 2020
 *
 * This file contains all of the necessary functionality for returning stream info from database for a panel
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
$panelname = $data['panelname'];

if (isset($data['username']) && isset($data['panelname'])) {
    $conn = newconn();

    //get text panels
    $sql = "SELECT * FROM textPanels natural join userPanels natural join panels where panel_name = '$panelname' AND username = '$username'";

    $res = mysqli_query($conn, $sql);
    $rescount = mysqli_num_rows($res);
    mysqli_close($conn);

    $conn = newconn();

    //get text file panels
    $sql = "SELECT * FROM textFilePanels natural join userPanels natural join panels where panel_name = '$panelname' AND username = '$username'";

    $res0 = mysqli_query($conn, $sql);
    $rescount0 = mysqli_num_rows($res0);
    mysqli_close($conn);

    $conn = newconn();

    //get sin panels
    $sql = "SELECT * FROM sinPanels natural join userPanels natural join panels where panel_name = '$panelname' AND username = '$username'";

    $res1 = mysqli_query($conn, $sql);
    $rescount1 = mysqli_num_rows($res1);
    mysqli_close($conn);

    $conn = newconn();

    //get sinCombo panels
    $sql = "SELECT * FROM sinComboPanels natural join userPanels natural join panels where panel_name = '$panelname' AND username = '$username'";
    $res4 = mysqli_query($conn, $sql);
    $rescount4 = mysqli_num_rows($res4);
    mysqli_close($conn);

    $conn = newconn();

    //get random panels
    $sql = "SELECT * FROM randomPanels natural join userPanels natural join panels where panel_name = '$panelname' AND username = '$username'";

    $res2 = mysqli_query($conn, $sql);
    $rescount2 = mysqli_num_rows($res2);
    mysqli_close($conn);

    $conn = newconn();

    //get numeric file panels
    $sql = "SELECT * FROM numericCSVPanels natural join userPanels natural join panels where panel_name = '$panelname' AND username = '$username'";

    $res3 = mysqli_query($conn, $sql);
    $rescount3 = mysqli_num_rows($res3);
    mysqli_close($conn);

    $arr = array();
    //return stream info for panel
    if ($rescount != 0 || $rescount0 != 0 || $rescount1 != 0 || $rescount2 != 0 || $rescount3 != 0 || $rescount4 != 0) {
        //text panels
        if ($rescount != 0) {
            while ($row = mysqli_fetch_assoc($res)) {
                $data = (object)array();
                $data->owner = $row['owner'];
                $data->panel_id = $row['panel_id'];
                $data->dataname = $row['dataname'];
                $data->datatype = $row['datatype'];
                $data->value = $row['value'];

                array_push($arr, $data);
            }
        }

        //text file panels
        if ($rescount0 != 0) {
            while ($row = mysqli_fetch_assoc($res0)) {
                $data = (object)array();
                $data->owner = $row['owner'];
                $data->panel_id = $row['panel_id'];
                $data->dataname = $row['dataname'];
                $data->datatype = $row['datatype'];
                $data->filename = $row['filename'];

                array_push($arr, $data);
            }
        }

        //sin panels
        if ($rescount1 != 0) {
            while ($row = mysqli_fetch_assoc($res1)) {
                $data = (object)array();
                $data->owner = $row['owner'];
                $data->panel_id = $row['panel_id'];
                $data->dataname = $row['dataname'];
                $data->datatype = $row['datatype'];
                $data->nominal_min = $row['nominal_min'];
                $data->nominal_max = $row['nominal_max'];
                $data->a = $row['a'];
                $data->b = $row['b'];
                $data->c = $row['c'];
                $data->d = $row['d'];
                $data->i = $row['i'];

                array_push($arr, $data);
            }
        }

        //random panels
        if ($rescount2 != 0) {
            while ($row = mysqli_fetch_assoc($res2)) {
                $data = (object)array();
                $data->owner = $row['owner'];
                $data->panel_id = $row['panel_id'];
                $data->dataname = $row['dataname'];
                $data->datatype = $row['datatype'];
                $data->nominal_min = $row['nominal_min'];
                $data->nominal_max = $row['nominal_max'];
                $data->min = $row['min'];
                $data->max = $row['max'];

                array_push($arr, $data);
            }
        }

        //numeric file panels
        if ($rescount3 != 0) {
            while ($row = mysqli_fetch_assoc($res3)) {
                $data = (object)array();
                $data->owner = $row['owner'];
                $data->panel_id = $row['panel_id'];
                $data->dataname = $row['dataname'];
                $data->datatype = $row['datatype'];
                $data->filename = $row['filename'];

                array_push($arr, $data);
            }
        }

        //sinCombo panels
        if ($rescount4 != 0) {
            while ($row = mysqli_fetch_assoc($res4)) {
                $data = (object)array();
                $data->owner = $row['owner'];
                $data->panel_id = $row['panel_id'];
                $data->dataname = $row['dataname'];
                $data->datatype = $row['datatype'];
                $data->e = $row['e'];
                $data->f = $row['f'];
                $data->g = $row['g'];
                $data->h = $row['h'];
                $data->j = $row['j'];
                $data->k = $row['k'];
                $data->l = $row['l'];
                $data->m = $row['m'];
                $data->n = $row['n'];
                $data->o = $row['o'];
                $data->second_nominal_min = $row['second_nominal_min'];
                $data->second_nominal_max = $row['second_nominal_max'];

                array_push($arr, $data);
            }
        }

        $json = (object)array();
        $json->panelname = $panelname;
        $json->paneldata = $arr;
        echo json_encode($json, JSON_PRETTY_PRINT) . PHP_EOL; //return stream info
    } else {
        echo 'no panels found' . PHP_EOL; //no panels
    }
} else {
    echo 'username and panelname required' . PHP_EOL; //missing data
}
