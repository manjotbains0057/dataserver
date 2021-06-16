<?php
/**
 * Copyright (c) 2020
 *
 * This file contains all of the necessary functionality for connecting to the database
 *
 * @author: Ryan Draper <ryandraper26@outlook.com>
 *
 * Last modified  : 06/2020
 */

    function newconn(){
        $servername = "mysql-server";
        $username = "it06";
        $password = "innovativegeeks";
        $db = "it06";

        $conn = new mysqli($servername, $username, $password, $db);
        return $conn;
    }
