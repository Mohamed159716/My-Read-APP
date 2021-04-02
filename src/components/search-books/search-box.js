import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import * as BooksAPI from "../../BooksAPI";
import BookShelf from "../book-shelf/book-shelf";

import "./search-books.scss";

class SearchBooks extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        shelves: PropTypes.array.isRequired,
    };

    state = {
        searchBooks: [],
        query: "",
    };

    // Handle Change of input search
    handleChange = (e) => {
        const { name, value } = e.target;

        this.setState({ [name]: value }, () => {
            this.handleSearch();
        });
    };

    // Calling Back-End to bring the related data to search input.
    handleSearch = async () => {
        const query = this.state.query.trim();

        try {
            query &&
                (await BooksAPI.search(query).then((books) =>
                    Array.isArray(books)
                        ? this.handleShelf(books)
                        : this.handleShelf([])
                ));
        } catch (err) {
            console.log(err);
        }
    };

    // Take all search Books and add [shelf] to books that I own.
    handleShelf = (searchBooks) => {
        const books = this.props.books;

        for (const book of books) {
            const oldBook = searchBooks.find(
                (searchBook) => searchBook.id === book.id
            );

            if (oldBook) {
                const index = searchBooks.indexOf(oldBook);
                searchBooks[index] = {
                    ...searchBooks[index],
                    shelf: book.shelf,
                };
            }
        }
        this.setState({ searchBooks });
    };

    // Update the book with a new shelf
    updateShelf = async (book, shelf) => {
        await BooksAPI.update(book, shelf);
        this.addShelfToState(book, shelf);
    };

    // Add the shelf key to the Book on the state.
    addShelfToState = (book, shelf) => {
        const searchBooks = this.state.searchBooks;
        const index = searchBooks.indexOf(book);

        searchBooks[index] = { ...searchBooks[index], shelf: shelf };

        this.setState({ searchBooks });
    };

    render() {
        const { searchBooks } = this.state;
        const { shelves, location } = this.props;

        return (
            <div className="search-books">
                <div className="search-input">
                    <input
                        type="text"
                        placeholder="Search by title or author"
                        name="query"
                        value={this.state.query}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="search-results">
                    {this.state.query && Array.isArray(searchBooks) && (
                        <BookShelf
                            books={searchBooks}
                            onUpdate={this.updateShelf}
                            shelves={shelves}
                            location={location}
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default withRouter(SearchBooks);
