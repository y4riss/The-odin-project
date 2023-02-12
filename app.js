let library = [];

let info = {
  totalBooks : 0,
  totalPages : 0,
  readBooks : 0,
  unreadBooks : 0}

let id = 1;

class Store{


  static updateStorage(library)
  {
  localStorage.setItem('books',JSON.stringify(library));
  }

  static clearStorage()
  {
    localStorage.clear();
  }

  static getLocalBooks()
  {
    return JSON.parse(localStorage.getItem('books'));
  }
}


class Book {
  constructor(id, title, author, pages, status) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = parseInt(pages);
    this.status = status;
  }

  // add a book
  static addBook(book) {
    if(library)
      library.push(book)
    else
      library = [book]
    Store.updateStorage(library);

    info.totalBooks++;
    info.totalPages += book.pages;
    if (book.status) {
        info.readBooks++;
    }
    else {
        info.unreadBooks++;
    }
  }

  // remove a book
  static removeBook(id) {
    const [book] = library.filter(book => {
        if (book.id == id) return book;
    });
    info.totalBooks--;
    info.totalPages -= book.pages;
    if (book.status) {
        info.readBooks--;
    }
    else {
        info.unreadBooks--;
    }
    library = library.filter((book) => book.id != id);
    Store.updateStorage(library);

    
  }

  static removeAllBooks()
  {
    library = [];
    info = {
        totalBooks : 0,
        totalPages : 0,
        readBooks : 0,
        unreadBooks : 0}
    Store.clearStorage();
  }

  // update a book
  static updateBook(id,formInput)
  {
    const [book] = library.filter(book => {
        if (book.id == id) return book;
    });

    info.totalPages = info.totalPages - book.pages +  parseInt(formInput[2].value);
    if(formInput[3].checked != book.status)
    {
      if (formInput[3].checked) // we read the book
      {
        info.readBooks++;
        info.unreadBooks--;
      }
      else
      {
        info.readBooks--;
        info.unreadBooks++;
      }
    }

    book.title = formInput[0].value;
    book.author = formInput[1].value;
    book.pages =  parseInt(formInput[2].value) ;
    book.status =  formInput[3].checked;
    Store.updateStorage(library);

  }
}

class UserInterface{
  // add book to dom


    static displayAllBooks()
    {
        library.forEach(book =>{
            this.addBook(book);
        })
        this.renderInfo();
        this.updateInfo();
    }

    static addBook(book){

        let icon = `<i class="fa-solid text-success fa-check"></i>`;
        const tbody = document.querySelector("#book-list");
        const tr = document.createElement("tr");

        if (!book.status)
          icon = `<i class="fa-solid text-danger fa-xmark"></i>`;
        const row = `
              <td>${book.title}</td>
              <td>${book.author}</td>
              <td>${book.pages}</td>
              <td>${icon}</td>
              <td><i data-id=${book.id} class="fa-solid text-light fa-trash"></i>
              &nbsp;&nbsp;<i data-id=${book.id} class="fa-solid text-light fa-edit"></i>
              </td>
              
          `;
        tr.innerHTML = row;
        tbody.appendChild(tr);
    }

    static removeBook(node)
    {
        const tbody = document.querySelector("#book-list");
        tbody.removeChild(node);
    }

    static removeAllBooks()
    {
        const tbody = document.querySelector("#book-list");
        tbody.innerHTML = "";
    }

    static renderInfo()
    {
      library.forEach(book => {
        info.totalBooks++;
        info.totalPages += book.pages;
        if(book.status) info.readBooks++;
        else info.unreadBooks++;
      })
    }

    static updateInfo()
    {
        const infoElems = document.querySelectorAll(".info-p");
        infoElems[0].innerHTML = `<i class="fa-solid fa-book"></i> Total books  &nbsp; &nbsp;&nbsp;: ${info.totalBooks}`;
        infoElems[1].innerHTML = `<i class="fa-solid fa-file"></i> Total pages  &nbsp;&nbsp;&nbsp; : ${info.totalPages}`;
        infoElems[2].innerHTML = `<i class="fa-solid fa-check text-success"></i> Read books &nbsp; &nbsp;: ${info.readBooks}`;
        infoElems[3].innerHTML = `<i class="fa-solid fa-xmark text-danger"></i> Unread books : ${info.unreadBooks}`;

    }

    static clearInput()
    {
        const formInput = document.querySelectorAll(".form-input");
        const errorMsgs = document.querySelectorAll(".error-msg");
        formInput.forEach(input => {
            input.value = "";
            input.checked = false;
        })
        errorMsgs.forEach(p => {
            p.textContent = "";
        })
    }

    static updateInputFields(id)
    {
        const formInput = document.querySelectorAll(".form-input");
        const [book] = library.filter(book => {
            if (book.id == id) return book;
        });
        formInput[0].value = book.title;
        formInput[1].value = book.author;
        formInput[2].value = book.pages;
        formInput[3].checked = book.status;
    }
 
    static updateBook(id,parentNode)
    {
        const formInput = document.querySelectorAll(".form-input");
        let icon = `<i class="fa-solid text-success fa-check"></i>`;
        if (!formInput[3].checked)
          icon = `<i class="fa-solid text-danger fa-xmark"></i>`;


        parentNode.children[0].textContent = formInput[0].value
        parentNode.children[1].textContent = formInput[1].value
        parentNode.children[2].textContent = formInput[2].value
        parentNode.children[3].innerHTML = icon

        Book.updateBook(id,formInput);
    }
}

(function EventHandler() {


    let elementToUpdate = {
        id:0,
        parentNode:null
    };
    library = Store.getLocalBooks();
    if (library)
      UserInterface.displayAllBooks();
    else
      UserInterface.updateInfo();

    // this is the starting point  , we will display all available books !


  //add a book btn event
  const addBtn = document.querySelector('.add-btn');
  const addBookPopup = document.querySelector('.add-book-window');
  const closeBtn = document.querySelector('.close-btn');
  const submitBtn = document.querySelector('.submit-btn');

  addBtn.addEventListener('click', () => {
    UserInterface.clearInput();
    addBookPopup.classList.remove('hidden');
    submitBtn.textContent = "Submit";

  });
  closeBtn.addEventListener('click', () => {
    UserInterface.clearInput();
    addBookPopup.classList.add('hidden');
    
  });
  submitBtn.addEventListener('click', (e) => {
    let newBook = inputHandler(e);
    if (e.target.textContent == "Submit")
    {
        if (newBook != null) {
            addBookPopup.classList.add('hidden');
            Book.addBook(newBook);
            UserInterface.addBook(newBook);
            UserInterface.updateInfo();
            UserInterface.clearInput();
          }
    }
    else if (e.target.textContent == "Update")
    {
      let newBook = inputHandler(e);
      if (newBook != null) {

        UserInterface.updateBook(elementToUpdate.id,elementToUpdate.parentNode);
        UserInterface.updateInfo();
        addBookPopup.classList.add('hidden');
      }

    }

  });

  // delete all books event
  const deleteAllBtn = document.querySelector('.delete-all-btn');
  const deleteAllPopup = document.querySelector('.delete-all-books-window');
  const cancelBtn = document.querySelector('.btn-cancel');
  const confirmBtn = document.querySelector('.confirm-btn');
  deleteAllBtn.addEventListener('click', () => {
    deleteAllPopup.classList.remove('hidden');
  });
  cancelBtn.addEventListener('click', () => {
    deleteAllPopup.classList.add('hidden');
  });
  confirmBtn.addEventListener("click",()=>{
    Book.removeAllBooks();
    UserInterface.removeAllBooks();
    UserInterface.updateInfo();
    deleteAllPopup.classList.add('hidden');

  })
  

  // delete / update a single book event
  const tbody = document.querySelector("tbody");
  tbody.addEventListener("click",(e)=>{
    if (e.target.classList.contains("fa-trash"))
    {
        Book.removeBook(e.target.dataset.id);
        UserInterface.removeBook(e.target.parentElement.parentElement);
        UserInterface.updateInfo();

    }
    else if (e.target.classList.contains("fa-edit"))
    {
        elementToUpdate.id =  e.target.dataset.id;
        elementToUpdate.parentNode = e.target.parentElement.parentElement;
        UserInterface.updateInputFields(elementToUpdate.id);
        submitBtn.textContent = "Update";
        addBookPopup.classList.remove("hidden");
    }
  })
})();

function inputHandler(event) {
  event.preventDefault();
  let newBook = null;
  const bookTitleInput = document.querySelector('#title');
  const bookAuthorInput = document.querySelector('#author');
  const bookPagesInput = document.querySelector('#page');
  const bookStatus = document.querySelector('#status');
  const errorMsgs = document.querySelectorAll('.error-msg');

  /* INPUT VALIDATION */
  if (!(bookPagesInput.value.match(/\d/g) && bookPagesInput.value > 0))
    errorMsgs[2].textContent = 'Total pages must be a positive number';
  else errorMsgs[2].textContent = '';

  if (
    !(
      bookAuthorInput.value.match(/^[a-zA-Z]*$/g) &&
      bookAuthorInput.value.length >= 3
    )
  )
    errorMsgs[1].textContent = 'Invalid author name';
  else errorMsgs[1].textContent = '';

  if (
    !(
      bookTitleInput.value.match(/^[A-Za-z0-9\s\-_,\.;:()]+$/g) &&
      bookTitleInput.value.length >= 3
    )
  )
    errorMsgs[0].textContent = 'Invalid book title';
  else errorMsgs[0].textContent = '';

  if (
    errorMsgs[0].textContent == '' &&
    errorMsgs[1].textContent == '' &&
    errorMsgs[2].textContent == ''
  ) {
    newBook = new Book(
      id++,
      bookTitleInput.value.trim(),
      bookAuthorInput.value.trim(),
      bookPagesInput.value,
      bookStatus.checked
    );
  }
  return newBook;
}


