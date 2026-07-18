const container = document.querySelector(".container");
const myLibrary = [];

/* ************************************************************************** */
/*                              Book CONSTRUCTOR                              */
/* ************************************************************************** */
function Book(title, author, pageCount, isRead) {
	if (!new.target) {
		throw Error("You must use the 'new' operator to call the constructor");
	}

	/* ******************************* ATTRIBUTES ******************************* */
	this.title = title; // String
	this.author = author; // String
	this.pageCount = pageCount; // Number
	this.isRead = isRead; // String
	this.id = crypto.randomUUID(); // Unique UUID

	/* ********************************* METHODS ******************************** */
	this.info = function () {
		return (`${this.title} by ${this.author}, ${this.pageCount} pages, ${isRead}.`);
	}
}

function addBookToLibrary(title, author, pageCount, isRead) {
	const book = new Book(title, author, pageCount, isRead);
	myLibrary.push(book);
}

/* ************************************************************************** */
/*                                    TESTS                                   */
/* ************************************************************************** */
function displayLibrary() {
	for (book of myLibrary) {
		const newDiv = document.createElement("div");
		newDiv.className = "bookCard";
		newDiv.textContent = book.info();
		newDiv.textContent += ` ID : ${book.id}`;
		container.appendChild(newDiv);
	}
}

addBookToLibrary("ouaftitle", "ouafauthor", 123, "has not been read yet");
addBookToLibrary("oueftitle", "ouefauthor", 456, "has been finished");
addBookToLibrary("ouiftitle", "ouifauthor", 789, "currently reading");
addBookToLibrary("wooftitle", "woofauthor", 10, "stopped halfway through");
displayLibrary();
