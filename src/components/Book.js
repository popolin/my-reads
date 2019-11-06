import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { CURRENTLY_READING, WANT_TO_READ, READ, NONE } from "../utils/Consts";

const Book = (props) => {
    const { book } = props
    const { title, authors = [], shelf = NONE.value} = book
    let thumbnail = book.imageLinks ? book.imageLinks.thumbnail : ''
    const onChangeBookShelf = (e) => {
        props.onUpdateBook(book, e.target.value)
    }
    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <Link to={`/books/${book.id}`}>
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})` }}></div>
                    </Link>
                    <div className="book-shelf-changer">
                        <select value={shelf} onChange={onChangeBookShelf}>
                            <option value="moveTo" disabled>Move to...</option>
                            <option value={CURRENTLY_READING.value}>{CURRENTLY_READING.label}</option>
                            <option value={WANT_TO_READ.value}>{WANT_TO_READ.label}</option>
                            <option value={READ.value}>{READ.label}</option>
                            <option value={NONE.value}>{NONE.label}</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{authors.length === 0 ? '--' : authors.join(", ")}</div>
            </div>
        </li>
    )
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    onUpdateBook: PropTypes.func.isRequired
}

export default Book
