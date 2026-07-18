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
	this.isRead = isRead; // Boolean
	this.id = crypto.randomUUID(); // Unique UUID

	/* ********************************* METHODS ******************************** */
	this.info = function () {
		if (this.isRead) {
			return (`${this.title} by ${this.author}, ${this.pageCount} pages, has been read.`);
		}
		return (`${this.title} by ${this.author}, ${this.pageCount} pages, not read yet.`);
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
		console.log(book.info());
		console.log(`ID of ${book.title}: ${book.id}`);
	}
}

addBookToLibrary("ouaftitle", "ouafauthor", 123, false);
addBookToLibrary("oueftitle", "ouefauthor", 456, true);
addBookToLibrary("ouiftitle", "ouifauthor", 789, true);
addBookToLibrary("wooftitle", "woofauthor", 10, false);
displayLibrary();
