<?php

/**
 * Copyright (c) 2020
 *
 * This file contains all of the necessary functionality for saving a csv file in the server data directory
 *
 * @author: Ryan Draper <ryandraper26@outlook.com>
 *
 * Last modified  : 06/2020
 */

//get the data of the posted file
$file = file($_FILES['file']['tmp_name']);

//get full path to save location
$root = $_SERVER['DOCUMENT_ROOT'];

$numDir = count(glob($root . "/data/*"));
$nextDir = (int)$numDir + 1;
//make new directory
mkdir($root . "/data" . "/temp" . $nextDir, 0777);

//file name
$filename = $_FILES['file']['name'];
$myfile = $root . "/data" . "/temp" . $nextDir . "/" . $filename;

//save the contents of file in the data directory
file_put_contents($myfile, $file);

//send json object to client
$json = (object)array();
$json->filename = $filename;
$json->directory = "temp" . $nextDir;
echo json_encode($json);
