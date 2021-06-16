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

/**
 * check if string empty or null
 * 
 * @author: Ryan Draper
 * 
 * @param {string} str 
 * 
 * @returns boolean
 */
 function emptyInput(str) {
    return (str == "" || str == null);
}

/**
 * Check if two strings are the same
 * 
 * @author: Ryan Draper
 * 
 * @param {string} str 
 * @param {string} str1 
 * 
 * @returns boolean
 */
function doesNotMatch(str, str1) {
    return (str !== str1);
}

/**
 * check if a password is valid length
 * 
 * @author: Ryan Draper
 * 
 * @param {string} str 
 * 
 * @returns boolean
 */
function invalidPassword(str) {
    return (str.length < 6);
}

/**
 * displays a message in the errorMessage element and makes it visible
 * 
 * @author: Ryan Draper
 * 
 * @param {element} element 
 * @param {string} message 
 */
function display(element, message) {
    element.innerText = message;
    element.hidden = false;
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
 * Displays success field on successfull sign up
 * 
 * @author: Ryan Draper
 * 
 * @param {string} username 
 * @param {element} messageField 
 */
function success(username, messageField) {
    //set message outline green. Change message text
    messageField.setAttribute("class", "alert alert-success");
    messageField.innerHTML = "Account Created Successfully";
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
 * post updated details data to php script for create user
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
function createUser(data, username, password, conpassword, messageField, form) {
    //send post json data to url
    fetch("../php/register.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then((response) => response.text())
        .then((data) => {
            if (data == "success") { //if fetch returns success
                success(username, messageField);

                //submit form
                form.submit();
            } else if (data == "usertaken") { //if fetch returns usertaken
                userTaken(username, password, conpassword, messageField);
            } else {
                unknownError(username, password, conpassword, messageField);
            }
        })
        .catch((err) => console.log(err)); //catch error
}

/**
 * function for checking validation of form inputs
 * 
 * @author: Ryan Draper
 * 
 * @returns boolean
 */
function validateSignup() {
    //get form input elements
    var username = document.getElementById("inputUsername");
    var password = document.getElementById("inputPassword");
    var conpassword = document.getElementById("inputConfirmPassword");
    var messageField = document.getElementById("message");
    var form = document.getElementById("signupForm");

    if (emptyInput(username.value.trim())) { //check empty username
        userError(username, password, conpassword, messageField);
        return false;
    } else if (emptyInput(password.value.trim())) { //check empty password
        passwordError(username, password, conpassword, messageField);
        return false;
    } else if (emptyInput(conpassword.value.trim())) { //check empty password
        conPasswordError(username, password, conpassword, messageField);
        return false;
    } else if (doesNotMatch(password.value.trim(), conpassword.value.trim())) {
        noMatchError(username, password, conpassword, messageField);
        return false;
    } else if (invalidPassword(password.value.trim())) {
        invalidError(username, password, conpassword, messageField);
        return false;
    } else {
        //store username and password
        const data = {
            username: username.value.trim(),
            password: password.value.trim(),
            role: 3
        };

        createUser(data, username, password, conpassword, messageField, form);
        return false;
    }
}