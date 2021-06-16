/**
 * Copyright (c) 2020
 *
 * This file contains all of the necessary functionality for deleting panels
 * on the delete panel page of the web interface.
 *
 * @summary Functionality for delete panel page on the web interface
 * @author Ryan Draper <ryandraper26@outlook.com>
 *
 * Last modified  : 06/2020
 * 
 * Start Bootstrap - SB Admin v6.0.3 (https://startbootstrap.com/template/sb-admin)
 * Copyright 2013-2021 Start Bootstrap
 */

 (function($) {
    "use strict";

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
        var ca = decodedCookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == " ") {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    // Add active state to sidbar nav links
    var path = window.location.href; // because the "href" property of the DOM element is the absolute path
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
     * Function for creating an object containing panel information
     * 
     * @author: Ryan Draper
     * 
     * @param {string} username 
     * @param {string} id 
     * 
     * @returns object
     */
    function createPanelObj(username, id) {
        var data = {
            username: username,
            panelid: id
        };

        return data;
    }

    /**
     * Function that sends panel information to php for deletion
     * 
     * @author: Ryan Draper
     * 
     * @param {object} panel 
     * @param {string} username 
     */
    function deletePanel(panel, username) {
        //get panels id
        var id = panel["panel_id"];

        //get object containing panel information
        var data = createPanelObj(username, id);

        //send json data as post request to php
        fetch("../php/deletepanel.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data), //convert object to json
            })
            .then((response) => response.text()) //get text response
            .then((data) => {
                if (data == "deleted\n") { //if returned message is deleted
                    alert("Panel Deleted");

                    //return to panels page
                    window.location.replace("./panels.html");
                } else { //if returned message was not deleted
                    //disaply message
                    alert(data);
                }
            })
            .catch((err) => console.log(err)); //catch error
    }

    /**
     * Function for creating a card element for a panel
     * 
     * @author: Ryan Draper
     * 
     * @param {object} element 
     * @param {string} username 
     */
    function createPanelCard(element, username) {
        //get panel id
        var id = element["panel_id"];

        //create a new card element
        var div = document.createElement("div");

        //set the class
        div.setAttribute("class", "card card-body align-items-center btn border-primary mb-2 panel");

        //set the id
        div.setAttribute("id", id);

        //set the content to the panel name
        div.innerHTML = element["panel_name"];

        //append to html
        $("#panelrows").append(div);

        //change display panels info on click of panel, append to dynamic element
        $("#" + id).on("click", function(e) {
            //call function for deleting panel
            deletePanel(element, username);
        });
    }

    /**
     * Function for displaying message when there are no panels
     * 
     * @author: Ryan Draper
     * 
     * @param {object} panels 
     */
    function noPanelsMessage(panels) {
        //get html elements
        var panelrows = document.getElementById("panelrows");
        var inforows = document.getElementById("inforows");

        //hide divs from html
        panelrows.setAttribute("hidden", "true");
        inforows.setAttribute("hidden", "true");

        //create column element
        var col = document.createElement("div");

        //set attributes
        col.setAttribute("class", "alert alert-primary ");
        col.setAttribute("role", "alert");

        //set inner content to message
        col.innerHTML = "<strong>" + panels + ".</strong> Panels will be displayed once created.";

        //create element to display message
        var div = document.createElement("div");
        //set attributes
        div.setAttribute("class", "col-md-12");
        div.setAttribute("id", "noPanelAlert");

        //append to column element
        div.append(col);

        //append to html
        $("#panels").append(div);
    }

    /**
     * Function for loading panel information from object
     * 
     * @author: Ryan Draper
     * 
     * @param {object} json 
     */
    function loadPanelData(json) {
        //get username
        var username = getCookie("username");

        //check if json has array of panel names
        if (Array.isArray(json.panels)) {
            //for each panel object
            json.panels.forEach((element) => {
                //send panel information to function for displaying on html
                createPanelCard(element, username);
            });
        } else { //if json does not contain array
            noPanelsMessage(json.panels);
        }
    }

    /**
     * Function for loading panels cards for the logged in user
     * 
     * @author: Ryan Draper
     */
    function loadPanels() {
        //get username
        var username = getCookie("username");

        //store username in object
        const data = {
            username: username,
        };

        //send json data as post request to php
        fetch("../php/panels.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            .then((response) => response.json()) //get response as json
            .then((data) => {
                //send response to loadPanelData function
                loadPanelData(data);
            })
            .catch((err) => console.log(err)); //catch error
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
        var update = document.getElementById("update");
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

            //call function to load existing panels
            loadPanels();
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

            //set the users name in the side nav
            $("#loggedinUser").html(username);
            $("#usernav").html("Hello " + username);

            //call function to load existing panels
            loadPanels();
        } else { //if the user is just a normal user
            //set the users name in the side nav
            $("#loggedinUser").html(username);
            $("#usernav").html("Hello " + username);

            //call function to load existing panels
            loadPanels();
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
        //change display panels info on click of panel
        var txt = $(e.target).html();
    });
})(jQuery);