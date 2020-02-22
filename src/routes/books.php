<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

$app = new \Slim\App;

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

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

// Get Single Book
$app->get('/api/book/{id}', function(Request $request, Response $response){
    $id = $request->getAttribute('id');

    $sql = "SELECT * FROM books WHERE id = $id";

    try{
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();

        $stmt = $db->query($sql);
        $book = $stmt->fetch(PDO::FETCH_OBJ);
        $db = null;
        return $response->write(json_encode($book));
    } catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}}';
    }
});

// Add Book
$app->post('/api/book/add', function(Request $request, Response $response){
    $title = $request->getParam('title');
    $author = $request->getParam('author');
    $rating = $request->getParam('rating');
 

    $sql = "INSERT INTO books (title,author,rating) VALUES
    (:title,:author,:rating)";

    try{
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();

        $stmt = $db->prepare($sql);

        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':author', $author);
        $stmt->bindParam(':rating', $rating);

        $stmt->execute();
        $last_id = $db->lastInsertId();

        echo '{"notice": {"text": "Book Added", "id": '.$last_id.' }}';

    } catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}}';
    }
});

// Update Book
$app->put('/api/book/update/{id}', function(Request $request, Response $response){
    $id = $request->getParam('id');
    $title = $request->getParam('title');
    $author = $request->getParam('author');
    $rating = $request->getParam('rating');

    $sql = "UPDATE books SET
				title 	= :title,
				author 	= :author,
                rating	= :rating
			WHERE id = $id";

    try{
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();

        $stmt = $db->prepare($sql);

        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':author', $author);
        $stmt->bindParam(':rating', $rating);

        $stmt->execute();

        echo '{"notice": {"text": "Book Updated"}}';

    } catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}}';
    }
});

// Delete Customer
$app->delete('/api/book/delete/{id}', function(Request $request, Response $response){
    $id = $request->getAttribute('id');

    $sql = "DELETE FROM books WHERE id = $id";

    try{
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();

        $stmt = $db->prepare($sql);
        $stmt->execute();
        $db = null;
        echo '{"notice": {"text": "Book Deleted"}}';
    } catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}}';
    }
});

// Restes Books
$app->get('/api/books/reset', function(Request $request, Response $response){

 

    $sql = "DELETE FROM books; INSERT INTO books(title, author, rating) VALUES
    ('The Outsider', 'Stephen King', 8),
    ('Fight Club', 'Chuck Palahniuk', 9),
    ('The Martian', 'Andy Weir', 7);";

    try{
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();

        $stmt = $db->prepare($sql);
        $stmt->execute();

        echo '{"notice": {"text": "Books Reset"}}';

    } catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}}';
    }
});
