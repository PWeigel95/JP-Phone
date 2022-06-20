$(document).ready(function() {

    var benutzername = window.localStorage.getItem('username');

    loadProfileData();
    listOrders();

    $("#btnSaveProfileSettings").on("click", function() {

        updateUserProfile();

    })

    $("#btnChangePassword").on("click", function() {

        updatePassword();

    })


    function listOrders() {
        $.ajax({
            method: "GET",
            url: API_PATH + "?resource=orders",
            dataType: "json", // We know we want JSON data
            data: JSON.stringify(benutzername),
            success: function(data) {
                console.log(data);
                for (const order of data) {
                    const tr = $(`<tr>
                        <td>${order.order_id}</td>
                        <td>${order.creation_date}</td>
                        <td>${order.total_price} €</td>
                        <td><button class='btn btn-primary'>Details einsehen/drucken</button></td>
                    </tr>`);
                    $("button", tr).click(() => {
                        window.open("invoice.html?order_id=" + order.order_id, "Rechnung", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes");
                    });
                    $("#myOrdersTable").append(tr);
                }
            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(JSON.stringify(xhr));
                console.log("AJAX error: " + ajaxOptions + ' : ' + thrownError);
            },
        });
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