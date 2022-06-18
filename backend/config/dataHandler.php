<?php

require_once("./models/product.class.php");
require_once("./models/order.class.php");
require_once("./models/order_product.class.php");
require_once("./models/category.class.php");

class Datahandler{

    private function getDb() {
        // Creates a new mysqli connection and returns it
        include("./config/dbaccess.php");
        $mysqli = new mysqli($servername, $username, $password, $dbname);
        if ($mysqli->connect_errno) {
            printf("Connect failed: %s\n", $mysqli->connect_error);
            exit();
        }
        return $mysqli;
    }

    private function handleError($db_obj) {
        if ($db_obj->error) {
            printf("Error message: %s\n", $db_obj->error);
            exit();
        }
    }

    public function getProducts() {
        // Prepare the array we will return in the end:
        $products = array();
        
        // connect to mysql:
        $db_obj = $this->getDb();

        // run the query
        $query = "SELECT p.product_id, p.name, p.price, p.description, p.image_url, p.category_id, c.category_id, c.name as category_name FROM products p LEFT JOIN categories c ON (p.category_id = c.category_id) ORDER BY p.product_id ASC";
        $result = $db_obj->query($query);
        if (!$result) $this->handleError($db_obj);

        // loop through all results
        while ($row = $result->fetch_assoc()) {
            // convert it into a Product instance
            $product = new Product(
                $row['product_id'],
                $row['name'],
                $row['price'],
                $row['description'],
                $row['image_url'],
                $row['category_id']
            );
            if ($row['category_id'] != null) {
                $product->category = new Category(
                    $row['category_id'],
                    $row['category_name'],
                );
            }
            // and add it to the array
            array_push($products, $product);
        }
        
        // close the connection
        $db_obj->close();

        // finally return all products
        return $products;
    }

    public function getCategories() {
        // Prepare the array we will return in the end:
        $categories = array();
        
        // connect to mysql:
        $db_obj = $this->getDb();

        // run the query
        $query = "SELECT category_id, name FROM categories ORDER BY category_id ASC";
        $result = $db_obj->query($query);
        if (!$result) $this->handleError($db_obj);

        // loop through all results
        while ($row = $result->fetch_assoc()) {
            // convert it into a Category instance
            $category = new Category(
                $row['category_id'],
                $row['name'],
            );
            // and add it to the array
            array_push($categories, $category);
        }
        
        // close the connection
        $db_obj->close();

        // finally return all categories
        return $categories;
    }

    public function getProductsById() {
        $allProducts = $this->getProducts();
        $productsById = array();
        foreach ($allProducts as $product) {
            $productsById[$product->product_id] = $product;
        }
        return $productsById;
    }

    public function getUser($loginData){

        $user = array();

        // connect to mysql:
        $db_obj = $this->getDb();

        // run the query
        $sql = "SELECT `user_id`, `benutzername`,`passwort`, `anrede`, `email`, `vorname`, `nachname`, `adresse`, `plz`, `ort`, `zahlungsinformation_id`, `role_id`, `erstellungsdatum`   from `users` where `benutzername` = ?";
        $stmt = $db_obj->prepare($sql);
        if (!$stmt) $this->handleError($db_obj);

        $stmt->bind_param("s", $loginData->benutzername);

        $stmt->bind_result($user_id, $benutzername, $aktuellesPassword, $anrede, $email, $vorname, $nachname, $adresse, $plz, $ort, $zahlungsinformation_id,$role_id, $erstellungsdatum);

        if ($stmt->execute()) {

            if ($stmt->fetch()) {
                //Überprüfe, ob das eingebene Passwort mit dem Passwort aus der Datenbank übereinstimmt
                $isPasswordCorrect = password_verify($loginData->passwort, $aktuellesPassword);

                if ($isPasswordCorrect) {

                    session_start();

                    $user = new User($anrede, $vorname, $nachname, $adresse, $plz, $ort, $email, $benutzername, $aktuellesPassword, $zahlungsinformation_id, $role_id, $erstellungsdatum);

                    $_SESSION["user"]["user_id"] = $user_id;
                    $_SESSION["user"]["benutzername"] = $benutzername;    

                    if($loginData->loginChecked){
                        setCookie("user_id", $user_id);
                        setCookie("benutzername", $benutzername);                        
                    }                
                }
                
                
            }
            return $user;
        }
        $db_obj->close();
    }

    public function getUserById($user_id){
        // connect to mysql:
        $db_obj = $this->getDb();

        // run the query
        $sql = "SELECT `user_id`, `benutzername`,`passwort`, `anrede`, `email`, `vorname`, `nachname`, `adresse`, `plz`, `ort`, `zahlungsinformation_id`, `role_id`, `erstellungsdatum` from `users` where `user_id` = ?";
        $stmt = $db_obj->prepare($sql);
        if (!$stmt) $this->handleError($db_obj);

        $stmt->bind_param("i", $user_id);
        if ($stmt->execute()) {
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();

            if ($row) {
                return new User(
                    $row["anrede"],
                    $row["vorname"],
                    $row["nachname"],
                    $row["adresse"],
                    $row["plz"],
                    $row["ort"],
                    $row["email"],
                    $row["benutzername"],
                    $row["passwort"],
                    $row["zahlungsinformation_id"],
                    $row["role_id"],
                    $row["erstellungsdatum"]
                );
            } else {
                return null;
            }
        } else {
            $db_obj->close();
            return null;
        }
    }

    public function createUser($userdata){
        $db_obj = $this->getDb();

        $sql = "INSERT INTO `users`(`anrede`, `vorname`, `nachname`, `adresse`,`plz`, `ort`,`email`,`benutzername`,`passwort`, `zahlungsinformation_id`,`role_id`, `erstellungsdatum`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
        $stmt = $db_obj->prepare($sql);
        if (!$stmt) $this->handleError($db_obj);

        $stmt->bind_param("sssssssssiis", 
        $userdata->anrede, 
        $userdata->vorname, 
        $userdata->nachname, 
        $userdata->adresse, 
        $userdata->plz, 
        $userdata->ort, 
        $userdata->email,  
        $userdata->benutzername, 
        $userdata->passwort,
        $userdata->zahlungsinformation_id,
        $userdata->role_id,
        $userdata->erstellungsdatum);

        if($stmt->execute()){
            $stmt->close();
            //close the connection
            $db_obj->close();
            return true;
        }
        else{
            echo htmlspecialchars($stmt->error);
            //close the statement
            $stmt->close();
            //close the connection
            $db_obj->close();
            return false;
            
        }
        
    }

    public function logoutUser(){
        if (!isset($_SESSION))
        {
            $_SESSION = array();
        }
     
        unset($_SESSION["user"]["user_id"]);
        unset($_SESSION["user"]["benutzername"] );
        unset($_COOKIE["user_id"]);
        unset($_COOKIE["benutzername"]);

        return true;
        
    }

    public function updateUser($userData){

        $db_obj = $this->getDb();
        
        // run the query
        $sql = "UPDATE `users` SET `anrede` = ?, `vorname` = ?, `nachname` = ?, `email` = ?, `adresse` = ?, `plz` = ?, `ort` = ? WHERE `benutzername` = ? ";
        $stmt = $db_obj->prepare($sql);
        if (!$stmt) $this->handleError($db_obj);
        $stmt->bind_param("ssssssss",
        $userData->anrede, 
        $userData->vorname, 
        $userData->nachname,
        $userData->email, 
        $userData->adresse, 
        $userData->plz,
        $userData->ort,
        $userData->benutzername);

        if($stmt->execute()){            
                $stmt->close();
                //close the connection
                $db_obj->close();
                return true;           
        }
        else{
            echo htmlspecialchars($stmt->error);
            //close the statement
            $stmt->close();
            //close the connection
            $db_obj->close();
            return false;
            
        }
        
    }

    public function getCurrentUser($username){
        // connect to mysql:
        $db_obj = $this->getDb();

        // run the query
        $sql = "SELECT `anrede`,`vorname`, `nachname`, `email`, `adresse`, `plz`, `ort`, `benutzername` FROM `users` WHERE `benutzername` = ?";
        $stmt = $db_obj->prepare($sql);
        if (!$stmt) $this->handleError($db_obj);

        $stmt->bind_param("s", $username);

        $stmt->bind_result($anrede, $vorname, $nachname, $email, $adresse, $plz, $ort, $benutzername);

        if ($stmt->execute()) {

            if ($stmt->fetch()) {

                $user = new User($anrede, $vorname, $nachname, $adresse, $plz, $ort, $email, $benutzername,'','','','');

                return $user;
            }
        }
        $db_obj->close();
        
    }

    public function checkPassword($userData){

        $db_obj = $this->getDb();
        
        // run the query
        $sql = "SELECT `passwort` FROM `users` WHERE `benutzername` = ?";
        $stmt = $db_obj->prepare($sql);
        if (!$stmt) $this->handleError($db_obj);

        $stmt->bind_param("s", $userData->username);

        $stmt->bind_result($passwordFromDB);

        if ($stmt->execute()) {

            if ($stmt->fetch()) {                
                //Überprüfe, ob das eingebene Passwort mit dem Passwort aus der Datenbank übereinstimmt
                $isPasswordCorrect = password_verify($userData->password, $passwordFromDB);

                if ($isPasswordCorrect) {
                    
                    return true;
                }
                else{
                    return false;
                }
                
                
            }
            else return false;
        }
        $db_obj->close();
        
    }

    public function updatePassword($userData){

        $db_obj = $this->getDb();

        $passwordHashed = password_hash($userData->password, PASSWORD_DEFAULT);

        $sql = "UPDATE `users` SET `passwort` = ? WHERE `benutzername` = ? ";
        $stmt = $db_obj->prepare($sql);
        if (!$stmt) $this->handleError($db_obj);
        $stmt->bind_param("ss", $passwordHashed, $userData -> username);

        if($stmt->execute()){            
            $stmt->close();
            //close the connection
            $db_obj->close();
            return true;           
        }
        else{
            echo htmlspecialchars($stmt->error);
            //close the statement
            $stmt->close();
            //close the connection
            $db_obj->close();
            return false;
        
        }
        
    }

    public function createProduct($productData){

        $db_obj = $this->getDb();

        $sql = "INSERT INTO `products`(`name`, `price`, `description`, `image_url`, `category_id`) VALUES (?,?,?,?,?)";
        $stmt = $db_obj->prepare($sql);
        if (!$stmt) $this->handleError($db_obj);

        $category_id = $productData->produktKategorie;
        if ($category_id === "") {
            $category_id = null;
        }

        $stmt->bind_param("sdssi", 
        $productData->produktName,
        $productData->produktPreis,
        $productData->produktBeschreibung, 
        $productData->produktFotoUrl,
        $category_id);

        if($stmt->execute()){            
            $stmt->close();
            //close the connection
            $db_obj->close();
            return true;           
        }
        else{
            echo htmlspecialchars($stmt->error);
            //close the statement
            $stmt->close();
            //close the connection
            $db_obj->close();
            return false;
        
        }
        
    }

    public function getAllUsers(){

        // Prepare the array we will return in the end:
        $users = array();
        
        // connect to mysql:
        $db_obj = $this->getDb();

        // run the query
        $query = "SELECT `anrede`, `vorname`, `nachname`, `adresse`, `plz`, `ort`, `email`, `benutzername` FROM users ORDER BY `user_id` ";
        $result = $db_obj->query($query);
        if (!$result) $this->handleError($db_obj);

        // loop through all results
        while ($row = $result->fetch_assoc()) {
            // convert it into a Product instance
            $user = new User(
                $row['anrede'],
                $row['vorname'],
                $row['nachname'],
                $row['adresse'],
                $row['plz'],
                $row['ort'],
                $row['email'],
                $row['benutzername'],
                '',
                '',
                $row['role_id'],
                ''              
            );
            // and add it to the array
            array_push($users, $user);
        }
        
        // close the connection
        $db_obj->close();

        // finally return all users
        return $users;
        
    }

    public function getUserByUsername($userData){

        $db_obj = $this->getDb();

        $sql = "SELECT 1 FROM users WHERE benutzername = ? ";
        $stmt = $db_obj->prepare($sql);
        if (!$stmt) $this->handleError($db_obj);

        $stmt->bind_param("s", $userData->username);
        
    }

    private function addProductToOrder($db_obj, $order_id, $product) {
        $sql = "INSERT INTO `order_products` (`order_id`, `product_id`, `amount`, `price_per_item`, `total_price`) VALUES (?,?,?,?,?)";
        $stmt = $db_obj->prepare($sql);
        if (!$stmt) $this->handleError($db_obj);
        $stmt->bind_param("iiidd",
            $order_id,
            $product["product"]->product_id,
            $product["count"],
            $product["product"]->price,
            $product["price"],
        );
        if (!$stmt->execute()) {
            echo htmlspecialchars($stmt->error);
            //close the connection
            $stmt->close();
            $db_obj->close();
            return false;
        }
        $stmt->close();
        return true;
    }

    public function createOrder($user_id, $basket) {
        $user = $this->getUserById($user_id);
        if (!$user) {
            return false;
        }

        $db_obj = $this->getDb();

        // Generate Order
        $sql = "INSERT INTO `orders` (`user_id`, `total_price`, `billing_name`, `billing_address`, `billing_zipcode`, `billing_place`) VALUES (?,?,?,?,?,?)";
        $stmt = $db_obj->prepare($sql);
        if (!$stmt) $this->handleError($db_obj);
        $billing_name = $user->anrede.' '.$user->vorname.' '.$user->nachname;
        $stmt->bind_param("idssss",
            $user_id,
            $basket["totalPrice"],
            $billing_name,
            $user->adresse, 
            $user->plz, 
            $user->ort
        );
        if (!$stmt->execute()) {
            echo htmlspecialchars($stmt->error);
            //close the connection
            $stmt->close();
            $db_obj->close();
            return false;
            
        }
        $order_id = $stmt->insert_id;
        $stmt->close();


        // Update Invoice ID
        $invoice_id = date('Ym').str_pad($order_id, 6, '0', STR_PAD_LEFT);
        $sql = "UPDATE `orders` SET `invoice_id` = ? WHERE `order_id` = ?";
        $stmt = $db_obj->prepare($sql);
        if (!$stmt) $this->handleError($db_obj);
        $stmt->bind_param("si", $invoice_id, $order_id);

        if (!$stmt->execute()) {
            echo htmlspecialchars($stmt->error);
            //close the connection
            $stmt->close();
            $db_obj->close();
            return false;
        }
        $stmt->close();


        // Insert Products for Order
        foreach ($basket["products"] as $product) {
            if (!$this->addProductToOrder($db_obj, $order_id, $product)) {
                return false;
            }
        }


        $db_obj->close();
        return true;
    }

    public function fillOrderProducts($order) {
        $db_obj = $this->getDb();
        // run the query
        $sql = "SELECT op.order_product_id, op.order_id, op.product_id, op.amount, op.price_per_item, op.total_price, p.product_id, p.name, p.price, p.description, p.image_url, p.category_id, c.category_id, c.name FROM order_products op LEFT JOIN products p ON (op.product_id = p.product_id) LEFT JOIN categories c ON (p.category_id = c.category_id) WHERE op.order_id = ?";
        $stmt = $db_obj->prepare($sql);
        if (!$stmt) $this->handleError($db_obj);

        $stmt->bind_param("i", $order->order_id);

        $stmt->bind_result(
            $op_order_product_id,
            $op_order_id,
            $op_product_id,
            $op_amount,
            $op_price_per_item,
            $op_total_price,
            $p_product_id,
            $p_name,
            $p_price,
            $p_description,
            $p_image_url,
            $p_category_id,
            $c_category_id,
            $c_name,
        );

        if (!$stmt->execute()) $this->handleError($db_obj);

        // loop through all results
        while ($stmt->fetch()) {
            // convert it into a Order instance

            $product = new Product(
                $p_product_id,
                $p_name,
                $p_price,
                $p_description,
                $p_image_url,
                $p_category_id,
            );
            if ($c_category_id != null) {
                $product->category = new Category(
                    $c_category_id,
                    $c_name,
                );
            }
            $order_product = new OrderProduct(
                $op_order_product_id,
                $op_order_id,
                $op_product_id,
                $op_amount,
                $op_price_per_item,
                $op_total_price,
            );
            $order_product->product = $product;
            // and add it to the array
            array_push($order->order_products, $order_product);
        }
        $stmt->close();
        $db_obj->close();
    }

    public function getOrdersForUser($user_id) {
        // Prepare the array we will return in the end:
        $orders = array();
        
        // connect to mysql:
        $db_obj = $this->getDb();

        // run the query
        $sql = "SELECT order_id, user_id, total_price, creation_date, billing_name, billing_address, billing_zipcode, billing_place, invoice_id FROM orders WHERE user_id = ? ORDER BY creation_date DESC";
        $stmt = $db_obj->prepare($sql);
        if (!$stmt) $this->handleError($db_obj);

        $stmt->bind_param("i", $user_id);
        $stmt->bind_result(
            $o_order_id,
            $o_user_id,
            $o_total_price,
            $o_creation_date,
            $o_billing_name,
            $o_billing_address,
            $o_billing_zipcode,
            $o_billing_place,
            $o_invoice_id,
        );

        $stmt->execute();
        // loop through all results
        while ($stmt->fetch()) {
            // convert it into a Order instance
            $order = new Order(
                $o_order_id,
                $o_user_id,
                $o_total_price,
                $o_creation_date,
                $o_billing_name,
                $o_billing_address,
                $o_billing_zipcode,
                $o_billing_place,
                $o_invoice_id,
            );

            // and add it to the array
            array_push($orders, $order);
        }

        foreach ($orders as $order) {
            $this->fillOrderProducts($db_obj, $order);
        }
        
        // close the connection
        $db_obj->close();

        // finally return all orders
        return $orders;
    }

    public function getProductById($productId){

        $db_obj = $this->getDb();

        $sql = "SELECT p.name, p.price, p.description, p.image_url, p.category_id, c.category_id, c.name FROM products p LEFT JOIN categories c ON (p.category_id = c.category_id) WHERE p.product_id = ?";
        $stmt = $db_obj->prepare($sql);
        if (!$stmt) $this->handleError($db_obj);

        $stmt->bind_param("i", $productId->productId);
        $stmt->bind_result(
            $productName,
            $productPrice,
            $productDescription,
            $productImageUrl,
            $productCategoryId,
            $categoryId,
            $categoryName,
        );

        if ($stmt->execute()) {

            if ($stmt->fetch()) {
                $product = new Product(
                    $productId->productId,
                    $productName,
                    $productPrice,
                    $productDescription,
                    $productImageUrl,
                    $productCategoryId,
                );
                if ($categoryId != null) {
                    $product->category = new Category(
                        $categoryId,
                        $categoryName,
                    );
                }

                return $product;
            }
        }
        $db_obj->close();
        
    }

    public function updateProduct($productData){

        $db_obj = $this->getDb();
        
        // run the query
        $sql = "UPDATE `products` SET `name` = ?, `price` = ?, `description` = ?, `image_url` = ?, `category_id` = ? WHERE `product_id` = ? ";
        $stmt = $db_obj->prepare($sql);
        if (!$stmt) $this->handleError($db_obj);

        $category_id = $productData->productCategory;
        if ($category_id === "") {
            $category_id = null;
        }

        $stmt->bind_param("sdssii",
        $productData->productName, 
        $productData->productPrice, 
        $productData->productDescription,
        $productData->productImageUrl, 
        $category_id, 
        $productData->productId);

        if($stmt->execute()){            
                $stmt->close();
                //close the connection
                $db_obj->close();
                return true;           
        }
        else{
            echo htmlspecialchars($stmt->error);
            //close the statement
            $stmt->close();
            //close the connection
            $db_obj->close();
            return false;
            
        }
        
    }

    public function deleteProduct($productData){

        $db_obj = $this->getDb();
        
        // run the query
        $sql = "DELETE FROM `products` WHERE `product_id` = ? ";
        $stmt = $db_obj->prepare($sql);
        if (!$stmt) $this->handleError($db_obj);
        $stmt->bind_param("i", $productData->productId);

        if($stmt->execute()){            
            $stmt->close();
            //close the connection
            $db_obj->close();
            return true;           
        }
        else{
            echo htmlspecialchars($stmt->error);
            //close the statement
            $stmt->close();
            //close the connection
            $db_obj->close();
            return false;
        
        }
        
    }

    
}

?>