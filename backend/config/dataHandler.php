<?php

class Datahandler{

    public function createUser($userdata){
        include ("dbaccess.php");
        $db_obj = new mysqli($servername, $username, $password, $dbname);


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