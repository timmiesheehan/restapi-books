<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

$app = new \Slim\App;

// Get All Books
$app->get('/api/books', function(Request $request, Response $response){

    //set header as json
    $response = $response->withHeader('Content-type', 'application/json');

    $sql = "SELECT * FROM books";

    try{
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();

        $stmt = $db->query($sql);
        $books = $stmt->fetchAll(PDO::FETCH_OBJ);

        //close db connection
        $db = null;

        //write json as response
        return $response->write(json_encode($books));

    } catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
});