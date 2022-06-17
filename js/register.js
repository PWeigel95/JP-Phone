$(document).ready(function() {

    $("#form_register").submit(function(event) {

        event.preventDefault();
        var anrede = $("#anrede").val();
        var vorname = $("#vorname").val();
        var nachname = $("#nachname").val();
        var adresse = $("#adresse").val();
        var plz = $("#plz").val();
        var ort = $("#ort").val();
        var email = $("#email").val();
        var benutzername = $("#benutzername").val();
        var passwort = $("#passwort").val();
        var repeatpassword = $("#repeatpassword").val();
        var zahlungsinformation_id = $("#zahlungsinformationen option:selected").val();

        var userData = {};
        userData = {
            anrede: anrede,
            vorname: vorname,
            nachname: nachname,
            adresse: adresse,
            plz: plz,
            ort: ort,
            email: email,
            benutzername: benutzername,
            passwort: passwort,
            zahlungsinformation_id: zahlungsinformation_id
        };


        if (checkIfUsernameIsAlreadyTaken(userData) && checkIfPasswordsAreMatching()) {
            createUser(userData);
        }
    });




    function checkIfUsernameIsAlreadyTaken(userData) {

        return $.ajax({
            method: "POST",
            datatype: "json",
            url: API_PATH + "?action=checkIfUsernameIsAlreadyTaken",
            data: JSON.stringify(userData),
            success: function() {
                return true;
            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(JSON.stringify(xhr));
                console.log("AJAX error: " + ajaxOptions + ' : ' + thrownError);
                return false;
            },

        });

    }

    function checkIfPasswordsAreMatching() {

        if (passwort != repeatpassword) {
            $("#registerErrorRepeatPasswort").text("Passwort stimmen nicht überein");
            return false;
        } else return true;

    }

    function createUser(userData) {
        $.ajax({
            method: "POST",
            datatype: "json",
            url: API_PATH + "?action=register",
            data: JSON.stringify(userData),
            success: function(data) {
                alert(JSON.stringify(data));
                location.href = "./login.html";

            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(JSON.stringify(xhr));
                console.log("AJAX error: " + ajaxOptions + ' : ' + thrownError);
            },

        });

    }

});