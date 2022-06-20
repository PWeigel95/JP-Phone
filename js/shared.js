const API_PATH = "./backend/index.php";

function getUserRoleId() {
    return localStorage.getItem('role_id');
}

function setNavbarBasket(basket) {
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

function updateNavbarActive() {
    const path = window.location.pathname;
    $('#mainNavigationNav').find('li').each(function () {
        const anchor = $("a", this);
        if (anchor.length > 0) {
            const link = anchor.attr('href').replace("./", "");
            if (link === "") {
                $(".nav-link", this).toggleClass('active', path.endsWith("/") || path.endsWith("index.html"));
            } else {
                $(".nav-link", this).toggleClass('active', path.includes(link));
            }
        }
    }); 
}

function updateNavbarRole() {
    const roleId = getUserRoleId();
    switch (roleId) {
        case "1":
            // User
            $("#mainNavigationNav .nav-item:not(.user)").hide();
            break;
        case "2":
            // Admin
            $("#mainNavigationNav .nav-item:not(.admin)").hide();
            break;
        default:
            // Gast
            $("#mainNavigationNav .nav-item:not(.guest)").hide();
    }
}


function executelogOut() {
    $.ajax({
        method: "POST",
        url: API_PATH + "?action=logout",
        dataType: "json",
        success: function() {
            window.localStorage.clear();
            location.href = "./";
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(JSON.stringify(xhr));
            console.log("AJAX error: " + ajaxOptions + ' : ' + thrownError);
        },
    });
}

function buildNavbar() {
    const header = $("#mainNavigation");
    if (header.length > 0) {
        header.addClass("d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom");
        header.append($(`
<a href="./" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
    <span class="fs-4">JP-Phone</span>
</a>
<ul id="mainNavigationNav" class="nav nav-pills">
    <li class="nav-item guest user admin"><a href="./" class="nav-link" aria-current="page">Home</a></li>
    <li class="nav-item guest user admin"><a href="./products.html" class="nav-link" aria-current="page">Produkte</a></li>
    
    <li class="nav-item user admin"><a href="./myAccount.html" class="nav-link">Mein Konto</a></li>
    <li class="nav-item admin"><a href="./admin.html" class="nav-link">Admin</a></li>
    
    <li class="nav-item guest"><a href="./login.html" class="nav-link">Login</a></li>
    <li class="nav-item user admin"><button class="nav-link logout">Logout</button></li>

    <li class="nav-item guest user admin">
        <a href="basket.html" class="nav-link position-relative">
            Warenkorb
            <span id="basketCount" hidden class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                -
            </span>
        </a>
    </li>
</ul>
        `));
        $(".logout", header).click(function () {
            executelogOut();
        });
        updateNavbarRole();
        updateNavbarActive();
        
        $.ajax({
            method: "get",
            url: API_PATH + "?resource=basket",
            dataType: "json",
            success: function(data) {
                // log the basket to the console and then set add them to the HTML:
                console.log(data);
                setNavbarBasket(data);
            },
            error: function(error) {
                console.error(error);
            },
        });
    }
}

$(document).ready(function() {
    buildNavbar();
    const body = $("body");
    if (!body.hasClass("no-fadein")) {
        $("body").fadeIn();        
    } else {
        $("body").show();
    }
});
