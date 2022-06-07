function listOrders() {
    var orders = {
        "number": "1",
        "amount": 655,
        "date": "25.05.2020"
    };

    $("tbody > tr").append("<td>" + orders.number + " </td>");
    $("tbody > tr").append("<td>" + orders.date + " </td>");
    $("tbody > tr").append("<td>" + orders.amount + " </td>");
    $("tbody > tr").append("<td><button type='button' id='btnGenerateInvoice' class='btn btn-primary'>Rechnung generieren</button></td>");

}

$(document).ready(function() {

    listOrders();

    $("#btnGenerateInvoice").on("click", function(event) {

    })


});