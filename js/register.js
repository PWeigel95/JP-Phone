$(document).ready(function() {
    $("#btnCreateUser").on("click", function() {
        checkInput();
        divResult.empty();
        $.ajax({
            type: "post",
            dataType: "json",
            url: apiPath + "?user",
            data: $("#txtCreateUser").val(),
            success: function(response) {
                console.log("Success");
            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log("error");
            }
        });
    });

    function checkInput() {
        console.log("CheckInput");

    }

});