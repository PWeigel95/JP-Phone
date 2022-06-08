$(document).ready(function() {

    var benutzername = window.localStorage.getItem('username');

    loadProfileData();
    listOrders();

    $("#btnGenerateInvoice").on("click", function(event) {

        generateInvoice();

    })

    $("#btnSaveProfileSettings").on("click", function() {

        updateUserProfile();

    })

    $("#btnChangePassword").on("click", function() {

        updatePassword();

    })


    function listOrders() {
        var orders = {
            "number": "1",
            "amount": 655,
            "date": "25.05.2020"
        };

        $("tbody > tr").append("<td>" + orders.number + " </td>");
        $("tbody > tr").append("<td>" + orders.date + " </td>");
        $("tbody > tr").append("<td>" + orders.amount + " </td>");
        $("tbody > tr").append("<td><button type='button' id='btnGenerateInvoice' class='btn btn-primary'>Rechnung generieren</button></td>");

    }

    function loadProfileData() {


        $.ajax({
            method: "POST",
            url: API_PATH + "?action=getCurrentUser",
            dataType: "json", // We know we want JSON data
            data: JSON.stringify(benutzername),
            success: function(data) {
                $("#anrede > option[value=" + data["anrede"] + "").attr("selected", "selected").val();
                $("#inputFirstName").val(data["vorname"]);
                $("#inputLastName").val(data["nachname"]);
                $("#inputEmail").val(data["email"]);
                $("#inputAddress").val(data["adresse"]);
                $("#inputPlz").val(data["plz"]);
                $("#inputOrt").val(data["ort"]);
                $("#inputUsername").val(data["benutzername"]);

            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(JSON.stringify(xhr));
                console.log("AJAX error: " + ajaxOptions + ' : ' + thrownError);
            },
        });

    }

    function updateUserProfile() {

        userData = {
            anrede: $("#anrede > option:selected").val(),
            vorname: $("#inputFirstName").val(),
            nachname: $("#inputLastName").val(),
            email: $("#inputEmail").val(),
            adresse: $("#inputAddress").val(),
            plz: $("#inputPlz").val(),
            ort: $("#inputOrt").val(),
            benutzername: $("#inputUsername").val()
        }


        $.ajax({
            method: "PUT",
            url: API_PATH + "?action=updateUser",
            dataType: "json", // We know we want JSON data
            data: JSON.stringify(userData),
            success: function() {
                alert("Stammdaten wurde aktualisiert!");
                loadProfileData();

            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(JSON.stringify(xhr));
                console.log("AJAX error: " + ajaxOptions + ' : ' + thrownError);
            },
        });

    }

    function updatePassword() {

        if (isEnteredPasswordCorrect()) {

            let enteredNewPassword = $("#newPassword").val();
            let enteredNewPasswordConfirm = $("#newPasswordConfirm").val();

            if (enteredNewPassword == enteredNewPasswordConfirm) {

                var userData = {
                    username: benutzername,
                    password: enteredNewPassword
                }

                $.ajax({
                    method: "PUT",
                    url: API_PATH + "?action=changePassword",
                    dataType: "json", // We know we want JSON data
                    data: JSON.stringify(userData),
                    success: function() {
                        alert("Password aktualisiert");

                    },
                    error: function(xhr, ajaxOptions, thrownError) {
                        console.log(JSON.stringify(xhr));
                        console.log("AJAX error: " + ajaxOptions + ' : ' + thrownError);
                    },
                });

            } else {
                alert("Passwort stimmen nicht überein");
            }

        }

    }

    function isEnteredPasswordCorrect() {

        let enteredOldPassword = $("#oldPassword").val();

        var userData = {
            username: benutzername,
            password: enteredOldPassword
        }



        return $.ajax({
            method: "POST",
            url: API_PATH + "?action=checkPassword",
            dataType: "json", // We know we want JSON data
            data: JSON.stringify(userData),
            success: function() {
                return true;
            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(JSON.stringify(xhr));
                console.log("AJAX error: " + ajaxOptions + ' : ' + thrownError);
                alert("Passwort falsch!");
                return false;
            },

        })


    }








})