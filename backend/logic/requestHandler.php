<?php 

require_once("./config/dataHandler.php");
require_once("./models/user.class.php");

$businessLogic = new BusinessLogic();
$businessLogic->processRequest();


class BusinessLogic{
    
    private $dh;
    function __construct(){
        $this->dh = new Datahandler();
    }

    public function processRequest(){
        // processes all requests

        $method = $_SERVER['REQUEST_METHOD'];
        switch ($method){
            case "GET":
                $this->processGet();
                break;
            case "POST":
                $this->processPost();
                break;
            case "PUT":
                $this->processPut();
                break;
            default:
                echo "Method not found";
        }
    }

    function processGet(){
        // processes GET requests to backend?resource=XYZ

        if (!isset($_GET['resource'])) {
            $this->error(400, [], "Bad Request - no resource");
        }

        $data = json_decode(file_get_contents("php://input"));
        
        switch ($_GET['resource']) {
            case "products":
                $this->processGetProducts();
                break;
            case "basket":
                $this->processGetBasket();
                break;
            case "getAllUsers":
                $this->processGetAllUsers();
                break;
            case "orders":
                $this->processGetOrders();
                break;
            default:
                echo "Resource not found";
        }
    }

    function processPost(){
        // processes POST requests to backend?action=XYZ
        
        if (!isset($_GET['action'])) {
            $this->error(400, [], "Bad Request - no action");
        }

        $data = json_decode(file_get_contents("php://input"));


        switch ($_GET['action']) {
            case "register":
                $this->processRegister($data);
                break;
            case "login":
                $this->processLogin($data);
                break;
            case "addToBasket":
                $this->processAddToBasket();
                break;
            case "setBasket":
                $this->processSetBasket();
                break;
            case "logout":
                $this->processLogout();
                break;
            case "getCurrentUser":
                $this->processGetCurrentUser($data);
                break;
            case "checkPassword":
                $this->processCheckPassword($data);
                break;
            case "createProduct":
                $this->processCreateProduct($data);
                break;
            case "checkout":
                $this->processCheckout();
                break;
            case "checkIfUsernameIsAlreadyTaken":
                $this->processCheckIfUsernameIsAlreadyTaken($data);
                break;
            case "getProductById":
                $this->processGetProductById($data);
                break;
            default:
                echo "Action not found";
        }
    }

    function processPut(){

        if (!isset($_GET['action'])) {
            $this->error(400, [], "Bad Request - no action");
        }

        $data = json_decode(file_get_contents("php://input"));

        switch ($_GET['action']) {
            case "updateUser":
                $this->processUpdateUser($data);
                break;
            case "changePassword":
                $this->processChangePassword($data);
                break;
            default:
                echo "Action not found";
        }

    }

    function processGetProducts() {
        $this->success(200, $this->dh->getProducts());
    }

    function getBasketData($idsInBasket) {
        $productsById = $this->dh->getProductsById();

        $totalPrice = 0;

        $basketProducts = array();
        foreach ($idsInBasket as $productId => $count) {
            if (isset($productsById[$productId])) {
                $product = $productsById[$productId];
                $price = floatval($product->price) * $count;
                $totalPrice += $price;
                array_push($basketProducts, array(
                    "product" => $product,
                    "count" => $count,
                    "price" => number_format($price, 2, ".", ""),
                ));
            }
        }

        $basket = array(
            "products" => $basketProducts,
            "totalPrice" => number_format($totalPrice, 2, ".", ""),
        );

        return $basket;
    }

    function getSessionBasketData() {
        if (!isset($_SESSION)) {
            session_start();
        }
        $idsInBasket = array();
        if (isset($_SESSION["basket"])) {
            $idsInBasket = $_SESSION["basket"];
        }
        return $this->getBasketData($idsInBasket);
    }

    function processGetBasket() {
        $this->success(200, $this->getSessionBasketData());
    }

    function processLogin($loginData){

        // check json data
        if(!isset($loginData->benutzername) || !isset($loginData->passwort) || !isset($loginData->loginChecked)){
            $this->error(400, [], "Bad Request - username, passwort, loginChecked are required!");
        }

        if (($result = $this->dh->getUser($loginData)) === false) {
            $this->error(400, [], "Bad Request - error logging in ");
        }

        // status code 201 = "login successful"
        $this->success(201, $result);
            
    }

    function processAddToBasket() {
        // check json data
        if(!isset($_GET["product_id"])){
            $this->error(400, [], "Bad Request - product_id is required!");
        }

        $productId = $_GET["product_id"];
        $productsById = $this->dh->getProductsById();
        if (!isset($productsById[$productId])) {
            $this->error(400, [], "Bad Request - unknown product_id");
        }

        session_start();
        if (!isset($_SESSION["basket"])) {
            $_SESSION["basket"] = array();
        }
        if (!isset($_SESSION["basket"][$productId])) {
            $_SESSION["basket"][$productId] = 1;
        } else {
            $_SESSION["basket"][$productId]++;
        }

        $this->processGetBasket();
    }

    function processSetBasket() {
        // check json data
        if(!isset($_GET["product_id"])){
            $this->error(400, [], "Bad Request - product_id is required!");
        }
        if(!isset($_GET["count"])){
            $this->error(400, [], "Bad Request - count is required!");
        }

        $productId = $_GET["product_id"];
        $count = intval($_GET["count"]);
        $productsById = $this->dh->getProductsById();
        if (!isset($productsById[$productId])) {
            $this->error(400, [], "Bad Request - unknown product_id");
        }

        session_start();
        if (!isset($_SESSION["basket"])) {
            $_SESSION["basket"] = array();
        }
        if ($count === 0) {
            unset($_SESSION["basket"][$productId]);
        } else if ($count > 0) {
            $_SESSION["basket"][$productId] = $count;
        } else {
            $this->error(400, [], "Bad Request - count is an invalid number!");
        }

        $this->processGetBasket();
    }

    function getCurrentUserId() {
        if (!isset($_SESSION)) {
            session_start();
        }
        if (!isset($_SESSION["user"]) || !isset($_SESSION["user"]["user_id"])) {
            return null;
        } else {
            return $_SESSION["user"]["user_id"];
        }
    }

    function processCheckout() {
        $user_id = $this->getCurrentUserId();
        if ($user_id == null) {
            $this->error(400, [], "Not logged in!");
        }

        // Get current basket from the user
        $basket = $this->getSessionBasketData();
        if (count($basket["products"]) === 0) {
            $this->error(400, [], "No products in basket!");
        }

        // Create order with order products
        $result = $this->dh->createOrder($user_id, $basket);

        if ($result) {
            // Make basket empty
            $_SESSION["basket"] = array();
            $this->success(201, "created");
        } else {
            $this->error(400, [], "Error during creation");
        }
    }
    

    function processRegister($data) {

        // check json data
        if(!isset($data->anrede) || !isset($data->vorname) 
        || !isset($data->nachname) || !isset($data->adresse) 
        || !isset($data->plz) || !isset($data->ort) 
        || !isset($data->email) || !isset($data->benutzername) 
        || !isset($data->passwort) || !isset($data->zahlungsinformation_id)){
            $this->error(400, [], "Bad Request - email, first_name, last_name are required!");
        }

        //hashpassword
        $data->passwort = password_hash($data->passwort, PASSWORD_DEFAULT);

        $role_id = 1;

        $date = new DateTime();
        $erstellungsdatum = $date->format("d-M-Y H:i:s");

        $user = new User($data->anrede,$data->vorname,$data->nachname, $data->adresse, $data->plz, $data->ort, $data->email, $data->benutzername, $data->passwort, $data->zahlungsinformation_id,$role_id,$erstellungsdatum);

        if (($result = $this->dh->createUser($user)) === false) {
            $this->error(400, [], "Bad Request - error saving user");
        }

        // status code 201 = "created"
        $this->success(201, $result);
    }

    function processLogout(){

        if (($result = $this->dh->logoutUser()) === false) {
            $this->error(400, [], "Bad Request - error logout");
        }
        $this->success(200, $result);
        
    }

    function processUpdateUser($userData){
        
        if (($result = $this->dh->updateUser($userData)) === false) {
            $this->error(400, [], "Bad Request - error logout");
        }
        $this->success(200, $result);
        
    }

    function processGetCurrentUser($username){

        $this->success(200, $this->dh->getCurrentUser($username));
        
    }

    function processCheckPassword($userData){
        if (($result = $this->dh->checkPassword($userData)) === false) {
            $this->error(400, [], "Bad Request - wrong password");
        }
        $this->success(200, $result);
        
    }

    function processChangePassword($userData){
        if (($result = $this->dh->updatePassword($userData)) === false) {
            $this->error(400, [], "Bad Request - There was an error while changing the password!");
        }
        $this->success(200, $result);
    }

    function processCreateProduct($productData){
        if (($result = $this->dh->createProduct($productData)) === false) {
            $this->error(400, [], "Bad Request - There was an error creating the product");
        }
        $this->success(200, $result);   
    }

    function processGetAllUsers()
    {
        if (($result = $this->dh->getAllUsers()) === false) {
            $this->error(400, [], "Bad Request - There was an error getting all users");
        }
        $this->success(200, $result);   
        
    }

    function processGetOrders() {
        session_start();
        $user_id = $this->getCurrentUserId();
        if ($user_id) {
            $orders = $this->dh->getOrdersForUser($user_id);
            $this->success(200, $orders);
        } else {
            $this->error(400, [], "Bad Request - Not logged in");
        }
    }
    function processCheckIfUsernameIsAlreadyTaken($userData)
    {
        if (($result = $this->dh->getUserByUsername($userData)) === false) {
            $this->error(400, [], "Bad Request - There was an error getting all users");
        }
        $this->success(200, $result);   
        
    }

    function processGetProductById($productId)
    {
        $this->success(200, $this->dh->getProductById($productId));
        
    }

    private function success(int $code, $obj) {
        http_response_code($code);
        header('Content-Type: application/json');
        echo(json_encode($obj));
        exit;
    }

    private function error(int $code, array $headers, $msg) {
        http_response_code($code);
        foreach ($headers as $hdr) {
            header($hdr);
        }    
        echo ($msg);
        exit;
    }   

}

?>