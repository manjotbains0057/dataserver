<?php

/**
 * Copyright (c) 2020
 *
 * This file contains all of the necessary functionality for the admin and superadmin
 *
 * @author: Ryan Draper <ryandraper26@outlook.com>
 * @author: Xingze Wang <wangxingze31@gmail.com>
 *
 * Last modified  : 06/2020
 */

require_once "./databaseConnect.php";

$conn = newconn();

//select query
$sql = "SELECT * FROM users NATURAL JOIN roles WHERE role = role_id;";
$result = mysqli_query($conn, $sql);

$count = mysqli_fetch_all($result, MYSQLI_ASSOC);

//select query
$dataSql = "SELECT * FROM panels;";

$dataList = mysqli_query($conn, $dataSql);

$data = mysqli_fetch_all($dataList, MYSQLI_ASSOC);
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <title>Numerous - SB Admin</title>
    <link href="../css/styles.css" rel="stylesheet" />
    <link href="https://cdn.datatables.net/1.10.20/css/dataTables.bootstrap4.min.css" rel="stylesheet" crossorigin="anonymous" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/js/all.min.js" crossorigin="anonymous"></script>
    <script src="https://kit.fontawesome.com/dee192e6cc.js" crossorigin="anonymous"></script>
</head>

<body class="sb-nav-fixed">
    <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <p class="navbar-brand">Numerous</p>
        <button class="btn btn-link btn-sm order-first ml-2" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button>
        <ul class="navbar-nav ml-auto">
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-toggle="dropdown" data-target="userDropdown" href="#">
                    <i class="fas fa-user"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                    <div class="ml-4 text-primary" id="loggedinUser"></div>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="../html/changeDetails.html"><i class="fas fa-user-cog"></i> Settings</a>
                    <a class="dropdown-item" id="logoutBtn"><i class="fas fa-sign-out-alt"></i> Logout</a>
                </div>
            </li>
        </ul>
    </nav>
    <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
            <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div class="sb-sidenav-menu">
                    <div class="nav">
                        <div class="sb-sidenav-menu-heading text-light mb-2" id="usernav"></div>
                        <span class="border-primary border-bottom"></span>

                        <div class="sb-sidenav-menu-heading">Panels</div>
                        <a class="nav-link" href="../html/panels.html" id="home">
                            <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                            Panels Home
                        </a>
                        <a class="nav-link" href="../html/createpanel.html" hidden="true" id="create">
                            <div class="sb-nav-link-icon"><i class="far fa-plus-square"></i></div>
                            Create Panel
                        </a>
                        <a class="nav-link" href="../html/updatepanel.html" hidden="true" id="updateNav">
                            <div class="sb-nav-link-icon"><i class="far fa-edit"></i></div>
                            Update Panel
                        </a>
                        <a class="nav-link" href="../html/addstream.html" hidden="true" id="add">
                            <div class="sb-nav-link-icon"><i class="far fa-plus-square"></i></div>
                            Add Stream
                        </a>
                        <a class="nav-link" href="../html/deletepanel.html" hidden="true" id="delete">
                            <div class="sb-nav-link-icon"><i class="far fa-trash-alt"></i></div>
                            Delete Panel
                        </a>
                        <div class="sb-sidenav-menu-heading text-light mb-2" id="user"></div>
                        <span class="border-primary border-bottom"></span>
                        <a class="nav-link" href="./user.php" hidden="true" id="manager">
                            <div class="sb-nav-link-icon"><i class="fas fa-users-cog"></i></div>
                            User Manager
                        </a>
                    </div>
                </div>
            </nav>
        </div>
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid">
                    <h1 class="mt-4">User Tables</h1>

                    <div class="card mb-4">
                        <div class="card-header">
                            <i class="fas fa-table mr-1"></i>
                            Users
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Role</th>
                                            <th>Control</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <?php
                                        //add all users to table and buttons for functionality
                                        foreach ($count as $value) {
                                        ?>
                                            <tr>
                                                <td><?php echo $value['username']; ?></td>
                                                <td><?php echo $value['role_name']; ?></td>
                                                <td>
                                                    <a href="?username=<?php echo $value['username']; ?>" class="btn btn-primary active" data-toggle="modal" data-target="#SelectPanel">Assign Panel</a>
                                                    <a href="?username=<?php echo $value['username']; ?>" class="btn btn-primary active" data-toggle="modal" data-target="#RemovePanel">Remove Panel</a>
                                                    <a href="?username=<?php echo $value['username']; ?>" class="btn btn-primary active saBtn" data-toggle="modal" data-target="#myModal">Change Role</a>
                                                    <a href="./user_del.php?username=<?php echo $value['username']; ?>" class="btn btn-primary active saBtn" role="button">Delete User</a>
                                                </td>
                                            </tr>
                                        <?php } ?>
                                    </tbody>
                                </table>
                            </div>
                            <a href="" class="btn btn-primary active float-right saBtn" role="button" data-toggle="modal" data-target="#AddUser">Add User</a>
                        </div>
                    </div>
                </div>
            </main>
            <footer class="py-4 bg-light mt-auto">
                <div class="container-fluid">
                    <div class="d-flex align-items-center justify-content-between small">
                        <div class="text-muted">Copyright &copy; InnovativeGeeks 2021</div>
                        <div>
                            <a href="#">Privacy Policy</a>
                            &middot;
                            <a href="#">Terms &amp; Conditions</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    </div>


    <!-- 模态框（Modal） -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <form action="" method="post">
                        Role ID<input id="role" type="text" name="rid">
                        <input id="usr" value="" hidden="true" />
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal" id="myModalBtn">Submit</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal -->
    </div>



    <!-- 模态框（Modal） -->
    <div class="modal fade" id="AddUser" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <form action="" method="post">
                        UserName:<input id="uname" type="text" name="uname"><br>
                        Password:&nbsp;&nbsp;<input id="upwd" type="text" name="upwd"><br>
                        Role ID:&nbsp;&nbsp;&nbsp;
                        &nbsp;<input id="rid" type="text" name="rid"><br>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal" id="addUserBtn">Submit</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal -->
    </div>

    <!-- 模态框（Modal） -->
    <div class="modal fade" id="SelectPanel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <form action="" method="post">
                        Select Panel:
                        <select name="panel" id="SelectPanelSel">
                        </select>
                        <input id="currentusr" value="" hidden="true" />
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal" id="selectPanelBtn">Submit</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal -->
    </div>

    <!-- 模态框（Modal） -->
    <div class="modal fade" id="RemovePanel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <form action="" method="post">
                        Select Panel:
                        <select name="panel" id="RemovePanelSel">
                        </select>
                        <input id="currentuser" value="" hidden="true" />
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal" id="removePanelBtn">Submit</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal -->
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
    <script src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js" crossorigin="anonymous"></script>
    <script src="https://cdn.datatables.net/1.10.20/js/dataTables.bootstrap4.min.js" crossorigin="anonymous"></script>

    <script type="application/javascript">
        /**
         * function getCookie
         * splits cookies and returns value for the parameter key
         * 
         * @author: w3Schools.com
         * url: https://www.w3schools.com/js/js_cookies.asp
         * 
         * @param {string} cname the key of the cookie value to be returned
         */
        function getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);

            //split all cookies
            var ca = decodedCookie.split(";");

            //for each cookie
            for (var i = 0; i < ca.length; i++) {
                //cookie at i
                var c = ca[i];

                while (c.charAt(0) === " ") {
                    c = c.substring(1);
                }
                if (c.indexOf(name) === 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }

        $(function() {
            $('#myModal').modal('hide');
        });


        /**
         * display dropdown of panels for user to select for assign
         * 
         * @author: Xingze Wang
         */
        $(function() {
            $('#myModal').on('show.bs.modal', function(e) {
                $("#usr").val(e.relatedTarget.href.split("=")[1]);
            });

            $('#SelectPanel').on('show.bs.modal', function(e) {
                $("#currentusr").val(e.relatedTarget.href.split("=")[1]);
                $('#SelectPanelSel').empty();
                //send post json data to url
                fetch('./getSelectPanels.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            username: getCookie("username"),
                            role: getCookie("role")
                        }),
                    })
                    .then(response => response.json())
                    .then(data => {
                        for (var i = 0; i < data.length; i++) {
                            $('#SelectPanelSel').append($("<option value='" + data[i].panel_id + "'>" + data[i].panel_name + "</option>"));
                        }
                    })
                    .catch(err => console.log(err)); //catch error
            });

            /**
             * display dropdown of panels for user to remove for remove from user
             * 
             * @author: Xingze Wang
             */
            $('#RemovePanel').on('show.bs.modal', function(e) {
                $("#currentuser").val(e.relatedTarget.href.split("=")[1]);
                $('#RemovePanelSel').empty();
                //send post json data to url
                fetch('./getSelectPanels.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            username: getCookie("username"),
                            role: getCookie("role")
                        }),
                    })
                    .then(response => response.json())
                    .then(data => {
                        for (var i = 0; i < data.length; i++) {
                            $('#RemovePanelSel').append($("<option value='" + data[i].panel_id + "'>" + data[i].panel_name + "</option>"));
                        }
                    })
                    .catch(err => console.log(err)); //catch error
            });

            /**
             * changes selected user role
             * 
             * @author: Ryan Draper
             * @author: Xingze Wang
             */
            $('#myModalBtn').on('click', function(e) {
                var name = $('#usr').val();
                var roid = $('#role').val();

                fetch('./updateRole.php', {
                        method: 'POST',
                        body: JSON.stringify({
                            name: name,
                            role: roid
                        }), // data can be `string` or {object}!
                        headers: new Headers({
                            'Content-Type': 'application/json'
                        })
                    }).then(res => res.json())
                    .then(response => {
                        alert(response.message);
                        if (response.message == 'successfully changed role for ' + name) {
                            window.location.replace('./user.php');
                        }
                    })
                    .catch(err => console.log(err));
            });


            /**
             * functionality for adding new user
             * 
             * @author: Xingze Wang
             */
            $('#addUserBtn').on('click', function() {
                var uname = $('#uname').val();
                var upwd = $('#upwd').val();
                var rid = $('#rid').val();

                fetch('./addUser.php', {
                        method: 'POST',
                        body: JSON.stringify({
                            uname: uname,
                            upwd: upwd,
                            rid: rid
                        }),
                        headers: new Headers({
                            'Content-Type': 'application/json'
                        })
                    }).then(res => res.json())
                    .then(response => {
                        alert(response.message);
                        if (response.message == 'successfully added') {
                            window.location.replace('./user.php');
                        }
                    });
            });

            /**
             * functionality for assign panel to user
             * 
             * @author: Ryan Draper
             * @author: Xingze Wang
             */
            $('#selectPanelBtn').on('click', function() {

                var name = $("#currentusr").val();
                var options = $("#SelectPanelSel option:selected");

                console.log();

                fetch('./assignPanel.php', {
                        method: 'POST',
                        body: JSON.stringify({
                            name: name,
                            pid: options.val()
                        }),
                        headers: new Headers({
                            'Content-Type': 'application/json'
                        })
                    }).then(res => res.json())
                    .then(response => {
                        alert(response.message);
                        if (response.message == 'successfully assigned to ' + name) {
                            window.location.replace('./user.php');
                        }
                    });
            });

            /**
             * functionality for remove panel from user
             * 
             * @author: Ryan Draper
             * @author: Xingze Wang
             */
            $('#removePanelBtn').on('click', function() {

                var name = $("#currentuser").val();
                var options = $("#RemovePanelSel option:selected");

                console.log();

                fetch('./removePanel.php', {
                        method: 'POST',
                        body: JSON.stringify({
                            name: name,
                            pid: options.val()
                        }),
                        headers: new Headers({
                            'Content-Type': 'application/json'
                        })
                    }).then(res => res.json())
                    .then(response => {
                        alert(response.message);
                        if (response.message == 'successfully removed from ' + name) {
                            window.location.replace('./user.php');
                        }
                    });
            });
        });
    </script>
    <script>
        /*!
         * Start Bootstrap - SB Admin v6.0.3 (https://startbootstrap.com/template/sb-admin)
         * Copyright 2013-2021 Start Bootstrap
         * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
         */
        (function($) {
            "use strict";

            // Add active state to sidbar nav links
            var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
            $("#layoutSidenav_nav .sb-sidenav a.nav-link").each(function() {
                if (this.href === path) {
                    $(this).addClass("active");
                }
            });

            // Toggle the side navigation
            $("#sidebarToggle").on("click", function(e) {
                e.preventDefault();
                $("body").toggleClass("sb-sidenav-toggled");
            });

            /**
             * function getCookie
             * splits cookies and returns value for the parameter key
             * 
             * @author: w3Schools.com
             * url: https://www.w3schools.com/js/js_cookies.asp
             * 
             * @param {string} cname the key of the cookie value to be returned
             */
            function getCookie(cname) {
                var name = cname + "=";
                var decodedCookie = decodeURIComponent(document.cookie);

                //split all cookies
                var ca = decodedCookie.split(";");

                //for each cookie
                for (var i = 0; i < ca.length; i++) {
                    //cookie at i
                    var c = ca[i];

                    while (c.charAt(0) === " ") {
                        c = c.substring(1);
                    }
                    if (c.indexOf(name) === 0) {
                        return c.substring(name.length, c.length);
                    }
                }
                return "";
            }

            /**
             * A function that executes as soon as the document is ready.
             * Gets the logged in users name and role,
             * Hides navigational element depending on authority,
             * 
             * @author: Ryan Draper
             */
            $(document).ready(function() {
                //get logged in user and role
                var username = getCookie("username");
                var role = getCookie("role");

                //navigation links
                var manager = document.getElementById("manager");
                var create = document.getElementById("create");
                var update = document.getElementById("updateNav");
                var add = document.getElementById("add");
                var del = document.getElementById("delete");

                //if the username is empty
                if (username == "") {
                    //replace url with unauthorised page
                    window.location.replace("../html/401.html");

                } else if (role == 1) { //if the user is super_admin
                    //unhide manage tab
                    manager.removeAttribute("hidden");

                    //unhide create tab
                    create.removeAttribute("hidden");

                    //unhide update tab
                    update.removeAttribute("hidden");

                    //unhide add tab
                    add.removeAttribute("hidden");

                    //unhide delete tab
                    del.removeAttribute("hidden");

                    //set the users name in the side nav
                    $("#loggedinUser").html(username);
                    $("#usernav").html("Hello " + username);
                } else if (role == 2) { //if the user is admin
                    //unhide manager tab
                    manager.removeAttribute("hidden");

                    //unhide create tab
                    create.removeAttribute("hidden");

                    //unhide update
                    update.removeAttribute("hidden");

                    //unhide add tab
                    add.removeAttribute("hidden");

                    //unhide delete tab
                    del.removeAttribute("hidden");

                    //hide buttons not accessible by admin
                    var saButtons = document.getElementsByClassName('saBtn');
                    for (var i = 0; i < saButtons.length; i ++) {
                        saButtons[i].style.display = 'none';
                    }

                    //set the users name in the side nav
                    $("#loggedinUser").html(username);
                    $("#usernav").html("Hello " + username);
                } else { //if the user is just a normal user
                    //set the users name in the side nav
                    $("#loggedinUser").html(username);
                    $("#usernav").html("Hello " + username);
                }
            });

            /**
             * On click listener for the logoutBtn element.
             * 
             * @author: Ryan Draper
             */
            $("#logoutBtn").on("click", function() {
                //remove username cookie
                document.cookie = "username= ; expires = Thu, 01 Jan 1970 00:00:00 GMT; path=/";

                //remove role cookie
                document.cookie = "role= ; expires = Thu, 01 Jan 1970 00:00:00 GMT; path=/";

                //replace window with login page
                window.location.replace("../login.html");
            });

            /**
             * On click listener for when a panel card is clicked
             * 
             * @author: Ryan Draper
             */
            $(".panel").on("click", function(e) {
                var txt = $(e.target).html();
                $("#cardhead").html(txt);
            });
        })(jQuery);
    </script>
</body>

</html>