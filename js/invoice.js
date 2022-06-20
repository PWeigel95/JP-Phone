function displayInvoice(order) {
    $("#loading").hide();
    $("#invoice").html(`
        <h3>
            Rechnung ${order.invoice_id}
        </h3>
        <p>Erstellt am ${new Date(order.creation_date).toLocaleString()}</p>
        <div class="row py-4">
          <div class="col">
            <p>
                An:<br/>
                <strong>${order.billing_name}</strong><br/>
                ${order.billing_address}<br/>
                ${order.billing_zipcode} ${order.billing_place}
            </p>
          </div>
          <div class="col">
            <p>
                Von:<br/>
                <strong>JP-Phone</strong><br/>
                Fakestreet 1<br/>
                1234 Wien
            </p>
          </div>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Bezeichnung</th>
                    <th scope="col">Anzahl</th>
                    <th scope="col">Stückpreis</th>
                    <th scope="col">Gesamtpreis</th>
                </tr>
            </thead>
            <tbody>
                ${order.order_products.map((product, i) => `<tr>
                    <th scope="row">${1 + i}</th>
                    <td>${product.product.name}</td>
                    <td>${product.amount}</td>
                    <td>${product.product.price} €</td>
                    <td>${product.total_price} €</td>
                </tr>`).join("")}
            </tbody>
            <tfoot>
                <tr>
                    <th scope="row" colspan="4">Summe</th>
                    <td>${order.total_price} €</td>
                </tr>
            </tfoot>
        </table>
    `);
    window.print();
}

function loadInvoiceForOrder(orderId) {
    // When document is ready
    $.ajax({
        method: "get",
        url: API_PATH + "?resource=order&order_id=" + orderId, // This calls the backend/index.php file (relative to the .html file)
        dataType: "json", // We know we want JSON data
        success: function (data) {
            console.log(data);
            displayInvoice(data);
        },
        error: function(error) {
            console.error(error);
            $("#loading").text(`Fehler beim Laden der Rechnung: ${error.responseText}`).show();
        },
    });
}

$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get("order_id");
    loadInvoiceForOrder(orderId);
});
