import React, { Component } from "react";
import PropTypes from "prop-types";

import "./book-shelf.styles.scss";

import Book from "../book/book";

class BookShelf extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        onUpdate: PropTypes.func.isRequired,
        shelves: PropTypes.array.isRequired,
        toggleClass: PropTypes.func,
        activeClass: PropTypes.bool,
    };

    state = {
        active: false,
        bookId: 0,
        status: false,
    };

    toggleClass = (bookId) => {
        if (this.state.bookId === bookId) {
            this.setState({ active: false, bookId: 0, status: false });
        } else {
            this.setState({ active: true, bookId, status: true });
        }
    };

    render() {
        const { books, onUpdate, shelves, location } = this.props;
        let specificShelves;
        let active = false;

        const pathName = location.pathname.split("/")[1];

        pathName !== "search"
            ? (specificShelves = shelves.filter(
                  (specificShelf) =>
                      books[0] && specificShelf.id !== books[0].shelf
              ))
            : (specificShelves = shelves);

        return (
            <div className="content">
                {books.map((book) => {
                    if (this.state.status && book.id === this.state.bookId) {
                        active = true;
                    } else {
                        active = false;
                    }

                    return (
                        <Book
                            key={book.id}
                            book={book}
                            onUpdate={onUpdate}
                            shelves={specificShelves}
                            toggleClass={this.toggleClass}
                            activeClass={active}
                        />
                    );
                })}
            </div>
        );
    }
}

export default BookShelf;
