$(document).ready(function() {

    $("#btnCreateProduct").on("click", function() {
        createProduct();

    })

    function createProduct() {

        let produktName = $("#inputProduktname").val();
        let produktBeschreibung = $("#textareaBeschreibung").val();
        let produktPreis = $("#inputPreis").val();
        let produktFotoUrl = $("#fileProduktFoto").val();

        let produkt = {
            produktName: produktName,
            produktBeschreibung: produktBeschreibung,
            produktPreis: produktPreis,
            produktFotoUrl: produktFotoUrl
        }

        $.ajax({
            method: "POST",
            url: API_PATH + "?action=createProduct",
            dataType: "json", // We know we want JSON data
            data: JSON.stringify(produkt),
            success: function() {
                alert("Produkt erstellt!");
                clearInputs();

            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(JSON.stringify(xhr));
                console.log("AJAX error: " + ajaxOptions + ' : ' + thrownError);
            },
        });


    }

    function loadEditCustomerPage() {

    }

    function loadEditVoucherPage() {

    }

    function clearInputs() {
        $("#inputProduktname").val("");
        $("#textareaBeschreibung").val("");
        $("#inputPreis").val("");
        $("#fileProduktFoto").val("");

    }




})