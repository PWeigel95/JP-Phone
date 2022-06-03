var userObject;

$(document).ready(function() {

    let apiPath = "./backend/index.php"

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
            url: apiPath + "?action=login",
            dataType: "json", // We know we want JSON data
            data: JSON.stringify(loginData),
            success: function(data) {
                alert(JSON.stringify(data, null, 4));
                if (Object.keys(data).length > 0) {
                    alert("Login successful");
                    window.localStorage.setItem('username', data["benutzername"]);
                    window.localStorage.setItem('role_id', data["role_id"]);

                    location.href = "./index.html";
                } else {
                    alert("Wrong username/password");

                }

            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(JSON.stringify(xhr));
                console.log("AJAX error: " + ajaxOptions + ' : ' + thrownError);
            },
        });

    }

});