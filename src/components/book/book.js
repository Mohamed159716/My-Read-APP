import React, { Component } from "react";
import PropTypes from "prop-types";

import "./book.styles.scss";

class Book extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        onUpdate: PropTypes.func.isRequired,
    };

    state = {
        selected: false,
    };

    selectedClass = async (book, id) => {
        this.setState({ selected: true });
        await this.props.onUpdate(book, id);
        this.setState({ selected: false });
    };

    state = {};
    render() {
        const { book, shelves, toggleClass, activeClass } = this.props;
        const { id, title, shelf, authors, imageLinks } = book;

        return (
            <div className="book">
                <div className="book-cover">
                    <img
                        alt={title}
                        src={
                            (imageLinks && imageLinks.thumbnail) ||
                            "https://cdn.pixabay.com/photo/2017/02/26/21/39/rose-2101475_1280.jpg"
                        }
                    />
                </div>
                <div className="book-title">
                    <h3>{title}</h3>
                </div>
                <div className="book-authors">
                    {authors &&
                        authors.map((author, index) => (
                            <span key={index}>
                                {author} <br />
                            </span>
                        ))}
                </div>

                <div
                    className={`book-shelves ${activeClass && "active"} ${
                        this.state.selected && "active" // For prevent open two  change shelf window together.
                    }`}
                >
                    <div
                        className={`loading ${
                            this.state.selected && "selected"
                        } `}
                    >
                        <div></div>
                    </div>

                    <div className="box">
                        <h4>
                            <span>Move To</span>
                        </h4>
                        {shelves.map((specShelf) =>
                            specShelf.id === shelf ? (
                                <div
                                    className="book-shelf active"
                                    key={specShelf.id}
                                >
                                    <span>{specShelf.title}</span>
                                </div>
                            ) : (
                                <div
                                    className="book-shelf"
                                    key={specShelf.id}
                                    onClick={() =>
                                        this.selectedClass(book, specShelf.id)
                                    }
                                >
                                    <span>{specShelf.title}</span>
                                </div>
                            )
                        )}

                        <div
                            className={`book-shelf ${
                                (shelf === undefined || shelf === "none") &&
                                "active"
                            }`}
                            onClick={() => this.selectedClass(book, "none")}
                        >
                            <span>None</span>
                        </div>
                    </div>
                </div>
                <div
                    className={`drop-down ${activeClass && "active"}`}
                    onClick={() => toggleClass(id)}
                >
                    <i className="fas fa-chevron-circle-down"></i>
                </div>
            </div>
        );
    }
}

export default Book;
