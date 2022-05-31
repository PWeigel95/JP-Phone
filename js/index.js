$(document).ready(function() {
    if (checkIfLoggedIn()) {
        $("#loginText").text("Logout");
        $("#loginText").attr("href", "logout.html");
    } else {
        $("#loginText").text("Login");
        $("#loginText").attr("href", "login.html");

    }

    function checkIfLoggedIn() {

        //TODO: Check if user is logged in

        return true;

    }

});