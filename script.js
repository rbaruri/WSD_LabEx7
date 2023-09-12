document.addEventListener("DOMContentLoaded", function () {
    const fetchBooksButton = document.getElementById("fetchBooks");
    fetchBooksButton.addEventListener("click", fetchBooks);

    function fetchBooks() {
        const categoryInput = document.getElementById("category");
        const category = categoryInput.value;
        const apiKey = 'AIzaSyBYLAnfIjR_RH3v-KE__LejOmD18jSfH-M';
        const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${category}&key=${apiKey}`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                if (data && data.items) {
                    displayBooks(data.items);
                } else {
                    console.error('No books found for the given query.');
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    function displayBooks(books) {
        const bookListContainer = document.getElementById("bookList");
        bookListContainer.innerHTML = "";

        if (books && Array.isArray(books)) {
            const ul = document.createElement("ul");
            books.forEach((book) => {
                const li = document.createElement("li");
                li.textContent = `${book.volumeInfo.title} by ${book.volumeInfo.authors}`;
                ul.appendChild(li);
            });

            bookListContainer.appendChild(ul);
        } else {
            console.error('No books found for the given query.');
        }
    }
});