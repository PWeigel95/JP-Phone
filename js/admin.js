$(document).ready(function() {
    getProducts();


    $("#btnCreateProduct").on("click", function() {
        createProduct();

    })

    $("#products").on("click", "#btnEditProduct", function() {
        let productId = $(this).attr("name");
        editProduct(productId);

    })

    $("#products").on("click", "#btnDeleteProduct", function() {
        let productId = $(this).attr("name");
        deleteProduct(productId);

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

    function getAllUsers() {

        $.ajax({
            method: "GET",
            url: API_PATH + "?action=getAllUsers",
            dataType: "json", // We know we want JSON data
            success: function() {
                alert("Alle User bekommen!");

            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(JSON.stringify(xhr));
                console.log("AJAX error: " + ajaxOptions + ' : ' + thrownError);
            },
        });

    }

    function getProducts() {
        $.ajax({
            method: "get",
            url: API_PATH + "?resource=products", // This calls the backend/index.php file (relative to the .html file)
            dataType: "json", // We know we want JSON data
            success: function(data) {
                // log the products to the console and then set add them to the HTML:
                console.log(data);
                setProducts(data);
            },
            error: function(error) {
                console.error(error);
            },
        });
    }

    function setProducts(products) {
        // first, clear any products (if there are any in the HTML already)
        clearProducts();

        // then, add all products to the #products div:
        for (const product of products) {
            addProduct(product);
        }
    }

    function clearProducts() {
        // clear all existing products in the HTML
        $("#products").empty();
    }

    function addProduct(product) {
        // add the product card to the #products div
        const productDiv = $(`<div class="col">
            <div class="card">
                <img src="${product.image_url}" class="card-img-top product-image" alt="${product.name}">
                <div class="card-body">
                    <div class="d-flex">
                        <div class="p-2 flex-fill">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.price}€</p>
                        </div>
                        <div class="p-2">
                            <button id="btnEditProduct" class="btn btn-primary" name=${product.product_id}><i class="bi bi-pencil-square"></i></button>
                            <button id="btnDeleteProduct" class="btn btn-danger" name=${product.product_id}><i class="bi bi-trash"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`);

        $("#products").append(productDiv);
    }

    function editProduct(productId) {
        alert("Produkt wird bearbeitet");
        clearProducts();
        loadEditProductPage(productId);
    }

    function deleteProduct() {
        alert("Produkt wird gelöscht");
    }

    function loadEditProductPage(productId) {

    }







})