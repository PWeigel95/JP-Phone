<?php 

//benötigt für den Datenbankzugriff
require_once "../config/dbaccess.php";
include("datahandler.php");

class BusinessLogic{
    
    private $dh;
    function __construct(){
        $this->dh = new Datahandler();
    }

    function handleRequest($method, $param){
        switch($method){
            case "createUser":
                $res = $this->dh->createUser();
                break;
        }
        return $res;
    }
}

?>