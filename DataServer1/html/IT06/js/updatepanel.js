/**
 * Copyright (c) 2020
 *
 * This file contains all of the necessary functionality for updating panels
 * on the update panel page of the web interface.
 *
 * @summary Functionality for update panel page on the web interface
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
            while (c.charAt(0) == " ") {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    /**
     * Function for removing whitespace from a string
     * 
     * @author: Ryan Draper
     * 
     * @param {string} string 
     * 
     * @returns string
     */
    function removeWhitespace(string) {
        var res = string.split(" ");
        var reslen = res.length;
        if (reslen > 1) {
            var newStr = "";
            for (var z = 0; z < reslen; z++) {
                newStr += res[z];
            }
        } else {
            var newStr = string;
        }

        return newStr;
    }

    /**
     * Removes the selected stream from the selected panel
     * 
     * @author: Ryan Draper
     * 
     * @param {object} element 
     */
    function removestream(element) {
        var data = {
            panel_id: element.panel_id,
            dataname: element.dataname
        };
        //send post json data to url
        fetch("../php/removeStream.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            .then((response) => response.text())
            .then((data) => {
                alert(data);
                if (data == "removed") {
                    window.location.replace("./updatepanel.html");
                }
            })
            .catch((err) => console.log(err)); //catch error
    }

    /**
     * Sends text stream updates to php for change
     * 
     * @author: Ryan Draper
     * 
     * @param {string} panel_id 
     * @param {string} oldDn 
     * @param {string} newDn 
     * @param {string} dt 
     * @param {string} val 
     */
    function streamChangesText(panel_id, oldDn, newDn, dt, val) {
        var data = {
            panel_id: panel_id,
            oldDataname: oldDn,
            dataname: newDn,
            datatype: dt,
            value: val
        };
        //send post json data to url
        fetch("../php/updateStream.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            .then((response) => response.text())
            .then((data) => {
                alert(data);
                if (data == "updated") {
                    window.location.replace("./updatepanel.html");
                }
            })
            .catch((err) => console.log(err)); //catch error
    }

    /**
     * Sends text file stream updates to php for change
     * 
     * @author: Ryan Draper
     * 
     * @param {string} panel_id 
     * @param {string} oldDn 
     * @param {string} newDn 
     * @param {string} dt 
     * @param {string} fn 
     */
    function streamChangesTextFile(panel_id, oldDn, newDn, dt, fn) {
        var data = {
            panel_id: panel_id,
            oldDataname: oldDn,
            dataname: newDn,
            datatype: dt,
            filename: fn
        };
        //send post json data to url
        fetch("../php/updateStream.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            .then((response) => response.text())
            .then((data) => {
                alert(data);
                if (data == "updated") {
                    window.location.replace("./updatepanel.html");
                }
            })
            .catch((err) => console.log(err)); //catch error
    }

    /**
     * Sends numeric file stream updates to php for change
     * 
     * @author: Ryan Draper
     * 
     * @param {string} panel_id 
     * @param {string} oldDn 
     * @param {string} newDn 
     * @param {string} dt 
     * @param {string} fn 
     */
    function streamChangesNumericFile(panel_id, oldDn, newDn, dt, fn) {
        var data = {
            panel_id: panel_id,
            oldDataname: oldDn,
            dataname: newDn,
            datatype: dt,
            filename: fn
        };
        //send post json data to url
        fetch("../php/updateStream.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            .then((response) => response.text())
            .then((data) => {
                alert(data);
                if (data == "updated") {
                    window.location.replace("./updatepanel.html");
                }
            })
            .catch((err) => console.log(err)); //catch error
    }

    /**
     * Sends sin stream updates to php for change
     * 
     * @author: Ryan Draper
     * 
     * @param {string} panel_id 
     * @param {string} oldDn 
     * @param {string} newDn 
     * @param {string} dt 
     * @param {float} nomMin 
     * @param {float} nomMax 
     * @param {float} a 
     * @param {float} b 
     * @param {float} c 
     * @param {float} d 
     * @param {float} i 
     */
    function streamChangesSin(panel_id, oldDn, newDn, dt, nomMin, nomMax, a, b, c, d, i) {
        var data = {
            panel_id: panel_id,
            oldDataname: oldDn,
            dataname: newDn,
            datatype: dt,
            nominal_min: nomMin,
            nominal_max: nomMax,
            a: a,
            b: b,
            c: c,
            d: d,
            i: i
        };
        //send post json data to url
        fetch("../php/updateStream.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            .then((response) => response.text())
            .then((data) => {
                alert(data);
                if (data == "updated") {
                    window.location.replace("./updatepanel.html");
                }
            })
            .catch((err) => console.log(err)); //catch error
    }

    /**
     * Sends sinCombo stream updates to php for change
     * 
     * @author: Ryan Draper
     * 
     * @param {string} panel_id 
     * @param {string} oldDn 
     * @param {string} newDn 
     * @param {string} dt 
     * @param {float} nomMin 
     * @param {float} nomMax 
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
     */
    function streamChangesSinCombo(panel_id, oldDn, newDn, dt, nomMin, nomMax, e, f, g, h, j, k, l, m, n, o) {
        var data = {
            panel_id: panel_id,
            oldDataname: oldDn,
            dataname: newDn,
            datatype: dt,
            nominal_min: nomMin,
            nominal_max: nomMax,
            e: e,
            f: f,
            g: g,
            h: h,
            j: j,
            k: k,
            l: l,
            m: m,
            n: n,
            o: o
        };
        //send post json data to url
        fetch("../php/updateStream.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            .then((response) => response.text())
            .then((data) => {
                alert(data);
                if (data == "updated") {
                    window.location.replace("./updatepanel.html");
                }
            })
            .catch((err) => console.log(err)); //catch error
    }

    /**
     * Sends random stream updates to php for change
     * 
     * @author: Ryan Draper
     * 
     * @param {string} panel_id 
     * @param {string} oldDn 
     * @param {string} newDn 
     * @param {string} dt 
     * @param {float} nomMin 
     * @param {float} nomMax 
     * @param {float} min 
     * @param {float} max 
     */
    function streamChangesRandom(panel_id, oldDn, newDn, dt, nomMin, nomMax, min, max) {
        var data = {
            panel_id: panel_id,
            oldDataname: oldDn,
            dataname: newDn,
            datatype: dt,
            nominal_min: nomMin,
            nominal_max: nomMax,
            min: min,
            max: max
        };
        //send post json data to url
        fetch("../php/updateStream.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            .then((response) => response.text())
            .then((data) => {
                alert(data);
                if (data == "updated") {
                    window.location.replace("./updatepanel.html");
                }
            })
            .catch((err) => console.log(err)); //catch error
    }

    /**
     * Validates inputs for text stream
     * 
     * @author: Ryan Draper
     * 
     * @param {string} dn 
     * @param {string} dt 
     * @param {string} val 
     * 
     * @returns boolean
     */
    function validateText(dn, dt, val) {
        if (dn == "") {
            alert("dataname cannot be empty");
            return false;
        } else if (dt == "") {
            alert("datatype cannot be empty");
            return false;
        } else if (val == "") {
            alert("value cannot be empty");
            return false;
        } else if (dt != "string" && dt != "float") {
            alert("datatype can only be string or float");
            return false;
        } else {
            return true;
        }
    }

    /**
     * Validates inputs for sin stream
     * 
     * @author: Ryan Draper
     * 
     * @param {string} dn 
     * @param {string} dt 
     * @param {float} nomMin 
     * @param {float} nomMax 
     * @param {float} aa 
     * @param {float} b 
     * @param {float} c 
     * @param {float} d 
     * @param {float} i 
     * 
     * @returns boolean
     */
    function validateSin(dn, dt, nomMin, nomMax, aa, b, c, d, i) {
        if (dn == "") {
            alert("dataname cannot be empty");
            return false;
        } else if (dt == "") {
            alert("datatype cannot be empty");
            return false;
        } else if (dt != "float") {
            alert("datatype can only be float");
            return false;
        } else if (nomMin == "" || nomMax == "") {
            alert("all nominal values are required");
            return false;
        } else if (parseFloat(nomMin) > parseFloat(nomMax)) {
            alert("nominal min must be less or equal to nominal max");
            return false;
        } else if (aa == "" || b == "" || c == "" || d == "" || i == "") {
            alert("all sin function values are required");
            return false;
        } else {
            return true;
        }
    }

    /**
     * Validates inputs for sinCombo stream
     * 
     * @author: Ryan Draper
     * 
     * @param {string} dn 
     * @param {string} dt 
     * @param {float} nomMin 
     * @param {float} nomMax 
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
     * 
     * @returns boolean
     */
    function validateSinCombo(dn, dt, nomMin, nomMax, e, f, g, h, j, k, l, m, n, o) {
        if (dn == "") {
            alert("dataname cannot be empty");
            return false;
        } else if (dt == "") {
            alert("datatype cannot be empty");
            return false;
        } else if (dt != "float") {
            alert("datatype can only be float");
            return false;
        } else if (nomMin == "" || nomMax == "") {
            alert("all nominal values are required");
            return false;
        } else if (parseFloat(nomMin) > parseFloat(nomMax)) {
            alert("nominal min must be less or equal to nominal max");
            return false;
        } else if (e == "" || f == "" || g == "" || h == "" || j == "" || k == "" || l == "" || m == "" || n == "" || o == "") {
            alert("all sin function values are required");
            return false;
        } else {
            return true;
        }
    }

    /**
     * Validates inputs for random stream
     * 
     * @author: Ryan Draper
     * 
     * @param {string} dn 
     * @param {string} dt 
     * @param {float} nomMin 
     * @param {float} nomMax 
     * @param {float} mmin 
     * @param {float} max 
     * 
     * @returns boolean
     */
    function validateRandom(dn, dt, nomMin, nomMax, mmin, max) {
        if (dn == "") {
            alert("dataname cannot be empty");
            return false;
        } else if (dt == "") {
            alert("datatype cannot be empty");
            return false;
        } else if (dt != "float") {
            alert("datatype can only be float");
            return false;
        } else if (nomMin == "" || nomMax == "") {
            alert("all nominal values are required");
            return false;
        } else if (mmin == "" || max == "") {
            alert("all random function values are required");
            return false;
        } else if (parseFloat(nomMin) > parseFloat(nomMax)) {
            alert("nominal min must be less or equal to nominal max");
            return false;
        } else if (parseFloat(mmin) > parseFloat(max)) {
            alert("min must be less or equal to max");
            return false;
        } else {
            return true;
        }
    }

    /**
     * Validates inputs for text file stream
     * 
     * @author: Ryan Draper
     * 
     * @param {string} dn 
     * @param {string} dt 
     * @param {string} fn 
     * 
     * @returns boolean
     */
    function validateTextFile(dn, dt, fn) {
        if (dn == "") {
            alert("dataname cannot be empty");
            return false;
        } else if (dt == "") {
            alert("datatype cannot be empty");
            return false;
        } else if (dt != "string") {
            alert("datatype can only be string");
            return false;
        } else if (fn == "") {
            alert("please upload a file");
            return false;
        } else {
            return true;
        }
    }

    /**
     * Validates inputs for numeric file streams
     * 
     * @author: Ryan Draper
     * 
     * @param {string} dn 
     * @param {string} dt 
     * @param {string} fn 
     * 
     * @returns boolean
     */
    function validateNumericFile(dn, dt, fn) {
        if (dn == "") {
            alert("dataname cannot be empty");
            return false;
        } else if (dt == "") {
            alert("datatype cannot be empty");
            return false;
        } else if (dt != "float") {
            alert("datatype can only be float");
            return false;
        } else if (fn == "") {
            alert("please upload a file");
            return false;
        } else {
            return true;
        }
    }

    /**
     * Function for saving sin stream updates
     * 
     * @author: Ryan Draper
     * 
     * @param {object} element 
     */
    function saveSin(element) {
        var dn = document.getElementById("inputDataname").value.trim();
        var dt = document.getElementById("inputDatatype").value.trim();
        var nomMin = document.getElementById("inputNominalMin").value.trim();
        var nomMax = document.getElementById("inputNominalMax").value.trim();
        var aa = document.getElementById("inputA").value.trim();
        var b = document.getElementById("inputB").value.trim();
        var c = document.getElementById("inputC").value.trim();
        var d = document.getElementById("inputD").value.trim();
        var i = document.getElementById("inputI").value.trim();

        if (validateSin(dn, dt, nomMin, nomMax, aa, b, c, d, i)) {
            streamChangesSin(element.panel_id, element.dataname, dn, dt, nomMin, nomMax, aa, b, c, d, i);
        }
    }

    /**
     * Function for saving sinCombo stream updates
     * 
     * @author: Ryan Draper
     * 
     * @param {object} element 
     */
    function saveSinCombo(element) {
        var dn = document.getElementById("inputDataname").value.trim();
        var dt = document.getElementById("inputDatatype").value.trim();
        var nomMin = document.getElementById("inputNominalMin").value.trim();
        var nomMax = document.getElementById("inputNominalMax").value.trim();
        var e = document.getElementById("inputE").value.trim();
        var f = document.getElementById("inputF").value.trim();
        var g = document.getElementById("inputG").value.trim();
        var h = document.getElementById("inputH").value.trim();
        var j = document.getElementById("inputJ").value.trim();
        var k = document.getElementById("inputK").value.trim();
        var l = document.getElementById("inputL").value.trim();
        var m = document.getElementById("inputM").value.trim();
        var n = document.getElementById("inputN").value.trim();
        var o = document.getElementById("inputO").value.trim();

        if (validateSinCombo(dn, dt, nomMin, nomMax, e, f, g, h, j, k, l, m, n, o)) {
            streamChangesSinCombo(element.panel_id, element.dataname, dn, dt, nomMin, nomMax, e, f, g, h, j, k, l, m, n, o);
        }
    }

    /**
     * Function for saving random stream updates
     * 
     * @author: Ryan Draper
     * 
     * @param {object} element 
     */
    function saveRandom(element) {
        var dn = document.getElementById("inputDataname").value.trim();
        var dt = document.getElementById("inputDatatype").value.trim();
        var nomMin = document.getElementById("inputNominalMin").value.trim();
        var nomMax = document.getElementById("inputNominalMax").value.trim();
        var mmin = document.getElementById("inputMin").value.trim();
        var max = document.getElementById("inputMax").value.trim();

        if (validateRandom(dn, dt, nomMin, nomMax, mmin, max)) {
            streamChangesRandom(element.panel_id, element.dataname, dn, dt, nomMin, nomMax, mmin, max);
        }
    }

    /**
     * Function for saving text stream stream updates
     * 
     * @author: Ryan Draper
     * 
     * @param {object} element 
     */
    function saveText(element) {
        var dn = document.getElementById("inputDataname").value.trim();
        var dt = document.getElementById("inputDatatype").value.trim();
        var val = document.getElementById("inputValue").value.trim();

        //check values are valid
        if (validateText(dn, dt, val)) {
            streamChangesText(element.panel_id, element.dataname, dn, dt, val);
        }
    }

    /**
     * Function for saving text and numeric file stream updates
     * 
     * @author: Ryan Draper
     * 
     * @param {object} element 
     */
    function saveFile(element) {
        var dn = document.getElementById("inputDataname").value.trim();
        var dt = document.getElementById("inputDatatype").value.trim();
        var fn = document.getElementById("inputFilename").value.trim();

        if (dt == "string") { //text file
            if (validateTextFile(dn, dt, fn)) {
                streamChangesTextFile(element.panel_id, element.dataname, dn, dt, fn);
            }
        } else if (dt == "float") { //numeric file
            if (validateNumericFile(dn, dt, fn)) {
                streamChangesNumericFile(element.panel_id, element.dataname, dn, dt, fn);
            }
        }
    }

    /**
     * Function for calling the appropriate save function for the stream type
     * 
     * @author: Ryan Draper
     * 
     * @param {object} element 
     */
    function saveData(element) {
        var value = element.value;
        var a = element.a;
        var min = element.min;
        var filename = element.filename;
        var e = element.e;

        //text stream
        if (typeof(value) != "undefined") {
            saveText(element);
        }

        //sin stream
        if (typeof(a) != "undefined") {
            saveSin(element);
        }

        //sinCombo stream
        if (typeof(e) != "undefined") {
            saveSinCombo(element);
        }

        //random stream
        if (typeof(min) != "undefined") {
            saveRandom(element);
        }

        //file stream
        if (typeof(filename) != "undefined") {
            saveFile(element);
        }
    }

    /**
     * Creates inputs for text streams
     * 
     * @author: Ryan Draper
     * 
     * @param {html element} info 
     * @param {object} element 
     */
    function setText(info, element) {
        if (info.children.length > 1) {
            info.removeChild(info.lastChild);
        }

        var ul = document.createElement("ul");
        ul.setAttribute("class", "list-group list-group-flush");

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<label for'inputDataname' class='small mb-1'>Dataname:</label><br/>" +
            "<input type='text' id='inputDataname' class='form-control py-4' value='" + element.dataname + "'/>";
        ul.append(li);

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<label for'inputDatatype' class='small mb-1'>Datatype:</label><br/>" +
            "<input type='text' id='inputDatatype' class='form-control py-4' value='" + element.datatype + "'/>";
        ul.append(li);

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<label for'inputValue' class='small mb-1'>Value:</label><br/>" +
            "<input type='text' id='inputValue' class='form-control py-4' value='" + element.value + "'/>";
        ul.append(li);

        //create buttons for saving and removing streams
        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<input type='button' id='removeBtn' class='btn btn-primary btn-block' value='Remove Stream'/>";
        ul.append(li);

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<input type='button' id='saveBtn' class='btn btn-primary btn-block' value='Save Updates'/>";
        ul.append(li);

        info.append(ul);
    }

    /**
     * Creates inputs for sin streams
     * 
     * @author: Ryan Draper
     * 
     * @param {html element} info 
     * @param {object} element 
     */
    function setSin(info, element) {
        if (info.children.length > 1) {
            info.removeChild(info.lastChild);
        }

        var ul = document.createElement("ul");
        ul.setAttribute("class", "list-group list-group-flush");

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<label for'inputDataname' class='small mb-1'>Dataname:</label><br/>" +
            "<input type='text' id='inputDataname' class='form-control py-4' value='" + element.dataname + "'/>";
        ul.append(li);

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<label for'inputDatatype' class='small mb-1'>Datatype:</label><br/>" +
            "<input type='text' id='inputDatatype' class='form-control py-4' value='" + element.datatype + "'/>";
        ul.append(li);

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<label for'inputNominalMin' class='small mb-1'>Nominal Min:</label><br/>" +
            "<input type='text' id='inputNominalMin' class='form-control py-4' value='" + element.nominal_min + "'/>";
        ul.append(li);

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<label for'inputNominalMax' class='small mb-1'>Nominal Max:</label><br/>" +
            "<input type='text' id='inputNominalMax' class='form-control py-4' value='" + element.nominal_max + "'/>";
        ul.append(li);

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<p class='medium mb-1'>f(x) = a sin(bx+c)+d</p>";
        ul.append(li);

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<label for'inputA' class='small mb-1'>Amplitude (a)</label><br/>" +
            "<input type='text' id='inputA' class='form-control py-4' value='" + element.a + "'/>";
        ul.append(li);

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<label for'inputB' class='small mb-1'>Horizontal Shift (b)</label><br/>" +
            "<input type='text' id='inputB' class='form-control py-4' value='" + element.b + "'/>";
        ul.append(li);

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<label for'inputC' class='small mb-1'>Phase Shift (c)</label><br/>" +
            "<input type='text' id='inputC' class='form-control py-4' value='" + element.c + "'/>";
        ul.append(li);

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<label for'inputD' class='small mb-1'>Vertical Translation (d)</label><br/>" +
            "<input type='text' id='inputD' class='form-control py-4' value='" + element.d + "'/>";
        ul.append(li);

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<label for'inputI' class='small mb-1'>Increment Value (x)</label><br/>" +
            "<input type='text' id='inputI' class='form-control py-4' value='" + element.i + "'/>";
        ul.append(li);

        //create buttons for saving and removing streams
        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<input type='button' id='removeBtn' class='btn btn-primary btn-block' value='Remove Stream'/>";
        ul.append(li);

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<input type='button' id='saveBtn' class='btn btn-primary btn-block' value='Save Updates'/>";
        ul.append(li);

        info.append(ul);
    }

    /**
     * Creates inputs for sinCombo streams
     * 
     * @author: Ryan Draper
     * 
     * @param {html element} info 
     * @param {object} element 
     */
    function setSinCombo(info, element) {
        if (info.children.length > 1) {
            info.removeChild(info.lastChild);
        }

        var ul = document.createElement("ul");
        ul.setAttribute("class", "list-group list-group-flush");

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<label for'inputDataname' class='small mb-1'>Dataname:</label><br/>" +
            "<input type='text' id='inputDataname' class='form-control py-4' value='" + element.dataname + "'/>";
        ul.append(li);

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<label for'inputDatatype' class='small mb-1'>Datatype:</label><br/>" +
            "<input type='text' id='inputDatatype' class='form-control py-4' value='" + element.datatype + "'/>";
        ul.append(li);

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<label for'inputNominalMin' class='small mb-1'>Nominal Min:</label><br/>" +
            "<input type='text' id='inputNominalMin' class='form-control py-4' value='" + element.second_nominal_min + "'/>";
        ul.append(li);

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<label for'inputNominalMax' class='small mb-1'>Nominal Max:</label><br/>" +
            "<input type='text' id='inputNominalMax' class='form-control py-4' value='" + element.second_nominal_max + "'/>";
        ul.append(li);

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<p class='medium mb-1'>f(x) = (e sin(f(j)+g)+h) + (k sin(l(o)+m)+n)</p>";
        ul.append(li);

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<label for'inputE' class='small mb-1'>Amplitude (e)</label><br/>" +
            "<input type='text' id='inputE' class='form-control py-4' value='" + element.e + "'/>";
        ul.append(li);

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<label for'inputF' class='small mb-1'>Horizontal Shift (f)</label><br/>" +
            "<input type='text' id='inputF' class='form-control py-4' value='" + element.f + "'/>";
        ul.append(li);

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<label for'inputG' class='small mb-1'>Phase Shift (g)</label><br/>" +
            "<input type='text' id='inputG' class='form-control py-4' value='" + element.g + "'/>";
        ul.append(li);

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<label for'inputH' class='small mb-1'>Vertical Translation (h)</label><br/>" +
            "<input type='text' id='inputH' class='form-control py-4' value='" + element.h + "'/>";
        ul.append(li);

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<label for'inputJ' class='small mb-1'>Increment Value (j)</label><br/>" +
            "<input type='text' id='inputJ' class='form-control py-4' value='" + element.j + "'/>";
        ul.append(li);

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<label for'inputK' class='small mb-1'>Amplitude (k)</label><br/>" +
            "<input type='text' id='inputK' class='form-control py-4' value='" + element.k + "'/>";
        ul.append(li);

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<label for'inputL' class='small mb-1'>Horizontal Shift (l)</label><br/>" +
            "<input type='text' id='inputL' class='form-control py-4' value='" + element.l + "'/>";
        ul.append(li);

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<label for'inputM' class='small mb-1'>Phase Shift (m)</label><br/>" +
            "<input type='text' id='inputM' class='form-control py-4' value='" + element.m + "'/>";
        ul.append(li);

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<label for'inputN' class='small mb-1'>Vertical Translation (n)</label><br/>" +
            "<input type='text' id='inputN' class='form-control py-4' value='" + element.n + "'/>";
        ul.append(li);

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<label for'inputO' class='small mb-1'>Increment Value (o)</label><br/>" +
            "<input type='text' id='inputO' class='form-control py-4' value='" + element.o + "'/>";
        ul.append(li);

        //create buttons for saving and removing streams
        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<input type='button' id='removeBtn' class='btn btn-primary btn-block' value='Remove Stream'/>";
        ul.append(li);

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<input type='button' id='saveBtn' class='btn btn-primary btn-block' value='Save Updates'/>";
        ul.append(li);

        info.append(ul);
    }

    /**
     * Creates inputs for random streams
     * 
     * @author: Ryan Draper
     * 
     * @param {html element} info 
     * @param {object} element 
     */
    function setRandom(info, element) {
        if (info.children.length > 1) {
            info.removeChild(info.lastChild);
        }

        var ul = document.createElement("ul");
        ul.setAttribute("class", "list-group list-group-flush");

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<label for'inputDataname' class='small mb-1'>Dataname:</label><br/>" +
            "<input type='text' id='inputDataname' class='form-control py-4' value='" + element.dataname + "'/>";
        ul.append(li);

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<label for'inputDatatype' class='small mb-1'>Datatype:</label><br/>" +
            "<input type='text' id='inputDatatype' class='form-control py-4' value='" + element.datatype + "'/>";
        ul.append(li);

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<label for'inputNominalMin' class='small mb-1'>Nominal Min:</label><br/>" +
            "<input type='text' id='inputNominalMin' class='form-control py-4' value='" + element.nominal_min + "'/>";
        ul.append(li);

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<label for'inputNominalMax' class='small mb-1'>Nominal Max:</label><br/>" +
            "<input type='text' id='inputNominalMax' class='form-control py-4' value='" + element.nominal_max + "'/>";
        ul.append(li);

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<label for'inputMin' class='small mb-1'>Min:</label><br/>" +
            "<input type='text' id='inputMin' class='form-control py-4' value='" + element.min + "'/>";
        ul.append(li);

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<label for'inputMax' class='small mb-1'>Max:</label><br/>" +
            "<input type='text' id='inputMax' class='form-control py-4' value='" + element.max + "'/>";
        ul.append(li);

        //create buttons for saving and removing streams
        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<input type='button' id='removeBtn' class='btn btn-primary btn-block' value='Remove Stream'/>";
        ul.append(li);

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<input type='button' id='saveBtn' class='btn btn-primary btn-block' value='Save Updates'/>";
        ul.append(li);

        info.append(ul);
    }

    /**
     * Creates inputs for textFile streams
     * 
     * @author: Ryan Draper
     * 
     * @param {html element} info 
     * @param {object} element 
     */
    function setTextFile(info, element) {
        if (info.children.length > 1) {
            info.removeChild(info.lastChild);
        }

        var ul = document.createElement("ul");
        ul.setAttribute("class", "list-group list-group-flush");

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<label for'inputDataname' class='small mb-1'>Dataname:</label><br/>" +
            "<input type='text' id='inputDataname' class='form-control py-4' value='" + element.dataname + "'/>";
        ul.append(li);

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<label for'inputDatatype' class='small mb-1'>Datatype:</label><br/>" +
            "<input type='text' id='inputDatatype' class='form-control py-4' value='" + element.datatype + "'/>";
        ul.append(li);

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<label for'inputFilename' class='small mb-1'>Filename:</label><br/>" +
            "<input type='text' id='inputFilename' class='form-control py-4' value='" + element.filename + "'/>";
        ul.append(li);

        //create buttons for saving and removing streams
        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<input type='button' id='removeBtn' class='btn btn-primary btn-block' value='Remove Stream'/>";
        ul.append(li);

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<input type='button' id='saveBtn' class='btn btn-primary btn-block' value='Save Updates'/>";
        ul.append(li);

        info.append(ul);
    }

    /**
     * Creates inputs for numeric file streams
     * 
     * @author: Ryan Draper
     * 
     * @param {html element} info 
     * @param {object} element 
     */
    function setNumericFile(info, element) {
        if (info.children.length > 1) {
            info.removeChild(info.lastChild);
        }

        var ul = document.createElement("ul");
        ul.setAttribute("class", "list-group list-group-flush");

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<label for'inputDataname' class='small mb-1'>Dataname:</label><br/>" +
            "<input type='text' id='inputDataname' class='form-control py-4' value='" + element.dataname + "'/>";
        ul.append(li);

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<label for'inputDatatype' class='small mb-1'>Datatype:</label><br/>" +
            "<input type='text' id='inputDatatype' class='form-control py-4' value='" + element.datatype + "'/>";
        ul.append(li);

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<label for'inputFilename' class='small mb-1'>Filename:</label><br/>" +
            "<input type='text' id='inputFilename' class='form-control py-4' value='" + element.filename + "'/>";
        ul.append(li);

        //create buttons for saving and removing streams
        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<input type='button' id='removeBtn' class='btn btn-primary btn-block' value='Remove Stream'/>";
        ul.append(li);

        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = "<input type='button' id='saveBtn' class='btn btn-primary btn-block' value='Save Updates'/>";
        ul.append(li);

        info.append(ul);
    }

    /**
     * Gets the type of stream and calls the appropriate function to set inputs on the page
     * 
     * @author: Ryan Draper
     * 
     * @param {object} element 
     */
    function setCardFields(element) {
        //set card header
        $("#updatehead").html(element.dataname);

        //get unique values to define what kind of stream
        var value = element.value;
        var a = element.a;
        var min = element.min;
        var filename = element.filename;
        var e = element.e;

        //card body
        var info = document.getElementById("updatecard");

        if (typeof(value) != "undefined") { //if text stream
            setText(info, element);
        } else if (typeof(a) != "undefined") { //if sin
            setSin(info, element);
        } else if (typeof(e) != "undefined") { //if sinCombo
            setSinCombo(info, element);
        } else if (typeof(min) != "undefined") { //if random
            setRandom(info, element);
        } else if (typeof(filename) != "undefined" && element.datatype == "string") { //if text file
            setTextFile(info, element);
        } else if (typeof(filename) != "undefined" && element.datatype == "float") { //if numeric file
            setNumericFile(info, element);
        }
    }

    /**
     * creates inputs for changing data for the selected panel stream
     * 
     * @author: Ryan Draper
     * 
     * @param {object} element 
     */
    function updateData(element) {
        setCardFields(element);

        //on click listener for remove button
        $("#removeBtn").on("click", function() {
            removestream(element);
        });

        //on click listener for save button
        $("#saveBtn").on("click", function() {
            saveData(element);
        });
    }

    /**
     * Function for creating elements that display panel information
     * 
     * @author: Ryan Draper
     * 
     * @param {object} panel 
     * @param {object} data 
     */
    function createCard(panel, data) {
        //create a card containing selected stream information
        $("#cardhead").html(panel["panel_name"]);
        var info = document.getElementById("infocard");

        //if information already displayed, remove from html
        if (info.children.length > 1) {
            info.removeChild(info.lastChild);
        }

        //create a list of information about the panel
        var ul = document.createElement("ul");
        ul.setAttribute("class", "list-group list-group-flush");
        data.paneldata.forEach((element) => {
            var res = removeWhitespace(element.dataname);

            var li = document.createElement("li");
            li.setAttribute("class", "list-group-item");
            li.setAttribute("id", element.panel_id + "_" + res);
            li.innerHTML = element.dataname;

            ul.append(li);
        });

        //append the information to the page
        info.append(ul);

        //add on click for elements
        data.paneldata.forEach((element) => {
            //remove whitespace
            var res = removeWhitespace(element.dataname);

            //add onclick listener for the panel
            $("#" + element.panel_id + "_" + res).on("click", function(e) {
                updateData(element);
            });
        });

        //remove whitespace
        var res = removeWhitespace(data.paneldata[0].dataname);

        //set header of card to panel name
        $("#updatehead").html(res);

        //send panel information to function
        updateData(data.paneldata[0]);
    }

    /**
     * sends stream information for the selected panel stream to a function for display
     * 
     * @author: Ryan Draper
     * 
     * @param {object} panel 
     */
    function displayPanelData(panel) {
        var username = getCookie("username");
        //store username and password
        const data = {
            username: username,
            panelname: panel["panel_name"]
        };

        //send post json data to url
        fetch("../php/updatepanel.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            .then((response) => response.json()) //get json response
            .then((data) => {
                createCard(panel, data);
            })
            .catch((err) => console.log(err)); //catch error
    }

    /**
     * Function for displaying stream information
     * 
     * @author: Ryan Draper
     * 
     * @param {object} element 
     */
    function displayPanelInfo(element) {
        var id = element["panel_id"];
        var div = document.createElement("div");
        div.setAttribute("class", "card card-body align-items-center btn border-primary mb-2 w-100 panel");
        div.setAttribute("id", id);

        div.innerHTML = element["panel_name"];
        $("#panelrows").append(div);

        //change display panels info on click of panel, append to dynamic element
        $("#" + id).on("click", function(e) {
            displayPanelData(element);
        });
    }

    /**
     * Function for displaying banner when no panels created
     * 
     * @author: Ryan Draper
     */
    function panelError(json) {
        //set error banner if no panels
        var panelrows = document.getElementById("panelrows");
        var inforows = document.getElementById("inforows");
        var info = document.getElementById("info");
        panelrows.setAttribute("hidden", "true");
        inforows.setAttribute("hidden", "true");
        info.setAttribute("hidden", "true");

        var col = document.createElement("div");
        col.setAttribute("class", "alert alert-primary ");
        col.setAttribute("role", "alert");
        col.innerHTML = "<strong>" + json.panels + ".</strong> Panels will be displayed once created.";

        var div = document.createElement("div");
        div.setAttribute("class", "col-md-12");
        div.setAttribute("id", "noPanelAlert");
        div.append(col);

        $("#panels").append(div);
    }

    /**
     * Loads information for panel streams
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
                //set first as default
                $("#cardhead").html(json.panels[0]["panel_name"]);
                displayPanelData(json.panels[0]);

                //for each stream
                json.panels.forEach((element) => {
                    displayPanelInfo(element);
                });
            } else {
                //make array of panels owned by logged in user
                var newArr = [];
                json.panels.forEach((element) => {
                    if (element.owner == getCookie("username")) {
                        newArr.push(element);
                    }
                });

                if(newArr.length == 0){
                    panelError(json);
                }
                else{
                    //set first as default
                    $("#cardhead").html(newArr[0]["panel_name"]);
                    displayPanelData(newArr[0]);

                    //for each stream
                    newArr.forEach((element) => {
                        displayPanelInfo(element);
                    });
                }
            }
        } else {
            panelError(json);
        }
    }

    /**
     * Function for loading panels cards for the logged in user
     * 
     * @author: Ryan Draper
     */
    function loadPanels() {
        //get username and password
        var username = getCookie("username");

        //store username and password
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
        $("#cardhead").html(txt);
    });
})(jQuery);