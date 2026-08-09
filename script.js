const container = document.querySelector(".container");
const myLibrary = [];

/* ************************************************************************** */
/*                              Book CONSTRUCTOR                              */
/* ************************************************************************** */
function Book(title, author, pageCount, isRead) {
	if (!new.target) {
		throw Error("You must use the 'new' operator to call the constructor");
	}

	/* ******************************* PROPERTIES ******************************* */
	this.title = title; // String
	this.author = author; // String
	this.pageCount = pageCount; // Number
	this.isRead = isRead; // String
	this.id = crypto.randomUUID(); // Unique UUID

	/* ********************************* METHODS ******************************** */
	this.info = function () {
		return (`${this.title} by ${this.author}, ${this.pageCount} pages, ${this.isRead}.`);
	}

	this.update = function () {
		const value = prompt(`Update book ${this.title} read status:`);
		if (!value) {
			return;
		}
		
		this.isRead = value;
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
	label.className = "formItem";
	return (label);
}

function createInput(id, type) {
	const input = document.createElement("input");
	input.name = id;
	input.id = id;
	input.type = type;
	input.required = true;
	input.className = "formItem";
	return (input);
}

function createButton(text, type) {
	const button = document.createElement("button");
	button.textContent = text;
	button.type = type;
	button.className = "formItem";
	return (button);
}

function createForm() {
	const newForm = document.createElement("form");
	newForm.name = `bookCreationForm`;
	newForm.action = "";
	newForm.method = "POST";

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

	/* ************************** SUBMIT EVENT LISTENER ************************* */
	newForm.addEventListener("submit", (e) => {
		let formData = new FormData(newForm);
		let output = [];
		for (const [key, value] of formData) {
			output.push(value);
		}
		addBookToLibrary(output[0], output[1], output[2], output[3]);
		displayLibrary();
		bookForm.removeChild(newForm);
		e.preventDefault();
	});

	return (newForm);
}

bookFormButton.addEventListener("click", () => {
	bookForm.appendChild(createForm());
});

/* ************************************************************************** */
/*                                    TESTS                                   */
/* ************************************************************************** */
function createBookButton(text, eventListener) {
	const newButton = document.createElement("button");
	newButton.type = "button";
	newButton.classList = "bookButton";
	newButton.textContent = text;
	newButton.addEventListener("click", eventListener);
	return (newButton);
}

function displayLibrary() {
	container.innerHTML = "";
	for (const book of myLibrary) {
		const newDiv = document.createElement("div");
		newDiv.className = "bookCard";
		newDiv.textContent = book.info();
		newDiv.textContent += ` ID : ${book.id}`;
		newDiv.dataset.id = book.id;

		/* ****************************** UPDATE BUTTON ***************************** */
		const updateButton = createBookButton("Update read status", () => {
			for (const book of myLibrary) {
				if (newDiv.dataset.id === book.id) {
					book.update();
					displayLibrary();
					return;
				}
			}
		});
		newDiv.appendChild(updateButton);

		/* ****************************** DELETE BUTTON ***************************** */
		const deleteButton = createBookButton("Delete", () => {
			for (const book of myLibrary) {
				if (newDiv.dataset.id === book.id) {
					myLibrary.pop(book);
					container.removeChild(newDiv);
					return;
				}
			}
		});
		newDiv.appendChild(deleteButton);

		container.appendChild(newDiv);
	}
}

addBookToLibrary("ouaftitle", "ouafauthor", 123, "has not been read yet");
addBookToLibrary("oueftitle", "ouefauthor", 456, "has been finished");
addBookToLibrary("ouiftitle", "ouifauthor", 789, "currently reading");
addBookToLibrary("wooftitle", "woofauthor", 10, "stopped halfway through");
displayLibrary();
