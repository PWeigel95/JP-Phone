$(document).ready(function() {

    var vorname = window.localStorage.getItem('vorname');
    var nachname = window.localStorage.getItem('nachname');
    var email = window.localStorage.getItem('email');
    var adresse = window.localStorage.getItem('adresse');
    var plz = window.localStorage.getItem('plz');
    var ort = window.localStorage.getItem('ort');
    var benutzername = window.localStorage.getItem('username');

    loadProfileData();

    listOrders();

    $("#btnGenerateInvoice").on("click", function(event) {

        generateInvoice();

    })

    $("#btnSaveProfileSettings").on("click", function() {

        updateUserProfile();

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

        $("#inputFirstName").val(vorname);
        $("#inputLastName").val(nachname);
        $("#inputEmail").val(email);
        $("#inputAdress").val(adresse);
        $("#inputPLZ").val(plz);
        $("#inputOrt").val(ort);
        $("#inputUsername").val(username);

    }

    function updateUserProfile() {

        userData = {
            vorname: vorname,
            nachname: nachname,
            email: email,
            adresse: adresse,
            plz: plz,
            ort: ort,
            benutzername: benutzername,
        }


        $.ajax({
            method: "PUT",
            url: apiPath + "?action=updateUser",
            dataType: "json", // We know we want JSON data
            data: JSON.stringify(userData),
            success: function(data) {

            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(JSON.stringify(xhr));
                console.log("AJAX error: " + ajaxOptions + ' : ' + thrownError);
            },
        });

    }








})