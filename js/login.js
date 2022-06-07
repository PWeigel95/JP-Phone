var userObject;

$(document).ready(function() {
    checkIfUserIsLoggedIn()

    $("#btnLoginUser").on("click", function(event) {

        event.preventDefault();

        let loginData = {};

        var benutzername = $("#benutzername").val();
        var passwort = $("#passwort").val();
        var loginChecked = $("#loginCheck").prop('checked');

        loginData = {
            benutzername: benutzername,
            passwort: passwort,
            loginChecked: loginChecked
        }
        executeLogin(loginData);

    })

    function executeLogin(loginData) {

        // When document is ready
        $.ajax({
            method: "POST",
            url: API_PATH + "?action=login",
            dataType: "json", // We know we want JSON data
            data: JSON.stringify(loginData),
            success: function(data) {
                if (Object.keys(data).length > 0) {
                    window.localStorage.setItem('username', data["benutzername"]);
                    window.localStorage.setItem('vorname', data["vorname"]);
                    window.localStorage.setItem('nachname', data["nachname"]);
                    window.localStorage.setItem('adresse', data["adresse"]);
                    window.localStorage.setItem('plz', data["plz"]);
                    window.localStorage.setItem('ort', data["ort"]);
                    window.localStorage.setItem('email', data["email"]);
                    window.localStorage.setItem('role_id', data["role_id"]);

                    location.href = "./index.html";
                } else {
                    showLoginError();

                }

            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(JSON.stringify(xhr));
                console.log("AJAX error: " + ajaxOptions + ' : ' + thrownError);
            },
        });

    }

    function checkIfUserIsLoggedIn() {
        if (window.localStorage.getItem('username') != null) {
            location.href = "./index.html";
        }

    }

    function showLoginError() {

        $("#loginError").show();

    }

});