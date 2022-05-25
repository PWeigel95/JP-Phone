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
        $sql = "SELECT `user_id`, `benutzername`,`passwort`, `anrede`, `email`, `vorname`, `nachname`, `adresse`, `plz`, `ort`, `zahlungsinformation_id`, `user_status`, `role_id`, `erstellungsdatum`   from `users` where `benutzername` = ?";
        $stmt = $db_obj->prepare($sql);
        if (!$stmt) $this->handleError($db_obj);

        $stmt->bind_param("s", $loginData->benutzername);

        $stmt->bind_result($user_id, $benutzername, $aktuellesPassword, $anrede, $email, $vorname, $nachname, $adresse, $plz, $ort, $zahlungsinformation_id, $user_status,$role_id, $erstellungsdatum);

        if ($stmt->execute()) {

            if ($stmt->fetch()) {
                //Überprüfe, ob das eingebene Passwort mit dem Passwort aus der Datenbank übereinstimmt
                $isPasswordCorrect = password_verify($loginData->passwort, $aktuellesPassword);

                if ($isPasswordCorrect && $user_status == 1) {

                    session_start();

                    $user = new User($anrede, $vorname, $nachname, $adresse, $plz, $ort, $email, $benutzername, $aktuellesPassword, $zahlungsinformation_id, $role_id, $user_status, $erstellungsdatum);

                    $_SESSION["user_id"] = $user_id;
                    $_SESSION["benutzername"] = $benutzername;    

                    if($loginData->loginChecked){
                        setCookie("user_id", $user_id);
                        setCookie("benutzername", $benutzername);                        
                    }                
                }
                
                return $user;
            }
        }
        $db_obj->close();
    }

    public function createUser($userdata){
        $db_obj = $this->getDb();

        $sql = "INSERT INTO `users`(`anrede`, `vorname`, `nachname`, `adresse`,`plz`, `ort`,`email`,`benutzername`,`passwort`, `zahlungsinformation_id`,`role_id`, `user_status`, `erstellungsdatum`) VALUES (?, ?, ?, ?, ?,?,?,?,?,?,?,?)";
        $stmt = $db_obj->prepare($sql);
        if (!$stmt) $this->handleError($db_obj);

        $stmt->bind_param("sssssssssiiis", 
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
        $userdata->user_status,
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
    
}

?>