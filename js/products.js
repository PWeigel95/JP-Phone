function clearProducts() {
    // clear all existing products in the HTML
    $("#products").empty();
}

function addProduct(product) {
    // add the product card to the #products div
    $("#products").append(`<div class="col">
        <div class="card">
            <img src="${product.image_url}" class="card-img-top product-image" alt="${product.name}">
            <div class="card-body">
                <div class="d-flex">
                    <div class="p-2 flex-fill">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.price}€</p>
                    </div>
                    <div class="p-2">
                        <a href="#" class="btn btn-primary btn-lg"><i class="bi bi-cart"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </div>`);
}

function setProducts(products) {
    // first, clear any products (if there are any in the HTML already)
    clearProducts();

    // then, add all products to the #products div:
    for (const product of products) {
        addProduct(product);
    }
}

$(document).ready(function () {

    let apiPath = "./backend/index.php"

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
});
