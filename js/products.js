let categoryFilter = null;
let searchText = "";

function clearProducts() {
    // clear all existing products in the HTML
    $("#products").empty();
}

function addProduct(product) {
    // add the product card to the #products div
    const productDiv = $(`<div class="col" data-category-id="${product.category_id}">
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
            url: API_PATH + "?action=addToBasket&product_id=" + product.product_id,
            dataType: "json",
            success: function(data) {
                // log the products to the console and then set add them to the HTML:
                console.log(data);
                setNavbarBasket(data);
            },
            error: function(error) {
                console.error(error);
            },
        });
    });

    $("#products").append(productDiv);
}

function getCategoriesFromProducts(products) {
    const categories = [];
    const categoryIds = [];
    for (const p of products) {
        if (p.category) {
            if (!categoryIds.includes(p.category.category_id)) {
                categoryIds.push(p.category.category_id);
                categories.push(p.category);
            }
        }
    }
    categories.sort((a, b) => a.name.localeCompare(b.name));
    return categories;
}

function setCategoryFilter(e) {
    const categoryId = $(this).data("category-id");
    if (categoryId === "") {
        categoryFilter = null;
    } else {
        categoryFilter = categoryId;
    }
    updateProductFilters();
}

function setCategories(categories) {
    $('#productCategories').empty();
    const allProductsButton = $(`<button class="btn btn-primary me-2" data-category-id="">Alle Produkte</button>`);
    allProductsButton.click(setCategoryFilter);
    $('#productCategories').append(allProductsButton);
    for (const c of categories) {
        const categoryButton = $(`<button class="btn btn-outline-secondary me-2" data-category-id="${c.category_id}">${c.name}</button>`);
        categoryButton.click(setCategoryFilter);
        $('#productCategories').append(categoryButton);
    }
}

function setProducts(products) {
    const categories = getCategoriesFromProducts(products);
    setCategories(categories);

    // first, clear any products (if there are any in the HTML already)
    clearProducts();

    // then, add all products to the #products div:
    for (const product of products) {
        addProduct(product);
    }

    updateProductFilters();
}

function filterProducts() {
    $('#produktFilterInput').keyup(function() {
        searchText = $(this).val().toLowerCase();
        updateProductFilters();
    })
}

function updateProductFilters() {
    $("#productCategories > button").each(function () {
        const categoryId = $(this).data("category-id");
        const categoryMatches = categoryId === categoryFilter || (categoryId === "" && categoryFilter == null);
        $(this).toggleClass("btn-primary", categoryMatches);
        $(this).toggleClass("btn-outline-secondary", !categoryMatches);
    });
    $('#products > div').each(function() {
        const categoryId = $(this).data("category-id");
        const productText = $(this).text().toLowerCase();
        const textMatches = productText.includes(searchText);
        const categoryMatches = categoryFilter == null || categoryId === categoryFilter;

        $(this).toggle(textMatches && categoryMatches);
    })
}

$(document).ready(function() {
    // When document is ready
    filterProducts();

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
});