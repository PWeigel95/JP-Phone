$(document).ready(function() {
    $("#btnCreateUser").on("click", function() {
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
            data: { method: "createUser", param: userData },
            success: function(response) {
                console.log(data);
            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log("error");
            }
        });

    }

});