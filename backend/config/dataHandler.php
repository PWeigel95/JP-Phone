<?php

include ("dbaccess.php");
$db_obj = new mysqli($servername, $username, $password, $dbname);

class Datahandler{

    public function createUser($userdata){
        //$sql = "INSERT INTO `users`(`username`, `password`, `email`, `role_id`,`u_status`, `anrede`,`fname`,`lname`) VALUES (?, ?, ?, ?, ?,?,?,?)";
        //$stmt = $db_obj->prepare($sql);
        //$stmt->bind_param("sssiisss", $uname, $pass, $mail, $role_id, $u_status, $anrede, $fname, $lname);

        //close the statement
        //$stmt->close();
        //close the connection
        //$db_obj->close();
    }
    
}

?>