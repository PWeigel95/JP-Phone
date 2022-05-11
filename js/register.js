$(function() {
    $("#btnCreateUser").on("click", function() {
        checkInput();
        divResult.empty();
        $.ajax({
            type: "post",
            dataType: "json",
            url: apiPath + "?user",
            data: $("#txtCreateUser").val(),
            success: function(response) {
                divResult.text(JSON.stringify(response, undefined, 2));
            },
            error: function(xhr, ajaxOptions, thrownError) {
                divResult.text("Error:\n" + JSON.stringify(xhr, undefined, 2));
            }
        });
    });

    function checkInput() {

    }




})