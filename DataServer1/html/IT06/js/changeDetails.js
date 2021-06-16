/**
 * Copyright (c) 2020
 *
 * This file contains all of the necessary functionality for adding streams to exitsting panels
 * on the add stream page of the web interface.
 *
 * @summary Functionality for add stream page on the web interface
 * @author Ryan Draper <ryandraper26@outlook.com>
 *
 * Last modified  : 06/2020
 * 
 * Start Bootstrap - SB Admin v6.0.3 (https://startbootstrap.com/template/sb-admin)
 * Copyright 2013-2021 Start Bootstrap
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
        var ca = decodedCookie.split(";");
        for (var i = 0; i < ca.length; i++) {
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
            var update = document.getElementById("update");
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
     * Function takes a string and returns if empty
     * 
     * @author: Ryan Draper
     * 
     * @param {string} str 
     * @returns boolean
     */
    function emptyInput(str) {
        //if empty or null
        return (str === "" || str === null);
    }

    /**
     * Function for comparing if two strings are the same
     * 
     * @author: Ryan Draper
     * 
     * @param {string} str 
     * @param {string} str1 
     * @returns 
     */
    function doesNotMatch(str, str1) {
        return (str !== str1);
    }

    /**
     * Function returns if string if less than 6 characters
     * 
     * @author: Ryan Draper
     * 
     * @param {string} str 
     * @returns 
     */
    function invalidPassword(str) {
        //check if strings length is less than 6
        return (str.length < 6);
    }

    /**
     * Changes elements display and messages when username empty
     * 
     * @author: Ryan Draper
     * 
     * @param {input} username 
     * @param {input} password 
     * @param {input} conpassword 
     * @param {input} messageField 
     */
    function userError(username, password, conpassword, messageField) {
        //set username field red outline
        username.setAttribute("class", "form-control py-4 is-invalid");
        password.setAttribute("class", "form-control py-4");
        conpassword.setAttribute("class", "form-control py-4");

        //focus username field
        username.focus();

        //set message
        messageField.innerHTML = "username required";
        messageField.hidden = false;
    }

    /**
     * Changes password display when empty password
     * 
     * @author: Ryan Draper
     * 
     * @param {input} username 
     * @param {input} password 
     * @param {input} conpassword 
     * @param {element} messageField 
     */
    function passwordError(username, password, conpassword, messageField) {
        //set password field red outline
        username.setAttribute("class", "form-control py-4");
        password.setAttribute("class", "form-control py-4 is-invalid");
        conpassword.setAttribute("class", "form-control py-4");

        //focus password field
        password.focus();

        //set message
        messageField.innerHTML = "password required";
        messageField.hidden = false;
    }

    /**
     * Changes confirm password field when empty
     * 
     * @author: Ryan Draper
     * 
     * @param {input} username 
     * @param {input} password 
     * @param {input} conpassword 
     * @param {element} messageField 
     */
    function conPasswordError(username, password, conpassword, messageField) {
        //set confirmpassword field red outline
        username.setAttribute("class", "form-control py-4");
        password.setAttribute("class", "form-control py-4");
        conpassword.setAttribute("class", "form-control py-4 is-invalid");

        //focus confirmpassword field
        conpassword.focus();

        //set message
        messageField.innerHTML = "confirm password required";
        messageField.hidden = false;
    }

    /**
     * Sets password fields red outline and error message when no match
     * 
     * @author: Ryan Draper
     * 
     * @param {input} username 
     * @param {input} password 
     * @param {input} conpassword 
     * @param {element} messageField 
     */
    function noMatchError(username, password, conpassword, messageField) {
        //set password and confirmpassword field red outline
        username.setAttribute("class", "form-control py-4");
        password.setAttribute("class", "form-control py-4 is-invalid");
        conpassword.setAttribute("class", "form-control py-4 is-invalid");

        //focus password and confirmpassword field
        password.focus();
        conpassword.focus();

        //set message
        messageField.innerHTML = "passwords do not match";
        messageField.hidden = false;
    }

    /**
     * Changes password input outline and error message when password too short
     * 
     * @author: Ryan Draper
     * 
     * @param {input} username 
     * @param {input} password 
     * @param {input} conpassword 
     * @param {element} messageField 
     */
    function invalidError(username, password, conpassword, messageField) {
        //set password field red outline
        username.setAttribute("class", "form-control py-4");
        password.setAttribute("class", "form-control py-4 is-invalid");
        conpassword.setAttribute("class", "form-control py-4");

        //focus password field
        password.focus();

        //set message
        messageField.innerHTML = "passwords must be a minimum of 6 characters";
        messageField.hidden = false;
    }

    /**
     * Creates an object containing user login information
     * 
     * @author: Ryan Draper
     * 
     * @param {string} oldUsername 
     * @param {string} username 
     * @param {string} password 
     * 
     * @returns object
     */
    function createUserObj(oldUsername, username, password) {
        //store username and password
        const data = {
            oldUsername: oldUsername,
            username: username,
            password: password
        };

        return data;
    }

    /**
     * Changes username input to error display when username taken
     * 
     * @author: Ryan Draper
     * 
     * @param {input} username 
     * @param {input} password 
     * @param {input} conpassword 
     * @param {element} messageField 
     */
    function userTaken(username, password, conpassword, messageField) {
        //set username and field red outline
        username.setAttribute("class", "form-control py-4 is-invalid");
        password.setAttribute("class", "form-control py-4");
        conpassword.setAttribute("class", "form-control py-4");

        //set message outline red. Change message text
        messageField.setAttribute("class", "alert alert-danger");
        messageField.innerHTML = "username taken. Please choose a different username";
        messageField.hidden = false;
    }

    /**
     * Displays success field on successfull details change
     * 
     * @author: Ryan Draper
     * 
     * @param {string} username 
     * @param {element} messageField 
     */
    function changeSuccess(username, messageField) {
        //set message outline green. Change message text
        messageField.setAttribute("class", "alert alert-success");
        messageField.innerHTML = "Details Changed";
        messageField.hidden = false;

        //expire old username cookie
        document.cookie = "username= ; expires = Thu, 01 Jan 1970 00:00:00 GMT; path=/";

        //set new username cookie
        document.cookie = "username=" + username.value.trim() + "; path=/";
    }

    /**
     * Display error fields when unknow error occurs during update user details
     * 
     * @author: Ryan Draper
     * 
     * @param {input} username 
     * @param {input} password 
     * @param {input} conpassword 
     * @param {element} messageField 
     */
    function unknownError(username, password, conpassword, messageField) {
        //set username and field red outline
        username.setAttribute("class", "form-control py-4 is-invalid");
        password.setAttribute("class", "form-control py-4 is-invalid");
        conpassword.setAttribute("class", "form-control py-4 is-invalid");

        //set message outline red. Change message text
        messageField.setAttribute("class", "alert alert-danger");
        messageField.innerHTML = "An error occured";
        messageField.hidden = false;
    }

    /**
     * post updated details data to php script for change
     * 
     * @author: Ryan Draper
     * 
     * @param {object} data 
     * @param {input} username 
     * @param {input} password 
     * @param {input} conpassword 
     * @param {element} messageField 
     * @param {form} form 
     */
    function changeUsrDetails(data, username, password, conpassword, messageField, form) {
        //send post json data to url
        fetch("../php/changeDetails.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            .then((response) => response.text()) //get response text
            .then((data) => {
                if (data === "success") { //if fetch returns success
                    //set display for success
                    changeSuccess(username, messageField);

                    //submit form
                    form.submit();
                } else if (data === "usertaken") { //if fetch returns usertaken
                    //set display for username taken
                    userTaken(username, password, conpassword, messageField);
                } else {
                    //set display for unknown error
                    unknownError(username, password, conpassword, messageField);
                }
            })
            .catch(err => console.log(err)); //catch error
    }

    /**
     * Function for checking all inputs in form to ensure valid before submit
     * 
     * @author: Ryan Draper
     * 
     * @returns boolean
     */
    function validate() {
        //get page elements
        var username = document.getElementById("inputUsername");
        var password = document.getElementById("inputPassword");
        var conpassword = document.getElementById("inputConfirmPassword");
        var messageField = document.getElementById("message");
        var form = document.getElementById("changeForm");

        if (emptyInput(username.value.trim())) { //check empty username
            //set display for empty username
            userError(username, password, conpassword, messageField);
            return false;
        } else if (emptyInput(password.value.trim())) { //check empty password
            //set display for empty password
            passwordError(username, password, conpassword, messageField);
            return false;
        } else if (emptyInput(conpassword.value.trim())) { //check empty password
            //set display for empty confirm password
            conPasswordError(username, password, conpassword, messageField);
            return false;
        } else if (doesNotMatch(password.value.trim(), conpassword.value.trim())) {
            //set display for mismatch passwords
            noMatchError(username, password, conpassword, messageField);
            return false;
        } else if (invalidPassword(password.value.trim())) {
            //set display for invalid password
            invalidError(username, password, conpassword, messageField);
            return false;
        } else {
            //create object containing new details
            var data = createUserObj(getCookie("username"), username.value.trim(), password.value.trim());

            //send object to function for posting to php for update in database
            changeUsrDetails(data, username, password, conpassword, messageField, form);
            return false;
        }
    }

    /**
     * On click listener for submit clicked
     * 
     * @author: Ryan Draper
     */
    $("#changeBtn").on("click", function(e) {
        e.preventDefault();
        validate();
    });
})(jQuery);