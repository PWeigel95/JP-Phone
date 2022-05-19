<?php 

require_once("../config/datahandler.php");
require_once("../models/user.class.php");

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
            default:
                echo "Method not found";
        }
    }

    function processGet(){
        // processes GET requests to backend?resource=XYZ

        if (!isset($_GET['resource'])) {
            $this->error(400, [], "Bad Request - no resource");
        }
        switch ($_GET['resource']) {
            case "products":
                $this->processGetProducts();
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
            default:
                echo "Action not found";
        }
    }

    function processGetProducts() {
        $this->success(200, $this->dh->getProducts());
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