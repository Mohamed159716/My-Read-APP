import { NavLink } from "react-router-dom";

import "./header.styles.scss";

const Header = ({ shelves, getAllBooks }) => {
    return (
        <header>
            <nav>
                <div className="logo">
                    <i className="fas fa-book-reader"></i>
                </div>
                <ul>
                    {shelves.map((shelf) => (
                        <li key={shelf.id}>
                            <NavLink to={shelf.id} onClick={getAllBooks}>
                                {shelf.title}
                            </NavLink>
                        </li>
                    ))}
                    <li>
                        <NavLink to="/search">Search</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
