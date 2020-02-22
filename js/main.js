/** 
* Calls the books api to return all books from the database
*/
function getBooks() {

    const ul = document.getElementById('books');
    ul.innerHTML = '';

    fetch('http://localhost/books/public/api/books')
    .then((resp) => resp.json())
    .then((data) => {
    let books = data;
    return books.map(function(book) {

        outputBook(book.id, book.title, book.author, book.rating);
        const t2 = new TimelineMax();
        t2.fromTo("#books", 1, {opacity: 0}, {opacity: 1}, "0")
       
    })
    })
    .catch(function(error) {
    console.log(error);
    });  
    
}

/** 
* Function to output a book and edit form
*/
function outputBook(id, title, author, rating){
    const ul = document.getElementById('books');
    const li = document.createElement('li');

    li.innerHTML = 
    `<div onclick="editBook(this.parentElement)">
    <h3>${title}</h3>
    <p><strong>Author:</strong> ${author}</p>
    <p><strong>Rating:</strong> ${rating}</p>
    </div>
    <a class="button edit" href="#" onclick="editBook(this.parentElement)"><img src="https://img.icons8.com/ios-glyphs/30/000000/edit.png"></a> <a class="button delete" href="#" onclick="deleteBook(this.parentElement,${id})"><img src="https://img.icons8.com/ios-glyphs/30/000000/delete-sign.png"></a>
    
    `;

    li.innerHTML += 
    `<form class="editForm" style="display:none;"><input type="text" placeholder="Title" name="title" value="${title}" />
        <input type="text" placeholder="Author" name="author" value="${author}" />
        <input type="text" placeholder="Rating out of 10" name="rating" value="${rating}" />
        <input type="hidden" name="id" value="${id}" />
        <button onclick="return updateBook(this.closest('form'))">Save</button> <button onclick="return editBook(this.closest('li'))">Cancel</button>
    </form>
    `;    
    
    ul.appendChild(li);
}

/**
 * edit the data of an existing book
 */
function editBook(li) {
    const form = li.querySelector("form");
   
    if (form.style.display === "none") {
        form.style.display = "block";
      } else {
        form.style.display = "none";
      }
    return false;
    
}

function updateBook(form) {

        const editForm = form;
        const id = editForm.querySelector('input[name="id"]').value;
        const title = editForm.querySelector('input[name="title"]').value;
        const author = editForm.querySelector('input[name="author"]').value;
        const rating = editForm.querySelector('input[name="rating"]').value;


        fetch('http://localhost/books/public/api/book/update/'+id, {
            method: 'PUT', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: id, title:title, author:author, rating:rating}),
          })
          .then((resp) => resp.json())
          .then((data) => {
            console.log('Success:', data);
            editForm.style.display = "none";
        
            getBooks();
            
                    
          })
          .catch((error) =>  {
              console.log(error); 
            }); 
        
        return false;

        
}

/**
 * delete a book from the database
 */
function deleteBook(li, id) {
    const really = confirm("Are you sure you want to delete this book");
    if (really == true) {
       li.remove();
 
       fetch('http://localhost/books/public/api/book/delete/' + id, {
            method: 'DELETE',
            })
            .then(res => res.text()) // or res.json()
            .then(res => console.log(res))
    }   
}

/**
 * Shows form to add a book if form not visible
 * 
 * Adds a book to the database if submitted
 */
function addBook(submitted = false) {
   
    if(submitted){

        const addForm = document.getElementById("addForm");
        const title = addForm.querySelector('input[name="title"]').value;
        const author = addForm.querySelector('input[name="author"]').value;
        const rating = addForm.querySelector('input[name="rating"]').value;


        fetch('http://localhost/books/public/api/book/add', {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({title:title, author:author, rating:rating}),
          })
          .then((resp) => resp.json())
          .then((data) => {
            console.log('Success:', data);
            const lastid  = data.notice.id;
            addForm.closest('li').remove();
        
            outputBook(lastid, title, author, rating);
            
                    
          })
          .catch((error) =>  {
              console.log(error); 
            }); 
        

        
        return false;
        
    }
    else{

    
        const ul = document.getElementById('books');
        let li = document.createElement('li');
        li.innerHTML = 
            `<form id="addForm"><input type="text" placeholder="Title" name="title" value="" required />
            <input type="text" placeholder="Author" name="author" value="" required />
            <input type="text" placeholder="Rating out of 10" name="rating" value="" required />
            <button onclick="return addBook(true)">Add</button> <button onclick="return closeAdd(this.closest('li'))">Cancel</button>
            </form>
            `;
        ul.appendChild(li);
        
    }
}

/** 
* helper function to remove addForm
*/
function closeAdd(li){
    console.log(li);
    li.remove();
    return false;
}

/** 
* resets the database to default demo content
*/
function resetBooks() {

    fetch('http://localhost/books/public/api/books/reset', {})
            .then(res => res.text()) // or res.json()
            .then(res => getBooks())

}

/**
 * IIFI to start off the app and keep scope
 */ 
(function() {

    const t1 = new TimelineMax();
        //t1.fromTo("#books", 2, { opacity: 0, x: 30 }, {opacity: 1, x: 0}, "0")
    t1.fromTo("main", 2, {y: -1000}, {y: 0}, "-=1");

    const t2 = new TimelineMax();
    t2.fromTo(".sidebar", 1, {opacity: 0, x:3000}, {opacity: 1, x:0}, "0")
    .fromTo(".cta", 2, {opacity: 0}, {opacity: 1}, "1.0"); 

    
    getBooks();  

    document.getElementById("addBook").addEventListener("click", function(){
        addBook(false);
    }, false);

 
    document.getElementById("reset").addEventListener("click", resetBooks);

})();


  
