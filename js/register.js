$(document).ready(function() {
    $("#btnCreateUser").on("click", function() {
        var userData = {};
        //checkInput();
        var anrede = $("#anrede").val();
        var vorname = $("#vorname").val();

        userData = { anrede: anrede, vorname: vorname };

        alert(userData);




    });

    function checkInput() {
        alert("CheckInput");

    }

    function createUser(userData) {
        $.ajax({
            type: "post",
            dataType: "json",
            url: "./backend/serviceHandler.php",
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