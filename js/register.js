$(document).ready(function() {
    $("#registerErrorMessage").hide();


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
            repeatpassword: repeatpassword,
            zahlungsinformation_id: zahlungsinformation_id
        };

        if (!checkIfUsernameIsAlreadyTaken(userData)) {
            showUsernameAlreadyExistsError();
        } else if (!checkIfPasswordsAreMatching(userData)) {
            showPasswordsAreNotMatchingError();
        } else {
            createUser(userData);

        }



    });




    function checkIfUsernameIsAlreadyTaken(userData) {

        return $.ajax({
            method: "POST",
            datatype: "json",
            url: API_PATH + "?action=checkIfUsernameIsAlreadyTaken",
            data: JSON.stringify(userData),
            success: function(response) {
                if (response == false) {
                    return false;

                } else {
                    alert(response);
                    return true;
                }

            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(JSON.stringify(xhr));
                console.log("AJAX error: " + ajaxOptions + ' : ' + thrownError);

            },

        });

    }

    function checkIfPasswordsAreMatching(userData) {

        if (userData.passwort != userData.repeatpassword) {
            $("#registerErrorRepeatPasswort").text("Passwort stimmen nicht ??berein");
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
                alert("Registrierung war erfolgreich!")
                location.href = "./login.html";

            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(JSON.stringify(xhr));
                console.log("AJAX error: " + ajaxOptions + ' : ' + thrownError);
            },

        });

    }


    function showPasswordsAreNotMatchingError() {
        $("#registerErrorMessage").show();
        $("#registerErrorMessage").text("Passw??rter stimmen nicht ??berein!");

    }

    function showUsernameAlreadyExistsError() {

        $("#registerErrorMessage").show();
        $("#registerErrorMessage").text("Benutzername existiert bereits!");

    }

});