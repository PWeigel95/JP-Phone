$(document).ready(function() {
    window.localStorage.clear()

    var username = window.localStorage.getItem('username');
    var role_id = window.localStorage.getItem('role_id');

    $("#welcome-txt").text("Willkommen " + username);

    displayMenu(role_id);

    if (checkIfUserIsLoggedIn()) {

        $("#loginNav").children().text("Logout");
        $("#loginNav").children().attr("href", "logout.html");
    } else {
        $("#loginNav").children().text("Login");
        $("#loginNav").children().attr("href", "login.html");

    }

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

});