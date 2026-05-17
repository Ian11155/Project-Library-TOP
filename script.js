const myLibrary = [];

const listOfBooks = document.getElementById("listOfBooks");
const bookForm = document.getElementById("bookForm")

function Book(author, title, pages, read, img) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
  this.img = img;
}

function addBookToLibrary(author, title, pages, read, img) {
  const newBook = new Book(author, title, pages, read, img);
  myLibrary.push(newBook);
}

addBookToLibrary("Charles Soule", "Star Wars: Light of the Jedi", 23, "Read", "starwar.jpg");
addBookToLibrary("Brian Khrisna", "Seporsi Mie Ayam Sebelum Mati", 216, "Read", "ayam.jpg");
console.log(myLibrary);

function listOutBooks() {
  myLibrary.forEach((book) =>{
    const eachBooks = document.createElement("li");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("deleteButton");
    deleteBtn.addEventListener("click", function(){
      let count= 0
      myLibrary.forEach((b) =>{
        if (b.id === book.id) {
          myLibrary.splice(count, 1);
          listOfBooks.innerHTML = "";
          listOutBooks();
          return;
        }
        count += 1;
      })
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
        <span class="value" id="readStatus"><i class="fa-regular fa-circle-xmark"></i>${book.read}</span>`
      ;
    };

    const imageBox = document.createElement("div");
    imageBox.classList.add("imageBox")
    const bookImg = document.createElement("img");
    bookImg.src = book.img ||  "No_Image_Available.jpg";
    bookImg.alt= book.title;;
    bookImg.alt = book.title;
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
  }

  addBookToLibrary(newAuthor, newTitle, newPages, selectedRead, imgURL);
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
