$(document).ready(function() {
    getProducts();
    $("#editProduct").hide();


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

    $("#v-pills-editProducts").on("click", function() {

    })

    $("#btnEditProduct").on("click", function() {
        let productId = $(this).attr("name");

        let product = {
            productId: productId,
            productName: $("#editInputProduktname").val(),
            productDescription: $("#editTextareaBeschreibung").val(),
            productPrice: $("#editInputPreis").val(),
            productImageUrl: $("#editProductImage").attr("src")

        }
        updateProduct(product);

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
        clearProducts();
        loadEditProductPage(productId);
    }

    function deleteProduct() {
        alert("Produkt wird gelöscht");
    }

    function loadEditProductPage(productId) {
        $("#editProduct").show();

        let productData = {
            productId: Number(productId)
        }

        $.ajax({
            method: "POST",
            url: API_PATH + "?action=getProductById",
            dataType: "json", // We know we want JSON data
            data: JSON.stringify(productData),
            success: function(product) {
                loadInputFieldsWithProductData(product);

            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(JSON.stringify(xhr));
                console.log("AJAX error: " + ajaxOptions + ' : ' + thrownError);
            },
        });

    }

    function loadInputFieldsWithProductData(product) {
        $("#editInputProduktname").val(product.name);
        $("#editTextareaBeschreibung").val(product.description);
        $("#editInputPreis").val(product.price);
        $("#editProductImage").attr("src", product.image_url);

        $("#btnEditProduct").attr("name", product.product_id);

    }

    function updateProduct(product) {
        $.ajax({
            method: "PUT",
            url: API_PATH + "?action=updateProduct",
            dataType: "json", // We know we want JSON data
            data: JSON.stringify(product),
            success: function() {
                alert("Produkt wurde geupdated");

            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(JSON.stringify(xhr));
                console.log("AJAX error: " + ajaxOptions + ' : ' + thrownError);
            },
        });

    }







})