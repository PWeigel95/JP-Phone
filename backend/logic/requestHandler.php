<?php 

include("../config/datahandler.php");
include("../models/user.class.php");

$businessLogic = new BusinessLogic();
$businessLogic->processRequest();


class BusinessLogic{
    
    private $dh;
    function __construct(){
        $this->dh = new Datahandler();
    }

    public function processRequest(){
        $method = $_SERVER['REQUEST_METHOD'];
        switch ($method){
            case "GET":
                echo "GET METHOD started";
                break;
            case "POST":
                $this->processPost();
                break;
            default:
                echo "Method not found";
        }
    }

    function processPost(){
        $data = json_decode(file_get_contents("php://input"));

        /*
        echo "Anrede: " .$data->anrede;
        echo "vorname: " .$data->vorname;
        echo "nachname: " .$data->nachname;
        echo "adresse: " .$data->adresse;
        echo "plz: " .$data->plz;
        echo "ort: " .$data->ort;
        echo "email: " .$data->email;
        echo "benutzername: " .$data->benutzername;
        echo "passwort: " .$data->passwort;
        echo "zahlungsinformation_id: " .$data->zahlungsinformation_id;
        */

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
        $user_status = 1;

        $date = new DateTime();
        $erstellungsdatum = $date->format("d-M-Y H:i:s");

        $user = new User($data->anrede,$data->vorname,$data->nachname, $data->adresse, $data->plz, $data->ort, $data->email, $data->benutzername, $data->passwort, $data->zahlungsinformation_id,$role_id, $user_status,$erstellungsdatum);

        if (($result = $this->dh->createUser($user)) === false) {
            $this->error(400, [], "Bad Request - error saving user");
        }

        // status code 201 = "created"
        $this->success(201, $result);
        
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