<?php

require_once("./models/product.class.php");

class Datahandler{

    private function getDb() {
        // Creates a new mysqli connection and returns it
        include("./config/dbaccess.php");
        return new mysqli($servername, $username, $password, $dbname);
    }

    public function getProducts() {
        // Prepare the array we will return in the end:
        $products = array();
        
        // connect to mysql:
        $db_obj = $this->getDb();

        // run the query
        $query = "SELECT product_id, name, price, description, image_url FROM products ORDER BY product_id ASC";
        $result = $db_obj->query($query);

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

    public function getUser($loginData){

        // connect to mysql:
        $db_obj = $this->getDb();

        // run the query
        $sql = "SELECT `user_id`, `benutzername`,`passwort`, `user_status`, `role_id`  from `users` where `benutzername` = ?";
        $stmt = $db_obj->prepare($sql);

        $stmt->bind_param("s", $loginData->benutzername);

        $stmt->execute();

        $stmt->bind_result($user_id, $benutzername, $aktuellesPassword, $user_status,$role_id);

        if ($stmt->execute()) {

            if ($stmt->fetch()) {
                //Überprüfe, ob das eingebene Passwort mit dem Passwort aus der Datenbank übereinstimmt
                $isPasswordCorrect = password_verify($loginData->passwort, $aktuellesPassword);

                if ($isPasswordCorrect && $user_status == 1) {
                    /*
                    $_SESSION["user_id"] = $userid;
                    $_SESSION["username"] = $username;
                    $_SESSION["role_id"] = $role_id;
    
                    setCookie("user_id", $userid);
                    setCookie("username", $username);
                    setCookie("role_id", $role_id);*/
    
                    return true;
                }
                //Falls die Passwörter nicht übereinstimmen sollten
                else if (!$isPasswordCorrect) {
                    $login_error = "Wrong username/password";
                    return false;
                }
                //Falls der User nicht "aktiv" ist
                else if ($user_status != 1) {
                    $login_error =  "User is inactive! Please contact the system administrator";
                    return false;
                }
            }
        }
    }

    public function createUser($userdata){
        $db_obj = $this->getDb();


        /*
        echo "Anrede: " .$userdata->anrede;
        echo "vorname: " .$userdata->vorname;
        echo "nachname: " .$userdata->nachname;
        echo "adresse: " .$userdata->adresse;
        echo "plz: " .$userdata->plz;
        echo "ort: " .$userdata->ort;
        echo "email: " .$userdata->email;
        echo "username: " .$userdata->benutzername;
        echo "passwort: " .$userdata->passwort;
        echo "zahlungsinformation_id: " .$userdata->zahlungsinformation_id;
        echo "role_id: " .$userdata->role_id;
        echo "user_status: " .$userdata->user_status;
        */

        $sql = "INSERT INTO `users`(`anrede`, `vorname`, `nachname`, `adresse`,`plz`, `ort`,`email`,`benutzername`,`passwort`, `zahlungsinformation_id`,`role_id`, `user_status`) VALUES (?, ?, ?, ?, ?,?,?,?,?,?,?,?)";
        $stmt = $db_obj->prepare($sql);
        $stmt->bind_param("sssssssssiii", 
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
        $userdata->user_status);

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