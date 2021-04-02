import React from "react";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";

import "./book-list.styles.scss";

import Header from "../header/header";
import BookShelf from "./../book-shelf/book-shelf";
import SearchBooks from "../search-books/search-box";

const BookList = ({ books, shelves, onUpdate, getAllBooks }) => {
    return (
        <div className="book-list">
            <Header shelves={shelves} getAllBooks={getAllBooks} />

            <div className="container">
                <Switch>
                    <Route
                        path="/search"
                        component={() => (
                            <SearchBooks books={books} shelves={shelves} />
                        )}
                    />
                    {shelves.map((shelf) => {
                        const filteredBooks = books.filter(
                            (relatedBook) => relatedBook.shelf === shelf.id
                        );
                        const pathURL = `/${shelf.id}`;

                        return (
                            <Route
                                key={shelf.id}
                                path={pathURL}
                                render={(props) => (
                                    <BookShelf
                                        books={filteredBooks}
                                        onUpdate={onUpdate}
                                        shelves={shelves}
                                        {...props}
                                    />
                                )}
                            />
                        );
                    })}
                </Switch>
            </div>
        </div>
    );
};

BookList.propTypes = {
    getAllBooks: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired,
    onUpdate: PropTypes.func.isRequired,
    shelves: PropTypes.array.isRequired,
};

export default BookList;
