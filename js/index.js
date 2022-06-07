$(document).ready(function() {
    var username = window.localStorage.getItem('username');

    showWelcomeText();

    function showWelcomeText() {

        willkommenText = "Willkommen";
        if (username == null) {
            $("#welcome-txt").text(willkommenText);
        } else {
            $("#welcome-txt").text(willkommenText + " " +
                username + "!");
        }
    }

});