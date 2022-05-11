$(document).ready(function() {
    $("#btnCreateUser").on("click", function() {
        checkInput();
        $.ajax({
            type: "post",
            dataType: "json",
            url: "../",
            data: $("input").val(),
            success: function(response) {
                console.log(data);
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