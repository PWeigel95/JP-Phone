$(document).ready(function() {

    let apiPath = "./backend/index.php"

    var username = window.localStorage.getItem('username');
    var role_id = window.localStorage.getItem('role_id');

    showWelcomeText();

    displayMenu(role_id);
    setLoginText();

    $("#logOut").on("click", function() {
        executelogOut();
    })


    function checkIfUserIsLoggedIn() {
        //TODO: Check if user is logged in
        if (username != null) {
            return true;

        } else {
            return false;

        }
    }

    function displayMenu(role_id) {

        switch (role_id) {
            // Gast
            case null:
                $("#meinKontoNav").hide();
                $("#produkteBearbeitenNav").hide();
                $("#kundenBearbeitenNav").hide();
                $("#gutscheineVerwaltenNav").hide();
                break;
                //User
            case "1":
                $("#produkteBearbeitenNav").hide();
                $("#kundenBearbeitenNav").hide();
                $("#gutscheineVerwaltenNav").hide();
                break;
                // Admin
            case "2":
                $("#meinKontoNav").hide();
                break;


        }

    }

    function showWelcomeText() {

        willkommenText = "Willkommen";
        if (username == null) {
            $("#welcome-txt").text(willkommenText);
        } else {
            $("#welcome-txt").text(willkommenText + " " +
                username + "!");
        }
    }

    function setLoginText() {

        if (checkIfUserIsLoggedIn()) {

            $("#loginNav").children().text("Logout");
            $("#loginNav").children().attr("id", "logOut");
            $("#loginNav").children().attr("href", "index.html");
        } else {
            $("#loginNav").children().text("Login");
            $("#loginNav").children().attr("href", "login.html");

        }

    }

    function executelogOut() {

        $.ajax({
            method: "POST",
            url: apiPath + "?action=logout",
            dataType: json,
            data: window.localStorage,
            success: function() {

                window.localStorage.clear();
                location.href = "./index.html";

            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(JSON.stringify(xhr));
                console.log("AJAX error: " + ajaxOptions + ' : ' + thrownError);

            },
        });

    }

});