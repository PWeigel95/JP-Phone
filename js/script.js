$(document).ready(function () {
    // When document is ready
    $.ajax({
        url: "backend", // This calls the backend/index.php file (relative to the .html file)
        dataType: "json", // We know we want JSON data
        success: function (data) {
            // Set the body content to the text from the backend:
            $("#backend-message").text("Success! " + data);
        },
        error: function (e) {
            console.error("error", e);
            $("#backend-error").text("Error");
        },
    });
});
