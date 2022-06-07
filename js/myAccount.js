$(document).ready(function() {

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

        $("#inputFirstName").val(window.localStorage.getItem('vorname'));
        $("#inputLastName").val(window.localStorage.getItem('nachname'));
        $("#inputEmail").val(window.localStorage.getItem('email'));
        $("#inputAdress").val(window.localStorage.getItem('adresse'));
        $("#inputPLZ").val(window.localStorage.getItem('plz'));
        $("#inputOrt").val(window.localStorage.getItem('ort'));
        $("#inputUsername").val(window.localStorage.getItem('username'));

    }

    function updateUserProfile() {

        $.ajax({
            method: "PUT",
            url: API_PATH + "?action=updateUser",
            dataType: "json", // We know we want JSON data
            data: JSON.stringify(loginData),
            success: function(data) {

            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(JSON.stringify(xhr));
                console.log("AJAX error: " + ajaxOptions + ' : ' + thrownError);
            },
        });

    }








})