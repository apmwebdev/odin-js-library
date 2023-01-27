let myLibrary = [];

function Book(title, author, lengthInPages, haveRead) {
  this.title = title;
  this.author = author;
  this.lengthInPages = lengthInPages;
  this.haveRead = haveRead;
  this.info = function() {
    let returnStr = `${this.title} by ${this.author}, ${this.lengthInPages} pages, `;
    if (this.haveRead) {
      returnStr += "have read";
    } else {
      returnStr += "not read yet";
    }
    return returnStr;
  }
  this.toggleReadStatus = () => {
    this.haveRead = !this.haveRead;
  }
}

function maybeAddBookToLibrary(e) {
  e.preventDefault();
  if (checkFormValidity()) {
    addBookToLibrary();
    document.querySelector("#reset").click();
    displayBooks();
  }
}

function checkFormValidity() {
  const formNotices = document.querySelector(".form-notices");
  formNotices.innerHTML = "";
  
  const form = document.forms["new-book"];
  const formData = new FormData(form);
  let formIsValid = true;
  let notice = "";
  
  if (formData.get("title") === "") {
    formIsValid = false;
    notice += "Title can't be blank. ";
  }
  if (formData.get("author") === "") {
    formIsValid = false;
    notice += "Author can't be blank. ";
  }
  if (formData.get("length-in-pages") === "") {
    formIsValid = false;
    notice += "Length can't be blank. ";
  }
  if (formData.get("have-read") === "") {
    formIsValid = false;
    notice += "Please select whether you've read the book."
  }
  
  if (!formIsValid) {
    formNotices.append(notice);
  }
  return formIsValid;
}

function addBookToLibrary() {
  const form = document.forms["new-book"];
  const formData = new FormData(form);
  myLibrary.push(new Book(formData.get("title"), formData.get("author"),
    formData.get("length-in-pages"), formData.get("have-read")));
}

function setDefaultBooks() {
  myLibrary.push(new Book("The Hobbit", "J. R. R. Tolkien", 295, true));
  myLibrary.push(new Book("American Nations", "Colin Woodard", 371, true));
  myLibrary.push(new Book("Sisters of the Vast Black", "Lina Rather", 113, true));
}

function displayBooks() {
  const books = document.getElementById("books");
  books.innerHTML = "";
  for (const book of myLibrary) {
    let bookNode = document.createElement("div");
    bookNode.className = "book";
    bookNode.append(book.info());
    
    let button = document.createElement("button");
    button.className = "delete-button";
    button.innerText = "Delete";
    button.dataset.index = myLibrary.indexOf(book).toString();
    button.addEventListener("click", () => deleteBook(button.dataset.index));
    bookNode.append(button);
    
    let readToggle = document.createElement("button");
    readToggle.className = "read-toggle";
    readToggle.addEventListener("click", () => toggleReadStatus(book));
    if (book.haveRead) {
      readToggle.innerText = "Mark as unread";
    } else {
      readToggle.innerText = "Mark as read";
    }
    bookNode.append(readToggle);
    
    books.appendChild(bookNode);
  }
}

function bindButtons() {
  const submitButton = document.querySelector("#submit");
  submitButton.addEventListener("click", maybeAddBookToLibrary);
}

function deleteBook(indexStr) {
  myLibrary.splice(Number(indexStr), 1);
  displayBooks();
}

function toggleReadStatus(book) {
  book.toggleReadStatus();
  displayBooks();
}

const init = () => {
  setDefaultBooks();
  displayBooks();
  bindButtons();
}

init();