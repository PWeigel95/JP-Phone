<?php 

include("../config/datahandler.php");

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

        echo $data->email;

        //$user = new User()
        
    }

}

?>