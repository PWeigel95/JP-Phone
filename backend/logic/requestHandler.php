<?php 

include("./config/datahandler.php");

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