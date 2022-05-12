$(document).ready(function() {
    $("#form_register").submit(function() {
        var anrede = $("#anrede").val();
        var vorname = $("#vorname").val();
        var nachname = $("#nachname").val();
        var adresse = $("#adresse").val();
        var plz = $("#plz").val();
        var ort = $("#ort").val();
        var email = $("#email").val();
        var username = $("#username").val();
        var password = $("#password").val();
        var repeatpassword = $("#repeatpassword").val();
        var zahlungsinformationen = $("#zahlungsinformationen").val();

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
                username: username,
                password: password,
                zahlungsinformationen: zahlungsinformationen
            };

            $.each(userData, function(key, value) {
                console.log(key + value);
            })

            createUser(userData);

        }
    });

    function checkInput() {
        return true;

    }

    function createUser(userData) {
        $.ajax({
            type: "post",
            dataType: "json",
            url: "./backend/logic/requestHandler.php",
            data: userData,
            success: function(response) {
                alert(response);

            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(JSON.stringify(xhr));
                console.log("AJAX error: " + ajaxOptions + ' : ' + thrownError);
            },

        });

    }

});