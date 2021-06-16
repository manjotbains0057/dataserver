/**
 * Copyright (c) 2020
 *
 * This file contains all of the necessary functionality for login
 *
 * @summary Functionality for login page on the web interface
 * @author Ryan Draper <ryandraper26@outlook.com>
 *
 * Last modified  : 06/2020
 * 
 * Start Bootstrap - SB Admin v6.0.3 (https://startbootstrap.com/template/sb-admin)
 * Copyright 2013-2021 Start Bootstrap
 */

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
 * Changes elements display and messages when username empty
 * 
 * @author: Ryan Draper
 * 
 * @param {input} username 
 * @param {input} password 
 * @param {input} messageField 
 */
function userError(username, password, messageField) {
    //set username field red outline
    username.setAttribute("class", "form-control py-4 is-invalid");
    password.setAttribute("class", "form-control py-4");

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
function passwordError(username, password, messageField) {
    //set password field red outline
    username.setAttribute("class", "form-control py-4");
    password.setAttribute("class", "form-control py-4 is-invalid");

    //focus password field
    password.focus();

    //set message
    messageField.innerHTML = "password required";
    messageField.hidden = false;
}

/**
 * Creates an object containing user login information
 * 
 * @author: Ryan Draper
 * 
 * @param {string} username 
 * @param {string} password 
 * 
 * @returns object
 */
function createUserObj(username, password) {
    //store username and password
    const data = {
        username: username,
        password: password
    };

    return data;
}

/**
 * Style form inputs for successful login
 * 
 * @author: Ryan Draper
 * 
 * @param {string} username 
 * @param {int} role 
 * @param {element} messageField 
 */
function success(username, role, messageField) {
    //set cookies
    document.cookie = "username=" + username + "; path=/";
    document.cookie = "role=" + role + "; path=/";

    //set message outline green. Change message text
    messageField.setAttribute("class", "alert alert-success");
    messageField.innerHTML = "success";
    messageField.hidden = false;

}

/**
 * Style form inputs for invalid credentials
 * 
 * @author: Ryan Draper
 * 
 * @param {input} username 
 * @param {input} password 
 * @param {element} messageField 
 */
function invalid(username, password, messageField) {
    //set username and password field red outline
    username.setAttribute("class", "form-control py-4 is-invalid");
    password.setAttribute("class", "form-control py-4 is-invalid");

    //set message outline red. Change message text
    messageField.setAttribute("class", "alert alert-danger");
    messageField.innerHTML = "username or password invalid";
    messageField.hidden = false;
}

/**
 * Style form elements for unexpected error
 * 
 * @author: Ryan Draper
 * 
 * @param {input} username 
 * @param {input} password 
 * @param {element} messageField 
 */
function otherError(username, password, messageField) {
    //set username and password field red outline
    username.setAttribute("class", "form-control py-4 is-invalid");
    password.setAttribute("class", "form-control py-4 is-invalid");

    //set message outline red. Change message text
    messageField.setAttribute("class", "alert alert-danger");
    messageField.innerHTML = "An error occured";
    messageField.hidden = false;
}

/**
 * Function for post request user information to php
 * 
 * @author: Ryan Draper
 */
function submitLogin() {
    //get html elements
    var form = document.getElementById("loginForm");
    var messageField = document.getElementById("message");
    var username = document.getElementById("inputUsername");
    var password = document.getElementById("inputPassword");

    //create user details object
    var data = createUserObj(username.value.trim(), password.value.trim());

    //send json data as post to php
    fetch("../php/login.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.message == "success") { //if fetch returns success
                success(username.value.trim(), data.role, messageField);
                //submit form
                form.submit();
            } else if (data.message == "invalid") { //if fetch returns invalid
                invalid(username, password, messageField);
            } else { //unexpected error
                otherError(username, password, messageField);
            }
        })
        .catch((err) => console.log(err)); //catch error

}

/**
 * Function for validating user inputs
 * 
 * @author: Ryan Draper
 * 
 * @returns boolean
 */
function validateLogin() {
    //get form elements
    var messageField = document.getElementById("message");
    var username = document.getElementById("inputUsername");
    var password = document.getElementById("inputPassword");

    if (emptyInput(username.value.trim())) { //check empty username
        userError(username, password, messageField);
        return false;
    } else if (emptyInput(password.value.trim())) { //check empty password
        passwordError(username, password, messageField);
        return false;
    } else { //no validation errors
        submitLogin();
        return false;
    }
}