$(document).ready(function() {
    $("#btnCreateUser").on("click", function() {
        checkInput();
        var userData = {};
        /*
        $("form#form_register :input").each(function() {
            var input = $(this); // This is the jquery object of the input, do what you will
            console.log(input);
        });*/
        //createUser();
    });

    function checkInput() {
        console.log("CheckInput");

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