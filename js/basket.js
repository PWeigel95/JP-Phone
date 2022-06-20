const EMPTY_BASKET = {
    products: [],
    totalPrice: "0.00"
};

function clearBasketProducts() {
    // clear all existing products in the HTML
    $("#basket").empty();
}

const DEFAULT_MAX_PRODUCT = 10;

function addBasketProduct(data) {
    const product = data.product;

    const select = $(`<select class="form-select">`);
    for (let i = 0; i <= Math.max(DEFAULT_MAX_PRODUCT, data.count); i++) {
        if (i === 0) {
            select.append($(`<option value="${i}"${i === data.count ? " selected" : ""}>Anzahl: ${i}</option>`));
        } else {
            select.append($(`<option value="${i}"${i === data.count ? " selected" : ""}>Anzahl: ${i}</option>`));
        }
    }
    select.change(function(e) {
        const newCount = parseInt(e.target.value, 10);
        $.ajax({
            method: "post",
            url: API_PATH + "?action=setBasket&product_id=" + product.product_id + "&count=" + newCount,
            dataType: "json",
            success: function(data) {
                // log the products to the console and then set add them to the HTML:
                console.log(data);
                setBasket(data);
            },
            error: function(error) {
                console.error(error);
            },
        });
    });

    // add the product card to the #basket div
    const productDiv = $(`<li class="list-group-item d-flex align-items-center">
        <div class="basket-product-image-container me-4">
            <img src="${product.image_url}" class="basket-product-image" alt="${product.name}">
        </div>
        <div class="basket-product-name">
            <strong>${product.name}</strong>
        </div>
        <div class="basket-product-count mx-4 product-count"></div>
        <div class="basket-product-price-per-item mx-4">
            ${product.price}€ pro Stück
        </div>
        <div class="basket-product-price">
            ${data.price}€
        </div>
    </li>`);
    $(".product-count", productDiv).append(select);
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

    if (basket.products.length === 0) {
        $("#emptyBasket").show();
        $("#nonEmptyBasket").hide();
    } else {
        $("#emptyBasket").hide();
        $("#nonEmptyBasket").show();
        if (getUserRoleId() != null) {
            // logged in
            //$("#basketOrderSection").show();
            $("#basketLoginSection").hide();
            $("#orderButton").prop("disabled", false);
        } else {
            //$("#basketOrderSection").hide();
            $("#basketLoginSection").show();
            $("#orderButton").prop("disabled", true);
        }
    }
}

$(document).ready(function() {
    setBasket(EMPTY_BASKET);

    // When document is ready
    $.ajax({
        method: "get",
        url: API_PATH + "?resource=basket", // This calls the backend/index.php file (relative to the .html file)
        dataType: "json", // We know we want JSON data
        success: function(data) {
            // log the products to the console and then set add them to the HTML:
            console.log(data);
            setBasket(data);
        },
        error: function(error) {
            console.error(error);
        },
    });

    $("#orderButton").click(function() {
        $.ajax({
            method: "post",
            url: API_PATH + "?action=checkout",
            dataType: "json",
            success: function(data) {
                if (data === "created") {
                    alert("Bestellung wurde erfolgreich aufgegeben!");
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