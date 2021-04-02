import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

import "./App.css";
import BookList from "./components/book-list/book-list";

import * as BooksAPI from "./BooksAPI";

class App extends Component {
    state = { books: [] };

    getAllBooks = async () => {
        await BooksAPI.getAll().then((books) => this.setState({ books }));
    };

    componentDidMount() {
        this.getAllBooks();
    }

    updateShelf = async (book, shelf) => {
        await BooksAPI.update(book, shelf);
        this.getAllBooks();
    };

    changeQuery = (query) => {
        console.log(query);
        const state = { ...this.state };
        this.setState({ ...state, query });
    };

    render() {
        const SHELVES = [
            {
                title: "Currently Reading",
                id: "currentlyReading",
            },
            {
                title: "Want To Read",
                id: "wantToRead",
            },
            {
                title: "Read",
                id: "read",
            },
        ];

        return (
            <div className="App">
                <Route
                    path="/"
                    render={() => (
                        <BookList
                            books={this.state.books}
                            shelves={SHELVES}
                            onUpdate={this.updateShelf}
                            getAllBooks={this.getAllBooks}
                        />
                    )}
                />
                <Redirect from="/" to="/currentlyReading" />
            </div>
        );
    }
}

export default App;
