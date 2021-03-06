$(document).ready(function() {
    getProducts();
    getCategories();

    function setCategories(categories) {
        categories.sort((a, b) => a.name.localeCompare(b.name));
        $("#inputCategory").empty();
        $("#inputCategory").append($(`<option value="">Keine</option>`));
        for (const c of categories) {
            $("#inputCategory").append($(`<option value="${c.category_id}">${c.name}</option>`));
        }
        $("#editCategory").empty();
        $("#editCategory").append($(`<option value="">Keine</option>`));
        for (const c of categories) {
            $("#editCategory").append($(`<option value="${c.category_id}">${c.name}</option>`));
        }
    }

    function getCategories() {
        $.ajax({
            method: "get",
            url: API_PATH + "?resource=categories", // This calls the backend/index.php file (relative to the .html file)
            dataType: "json", // We know we want JSON data
            success: function(data) {
                // log the categories to the console and then set add them to the HTML:
                console.log(data);
                setCategories(data);
            },
            error: function(error) {
                console.error(error);
            },
        });
    }

    $("#editProduct").hide();
    listUsers();


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


    $("#btnEditProduct").on("click", function() {
        let productId = $(this).attr("name");

        let product = {
            productId: productId,
            productName: $("#editInputProduktname").val(),
            productDescription: $("#editTextareaBeschreibung").val(),
            productPrice: $("#editInputPreis").val(),
            productImageUrl: $("#editProductImage").attr("src"),
            productCategory: $("#editCategory").val(),
        }
        updateProduct(product);

    })

    $("#v-pills-editCustomers").on("click", "#btnShowOrders", function() {
        let username = $(this).attr("name");
        showOrders(username);

    })

    $("#v-pills-editCustomers").on("click", "#btnEditUser", function() {
        let username = $(this).attr("name");
        changeUserStatus(username);

    })



    function createProduct() {

        let produktName = $("#inputProduktname").val();
        let produktBeschreibung = $("#textareaBeschreibung").val();
        let produktPreis = $("#inputPreis").val();
        let produktFotoUrl = $("#fileProduktFoto").val();
        let produktKategorie = $("#inputCategory").val();


        let produkt = {
            produktName: produktName,
            produktBeschreibung: produktBeschreibung,
            produktPreis: produktPreis,
            produktFotoUrl: produktFotoUrl,
            produktKategorie: produktKategorie
        }

        $.ajax({
            method: "POST",
            url: API_PATH + "?action=createProduct",
            dataType: "json", // We know we want JSON data
            data: JSON.stringify(produkt),
            success: function() {
                alert("Produkt wurde erstellt!");
                clearInputs();

            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(JSON.stringify(xhr));
                console.log("AJAX error: " + ajaxOptions + ' : ' + thrownError);
            },
        });


    }


    function clearInputs() {
        $("#inputProduktname").val("");
        $("#textareaBeschreibung").val("");
        $("#inputPreis").val("");
        $("#fileProduktFoto").val("");

    }

    function listUsers() {
        $("#customersTable").empty();

        $.ajax({
            method: "GET",
            url: API_PATH + "?resource=getAllUsers",
            dataType: "json", // We know we want JSON data
            success: function(users) {
                for (const user of users) {
                    $("#customersTable").append(`<tr>
                        <td>${user.benutzername}</td>
                        <td>${user.email}</td>
                        <td>${user.user_status}</td>
                        <td><button type='button' id='btnShowOrders' name=${user.benutzername} class='btn btn-primary'>Bestellungen anzeigen</button></td>
                        <td><button type='button' id='btnEditUser' name=${user.benutzername} class='btn btn-primary'>Status ??ndern</button></td>
                    </tr>`);
                }


            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(JSON.stringify(xhr));
                console.log("AJAX error: " + ajaxOptions + ' : ' + thrownError);
            },
        });

    }

    function getProducts() {
        $.ajax({
            method: "GET",
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
                            <p class="card-text">${product.price}???</p>
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

    function deleteProduct(productId) {
        alert("Produkt wird gel??scht");

        let productData = {
            productId: Number(productId)
        }

        $.ajax({
            method: "DELETE",
            url: API_PATH + "?action=deleteProduct",
            dataType: "json", // We know we want JSON data
            data: JSON.stringify(productData),
            success: function() {
                alert("Produkt wurde gel??scht");
                clearProducts();
                getProducts();

            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(JSON.stringify(xhr));
                console.log("AJAX error: " + ajaxOptions + ' : ' + thrownError);
            },
        });
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
        $("#editCategory").val(product.category_id || "");
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
                $("#editProduct").hide();
                getProducts();

            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(JSON.stringify(xhr));
                console.log("AJAX error: " + ajaxOptions + ' : ' + thrownError);
            },
        });

    }

    function showOrders(username) {

        let userData = {
            username: username
        }

        $.ajax({
            method: "POST",
            url: API_PATH + "?action=getOrdersByUsername",
            dataType: "json", // We know we want JSON data
            data: JSON.stringify(userData),
            success: function(orders) {
                loadPageWithOrdersData(orders);

            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(JSON.stringify(xhr));
                console.log("AJAX error: " + ajaxOptions + ' : ' + thrownError);
            },
        });



    }

    function loadPageWithOrdersData(orders) {

        $("#customerListDiv").hide();
        $("#customerOrdersTableDiv").show();

        for (const order of orders) {
            const tr = $(`<tr>
                <td>${order.order_id}</td>
                <td>${order.creation_date}</td>
                <td>${order.total_price} ???</td>
                <td><button class='btn btn-primary'>Details einsehen/drucken</button></td>
            </tr>`);
            $("button", tr).click(() => {
                window.open("invoice.html?order_id=" + order.order_id, "Rechnung", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes");
            });
            $("#customerOrdersTable").append(tr);
        }


    }

    function changeUserStatus(username) {

        let userData = {
            username: username
        }

        $.ajax({
            method: "POST",
            url: API_PATH + "?action=updateUserStatus",
            dataType: "json", // We know we want JSON data
            data: JSON.stringify(userData),
            success: function() {
                alert("User Status wurde ge??ndert");
                listUsers();

            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(JSON.stringify(xhr));
                console.log("AJAX error: " + ajaxOptions + ' : ' + thrownError);
            },
        });

    }











})