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

        if (checkInput()) {
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
            /*
            $.each(userData, function(key, value) {
                console.log(key + value);
            })
            */

            createUser(userData);

        }
    });

    function checkInput() {
        return true;

    }

    function createUser(userData) {
        $.ajax({
            method: "post",
            datatype: "json",
            url: "./backend/logic/requestHandler.php",
            data: JSON.stringify(userData),
            success: function(newUser) {
                alert("New User created!" + newUser);

            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(JSON.stringify(xhr));
                console.log("AJAX error: " + ajaxOptions + ' : ' + thrownError);
            },

        });

    }

});