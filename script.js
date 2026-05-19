
const listOfBooks = document.getElementById("listOfBooks");
const bookForm = document.getElementById("bookForm")

class Book {
  constructor (author, title, pages, read, img) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
    this.img = img;
  }
}

class Library {
  constructor(){
    this._books = []
  }

  // The '...' gathers all 5 arguments you passed into a bundle
  addBook(...newBook) {
    this._books.push(new Book(...newBook))
  }

  // no need to use parenthesis when called
  get books() {
    return this._books;
  }

  deleteBook(id){
    this._books = this._books.filter(book => book.id != id)
  }
}

const myLibrary = new Library;
myLibrary.addBook("Charles Soule", "Star Wars: Light of the Jedi", 23, "Read", "starwar.jpg");
myLibrary.addBook("Brian Khrisna", "Seporsi Mie Ayam Sebelum Mati", 216, "Read", "ayam.jpg");
console.log(myLibrary);

function listOutBooks() {
  myLibrary.books.forEach((book) =>{
    const eachBooks = document.createElement("li");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("deleteButton");
    deleteBtn.addEventListener("click", function(){
      myLibrary.deleteBook(book.id);
      listOfBooks.innerHTML = "";
      listOutBooks();
    });

    eachBooks.classList.add("book-card");
    if (book.read === "Read") {
      eachBooks.innerHTML = 
        `<span class="label">Title</span>
        <span class="value">${book.title}</span>
        
        <span class="label">Author</span>
        <span class="value">${book.author}</span>
        
        <span class="label">Pages</span>
        <span class="value">${book.pages}</span>
        
        <span class="label">Status</span>
        <span class="value" id="readStatus"><i class="fa-regular fa-circle-check"></i>${book.read}</span>`
      ;
    } else {
      eachBooks.innerHTML = 
      `<span class="label">Title</span>
        <span class="value">${book.title}</span>
        
        <span class="label">Author</span>
        <span class="value">${book.author}</span>
        
        <span class="label">Pages</span>
        <span class="value">${book.pages}</span>
        
        <span class="label">Status</span>
        <span class="value"><i class="fa-regular fa-circle-xmark"></i>${book.read}</span>`
      ;
    };

    const imageBox = document.createElement("div");
    imageBox.classList.add("imageBox")
    const bookImg = document.createElement("img");
    bookImg.src = book.img
    bookImg.alt= book.title;;
    bookImg.alt = book.title;
    bookImg.onload = function() {
      URL.revokeObjectURL(bookImg.src); // Frees up the memory!
    }
    imageBox.appendChild(bookImg);
    eachBooks.prepend(imageBox);

    const readStatus = document.getElementById("readStatus")
    const readButton = document.createElement("button");;
    readButton.classList.add("readButton");
    if (book.read === "Read"){
      readButton.textContent = "Not Read";
    } else {
      readButton.textContent = "Read"
    }
    readButton.addEventListener("click", function(){
      if (book.read === "Read"){
        book.read = "Not Read";
      } else {
        book.read = "Read"
      }
      listOfBooks.innerHTML = "";
      listOutBooks();
    })

    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("buttonGroup");
    buttonGroup.appendChild(readButton);
    buttonGroup.appendChild(deleteBtn);

    eachBooks.appendChild(buttonGroup);
    listOfBooks.appendChild(eachBooks);
  })
};
listOutBooks();

bookForm.addEventListener("submit", function(event){
  event.preventDefault();

  listOfBooks.innerHTML = "";

  const formData = new FormData(bookForm);
  const newAuthor = formData.get("author");
  const newTitle = formData.get("title");
  const newPages = formData.get("pages");
  const selectedRead = formData.get("read");
  const imageFile = formData.get("coverImage");
  if (imageFile && imageFile.name !== "") {
      imgURL = URL.createObjectURL(imageFile);
  } else {
    imgURL = "No_Image_Available.jpg";
  }

  myLibrary.addBook(newAuthor, newTitle, newPages, selectedRead, imgURL);
  listOutBooks();

  bookForm.reset();
})

const addBookBtn = document.getElementById("toggleFormBtn")
const cancelButton = document.getElementById("cancelButton")

addBookBtn.addEventListener("click", function(){
  bookForm.classList.add("active")
})

cancelButton.addEventListener("click", function(){
  bookForm.classList.remove("active")
})
