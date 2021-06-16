/**
 * Copyright (c) 2020
 *
 * This file contains all of the necessary functionality for adding streams to exitsting panels
 * on the add stream page of the web interface.
 *
 * @summary Functionality for add stream page on the web interface
 * @author Ryan Draper <ryandraper26@outlook.com>
 * @author Stanley Ser <stanleyfluke@gmail.com>
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
     * Function for displaying no panels banner
     * 
     * @author: Ryan Draper
     * 
     * @param {object} json 
     */
    function displayError(json) {
        //hide panelrows element
        var panelrows = document.getElementById("panelrows");
        panelrows.setAttribute("hidden", "true");

        //hide createForm element
        var createForm = document.getElementById("createForm");
        createForm.setAttribute("hidden", "true");

        //hide manageForm element
        var manageForm = document.getElementById("manageForm");
        manageForm.setAttribute("hidden", "true");

        //create column element
        var col = document.createElement("div");
        //set col class
        col.setAttribute("class", "alert alert-primary ");
        //set col role
        col.setAttribute("role", "alert");
        //set col content
        col.innerHTML = "<strong>" + json.panels + ".</strong> Panels will be displayed once created.";

        //create div element
        var div = document.createElement("div");
        //set div class
        div.setAttribute("class", "col-md-12");
        //set div id
        div.setAttribute("id", "noPanelAlert");
        //append div with col element
        div.append(col);

        //append div to html
        $("#panels").append(div);
    }

    /**
     * Get each panels name and id and dispay as clickable cards
     * 
     * @author: Ryan Draper
     * 
     * @param {object} json
     */
    function displayPanelCards(json) {
        if(json.length == 0){
            displayError(json);
        }
        else{
        //display first panel as default
        var inp = document.getElementById("inputPanelname");
        inp.value = json[0]["panel_name"];

        //set panel id cookie for first panel
        document.cookie = "panel_id=" + json[0]["panel_id"] + "; path=/";

        //for each panel
        json.forEach((element) => {
            //set id
            var id = element["panel_id"];

            //create div element
            var div = document.createElement("div");
            //set class for div
            div.setAttribute("class", "card card-body align-items-center btn border-primary mb-2 panel");
            //set id for div
            div.setAttribute("id", id);
            //set div content
            div.innerHTML = element["panel_name"];
            //append to html
            $("#panelrows").append(div);

            //Onclick listener for panel cards
            $(".panel").on("click", function(e) {
                //get selected panel card name
                var txt = $(e.target).html();

                var inp = document.getElementById("inputPanelname");
                inp.value = txt;

                //set selected panel id as cookie
                document.cookie = "panel_id=" + e.target.id + "; path=/";
            });
        });
        }
    }

    /**
     * Function for loading data for panels of loggged in user
     * 
     * @author: Ryan Draper
     * 
     * @param {object} json 
     */
    function loadPanelData(json) {
        //check if json has array of panel names
        if (Array.isArray(json.panels)) {
            //check if role is super admin
            if (getCookie("role") == 1) {

                //call function to display panel cards
                displayPanelCards(json.panels);
            } else { //if not super admin

                //get only panels for logged in user
                var newArr = [];
                json.panels.forEach((element) => {
                    //if panel owner is same as logged in user
                    if (element.owner === getCookie("username")) {
                        newArr.push(element);
                    }
                });

                //call function to display panel cards
                displayPanelCards(newArr);
            }
        } else {
            //display error in html
            displayError(json);
        }
    }

    /**
     * Function for retrieving panel names
     * uses post request
     * 
     * @author: Ryan Draper
     * 
     * @param {object} obj 
     */
    function getPanelNames(obj) {
        //ajax post request
        fetch("../php/panels.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                //convert object to json string
                body: JSON.stringify(obj),
            })
            .then((response) => response.json()) //get response as json
            .then((data) => {
                loadPanelData(data); //send response data to function
            })
            .catch((err) => console.error(err)); //catch error
    }

    /**
     * function for getting the names of the panels
     * for the logged in user
     * 
     * @author: Ryan Draper
     */
    function loadPanels() {
        //get username of logged in user
        var username = getCookie("username");

        //store username in object
        const data = {
            username: username,
        };

        //retrieve panel names
        getPanelNames(data);
    }

    /**
     * Function for validating text stream
     * 
     * @author: Ryan Draper
     * 
     * @param {int} i 
     * 
     * @returns boolean
     */
    function checkText(i) {
        var value = document.getElementById("inputValue_" + i).value.trim();
        if (value === "") { //if empty
            alert("value fields is required for stream " + i);
            return false;
        } else {
            return true;
        }
    }

    /**
     * Function for validating sin stream
     * 
     * @author: Ryan Draper
     * 
     * @param {int} i 
     * 
     * @returns boolean
     */
    function checkSin(i) {
        var a = document.getElementById("inputa_" + i).value.trim();
        var b = document.getElementById("inputb_" + i).value.trim();
        var c = document.getElementById("inputc_" + i).value.trim();
        var d = document.getElementById("inputd_" + i).value.trim();
        var inc = document.getElementById("inputi_" + i).value.trim();
        var nominal_min = document.getElementById("inputSNominalMin_" + i).value.trim();
        var nominal_max = document.getElementById("inputSNominalMax_" + i).value.trim();

        if (a === "" || b === "" || c === "" || d === "" || inc === "") { //if empty
            alert("all numeric sin values are required for stream " + i);
            return false;
        } else if (nominal_min === "" || nominal_max === "") { //if empty
            alert("all nominal values are required for stream " + i);
            return false;
        } else if (parseFloat(nominal_min) > parseFloat(nominal_max)) { //if min greater than max
            alert("nominal min must be less or equal to nominal max");
            return false;
        } else {
            return true;
        }
    }

    /**
     * Function for validating random stream
     * 
     * @author: Ryan Draper
     * 
     * @param {int} i 
     * 
     * @returns boolean
     */
    function checkRandom(i) {
        var min = document.getElementById("inputmin_" + i).value.trim();
        var max = document.getElementById("inputmax_" + i).value.trim();
        var nominal_min = document.getElementById("inputRNominalMin_" + i).value.trim();
        var nominal_max = document.getElementById("inputRNominalMax_" + i).value.trim();

        if (min === "" || max === "") { //if empty
            alert("all numeric random values are required for stream " + i);
            return false;
        } else if (parseFloat(min) > parseFloat(max)) { //if min greater than max
            alert("min must be less or equal to max");
            return false;
        } else if (nominal_min === "" || nominal_max === "") { //if empty
            alert("all nominal values are required for stream " + i);
            return false;
        } else if (parseFloat(nominal_min) > parseFloat(nominal_max)) { //if min greater than max
            alert("nominal min must be less or equal to nominal max");
            return false;
        } else {
            return true;
        }
    }

    /**
     * Function for validating a sinCombo stream
     * 
     * @author: Stanley Ser
     * @author: Ryan Draper
     * 
     * @param {int} i 
     * 
     * @returns boolean
     */
    function checkSinCombo(i) {
        var e = document.getElementById("inpute_" + i).value.trim();
        var f = document.getElementById("inputf_" + i).value.trim();
        var g = document.getElementById("inputg_" + i).value.trim();
        var h = document.getElementById("inputh_" + i).value.trim();
        var j = document.getElementById("inputj_" + i).value.trim();
        var k = document.getElementById("inputk_" + i).value.trim();
        var l = document.getElementById("inputl_" + i).value.trim();
        var m = document.getElementById("inputm_" + i).value.trim();
        var n = document.getElementById("inputn_" + i).value.trim();
        var o = document.getElementById("inputo_" + i).value.trim();
        var second_nominal_min = document.getElementById("inputCsSNominalMin_" + i).value.trim();
        var second_nominal_max = document.getElementById("inputCsSNominalMax_" + i).value.trim();

        //if empty
        if (e === "" || f === "" || g === "" || h === "" || j === "" || k === "" || l === "" || m === "" || n === "" || o === "") {
            alert("all numeric sin values are required for stream " + i);
            return false;
        } else if (second_nominal_min === "" || second_nominal_max === "") { //if empty
            alert("all nominal values are required for stream " + i);
            return false;
        } else if (parseFloat(second_nominal_min) > parseFloat(second_nominal_max)) { //if min greater than max
            alert("nominal min must be less or equal to nominal max");
            return false;
        } else {
            return true;
        }
    }

    /**
     * Function for validating a numeric stream
     * 
     * @author: Ryan Draper
     * 
     * @param {int} i
     *  
     * @returns boolean
     */
    function checkNumeric(i) {
        var num = document.getElementById("inputFunction_" + i).value;
        var res = false;
        if (num === "sin") { //if stream is sin function
            res = checkSin(i);
            return res;
        } else if (num === "random") { //if stream is random function
            res = checkRandom(i);
            return res;
        } else if (num === "sinCombo") { //if stream is sinCombo function
            res = checkSinCombo(i);
            return res;
        } else {
            alert("numerical function must be selected for stream " + i); //if no numeric type selected
            return res;
        }
    }

    /**
     * Function for validating text file stream
     * 
     * @author: Ryan Draper
     * 
     * @param {int} i 
     * 
     * @returns boolean
     */
    function checkTextFile(i) {
        var txtup = document.getElementById("inputTextUpload_" + i).value.trim();
        if (txtup == "") { //if empty
            alert("file field is required for stream " + i);
            return false;
        } else {
            return true;
        }
    }

    /**
     * Function for validating numeric file stream
     * 
     * @author: Ryan Draper
     * 
     * @param {int} i 
     * 
     * @returns boolean
     */
    function checkNumericFile(i) {
        var numup = document.getElementById("inputNumericUpload_" + i).value.trim();
        if (numup == "") { //if empty
            alert("file field is required for stream " + i);
            return false;
        } else {
            return true;
        }
    }

    /**
     * Function for validating a single stream
     * 
     * @author: Ryan Draper
     * 
     * @param {string} dt datatype
     * @param {int} i
     * 
     * @returns boolean
     */
    function validateSingleStream(dt, i) {
        var res = true;

        if (dt === "text") { //if datatype is text
            var bool = checkText(i);
            if (!bool) {
                res = false;
            }
        } else
        if (dt === "numeric") { //if datatype is numeric
            var bool = checkNumeric(i);
            if (!bool) {
                res = false;
            }
        } else if (dt == "text upload") { //if datatype is text upload
            var bool = checkTextFile(i);
            if (!bool) {
                res = false;
            }
        } else if (dt == "numeric upload") { //if datatype is numeric upload
            var bool = checkNumericFile(i);
            if (!bool) {
                res = false;
            }
        } else { //if no datatype is selected
            alert("datatype required for stream " + i);
            res = false;
        }

        return res;
    }

    /**
     * Function for validating user input valid
     * 
     * @author: Ryan Draper
     * 
     * @returns boolean
     */
    function validate() {
        var res = true;

        var form = document.getElementById("createForm");

        //get number of added streams
        var streams = form.querySelectorAll(".stream").length;

        //if no streams added
        if (streams === 0) {
            alert("Cannot create panel without streams");
            res = false;
        }

        //for each added stream
        for (var i = 1; i < streams + 1; i++) {
            //get streams dataname
            var dn = document.getElementById("inputDataname_" + i).value.trim();

            //get streams datatype
            var dt = document.getElementById("inputDatatype_" + i).value;

            if (dn === "") {
                alert("dataname required for stream " + i);
                res = false;
            } else {
                //check for duplicate datanames
                for (var z = 1; z < streams + 1; z++) {
                    var ndn = document.getElementById("inputDataname_" + z).value.trim();

                    if (z !== i) {
                        if (dn === ndn) {
                            alert("dataname must be unique for stream " + i);
                            res = false;
                        }
                    }
                }
            }

            //validate stream at i
            res = validateSingleStream(dt, i);
        }

        return res;
    }

    /**
     * Function converts data into object required for text stream
     * 
     * @author: Ryan Draper
     * 
     * @param {string} dn 
     * @param {string} val 
     * 
     * @returns data object
     */
    function text(dn, val) {
        var data = {
            dataname: dn,
            datatype: "string",
            value: val
        };

        return data;
    }

    /**
     * Function that converts data into object required for textFile stream
     * 
     * @author: Ryan Draper
     * 
     * @param {string} dn 
     * @param {string} filename 
     * @param {string} directory 
     * 
     * @returns data object
     */
    function textFile(dn, filename, directory) {
        var data = {
            dataname: dn,
            datatype: "string",
            filename: filename,
            directory: directory
        };
        return data;
    }

    /**
     * Function that converts data into obect required for sin stream
     * 
     * @author: Ryan Draper
     * 
     * @param {string} dn 
     * @param {float} a 
     * @param {float} b 
     * @param {float} c 
     * @param {float} d 
     * @param {float} i 
     * @param {float} nominal_min 
     * @param {float} nominal_max 
     * 
     * @returns data object
     */
    function sin(dn, a, b, c, d, i, nominal_min, nominal_max) {
        var data = {
            dataname: dn,
            datatype: "float",
            function: "sin",
            a: a,
            b: b,
            c: c,
            d: d,
            i: i,
            nominal_min: nominal_min,
            nominal_max: nominal_max
        };

        return data;
    }

    /**
     * Function for creating object required for sinCombo stream
     * 
     * @author: Stanley Ser
     * @author: Ryan Draper
     * 
     * @param {string} dn 
     * @param {float} e 
     * @param {float} f 
     * @param {float} g 
     * @param {float} h 
     * @param {float} j 
     * @param {float} k 
     * @param {float} l 
     * @param {float} m 
     * @param {float} n 
     * @param {float} o 
     * @param {float} second_nominal_min 
     * @param {float} second_nominal_max 
     * 
     * @returns data object
     */
    function sinCombo(dn, e, f, g, h, j, k, l, m, n, o, second_nominal_min, second_nominal_max) {
        var data = {
            dataname: dn,
            datatype: "float",
            function: "sinCombo",
            e: e,
            f: f,
            g: g,
            h: h,
            j: j,
            k: k,
            l: l,
            m: m,
            n: n,
            o: o,
            second_nominal_min: second_nominal_min,
            second_nominal_max: second_nominal_max
        };
        return data;
    }

    /**
     * Function for creating object required for random stream
     * 
     * @author: Ryan Draper
     * 
     * @param {string} dn 
     * @param {float} min 
     * @param {float} max 
     * @param {float} nominal_min 
     * @param {float} nominal_max 
     * 
     * @returns data object
     */
    function random(dn, min, max, nominal_min, nominal_max) {
        var data = {
            dataname: dn,
            datatype: "float",
            function: "random",
            min: min,
            max: max,
            nominal_min: nominal_min,
            nominal_max: nominal_max
        };

        return data;
    }

    /**
     * Function for creating object required for numericFile stream
     * 
     * @author: Ryan Draper
     * 
     * @param {string} dn 
     * @param {string} filename 
     * @param {string} directory 
     * 
     * @returns data object
     */
    function numericFile(dn, filename, directory) {
        var data = {
            dataname: dn,
            datatype: "float",
            filename: filename,
            directory: directory
        };
        return data;
    }

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

            //call load panels function
            loadPanels();
        } else if (role == 2) { //if the user is admin
            //unhide manager tab
            manager.removeAttribute("hidden");

            //unhide create tab
            create.removeAttribute("hidden");

            //unhide update
            var update = document.getElementById("update");
            update.removeAttribute("hidden");

            //unhide add tab
            add.removeAttribute("hidden");

            //unhide delete tab
            del.removeAttribute("hidden");

            //set the users name in the side nav
            $("#loggedinUser").html(username);
            $("#usernav").html("Hello " + username);

            //call load panels function
            loadPanels();
        } else { //if the user is just a normal user
            //set the users name in the side nav
            $("#loggedinUser").html(username);
            $("#usernav").html("Hello " + username);

            //call the load panels function
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
     * on click listener for save stream button
     * 
     * @author: Ryan Draper
     */
    $("#saveBtn").on("click", function() {
        //get username from cookie
        var username = getCookie("username");

        //get panel_id from cookie
        var panel_id = getCookie("panel_id");

        //call validate function
        var valid = validate();

        //if valid, call saveDatafunction
        if (valid) {
            saveData(username, panel_id);
        }
    });

    /**
     * Function for adding text stream fields to html
     * 
     * @author: Ryan Draper
     * 
     * @param {array} streams 
     * @param {form} form 
     * @param {input} vals 
     * @param {input} funcs 
     * @param {input} rand 
     * @param {input} sin 
     * @param {input} txtup 
     * @param {input} numup 
     * @param {input} combosin 
     */
    function addText(streams, form, vals, funcs, rand, sin, txtup, numup, combosin) {
        //if value field is not already in form
        if (vals === 0) {
            if (funcs === 1) { //remove function fields
                document.getElementById("inputFunction_" + streams).parentNode.remove();
            }
            if (rand === 1) { //remove random fields
                document.getElementById("inputmin_" + streams).parentNode.remove();
            }
            if (sin === 1) { //remove sin fields
                document.getElementById("inputa_" + streams).parentNode.remove();
            }
            if (txtup === 1) { //remove text upload fields
                document.getElementById("inputTextUpload_" + streams).parentNode.remove();
            }
            if (numup === 1) { //remove numeric upload fields
                document.getElementById("inputNumericUpload_" + streams).parentNode.remove();
            }
            if (combosin === 1) { //remove sinCombo fields
                document.getElementById("inpute_" + streams).parentNode.remove();
            }

            //create value field lable and input
            var div3 = document.createElement("div");
            div3.setAttribute("class", "form-group mt-4 group_" + streams);
            var lable2 = document.createElement("label");
            lable2.setAttribute("class", "small mb-1");
            lable2.setAttribute("for", "inputValue_" + streams);
            lable2.innerText = "Value";
            var input1 = document.createElement("input");
            input1.setAttribute("class", "form-control");
            input1.setAttribute("id", "inputValue_" + streams);
            input1.setAttribute("placeholder", "Enter value");
            input1.setAttribute("name", "inputValue_" + streams);

            div3.append(lable2);
            div3.append(input1);

            //append after datatype
            var posparent = document.getElementById("inputDatatype_" + streams).parentNode;
            form.insertBefore(div3, posparent.nextSibling);
        }
    }

    /**
     * Function for adding numeric stream fields to html
     * 
     * @author: Ryan Draper
     * 
     * @param {arrya} streams 
     * @param {form} form 
     * @param {input} vals 
     * @param {input} funcs 
     * @param {input} txtup 
     * @param {input} numup 
     * @param {input} combosin 
     */
    function addNumeric(streams, form, vals, funcs, txtup, numup, combosin) {
        //if function field not in form
        if (funcs === 0) {
            if (vals === 1) { //remove text stream fields
                document.getElementById("inputValue_" + streams).parentNode.remove();
            }
            if (txtup === 1) { //remove text upload fields
                document.getElementById("inputTextUpload_" + streams).parentNode.remove();
            }
            if (numup === 1) { //remove numeric upload fields
                document.getElementById("inputNumericUpload_" + streams).parentNode.remove();
            }
            if (combosin === 1) { //remove sinCombo fields
                document.getElementById("inpute_" + streams).parentNode.remove();
            }

            //create datatype field
            var div4 = document.createElement("div");
            div4.setAttribute("class", "form-group mt-4 group_" + streams);
            var lable3 = document.createElement("label");
            lable3.setAttribute("class", "small mb-1");
            lable3.setAttribute("for", "inputFunction_" + streams);
            lable3.innerText = "Function";
            var select1 = document.createElement("select");
            select1.setAttribute("class", "form-control text-muted");
            select1.setAttribute("id", "inputFunction_" + streams);
            select1.setAttribute("name", "inputFunction_" + streams);
            var optdef1 = document.createElement("option");
            optdef1.setAttribute("selected", "true");
            optdef1.innerText = "Select a function";
            var opt11 = document.createElement("option");
            opt11.setAttribute("value", "sin");
            opt11.innerText = "Sin";
            var opt21 = document.createElement("option");
            opt21.setAttribute("value", "random");
            opt21.innerText = "Random";
            var opt31 = document.createElement("option");
            opt31.setAttribute("value", "sinCombo");
            opt31.innerText = "sinCombo";
            select1.append(optdef1);
            select1.append(opt11);
            select1.append(opt21);
            select1.append(opt31);
            div4.append(lable3);
            div4.append(select1);

            //append after datatype
            var posparent = document.getElementById("inputDatatype_" + streams).parentNode;
            form.insertBefore(div4, posparent.nextSibling);
        }
    }

    /**
     * Function for adding text file stream fields to html
     * 
     * @author: Ryan Draper
     * 
     * @param {array} streams 
     * @param {form} form 
     * @param {input} vals 
     * @param {input} funcs 
     * @param {input} rand 
     * @param {input} sin 
     * @param {input} txtup 
     * @param {input} numup 
     * @param {input} combosin 
     */
    function addTextFile(streams, form, vals, funcs, rand, sin, txtup, numup, combosin) {
        //if text upload field is not already in form
        if (txtup === 0) {
            if (funcs === 1) { //remove numeric field
                document.getElementById("inputFunction_" + streams).parentNode.remove();
            }
            if (rand === 1) { //remove random field
                document.getElementById("inputmin_" + streams).parentNode.remove();
            }
            if (sin === 1) { //remove sin field
                document.getElementById("inputa_" + streams).parentNode.remove();
            }
            if (vals === 1) { //remove text field
                document.getElementById("inputValue_" + streams).parentNode.remove();
            }
            if (numup === 1) { //remove numeric file field
                document.getElementById("inputNumericUpload_" + streams).parentNode.remove();
            }
            if (combosin === 1) { //remove sinCombo field
                document.getElementById("inpute_" + streams).parentNode.remove();
            }

            //create value field
            var div5 = document.createElement("div");
            div5.setAttribute("class", "form-group mt-4 group_" + streams);
            var lable4 = document.createElement("label");
            lable4.setAttribute("class", "small mb-1");
            lable4.setAttribute("for", "inputTextUpload_" + streams);
            lable4.innerText = "Upload Text (txt)";
            var input2 = document.createElement("input");
            input2.setAttribute("type", "file");
            input2.setAttribute("accept", ".txt");
            input2.setAttribute("class", "form-control");
            input2.setAttribute("id", "inputTextUpload_" + streams);
            input2.setAttribute("placeholder", "Upload File");
            input2.setAttribute("name", "inputTextUpload_" + streams);
            div5.append(lable4);
            div5.append(input2);

            //append after datatype
            var posparent = document.getElementById("inputDatatype_" + streams).parentNode;
            form.insertBefore(div5, posparent.nextSibling);
        }
    }

    /**
     * Function for adding numeric file stream fields to html
     * 
     * @author: Ryan Draper
     * 
     * @param {array} streams 
     * @param {form} form 
     * @param {input} vals 
     * @param {input} funcs 
     * @param {input} rand 
     * @param {input} sin 
     * @param {input} txtup 
     * @param {input} numup 
     * @param {input} combosin 
     */
    function addNumericFile(streams, form, vals, funcs, rand, sin, txtup, numup, combosin) {
        //if numeric file field is not already in form
        if (numup === 0) {
            if (funcs === 1) { //remove numeric fields
                document.getElementById("inputFunction_" + streams).parentNode.remove();
            }
            if (rand === 1) { //remove random fields
                document.getElementById("inputmin_" + streams).parentNode.remove();
            }
            if (sin === 1) { //remove sin fields
                document.getElementById("inputa_" + streams).parentNode.remove();
            }
            if (txtup === 1) { //remove text file fields
                document.getElementById("inputTextUpload_" + streams).parentNode.remove();
            }
            if (vals === 1) { //remove text fiels
                document.getElementById("inputValue_" + streams).parentNode.remove();
            }
            if (combosin === 1) { //remove sinCombo fields
                document.getElementById("inpute_" + streams).parentNode.remove();
            }

            //create numeric upload field
            var div6 = document.createElement("div");
            div6.setAttribute("class", "form-group mt-4 group_" + streams);
            var lable5 = document.createElement("label");
            lable5.setAttribute("class", "small mb-1");
            lable5.setAttribute("for", "inputNumericUpload_" + streams);
            lable5.innerText = "Upload Numeric (csv)";
            var input3 = document.createElement("input");
            input3.setAttribute("type", "file");
            input3.setAttribute("accept", ".csv");
            input3.setAttribute("class", "form-control");
            input3.setAttribute("id", "inputNumericUpload_" + streams);
            input3.setAttribute("placeholder", "Enter value");
            input3.setAttribute("name", "inputNumericUpload_" + streams);
            div6.append(lable5);
            div6.append(input3);

            //append after datatype
            var posparent = document.getElementById("inputDatatype_" + streams).parentNode;
            form.insertBefore(div6, posparent.nextSibling);
        }
    }

    /**
     * Function for adding sin stream fields to html
     * 
     * @author: Ryan Draper
     * 
     * @param {array} streams 
     * @param {form} form 
     * @param {input} rand 
     * @param {input} sin 
     * @param {input} combosin 
     */
    function addSin(streams, form, rand, sin, combosin) {
        //if sin field is not already in form
        if (sin === 0) {
            if (rand === 1) { //remove random fields
                document.getElementById("inputmin_" + streams).parentNode.remove();
            }
            if (combosin === 1) { //remove sinCombo fields
                document.getElementById("inpute_" + streams).parentNode.remove();
            }

            //create sin fields
            var div = document.createElement("div");
            div.setAttribute("class", "form-group mt-4 group_" + streams);

            var p = document.createElement("p");
            p.innerHTML = "f(x) = a sin(bx+c)+d";

            var lable = document.createElement("label");
            lable.setAttribute("class", "small mb-1");
            lable.setAttribute("for", "inputa_" + streams);
            lable.innerText = "Amplitude (a)";
            var input = document.createElement("input");
            input.setAttribute("class", "form-control");
            input.setAttribute("id", "inputa_" + streams);
            input.setAttribute("placeholder", "Enter Amplitude");
            input.setAttribute("name", "inputa_" + streams);

            var lable1 = document.createElement("label");
            lable1.setAttribute("class", "small mb-1");
            lable1.setAttribute("for", "inputb_" + streams);
            lable1.innerText = "Horizontal Dilation (b)";
            var input1 = document.createElement("input");
            input1.setAttribute("class", "form-control");
            input1.setAttribute("id", "inputb_" + streams);
            input1.setAttribute("placeholder", "Enter Horizontal Dilation");
            input1.setAttribute("name", "inputb_" + streams);

            var lable2 = document.createElement("label");
            lable2.setAttribute("class", "small mb-1");
            lable2.setAttribute("for", "inputc_" + streams);
            lable2.innerText = "Phase Shift (c)";
            var input2 = document.createElement("input");
            input2.setAttribute("class", "form-control");
            input2.setAttribute("id", "inputc_" + streams);
            input2.setAttribute("placeholder", "Enter Phase Shift");
            input2.setAttribute("name", "inputc_" + streams);

            var lable3 = document.createElement("label");
            lable3.setAttribute("class", "small mb-1");
            lable3.setAttribute("for", "inputd_" + streams);
            lable3.innerText = "Vertical Translation (d)";
            var input3 = document.createElement("input");
            input3.setAttribute("class", "form-control");
            input3.setAttribute("id", "inputd_" + streams);
            input3.setAttribute("placeholder", "Enter Vertical Translation");
            input3.setAttribute("name", "inputd_" + streams);

            var lable4 = document.createElement("label");
            lable4.setAttribute("class", "small mb-1");
            lable4.setAttribute("for", "inputi_" + streams);
            lable4.innerText = "Increment Value (x)";
            var input4 = document.createElement("input");
            input4.setAttribute("class", "form-control");
            input4.setAttribute("id", "inputi_" + streams);
            input4.setAttribute("placeholder", "Enter Increment Value");
            input4.setAttribute("name", "inputi_" + streams);

            var lable5 = document.createElement("label");
            lable5.setAttribute("class", "small mb-1");
            lable5.setAttribute("for", "inputSNominalMin_" + streams);
            lable5.innerText = "Nominal Min";
            var input5 = document.createElement("input");
            input5.setAttribute("class", "form-control");
            input5.setAttribute("id", "inputSNominalMin_" + streams);
            input5.setAttribute("placeholder", "Enter nominal min");
            input5.setAttribute("name", "inputSNominalMin_" + streams);

            var lable6 = document.createElement("label");
            lable6.setAttribute("class", "small mb-1");
            lable6.setAttribute("for", "inputSNominalMax_" + streams);
            lable6.innerText = "Nominal Max";
            var input6 = document.createElement("input");
            input6.setAttribute("class", "form-control");
            input6.setAttribute("id", "inputSNominalMax_" + streams);
            input6.setAttribute("placeholder", "Enter nominal max");
            input6.setAttribute("name", "inputSNominalMax_" + streams);

            div.append(p);
            div.append(lable);
            div.append(input);
            div.append(lable1);
            div.append(input1);
            div.append(lable2);
            div.append(input2);
            div.append(lable3);
            div.append(input3);
            div.append(lable4);
            div.append(input4);
            div.append(lable5);
            div.append(input5);
            div.append(lable6);
            div.append(input6);

            //append after function
            var posparent = document.getElementById("inputFunction_" + streams).parentNode;
            form.insertBefore(div, posparent.nextSibling);
        }
    }

    /**
     * Function for adding random stream fields to html
     * 
     * @author: Ryan Draper
     * 
     * @param {array} streams 
     * @param {form} form 
     * @param {input} rand 
     * @param {input} sin 
     * @param {input} combosin 
     */
    function addRandom(streams, form, rand, sin, combosin) {
        //if random fields not in form
        if (rand === 0) {
            if (sin === 1) { //remove sin fields
                document.getElementById("inputa_" + streams).parentNode.remove();
            }
            if (combosin === 1) { //remove sinCombo fields
                document.getElementById("inpute_" + streams).parentNode.remove();
            }

            //create sin fields
            var div1 = document.createElement("div");
            div1.setAttribute("class", "form-group mt-4 group_" + streams);

            var lable5 = document.createElement("label");
            lable5.setAttribute("class", "small mb-1");
            lable5.setAttribute("for", "inputmin_" + streams);
            lable5.innerText = "Min";
            var input5 = document.createElement("input");
            input5.setAttribute("class", "form-control");
            input5.setAttribute("id", "inputmin_" + streams);
            input5.setAttribute("placeholder", "Enter min");
            input5.setAttribute("name", "inputmin_" + streams);

            var lable6 = document.createElement("label");
            lable6.setAttribute("class", "small mb-1");
            lable6.setAttribute("for", "inputmax_" + streams);
            lable6.innerText = "Max";
            var input6 = document.createElement("input");
            input6.setAttribute("class", "form-control");
            input6.setAttribute("id", "inputmax_" + streams);
            input6.setAttribute("placeholder", "Enter max");
            input6.setAttribute("name", "inputmax_" + streams);

            var lable7 = document.createElement("label");
            lable7.setAttribute("class", "small mb-1");
            lable7.setAttribute("for", "inputRNominalMin_" + streams);
            lable7.innerText = "Nominal Min";
            var input7 = document.createElement("input");
            input7.setAttribute("class", "form-control");
            input7.setAttribute("id", "inputRNominalMin_" + streams);
            input7.setAttribute("placeholder", "Enter nominal min");
            input7.setAttribute("name", "inputRNominalMin_" + streams);

            var lable8 = document.createElement("label");
            lable8.setAttribute("class", "small mb-1");
            lable8.setAttribute("for", "inputRNominalMax_" + streams);
            lable8.innerText = "Nominal Max";
            var input8 = document.createElement("input");
            input8.setAttribute("class", "form-control");
            input8.setAttribute("id", "inputRNominalMax_" + streams);
            input8.setAttribute("placeholder", "Enter nominal max");
            input8.setAttribute("name", "inputRNominalMax_" + streams);

            div1.append(lable5);
            div1.append(input5);
            div1.append(lable6);
            div1.append(input6);
            div1.append(lable7);
            div1.append(input7);
            div1.append(lable8);
            div1.append(input8);

            //append after function
            var posparent = document.getElementById("inputFunction_" + streams).parentNode;
            form.insertBefore(div1, posparent.nextSibling);
        }
    }

    /**
     * Function for adding sinCombo stream fields to html
     * 
     * @author: Stanley Ser
     * @author: Ryan Draper
     * 
     * @param {array} streams 
     * @param {form} form 
     * @param {input} rand 
     * @param {input} sin 
     * @param {input} combosin 
     */
    function addSinCombo(streams, form, rand, sin, combosin) {
        //if comboSin field is not already in form
        if (combosin === 0) {
            if (rand === 1) { //remove random fields
                document.getElementById("inputmin_" + streams).parentNode.remove();
            }
            if (sin === 1) { //remove sin fields
                document.getElementById("inputa_" + streams).parentNode.remove();
            }

            //create sinCombo fields
            var div = document.createElement("div");
            div.setAttribute("class", "form-group mt-4 group_" + streams);

            var p = document.createElement("p");
            p.innerHTML = "f(x) = (e sin(f(j)+g)+h) + (k sin(l(o)+m)+n)";

            var lable = document.createElement("label");
            lable.setAttribute("class", "small mb-1");
            lable.setAttribute("for", "inpute_" + streams);
            lable.innerText = "Amplitude (e)";
            var input = document.createElement("input");
            input.setAttribute("class", "form-control");
            input.setAttribute("id", "inpute_" + streams);
            input.setAttribute("placeholder", "Enter Amplitude");
            input.setAttribute("name", "inpute_" + streams);

            var lable1 = document.createElement("label");
            lable1.setAttribute("class", "small mb-1");
            lable1.setAttribute("for", "inputf_" + streams);
            lable1.innerText = "Horizontal Dilation (f)";
            var input1 = document.createElement("input");
            input1.setAttribute("class", "form-control");
            input1.setAttribute("id", "inputf_" + streams);
            input1.setAttribute("placeholder", "Enter Horizontal Dilation");
            input1.setAttribute("name", "inputf_" + streams);

            var lable2 = document.createElement("label");
            lable2.setAttribute("class", "small mb-1");
            lable2.setAttribute("for", "inputg_" + streams);
            lable2.innerText = "Phase Shift (g)";
            var input2 = document.createElement("input");
            input2.setAttribute("class", "form-control");
            input2.setAttribute("id", "inputg_" + streams);
            input2.setAttribute("placeholder", "Enter Phase Shift");
            input2.setAttribute("name", "inputg_" + streams);

            var lable3 = document.createElement("label");
            lable3.setAttribute("class", "small mb-1");
            lable3.setAttribute("for", "inputh_" + streams);
            lable3.innerText = "Vertical Translation (h)";
            var input3 = document.createElement("input");
            input3.setAttribute("class", "form-control");
            input3.setAttribute("id", "inputh_" + streams);
            input3.setAttribute("placeholder", "Enter Vertical Translation");
            input3.setAttribute("name", "inputh_" + streams);

            var lable4 = document.createElement("label");
            lable4.setAttribute("class", "small mb-1");
            lable4.setAttribute("for", "inputj_" + streams);
            lable4.innerText = "Increment Value (j)";
            var input4 = document.createElement("input");
            input4.setAttribute("class", "form-control");
            input4.setAttribute("id", "inputj_" + streams);
            input4.setAttribute("placeholder", "Enter Increment Value");
            input4.setAttribute("name", "inputj_" + streams);

            var lable7 = document.createElement("label");
            lable7.setAttribute("class", "small mb-1");
            lable7.setAttribute("for", "inputk_" + streams);
            lable7.innerText = "Amplitude (k)";
            var input7 = document.createElement("input");
            input7.setAttribute("class", "form-control");
            input7.setAttribute("id", "inputk_" + streams);
            input7.setAttribute("placeholder", "Enter Amplitude");
            input7.setAttribute("name", "inputk_" + streams);

            var lable8 = document.createElement("label");
            lable8.setAttribute("class", "small mb-1");
            lable8.setAttribute("for", "inputl_" + streams);
            lable8.innerText = "Horizontal Dilation (l)";
            var input8 = document.createElement("input");
            input8.setAttribute("class", "form-control");
            input8.setAttribute("id", "inputl_" + streams);
            input8.setAttribute("placeholder", "Enter Horizontal Dilation");
            input8.setAttribute("name", "inputl_" + streams);

            var lable9 = document.createElement("label");
            lable9.setAttribute("class", "small mb-1");
            lable9.setAttribute("for", "inputm_" + streams);
            lable9.innerText = "Phase Shift (m)";
            var input9 = document.createElement("input");
            input9.setAttribute("class", "form-control");
            input9.setAttribute("id", "inputm_" + streams);
            input9.setAttribute("placeholder", "Enter Phase Shift");
            input9.setAttribute("name", "inputm_" + streams);

            var lable10 = document.createElement("label");
            lable10.setAttribute("class", "small mb-1");
            lable10.setAttribute("for", "inputn_" + streams);
            lable10.innerText = "Vertical Translation (n)";
            var input10 = document.createElement("input");
            input10.setAttribute("class", "form-control");
            input10.setAttribute("id", "inputn_" + streams);
            input10.setAttribute("placeholder", "Enter Vertical Translation");
            input10.setAttribute("name", "inputn_" + streams);

            var lable11 = document.createElement("label");
            lable11.setAttribute("class", "small mb-1");
            lable11.setAttribute("for", "inputo_" + streams);
            lable11.innerText = "Increment Value (o)";
            var input11 = document.createElement("input");
            input11.setAttribute("class", "form-control");
            input11.setAttribute("id", "inputo_" + streams);
            input11.setAttribute("placeholder", "Enter Increment Value");
            input11.setAttribute("name", "inputo_" + streams);

            var lable12 = document.createElement("label");
            lable12.setAttribute("class", "small mb-1");
            lable12.setAttribute("for", "inputCsSNominalMin_" + streams);
            lable12.innerText = "Nominal Min";
            var input12 = document.createElement("input");
            input12.setAttribute("class", "form-control");
            input12.setAttribute("id", "inputCsSNominalMin_" + streams);
            input12.setAttribute("placeholder", "Enter nominal min");
            input12.setAttribute("name", "inputCsSNominalMin_" + streams);

            var lable13 = document.createElement("label");
            lable13.setAttribute("class", "small mb-1");
            lable13.setAttribute("for", "inputCsSNominalMax_" + streams);
            lable13.innerText = "Nominal Max";
            var input13 = document.createElement("input");
            input13.setAttribute("class", "form-control");
            input13.setAttribute("id", "inputCsSNominalMax_" + streams);
            input13.setAttribute("placeholder", "Enter nominal max");
            input13.setAttribute("name", "inputCsSNominalMax_" + streams);

            div.append(p);
            div.append(lable);
            div.append(input);
            div.append(lable1);
            div.append(input1);
            div.append(lable2);
            div.append(input2);
            div.append(lable3);
            div.append(input3);
            div.append(lable4);
            div.append(input4);

            div.append(lable7);
            div.append(input7);
            div.append(lable8);
            div.append(input8);
            div.append(lable9);
            div.append(input9);
            div.append(lable10);
            div.append(input10);
            div.append(lable11);
            div.append(input11);
            div.append(lable12);
            div.append(input12);
            div.append(lable13);
            div.append(input13);

            //append after function
            var posparent = document.getElementById("inputFunction_" + streams).parentNode;
            form.insertBefore(div, posparent.nextSibling);
        }
    }

    /**
     * Function for adding new stream fields
     * 
     * @author: Ryan Draper
     * 
     * @param {array} streams 
     * @param {form} form 
     */
    function addStreamFields(streams, form) {
        //create stream title label
        var streamtitle = document.createElement("label");
        streamtitle.setAttribute("class", "medium stream");
        streamtitle.innerHTML = "<strong>Stream " + streams + "</strong>";

        //create row element
        var row = document.createElement("div");
        row.setAttribute("class", "row mt-4 mb-1 group_" + streams);

        //create col element
        var col = document.createElement("div");
        col.setAttribute("class", "col-lg-12");
        var hr = document.createElement("hr");
        col.append(hr);

        //create another col element
        var col1 = document.createElement("div");
        col1.setAttribute("class", "col");
        col1.append(streamtitle);

        //append cols to row
        row.append(col);
        row.append(col1);

        //append row to form
        form.append(row);

        //create dataname div
        var div1 = document.createElement("div");
        div1.setAttribute("class", "form-group group_" + streams);

        //create label for dataname
        var lable1 = document.createElement("label");
        lable1.setAttribute("class", "small mb-1");
        lable1.setAttribute("for", "inputDataname_" + streams);
        lable1.innerText = "Dataname";

        //create input field for dataname
        var input = document.createElement("input");
        input.setAttribute("class", "form-control");
        input.setAttribute("id", "inputDataname_" + streams);
        input.setAttribute("placeholder", "Enter dataname");
        input.setAttribute("name", "inputDataname_" + streams);

        //append label and input to dataname div
        div1.append(lable1);
        div1.append(input);

        //create datatype field
        var div2 = document.createElement("div");
        div2.setAttribute("class", "form-group mt-4 group_" + streams);
        var lable2 = document.createElement("label");
        lable2.setAttribute("class", "small mb-1");
        lable2.setAttribute("for", "inputDatatype_" + streams);
        lable2.innerText = "Datatype";
        var select = document.createElement("select");
        select.setAttribute("class", "form-control text-muted");
        select.setAttribute("id", "inputDatatype_" + streams);
        select.setAttribute("name", "inputDatatype_" + streams);
        var optdef = document.createElement("option");
        optdef.setAttribute("selected", "true");
        optdef.innerText = "Select a datatype";
        var opt1 = document.createElement("option");
        opt1.setAttribute("value", "text");
        opt1.innerText = "Text";
        var opt2 = document.createElement("option");
        opt2.setAttribute("value", "numeric");
        opt2.innerText = "Numeric";
        var opt3 = document.createElement("option");
        opt3.setAttribute("value", "text upload");
        opt3.innerText = "Text Upload";
        var opt4 = document.createElement("option");
        opt4.setAttribute("value", "numeric upload");
        opt4.innerText = "Numeric Upload";
        select.append(optdef);
        select.append(opt1);
        select.append(opt2);
        select.append(opt3);
        select.append(opt4);
        div2.append(lable2);
        div2.append(select);

        //append fields to form
        form.append(div1);
        form.append(div2);
    }

    /**
     * Function for adding new stream when add stream button clicked
     * 
     * @author: Ryan Draper
     */
    function addStream() {
        //create new form element
        var form = document.getElementById("createForm");

        //get number of stream fields in form
        var streams = form.querySelectorAll(".stream").length + 1;

        //call function for adding inputs to html
        addStreamFields(streams, form);

        //On datatype change
        $("#inputDatatype_" + streams).on("change", function() {
            //get selected datatype
            var dt = document.getElementById("inputDatatype_" + streams).value;

            //get number of stream fields in form
            var vals = form.querySelectorAll("#inputValue_" + streams).length; //text
            var funcs = form.querySelectorAll("#inputFunction_" + streams).length; //numeric
            var sin = form.querySelectorAll("#inputa_" + streams).length; //sin
            var rand = form.querySelectorAll("#inputmin_" + streams).length; //random
            var txtup = form.querySelectorAll("#inputTextUpload_" + streams).length; //text upload
            var numup = form.querySelectorAll("#inputNumericUpload_" + streams).length; //numeric upload
            var combosin = form.querySelectorAll("#inpute_" + streams).length; //sinCombo

            if (dt === "text") { //if text selected
                addText(streams, form, vals, funcs, rand, sin, txtup, numup, combosin);
            } else if (dt === "numeric") { //if numeric selected
                addNumeric(streams, form, vals, funcs, txtup, numup, combosin);
            } else if (dt === "text upload") { //if text upload selected
                addTextFile(streams, form, vals, funcs, rand, sin, txtup, numup, combosin);
            } else if (dt === "numeric upload") { //if numeric upload selected
                addNumericFile(streams, form, vals, funcs, rand, sin, txtup, numup, combosin);
            }

            //event listener for numeric function select change
            $("#inputFunction_" + streams).on("change", function() {
                var func = document.getElementById("inputFunction_" + streams).value;

                //get number of stream fields in form
                var sin = form.querySelectorAll("#inputa_" + streams).length; //sin
                var rand = form.querySelectorAll("#inputmin_" + streams).length; //random
                var combosin = form.querySelectorAll("#inpute_" + streams).length; //sinCombo

                if (func === "sin") { //sin selected
                    addSin(streams, form, rand, sin, combosin);
                } else if (func === "random") { //random selected
                    addRandom(streams, form, rand, sin, combosin);
                } else if (func === "sinCombo") { //sinCombo selected
                    addSinCombo(streams, form, rand, sin, combosin);
                }
            });
        });
    }

    /**
     * on click listener for add stream button
     * 
     * @author: Ryan Draper
     */
    $("#addBtn").on("click", function() {
        //call add stream function
        addStream();
    });

    /**
     * Function for saving text stream
     * 
     * @author: Ryan Draper
     * 
     * @param {array} streams 
     * @param {string} dn 
     * @param {int} i 
     */
    function saveText(streams, dn, i) {
        var value = document.getElementById("inputValue_" + i).value.trim();
        //add stream to array
        streams.push(text(dn, value));
    }

    /**
     * Function for saving sin stream
     * 
     * @author: Ryan Draper
     * 
     * @param {array} streams 
     * @param {string} dn 
     * @param {int} i 
     */
    function saveSin(streams, dn, i) {
        var a = document.getElementById("inputa_" + i).value.trim();
        var b = document.getElementById("inputb_" + i).value.trim();
        var c = document.getElementById("inputc_" + i).value.trim();
        var d = document.getElementById("inputd_" + i).value.trim();
        var inc = document.getElementById("inputi_" + i).value.trim();
        var nominal_min = document.getElementById("inputSNominalMin_" + i).value.trim();
        var nominal_max = document.getElementById("inputSNominalMax_" + i).value.trim();

        //add sin object to array
        streams.push(sin(dn, a, b, c, d, inc, nominal_min, nominal_max));
    }

    /**
     * Function for saving random stream
     * 
     * @author: Ryan Draper
     * 
     * @param {array} streams 
     * @param {string} dn 
     * @param {int} i 
     */
    function saveRandom(streams, dn, i) {
        var min = document.getElementById("inputmin_" + i).value.trim();
        var max = document.getElementById("inputmax_" + i).value.trim();
        var nominal_min = document.getElementById("inputRNominalMin_" + i).value.trim();
        var nominal_max = document.getElementById("inputRNominalMax_" + i).value.trim();

        //add random object to array
        streams.push(random(dn, min, max, nominal_min, nominal_max));
    }

    /**
     * Function for saving sinCombo stream
     * 
     * @author: Stanley Ser
     * @author: Ryan Draper
     * 
     * @param {array} streams 
     * @param {string} dn 
     * @param {int} i 
     */
    function saveSinCombo(streams, dn, i) {
        var e = document.getElementById("inpute_" + i).value.trim();
        var f = document.getElementById("inputf_" + i).value.trim();
        var g = document.getElementById("inputg_" + i).value.trim();
        var h = document.getElementById("inputh_" + i).value.trim();
        var j = document.getElementById("inputj_" + i).value.trim();
        var k = document.getElementById("inputk_" + i).value.trim();
        var l = document.getElementById("inputl_" + i).value.trim();
        var m = document.getElementById("inputm_" + i).value.trim();
        var n = document.getElementById("inputn_" + i).value.trim();
        var o = document.getElementById("inputo_" + i).value.trim();
        var second_nominal_min = document.getElementById("inputCsSNominalMin_" + i).value.trim();
        var second_nominal_max = document.getElementById("inputCsSNominalMax_" + i).value.trim();

        //add sinCombo object to array
        streams.push(sinCombo(dn, e, f, g, h, j, k, l, m, n, o, second_nominal_min, second_nominal_max));
    }

    /**
     * Function for saving text file stream
     * asynchronous so that file is saved to directory before stream is added
     * 
     * @author: Ryan Draper
     * 
     * @param {array} streams 
     * @param {string} dn 
     * @param {int} i 
     */
    async function saveTextFile(streams, dn, i) {
        var upfile = document.getElementById("inputTextUpload_" + i).files[0];
        var fd = new FormData();

        //append uploaded file to formData element
        fd.append("file", upfile);

        //send post json data to url
        await fetch("../php/saveText.php", {
                method: "POST",
                body: fd,
            })
            .then((response) => response.json())
            .then((data) => {
                var filename = data["filename"];
                var directory = data["directory"];

                //add text file stream to array
                streams.push(textFile(dn, filename, directory));
            })
            .catch((err) => console.error(err)); //catch error
    }

    /**
     * Function for saving numeric file stream
     * asynchronous so that file is saved to directory before stream is added
     * 
     * @author: Ryan Draper
     * 
     * @param {array} streams 
     * @param {int} i 
     */
    async function saveNumericFile(streams, i) {
        var upfile = document.getElementById("inputNumericUpload_" + i).files[0];
        var fd = new FormData();

        //append uploaded file to formData element
        fd.append("file", upfile);

        //send post json data to url
        await fetch("../php/saveFile.php", {
                method: "POST",
                body: fd,
            })
            .then((response) => response.json())
            .then((data) => {
                //get all csv header names
                var hdatanames = data["hdataname"];

                //for each header, create stream
                hdatanames.forEach((el) => {
                    var filename = data["filename"];
                    var directory = data["directory"];

                    //add numeric file stream to array
                    streams.push(numericFile(el.dataname, filename, directory));
                });
            })
            .catch((err) => console.error(err)); //catch error
    }

    /**
     * Function for saving all streams to their respective database table
     * 
     * @author: Ryan Draper
     * 
     * @param {string} username 
     * @param {string} panelname 
     * @param {int} panel_id 
     * @param {array} streams 
     */
    function saveStreams(username, panelname, panel_id, streams) {
        //create object containing all panel information
        var data = {
            username: username,
            panelname: panelname,
            panel_id: panel_id,
            streams: streams
        };

        //send post json data to url
        fetch("../php/addstream.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            .then((response) => response.text())
            .then((data) => {
                if (data == "stream added successfully") {
                    alert(data);
                    //expire cookie
                    document.cookie = "panel_id= ; expires = Thu, 01 Jan 1970 00:00:00 GMT; path=/";
                    //return to panels page
                    window.location.replace("./panels.html");
                } else {
                    //if returned message other than stream added successfully
                    alert(data);
                }
            })
            .catch((err) => console.error(err)); //catch error
    }

    /**
     * Function for initiating the saving of stream data
     * 
     * @author: Ryan Draper
     * 
     * @param {string} username 
     * @param {int} panel_id 
     */
    async function saveData(username, panel_id) {
        var form = document.getElementById("createForm");

        //get number of added streams
        var streamcount = form.querySelectorAll(".stream").length;

        //get selected panel name
        var panelname = document.getElementById("inputPanelname").value.trim();

        //array for storing stream objects
        var streams = [];

        //for each added stream
        for (var i = 1; i < streamcount + 1; i++) {
            //get dataname and datatype
            var dn = document.getElementById("inputDataname_" + i).value.trim();
            var dt = document.getElementById("inputDatatype_" + i).value.trim();

            if (dt === "text") { //if text stream
                saveText(streams, dn, i);
            } else if (dt === "numeric") { //if numeric stream
                var num = document.getElementById("inputFunction_" + i).value;
                if (num === "sin") { //if sin stream
                    saveSin(streams, dn, i);
                } else if (num === "random") { //if random stream
                    saveRandom(streams, dn, i);
                } else if (num === "sinCombo") { //if sinCombo stream
                    saveSinCombo(streams, dn, i);
                }
            } else if (dt === "text upload") { //if text file stream
                await saveTextFile(streams, dn, i);
            } else if (dt === "numeric upload") { //if numeric file stream
                await saveNumericFile(streams, i);
            }
        }

        //Pares panel information to saveStreams for saving to database
        saveStreams(username, panelname, panel_id, streams);
    }

})(jQuery);