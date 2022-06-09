<?php

require_once("./models/product.class.php");

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
        $query = "SELECT product_id, name, price, description, image_url FROM products ORDER BY product_id ASC";
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
                $row['image_url']
            );
            // and add it to the array
            array_push($products, $product);
        }
        
        // close the connection
        $db_obj->close();

        // finally return all products
        return $products;
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

        $sql = "INSERT INTO `products`(`name`, `price`, `description`, `image_url`) VALUES (?,?,?,?)";
        $stmt = $db_obj->prepare($sql);
        if (!$stmt) $this->handleError($db_obj);

        $stmt->bind_param("sdss", 
        $productData->produktName,
        $productData->produktPreis,
        $productData->produktBeschreibung, 
        $productData->produktFotoUrl);

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