$(document).ready(function() {
    if (checkIfUserIsLoggedIn()) {
        $("#loginNav").text("Logout");
        $("#loginNav").attr("href", "logout.html");
    } else {
        $("#loginNav").text("Login");
        $("#loginNav").attr("href", "login.html");

    }

    function checkIfUserIsLoggedIn() {

        //TODO: Check if user is logged in

        return true;

    }

    function checkUserRights() {

    }

    function displayMenu() {



    }

});