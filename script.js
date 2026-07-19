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
/*                          BUTTON AND FORM HANDLING                          */
/* ************************************************************************** */
const bookForm = document.getElementById("bookForm");
const bookFormButton = document.getElementById("bookFormButton");

function createLabel(text, id) {
	const label = document.createElement("label");
	label.textContent = text;
	label.htmlFor = id;
	return (label);
}

function createInput(id, type) {
	const input = document.createElement("input");
	input.id = id;
	input.type = type;
	return (input);
}

function createButton(text, type) {
	const button = document.createElement("button");
	button.textContent = text;
	button.type = type;
	button.formTarget = "_self";
	return (button);
}

function createForm() {
	const newForm = document.createElement("form");

	/* ********************************** TITLE ********************************* */
	newForm.appendChild(createLabel("Book title:", "title"));
	newForm.appendChild(createInput("title", "text"))

	/* ********************************* AUTHOR ********************************* */
	newForm.appendChild(createLabel("Book author:", "author"));
	newForm.appendChild(createInput("author", "text"));

	/* ******************************* PAGE COUNT ******************************* */
	newForm.appendChild(createLabel("Book page count:", "pageCount"));
	newForm.appendChild(createInput("pageCount", "tel"));

	/* ********************************* IS READ ******************************** */
	newForm.appendChild(createLabel("Book read status:", "isRead"));
	newForm.appendChild(createInput("isRead", "text"));
	newForm.appendChild(createButton("Submit", "submit"));
	return (newForm);
}

bookFormButton.addEventListener("click", () => {
	bookForm.appendChild(createForm());
});

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
