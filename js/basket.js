function clearBasketProducts() {
    // clear all existing products in the HTML
    $("#basket").empty();
}

function addBasketProduct(data) {
    const product = data.product;

    // add the product card to the #basket div
    const productDiv = $(`<li class="list-group-item d-flex align-items-center">
        <div class="basket-product-image-container">
            <img src="${product.image_url}" class="basket-product-image" alt="${product.name}">
        </div>
        <div class="flex-fill">
            <strong>${product.name}</strong>
        </div>
        <div class="mx-4">
            Anzahl: ${data.count}
        </div>
        <div class="mx-4">
            ${product.price}€ pro Stück
        </div>
        <div>
            ${data.price}€
        </div>
    </li>`);
    $("#basket").append(productDiv);
}

function setTotalPrice(totalPrice) {
    $("#totalPrice").text(`${totalPrice}€`);
}

function setBasket(basket) {
    setNavbarBasket(basket);
    // first, clear any products (if there are any in the HTML already)
    clearBasketProducts();

    // then, add all products to the #basket div:
    for (const data of basket.products) {
        addBasketProduct(data);
    }

    setTotalPrice(basket.totalPrice);
}

$(document).ready(function () {
    // When document is ready
    $.ajax({
        method: "get",
        url: API_PATH + "?resource=basket", // This calls the backend/index.php file (relative to the .html file)
        dataType: "json", // We know we want JSON data
        success: function (data) {
            // log the products to the console and then set add them to the HTML:
            console.log(data);
            setBasket(data);
        },
        error: function(error) {
            console.error(error);
        },
    });

    $("#orderButton").click(function () {
        $.ajax({
            method: "post",
            url: API_PATH + "?action=checkout",
            dataType: "json",
            success: function (data) {
                if (data === "created") {
                    window.location = "./myAccount.html";
                } else {
                    console.log(data);
                }
            },
            error: function(error) {
                console.error(error);
            },
        });
    });
});
