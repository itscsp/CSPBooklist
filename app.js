//Book Class: Represent a Book

class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//UI Class: Handle UI Tasks
class UI{
    static displayBook(){
        const StoredBook = Store.getBook();

        const books = StoredBook;

        books.forEach( (book) => {
            UI.addBookToList(book);
        })
    }

    static showAlert(message, className){
        const div = document.createElement('div');

        div.className = `text-center alert alert-${className}`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');

        container.insertBefore(div, form);

        //Vanish in 3 seconds
        setTimeout(() =>document.querySelector('.alert').remove(), 2000);
    }

    static addBookToList(book){

        const list = document.querySelector('#book-list');
        console.log(list);

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);

    }

    static clearField(){
        document.querySelector('#title').value = ' ';
        document.querySelector('#author').value = ' ';
        document.querySelector('#isbn').value = ' ';
    }

    static deleteBook(event){
        console.log(event);
        if(event.classList.contains('delete')) {

            event.parentElement.parentElement.remove();
        }

    }
}

//Store Class: Handle Storage
class Store{
    static getBook(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book){
        const books = Store.getBook();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBook();

        books.forEach((book, index) => {
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));

    }

}


// Event: Display Book
document.addEventListener('DOMContentLoaded', UI.displayBook);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    //Prevent Default submit
    e.preventDefault();


    //Het Form Value
    const title = document.querySelector("#title").value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    //validate
    if(title === ''|| author === '' || isbn === ''){
        UI.showAlert('Pleaser Enter Valid info', 'danger');
    }else{

        //Instatiate books
        const book = new Book(title, author, isbn);

        //Add Book to  UI
        UI.addBookToList(book);

        //Add book to store
        Store.addBook(book);

        //show success message
        UI.showAlert('Book Added', 'success');

        //Clear Field Value
        UI.clearField();
    }

})

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e)=>{

    //Remove a Book from
    UI.deleteBook(e.target);

    //Remove Book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    //show alert message
    UI.showAlert('Book Removed', 'success');

})