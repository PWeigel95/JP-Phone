$(document).ready(function() {

    $("#btnLoginUser").on("click", function() {

        var benutzername = $("#benutzername").val();
        var passwort = $("#passwort").val();
        var loginChecked = $("#loginCheck").prop('checked');

        console.log(benutzername);
        console.log(passwort);
        console.log(loginChecked);

    })

});