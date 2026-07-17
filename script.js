function Book(title, author, pageCount, isRead) {
	if (!new.target) {
		throw Error("You must use the 'new' operator to call the constructor");
	}

	this.title = title; // String
	this.author = author; // String
	this.pageCount = pageCount; // Number
	this.isRead = isRead; // Boolean
	this.info = function () {
		if (this.isRead) {
			return (`${this.title} by ${this.author}, ${this.pageCount} pages, has been read.`);
		}
		return (`${this.title} by ${this.author}, ${this.pageCount} pages, not read yet.`);
	}
}

theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
console.log(theHobbit.info());
console.log(theHobbit);

console.log(`Prototype Hobbit ${Object.getPrototypeOf(theHobbit)}`);