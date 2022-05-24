const apiPath = "./backend/index.php";

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
                        <button class="btn btn-primary btn-lg add-to-basket"><i class="bi bi-cart"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>`);
    const addToBasket = $(productDiv).find(".add-to-basket");
    addToBasket.click(() => {
        console.log("addToBasket", product);
        $.ajax({
            method: "post",
            url: apiPath + "?action=addToBasket&product_id=" + product.product_id,
            dataType: "json",
            success: function (data) {
                // log the products to the console and then set add them to the HTML:
                console.log(data);
                setBasket(data);
            },
            error: function(error) {
                console.error(error);
            },
        });
    });

    $("#products").append(productDiv);
}

function setProducts(products) {
    // first, clear any products (if there are any in the HTML already)
    clearProducts();

    // then, add all products to the #products div:
    for (const product of products) {
        addProduct(product);
    }
}

function setBasket(basket) {
    let productCount = 0;
    for (const product of basket.products) {
        productCount += product.count;
    }
    if (productCount === 0) {
        $("#basketCount").attr("hidden", true);
    } else {
        $("#basketCount").text(productCount).attr("hidden", false);
    }
}

$(document).ready(function () {
    // When document is ready
    $.ajax({
        method: "get",
        url: apiPath + "?resource=products", // This calls the backend/index.php file (relative to the .html file)
        dataType: "json", // We know we want JSON data
        success: function (data) {
            // log the products to the console and then set add them to the HTML:
            console.log(data);
            setProducts(data);
        },
        error: function(error) {
            console.error(error);
        },
    });
    
    $.ajax({
        method: "get",
        url: apiPath + "?resource=basket",
        dataType: "json", // We know we want JSON data
        success: function (data) {
            // log the basket to the console and then set add them to the HTML:
            console.log(data);
            setBasket(data);
        },
        error: function(error) {
            console.error(error);
        },
    });
});
